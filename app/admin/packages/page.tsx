import AppShellTop from "@/components/AppShellTop";
import { GlassButton, GlassCard } from "@/components/ui";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function Packages() {
  const rows = [
    {name:"Premium Wash + Vacuum", price:"3200.00"},
    {name:"Express Wash", price:"1900.00"},
  ];

  return (
    <AppShellTop active="/admin/packages">
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-[1fr_360px]">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Packages</div>
            <div className="flex gap-2">
              <input placeholder="Search package..." className="input w-64"/>
              <GlassButton className="flex items-center gap-2"><Plus size={14}/> New Package</GlassButton>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-white/60">
                <tr><th className="py-2 pr-4">Name</th><th className="py-2 pr-4">Price (LKR)</th><th className="py-2 pr-4 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map((r)=> (
                  <tr key={r.name}>
                    <td className="py-3 pr-4 font-semibold">{r.name}</td>
                    <td className="py-3 pr-4">{r.price}</td>
                    <td className="py-3 pr-4 text-right space-x-2">
                      <GlassButton className="px-3 py-1.5 text-xs"><Pencil size={12}/> Edit</GlassButton>
                      <GlassButton className="px-3 py-1.5 text-xs"><Trash2 size={12}/> Del</GlassButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-lg font-semibold">Create / Edit Package</div>
          <div className="mt-4 grid gap-3">
            <div><div className="label">Name</div><input className="input" placeholder="Package name"/></div>
            <div><div className="label">Price (LKR)</div><input className="input" type="number" placeholder="0.00"/></div>
            <div className="flex gap-2 mt-2"><GlassButton>Save</GlassButton></div>
          </div>
        </GlassCard>
      </div>
    </AppShellTop>
  );
}
