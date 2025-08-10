import { ReactNode } from "react";

export function GlassButton(props: React.ButtonHTMLAttributes<HTMLButtonElement> & {shine?: boolean}) {
  const { className = "", shine = true, ...rest } = props;
  return (
    <button
      {...rest}
      className={`relative inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium
      text-white/90 border border-white/10 backdrop-blur-md
      bg-gradient-to-br from-white/10 to-white/5 hover:from-white/15 hover:to-white/10
      shadow-glow focus:outline-none focus:shadow-ring ${className}`}>
      {shine && <span className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition rounded-xl" />}
      {props.children}
    </button>
  );
}

export function StageProgress({ value }: { value: number }) {
  return (
    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
      <div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-700 transition-all duration-700" style={{ width: `${value}%` }} />
    </div>
  );
}

export function StatusPill({ label, tone="default" }:{label:string, tone?: "default"|"good"|"warn"|"info"}) {
  const map = {
    default: "bg-white/10 text-white",
    good: "bg-emerald-400/15 text-emerald-300",
    warn: "bg-amber-400/15 text-amber-300",
    info: "bg-brand/20 text-brand"
  } as const;
  return <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[tone]}`}>{label}</span>
}

export function GlassCard({ children, className="" }:{children: ReactNode, className?:string}) {
  return <div className={`glass rounded-2xl p-5 tile ${className}`}>{children}</div>;
}

export function StatCard({ label, value, icon, spark }: { label: string; value: string; icon: React.ReactNode; spark?: number[] }) {
  return (
    <div className="glass rounded-2xl p-5 border border-white/10 relative overflow-hidden tile">
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-gradient-to-br from-brand/25 to-brand-700/20 blur-2xl" />
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-brand/15 border border-white/10">{icon}</div>
        <div className="text-sm text-muted">{label}</div>
      </div>
      <div className="mt-3 text-3xl font-extrabold tracking-tight">{value}</div>
      {spark && <Sparks data={spark} />}
    </div>
  );
}

export function Sparks({ data }:{ data:number[] }) {
  const max = Math.max(...data, 1);
  const h = 36, w = 160;
  const pts = data.map((v, i) => {
    const x = (i/(data.length-1))*w;
    const y = h - (v/max)*h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} className="mt-2">
      <polyline points={pts} fill="none" stroke="url(#g)" strokeWidth="2"/>
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stopColor="#8B5CF6"/><stop offset="1" stopColor="#6D28D9"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
