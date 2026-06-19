"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Sparkles, useTexture } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import {
  Database,
  ShieldCheck,
  BrainCircuit,
  Workflow,
  type LucideIcon,
} from "lucide-react";

type OrbitNode = {
  id: string;
  label: string;
  tagline: string;
  detail: string;
  color: string;
  icon: LucideIcon;
  angle: number;
};

// Angle is measured in the ring's local XY plane: 0=right, 90=top,
// 180=left, 270=bottom — matching the reference layout (security on top,
// EBS left, AI right, RPA bottom).
const NODES: OrbitNode[] = [
  {
    id: "ebs",
    label: "Oracle E-Business Suite",
    tagline: "Optimize. Modernize. Grow.",
    detail: "Maximize your Oracle investments.",
    color: "#FF6A3D",
    icon: Database,
    angle: 180,
  },
  {
    id: "security",
    label: "Oracle Risk Management & Cloud Security",
    tagline: "Secure. Comply. Strengthen.",
    detail: "Protect what matters.",
    color: "#6C3BFF",
    icon: ShieldCheck,
    angle: 90,
  },
  {
    id: "ai",
    label: "AI Solutions",
    tagline: "Intelligent. Predictive. Impactful.",
    detail: "Turn data into decisions.",
    color: "#2563FF",
    icon: BrainCircuit,
    angle: 0,
  },
  {
    id: "rpa",
    label: "RPA with UiPath",
    tagline: "Automate. Accelerate. Excel.",
    detail: "Work smarter. Scale faster.",
    color: "#22C55E",
    icon: Workflow,
    angle: 270,
  },
];

// Label cards are ~140px wide / ~95px tall in CSS pixels, fixed regardless
// of the 3D scene's scale (drei's <Html> renders them at native screen
// size). The container the hero gives this canvas is narrower than it is
// tall, so the orbit radius is solved per-frame from the canvas's actual
// pixel size rather than hard-coded — otherwise nodes clip past whichever
// container edge is closer (width, on every breakpoint we ship).
const CARD_HALF_EXTENT_PX = 78;
const EDGE_MARGIN_PX = 18;

function CentralLogo() {
  const texture = useTexture("/logo-mark.png");
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.08;
      meshRef.current.quaternion.copy(state.camera.quaternion);
    }
    if (glowRef.current) {
      glowRef.current.position.y = Math.sin(t * 0.5) * 0.08;
      glowRef.current.quaternion.copy(state.camera.quaternion);
      const pulse = 1 + Math.sin(t * 1.2) * 0.06;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <>
      <mesh ref={glowRef} renderOrder={0}>
        <circleGeometry args={[0.72, 32]} />
        <meshBasicMaterial
          color="#6C3BFF"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={meshRef} renderOrder={1}>
        <planeGeometry args={[1.15, 1.27]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} />
      </mesh>
    </>
  );
}

function NodeGlow({ color, hovered }: { color: string; hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current.scale, {
      x: hovered ? 1.45 : 1,
      y: hovered ? 1.45 : 1,
      z: hovered ? 1.45 : 1,
      duration: 0.5,
      ease: "power3.out",
    });
  }, [hovered]);

  return (
    <mesh ref={ref} renderOrder={0}>
      <circleGeometry args={[0.37, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={hovered ? 0.45 : 0.28}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

function OrbitNodeView({
  node,
  hovered,
  onHoverChange,
}: {
  node: OrbitNode;
  hovered: boolean;
  onHoverChange: (hovered: boolean) => void;
}) {
  const Icon = node.icon;

  return (
    <>
      <NodeGlow color={node.color} hovered={hovered} />
      <Html center distanceFactor={undefined} zIndexRange={[10, 0]}>
        <div
          onPointerEnter={() => onHoverChange(true)}
          onPointerLeave={() => onHoverChange(false)}
          className="flex select-none flex-col items-center transition-transform duration-300 ease-out"
          style={{ transform: hovered ? "scale(1.12)" : "scale(1)" }}
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md transition-shadow duration-300"
            style={{
              backgroundColor: `${node.color}26`,
              borderColor: `${node.color}66`,
              boxShadow: hovered
                ? `0 12px 28px -8px ${node.color}aa, 0 0 0 1px ${node.color}40 inset`
                : `0 6px 16px -6px ${node.color}66`,
            }}
          >
            <Icon size={19} color={node.color} strokeWidth={2} />
          </div>
          <div
            className="pointer-events-none mt-1.5 w-35 rounded-lg border border-white/15 bg-black/40 px-2 py-1 text-center backdrop-blur-md transition-opacity duration-300"
            style={{ opacity: hovered ? 1 : 0.92 }}
          >
            <p className="text-[10px] font-semibold leading-snug text-white">{node.label}</p>
            <p className="mt-0.5 text-[9px] leading-snug text-white/60">{node.tagline}</p>
            {hovered ? (
              <p className="mt-1 text-[9px] font-medium leading-snug" style={{ color: node.color }}>
                {node.detail}
              </p>
            ) : null}
          </div>
        </div>
      </Html>
    </>
  );
}

function OrbitSystem() {
  const groupRef = useRef<THREE.Group>(null);
  const nodeRefs = useRef<(THREE.Group | null)[]>([]);
  const lineGeomRef = useRef<THREE.BufferGeometry>(null);
  const linePositions = useMemo(() => new Float32Array(NODES.length * 6), []);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { size, camera } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // Solve the orbit radius from the canvas's current pixel size so nodes
    // stay clear of whichever edge (width or height) is closer, at every
    // breakpoint, without hard-coding per-breakpoint values.
    const perspCamera = camera as THREE.PerspectiveCamera;
    const distance = camera.position.z;
    const visibleWorldHeight = 2 * distance * Math.tan((perspCamera.fov * Math.PI) / 360);
    const pxPerWorldUnit = size.height / visibleWorldHeight;
    const maxRadiusPx = Math.min(size.width, size.height) / 2 - CARD_HALF_EXTENT_PX - EDGE_MARGIN_PX;
    const radius = Math.max(maxRadiusPx / pxPerWorldUnit, 1.1);

    if (groupRef.current) {
      // A bounded sway rather than a full unbounded spin — keeps each node
      // anchored near its labeled cardinal position permanently, so labels
      // never drift into each other or toward the canvas edge the longer
      // the page stays open.
      groupRef.current.rotation.z = Math.sin(t * 0.15) * 0.12;
    }
    NODES.forEach((node, i) => {
      const baseAngle = (node.angle * Math.PI) / 180;
      const bob = Math.sin(t * 0.6 + i * 1.4) * 0.1;
      const x = radius * Math.cos(baseAngle);
      const y = radius * Math.sin(baseAngle) + bob;
      const ref = nodeRefs.current[i];
      if (ref) ref.position.set(x, y, 0);
      linePositions.set([0, 0, 0, x, y, 0], i * 6);
    });
    const attr = lineGeomRef.current?.attributes.position as THREE.BufferAttribute | undefined;
    if (attr) attr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <lineSegments renderOrder={0}>
        <bufferGeometry ref={lineGeomRef}>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color="#a9bbf2"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
      {NODES.map((node, i) => (
        <group key={node.id} ref={(el) => { nodeRefs.current[i] = el; }}>
          <OrbitNodeView
            node={node}
            hovered={hoveredId === node.id}
            onHoverChange={(h) => setHoveredId(h ? node.id : null)}
          />
        </group>
      ))}
    </group>
  );
}

function CameraParallax() {
  useFrame((state) => {
    const { pointer, camera } = state;
    camera.position.x += (pointer.x * 0.55 - camera.position.x) * 0.04;
    camera.position.y += (pointer.y * 0.35 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function ClaapsOrbitScene({ paused = false }: { paused?: boolean }) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const onVisibility = () => setActive(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <Canvas
      frameloop={active && !paused ? "always" : "never"}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 6.5], fov: 42 }}
    >
      <Sparkles count={90} scale={[6.5, 5.5, 3]} size={1.6} speed={0.25} color="#c7d2fe" opacity={0.35} />
      <Suspense fallback={null}>
        <CentralLogo />
      </Suspense>
      <OrbitSystem />
      <CameraParallax />
    </Canvas>
  );
}

export default ClaapsOrbitScene;
