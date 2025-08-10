import AppShellTop from "@/components/AppShellTop";
import { StatCard, GlassCard, StatusPill, StageProgress, GlassButton } from "@/components/ui";
import { Wallet, Clock, Activity, CheckCircle2, ArrowRight } from "lucide-react";

export default function Admin() {
  return (
    <AppShellTop active="/admin">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Jobs Today" value="42" icon={<Activity size={16}/>} />
        <StatCard label="In Progress" value="11" icon={<Clock size={16}/>} />
        <StatCard label="Ready" value="7" icon={<CheckCircle2 size={16}/>} />
        <StatCard label="Revenue (LKR)" value="128,400" icon={<Wallet size={16}/>} />
      </div>

      <div className="mt-6 grid gap-4 grid-cols-1 xl:grid-cols-3">
        <GlassCard className="xl:col-span-2">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Recent Jobs</div>
            <GlassButton>View all <ArrowRight className="ml-2" size={14}/></GlassButton>
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
                  <th className="py-2 pr-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  {plate:"CAB-1234", stage:"Washing", tone:"info", progress:45, eta:"4:40 PM", total:"LKR 3,200"},
                  {plate:"KAB-8891", stage:"Drying", tone:"warn", progress:70, eta:"5:15 PM", total:"LKR 2,400"},
                  {plate:"CAA-6610", stage:"Ready", tone:"good", progress:100, eta:"Ready", total:"LKR 1,900"}
                ].map((r)=> (
                  <tr key={r.plate} className="align-middle">
                    <td className="py-3 pr-4 font-semibold">{r.plate}</td>
                    <td className="py-3 pr-4"><StatusPill label={r.stage} tone={r.tone as any}/></td>
                    <td className="py-3 pr-4 w-[220px]"><StageProgress value={r.progress}/></td>
                    <td className="py-3 pr-4 text-white/80">{r.eta}</td>
                    <td className="py-3 pr-4 font-semibold">{r.total}</td>
                    <td className="py-3 pr-4 text-right">
                      <GlassButton className="px-3 py-1.5 text-xs">Open</GlassButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-lg font-semibold">Quick Actions</div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <GlassButton>Create Job</GlassButton>
            <GlassButton>Send Link</GlassButton>
            <GlassButton>Mark Paid</GlassButton>
            <GlassButton>New Package</GlassButton>
          </div>
          <div className="mt-6 text-sm text-white/70">Tip: Use the search bar in the header to jump to a plate or ticket.</div>
        </GlassCard>
      </div>
    </AppShellTop>
  );
}
