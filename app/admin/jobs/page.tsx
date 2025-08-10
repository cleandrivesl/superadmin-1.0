import AppShellTop from "@/components/AppShellTop";
import { GlassButton, GlassCard, StatusPill, StageProgress } from "@/components/ui";
import { Plus, Send, Pencil, Trash2 } from "lucide-react";

export default function Jobs() {
  const rows = [
    {plate:"CAB-1234", stage:"washing", progress:45, eta:"4:40 PM", total:"LKR 3,200"},
    {plate:"KAB-8891", stage:"drying", progress:70, eta:"5:15 PM", total:"LKR 2,400"},
    {plate:"CAA-6610", stage:"ready", progress:100, eta:"Ready", total:"LKR 1,900"},
  ];

  return (
    <AppShellTop active="/admin/jobs">
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-[1fr_340px]">
        <GlassCard>
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="text-lg font-semibold">Jobs</div>
            <div className="flex gap-2">
              <input placeholder="Search plate or ticket..." className="input w-64" />
              <select className="input">
                <option value="">All Stages</option>
                <option>Queued</option><option>Washing</option><option>Drying</option><option>Ready</option><option>Paid</option>
              </select>
              <GlassButton className="flex items-center gap-2"><Plus size={14}/> New</GlassButton>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-white/60">
                <tr>
                  <th className="py-2 pr-4">Plate</th>
                  <th className="py-2 pr-4">Stage</th>
                  <th className="py-2 pr-4">Progress</th>
                  <th className="py-2 pr-4">ETA</th>
                  <th className="py-2 pr-4">Total</th>
                  <th className="py-2 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map((r)=> (
                  <tr key={r.plate} className="align-middle">
                    <td className="py-3 pr-4 font-semibold">{r.plate}</td>
                    <td className="py-3 pr-4"><StatusPill label={r.stage} tone={r.stage==="ready"?"good":(r.stage==="drying"?"warn":"info")} /></td>
                    <td className="py-3 pr-4 w-[220px]"><StageProgress value={r.progress}/></td>
                    <td className="py-3 pr-4 text-white/80">{r.eta}</td>
                    <td className="py-3 pr-4 font-semibold">{r.total}</td>
                    <td className="py-3 pr-4 text-right space-x-2">
                      <GlassButton className="px-3 py-1.5 text-xs"><Send size={12}/> Link</GlassButton>
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
          <div className="text-lg font-semibold">Create / Edit Job</div>
          <div className="mt-4 grid gap-3">
            <div>
              <div className="label">Plate</div>
              <input className="input" placeholder="e.g., CAB-1234" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="label">Stage</div>
                <select className="input"><option>Queued</option><option>Washing</option><option>Drying</option><option>Ready</option><option>Paid</option></select>
              </div>
              <div>
                <div className="label">Progress</div>
                <input className="input" type="number" min="0" max="100" placeholder="0-100" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="label">ETA</div>
                <input className="input" type="datetime-local" />
              </div>
              <div>
                <div className="label">Total (LKR)</div>
                <input className="input" type="number" placeholder="0" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="label">Branch</div>
                <select className="input"><option>Main Branch</option></select>
              </div>
              <div>
                <div className="label">Package</div>
                <select className="input"><option>Premium Wash + Vacuum</option></select>
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <GlassButton>Save</GlassButton>
              <GlassButton>Send Magic Link</GlassButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </AppShellTop>
  );
}
