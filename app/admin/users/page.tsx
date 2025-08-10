import AppShellTop from "@/components/AppShellTop";
import { GlassButton, GlassCard } from "@/components/ui";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function Users() {
  const rows = [
    {name:"Ayesha Silva", email:"ayesha@cleandrive.lk", role:"super_admin"},
    {name:"Nirmal Perera", email:"nirmal@cleandrive.lk", role:"branch_manager"},
    {name:"Sameera Jay", email:"sameera@cleandrive.lk", role:"operator"},
  ];

  return (
    <AppShellTop active="/admin/users">
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-[1fr_360px]">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Users & Roles</div>
            <div className="flex gap-2">
              <input placeholder="Search user..." className="input w-64"/>
              <GlassButton className="flex items-center gap-2"><Plus size={14}/> Invite</GlassButton>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-white/60">
                <tr><th className="py-2 pr-4">Name</th><th className="py-2 pr-4">Email</th><th className="py-2 pr-4">Role</th><th className="py-2 pr-4 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map((r)=> (
                  <tr key={r.email}>
                    <td className="py-3 pr-4 font-semibold">{r.name}</td>
                    <td className="py-3 pr-4">{r.email}</td>
                    <td className="py-3 pr-4">{r.role}</td>
                    <td className="py-3 pr-4 text-right space-x-2">
                      <GlassButton className="px-3 py-1.5 text-xs"><Pencil size={12}/> Edit</GlassButton>
                      <GlassButton className="px-3 py-1.5 text-xs"><Trash2 size={12}/> Remove</GlassButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-lg font-semibold">Invite User</div>
          <div className="mt-4 grid gap-3">
            <div><div className="label">Name</div><input className="input" placeholder="Full name"/></div>
            <div><div className="label">Email</div><input className="input" type="email" placeholder="name@company.com"/></div>
            <div><div className="label">Role</div><select className="input"><option>super_admin</option><option>branch_manager</option><option>operator</option><option>finance</option></select></div>
            <div className="flex gap-2 mt-2"><GlassButton>Invite</GlassButton></div>
          </div>
        </GlassCard>
      </div>
    </AppShellTop>
  );
}
