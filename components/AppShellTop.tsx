import { Brand } from "@/components/Brand";
import { Home, ListChecks, Building2, Package, Users, MessageSquareText, Settings } from "lucide-react";

const nav = [
  {label:"Dashboard", href:"/admin", icon: Home},
  {label:"Jobs", href:"/admin/jobs", icon: ListChecks},
  {label:"Branches", href:"/admin/branches", icon: Building2},
  {label:"Packages", href:"/admin/packages", icon: Package},
  {label:"Users & Roles", href:"/admin/users", icon: Users},
  {label:"Messaging", href:"/admin/messaging", icon: MessageSquareText},
  {label:"Settings", href:"/admin/settings", icon: Settings},
];

export default function AppShellTop({ children, active="/admin" }: { children: React.ReactNode; active?: string }) {
  return (
    <div className="min-h-screen bg-nebula">
      <header className="sticky top-0 z-40 px-4">
        <div className="glass-strong rounded-2xl border border-white/10 px-4 h-20 flex items-center justify-between">
          <Brand />
          <div className="hidden md:flex items-center gap-2">
            {nav.map((i)=>{
              const Icon = i.icon;
              const isActive = active === i.href;
              return (
                <a key={i.href} href={i.href} className={`tab ${isActive ? "active" : ""} flex items-center gap-2`}>
                  <Icon size={16} />
                  {i.label}
                </a>
              );
            })}
          </div>
          <div className="flex items-center gap-3 w-64">
            <input placeholder="Search..." className="hidden lg:block w-full rounded-xl px-3 py-2 text-sm bg-white/5 border border-white/10 outline-none focus:shadow-ring"/>
            <div className="text-sm text-muted hidden md:block">Admin</div>
          </div>
        </div>
      </header>
      <main className="px-4 mt-4">
        {children}
      </main>
    </div>
  );
}
