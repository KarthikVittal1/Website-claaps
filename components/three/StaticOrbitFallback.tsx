import Image from "next/image";
import { Database, ShieldCheck, BrainCircuit, Workflow } from "lucide-react";

const NODES = [
  { id: "ebs", label: "Oracle EBS", color: "#FF6A3D", icon: Database, className: "left-2 top-1/2 -translate-y-1/2" },
  { id: "security", label: "Cloud Security", color: "#6C3BFF", icon: ShieldCheck, className: "top-2 left-1/2 -translate-x-1/2" },
  { id: "ai", label: "AI Solutions", color: "#2563FF", icon: BrainCircuit, className: "right-2 top-1/2 -translate-y-1/2" },
  { id: "rpa", label: "UiPath RPA", color: "#22C55E", icon: Workflow, className: "bottom-2 left-1/2 -translate-x-1/2" },
] as const;

export function StaticOrbitFallback() {
  return (
    <div className="relative h-full w-full overflow-visible" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-electric-500/15 blur-2xl" />
      <Image
        src="/logo-mark.png"
        alt=""
        width={476}
        height={524}
        className="absolute left-1/2 top-1/2 h-20 w-auto -translate-x-1/2 -translate-y-1/2"
      />
      {NODES.map((node) => {
        const Icon = node.icon;
        return (
          <div key={node.id} className={`absolute flex flex-col items-center gap-1.5 ${node.className}`}>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full border backdrop-blur-md"
              style={{ backgroundColor: `${node.color}26`, borderColor: `${node.color}66` }}
            >
              <Icon size={18} color={node.color} strokeWidth={2} />
            </div>
            <p className="whitespace-nowrap text-[10px] font-medium text-white/70">{node.label}</p>
          </div>
        );
      })}
    </div>
  );
}
