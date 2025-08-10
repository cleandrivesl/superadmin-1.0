import { StageProgress, StatusPill, GlassButton, GlassCard } from "@/components/ui";
import { Brand } from "@/components/Brand";
import { getServiceClient } from "@/lib/supabaseClient";

type Job = {
  plate: string;
  stage: "queued"|"washing"|"drying"|"ready"|"paid";
  progress: number;
  eta: string;
  packageName: string;
  total: string;
};

async function getJob(token: string): Promise<Job | null> {
  const sb = getServiceClient();
  const { data, error } = await sb
    .from("v_job_from_token")
    .select("token, plate, stage, progress, eta, total_lkr")
    .eq("token", token)
    .single();
  if (error || !data) return null;

  return {
    plate: data.plate as string,
    stage: (data.stage as any) ?? "queued",
    progress: (data.progress as number) ?? 0,
    eta: data.eta ? new Date(String(data.eta)).toLocaleString("en-LK") : "TBA",
    packageName: "",
    total: `LKR ${Number(data.total_lkr ?? 0).toLocaleString()}`
  };
}

export default async function Page({ params }: { params: { token: string } }) {
  const job = await getJob(params.token);

  return (
    <div className="min-h-screen text-[var(--text)]">
      <header className="px-4 py-3 flex items-center justify-between max-w-5xl mx-auto">
        <Brand />
        <a href="https://maps.google.com/?q=CleanDrive" className="text-sm text-white/80 hover:text-white">Pickup Location</a>
      </header>

      <main className="max-w-3xl mx-auto p-4 space-y-6">
        {!job && (
          <GlassCard>
            <div className="text-lg font-semibold">Link invalid or expired</div>
            <p className="text-sm text-white/80 mt-2">Please request a new tracking link from the counter.</p>
          </GlassCard>
        )}
        {job && (
          <>
            <GlassCard>
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">{job.plate}</div>
                <StatusPill label={job.stage.toUpperCase()} tone={job.stage==="ready" ? "good" : (job.stage==="drying" ? "warn" : "info")} />
              </div>
              <div className="mt-4"><StageProgress value={job.progress} /></div>
              <div className="mt-3 text-sm text-white/80">ETA: {job.eta}</div>
            </GlassCard>

            <GlassCard>
              <div className="font-semibold mb-2">Package</div>
              <div className="text-sm">{job.packageName || "—"}</div>
              <div className="mt-3 text-sm text-white/80">Total</div>
              <div className="text-2xl font-extrabold">{job.total}</div>
              <div className="mt-4 flex gap-3">
                <GlassButton>Pay Online</GlassButton>
                <GlassButton>WhatsApp Updates</GlassButton>
              </div>
            </GlassCard>
          </>
        )}
      </main>

      <footer className="py-6 text-center text-xs text-white/60">© {new Date().getFullYear()} CleanDrive</footer>
    </div>
  );
}
