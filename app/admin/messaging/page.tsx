import AppShellTop from "@/components/AppShellTop";
import { GlassButton, GlassCard } from "@/components/ui";

export default function Messaging() {
  return (
    <AppShellTop active="/admin/messaging">
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-[1fr_420px]">
        <GlassCard>
          <div className="text-lg font-semibold">Templates</div>
          <div className="mt-4 grid gap-3">
            {[
              {name:"Drop-off SMS", key:"dropoff", body:"CleanDrive: Track your vehicle → {{magic_link}}"},
              {name:"Ready for pickup", key:"ready", body:"Your vehicle {{plate}} is ready. Pay online → {{magic_link}}"},
              {name:"Payment Reminder", key:"reminder", body:"Reminder: Payment pending for {{plate}} → {{magic_link}}"}
            ].map(t => (
              <div key={t.key} className="glass rounded-xl p-4 border border-white/10">
                <div className="text-sm font-semibold">{t.name}</div>
                <textarea className="input mt-2 h-24" defaultValue={t.body}></textarea>
                <div className="mt-2 text-xs text-white/60">
                  Variables: <code>{'{{magic_link}} {{plate}} {{ticket}} {{name}}'}</code>
                </div>
                <div className="mt-3"><GlassButton>Save</GlassButton></div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-lg font-semibold">Send Test Message</div>
          <div className="mt-4 grid gap-3">
            <div><div className="label">To (Phone)</div><input className="input" placeholder="+9477..." /></div>
            <div><div className="label">Template</div><select className="input"><option>Drop-off SMS</option><option>Ready for pickup</option><option>Payment Reminder</option></select></div>
            <div className="flex gap-2 mt-2"><GlassButton>Send</GlassButton></div>
          </div>
        </GlassCard>
      </div>
    </AppShellTop>
  );
}
