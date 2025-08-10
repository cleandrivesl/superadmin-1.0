import AppShellTop from "@/components/AppShellTop";
import { GlassButton, GlassCard } from "@/components/ui";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";

export default function Branches() {
  const rows = [
    {name:"Main Branch", address:"123 Galle Rd", active:true},
    {name:"City Center", address:"45 Flower Rd", active:false},
  ];

  return (
    <AppShellTop active="/admin/branches">
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-[1fr_360px]">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Branches</div>
            <div className="flex gap-2">
              <input placeholder="Search name..." className="input w-64"/>
              <GlassButton className="flex items-center gap-2"><Plus size={14}/> New Branch</GlassButton>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-white/60">
                <tr><th className="py-2 pr-4">Name</th><th className="py-2 pr-4">Address</th><th className="py-2 pr-4">Status</th><th className="py-2 pr-4 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map((r)=> (
                  <tr key={r.name}>
                    <td className="py-3 pr-4 font-semibold">{r.name}</td>
                    <td className="py-3 pr-4">{r.address}</td>
                    <td className="py-3 pr-4">{r.active ? "Active" : "Disabled"}</td>
                    <td className="py-3 pr-4 text-right space-x-2">
                      <GlassButton className="px-3 py-1.5 text-xs"><Pencil size={12}/> Edit</GlassButton>
                      <GlassButton className="px-3 py-1.5 text-xs">{r.active ? <ToggleRight size={12}/> : <ToggleLeft size={12}/> } Toggle</GlassButton>
                      <GlassButton className="px-3 py-1.5 text-xs"><Trash2 size={12}/> Del</GlassButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-lg font-semibold">Create / Edit Branch</div>
          <div className="mt-4 grid gap-3">
            <div><div className="label">Name</div><input className="input" placeholder="Branch name"/></div>
            <div><div className="label">Address</div><input className="input" placeholder="Address"/></div>
            <div><div className="label">Active</div><select className="input"><option>Active</option><option>Disabled</option></select></div>
            <div className="flex gap-2 mt-2"><GlassButton>Save</GlassButton></div>
          </div>
        </GlassCard>
      </div>
    </AppShellTop>
  );
}
