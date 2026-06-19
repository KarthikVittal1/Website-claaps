"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 56;
// Brand-blue dominant, with purple as a secondary blend and orange used
// sparingly (1 in 6) — orange is the logo's loudest color, so it's rationed
// here the same way it's rationed across the rest of the UI.
const ACCENT_COLORS = ["#4e56b8", "#4e56b8", "#6b4fbf", "#4e56b8", "#6b4fbf", "#f24a1d"];

function generateNodes() {
  const nodes: { position: THREE.Vector3; color: string }[] = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    const radius = 4.2 + Math.random() * 0.4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const position = new THREE.Vector3(
      radius * Math.sin(phi) * Math.cos(theta) * 0.9,
      radius * Math.sin(phi) * Math.sin(theta) * 0.55,
      radius * Math.cos(phi) * 0.6 - 1
    );
    nodes.push({
      position,
      color: ACCENT_COLORS[i % ACCENT_COLORS.length],
    });
  }
  return nodes;
}

function generateEdges(nodes: { position: THREE.Vector3 }[]) {
  const edges: [number, number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    let nearest = -1;
    let nearestDist = Infinity;
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const dist = nodes[i].position.distanceTo(nodes[j].position);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = j;
      }
    }
    if (nearest !== -1 && Math.random() > 0.35) {
      edges.push([i, nearest]);
    }
  }
  return edges;
}

function NodesAndEdges() {
  const data = useMemo(() => {
    const nodes = generateNodes();
    const edges = generateEdges(nodes);
    return { nodes, edges };
  }, []);

  const edgePositions = useMemo(() => {
    const arr = new Float32Array(data.edges.length * 6);
    data.edges.forEach(([a, b], i) => {
      const pa = data.nodes[a].position;
      const pb = data.nodes[b].position;
      arr.set([pa.x, pa.y, pa.z, pb.x, pb.y, pb.z], i * 6);
    });
    return arr;
  }, [data]);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#4e56b8" transparent opacity={0.35} />
      </lineSegments>

      {data.nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshBasicMaterial color={node.color} />
        </mesh>
      ))}

      <Pulses nodes={data.nodes} edges={data.edges} />
    </group>
  );
}

function Pulses({
  nodes,
  edges,
}: {
  nodes: { position: THREE.Vector3 }[];
  edges: [number, number][];
}) {
  const pulseCount = 10;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  // Per-frame mutable bookkeeping belongs in a ref, not state — these values
  // are written every frame in useFrame and must never trigger a re-render.
  // The random data is generated in an effect (which runs after render,
  // never during it) rather than inline, since calling Math.random() while
  // rendering would make the render impure.
  const progressRef = useRef<number[]>([]);
  const edgeAssignmentsRef = useRef<number[]>([]);

  useLayoutEffect(() => {
    progressRef.current = Array.from({ length: pulseCount }, () => Math.random());
    edgeAssignmentsRef.current = Array.from({ length: pulseCount }, () =>
      Math.floor(Math.random() * edges.length)
    );
  }, [edges.length]);

  useFrame((_, delta) => {
    const progress = progressRef.current;
    const edgeAssignments = edgeAssignmentsRef.current;
    if (!meshRef.current || edges.length === 0 || progress.length === 0) return;
    const dummy = new THREE.Object3D();
    for (let i = 0; i < pulseCount; i++) {
      progress[i] += delta * 0.25;
      if (progress[i] > 1) {
        progress[i] = 0;
        edgeAssignments[i] = Math.floor(Math.random() * edges.length);
      }
      const [a, b] = edges[edgeAssignments[i]];
      const pa = nodes[a].position;
      const pb = nodes[b].position;
      dummy.position.lerpVectors(pa, pb, progress[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, pulseCount]}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="#f24a1d" />
    </instancedMesh>
  );
}

function CameraParallax() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    state.camera.position.x += (pointer.current.x * 0.4 - state.camera.position.x) * 0.04;
    state.camera.position.y += (-pointer.current.y * 0.25 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export function RiskIntelligenceNetwork() {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onVisibility = () => setActive(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0, 9], fov: 42 }}
    >
      <color attach="background" args={["#ffffff"]} />
      <ambientLight intensity={1.2} />
      <NodesAndEdges />
      <CameraParallax />
    </Canvas>
  );
}
