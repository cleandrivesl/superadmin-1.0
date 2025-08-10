import AppShellTop from "@/components/AppShellTop";
import { GlassCard, GlassButton } from "@/components/ui";

export default function Settings() {
  return (
    <AppShellTop active="/admin/settings">
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
        <GlassCard>
          <div className="text-lg font-semibold">General</div>
          <div className="mt-4 grid gap-3">
            <div><div className="label">Timezone</div><select className="input"><option>Asia/Colombo (UTC+5:30)</option></select></div>
            <div><div className="label">Magic Link Expiry (minutes)</div><input className="input" type="number" defaultValue={240}/></div>
            <div><div className="label">Base URL (Tracking)</div><input className="input" placeholder="https://track.cleandrive.lk/j/"/></div>
            <div className="mt-2"><GlassButton>Save</GlassButton></div>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-lg font-semibold">Providers</div>
          <div className="mt-4 grid gap-3">
            <div><div className="label">WhatsApp Access Token</div><input className="input" placeholder="••••••"/></div>
            <div><div className="label">WhatsApp Phone Number ID</div><input className="input" placeholder=""/></div>
            <div><div className="label">SMS (Twilio) SID</div><input className="input" placeholder=""/></div>
            <div><div className="label">SMS (Twilio) Token</div><input className="input" placeholder="••••••"/></div>
            <div><div className="label">Payment Provider</div><select className="input"><option>PayHere</option><option>Stripe</option></select></div>
            <div className="mt-2"><GlassButton>Save</GlassButton></div>
          </div>
        </GlassCard>
      </div>
    </AppShellTop>
  );
}
