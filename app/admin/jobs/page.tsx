import AppShellTop from "@/components/AppShellTop";
import { GlassButton, GlassCard, StatusPill, StageProgress } from "@/components/ui";
import { Plus, Send, Pencil, Trash2 } from "lucide-react";
import { getServiceClient } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";

type JobRow = {
  id: string;
  plate: string;
  stage: "queued"|"washing"|"drying"|"ready"|"paid";
  progress: number;
  eta: string | null;
  total_lkr: number | null;
};

async function getJobs(): Promise<JobRow[]> {
  const sb = getServiceClient();
  const { data } = await sb
    .from("jobs")
    .select("id, plate, stage, progress, eta, total_lkr")
    .order("created_at", { ascending: false })
    .limit(50);
  return (data ?? []) as JobRow[];
}

export default async function Jobs() {
  const rows = await getJobs();

  return (
    <AppShellTop active="/admin/jobs">
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-[1fr_340px]">
        <GlassCard>
          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="text-lg font-semibold">Jobs</div>
            <div className="flex gap-2">
              <form action={searchJobs} className="flex gap-2">
                <input name="q" placeholder="Search plate..." className="input w-64" />
                <GlassButton type="submit">Search</GlassButton>
              </form>
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
                  <tr key={r.id} className="align-middle">
                    <td className="py-3 pr-4 font-semibold">{r.plate}</td>
                    <td className="py-3 pr-4"><StatusPill label={r.stage} tone={r.stage==="ready"?"good":(r.stage==="drying"?"warn":"info")} /></td>
                    <td className="py-3 pr-4 w-[220px]"><StageProgress value={r.progress || 0}/></td>
                    <td className="py-3 pr-4 text-white/80">{r.eta ? new Date(r.eta).toLocaleString("en-LK") : "—"}</td>
                    <td className="py-3 pr-4 font-semibold">{typeof r.total_lkr === "number" ? `LKR ${r.total_lkr.toLocaleString()}` : "—"}</td>
                    <td className="py-3 pr-4 text-right space-x-2">
                      <form action={issueLink}>
                        <input type="hidden" name="job_id" value={r.id} />
                        <GlassButton className="px-3 py-1.5 text-xs"><Send size={12}/> Link</GlassButton>
                      </form>
                      <form action={quickStage}>
                        <input type="hidden" name="id" value={r.id} />
                        <select name="stage" className="input inline-block w-auto text-xs align-middle">
                          <option value="queued">queued</option>
                          <option value="washing">washing</option>
                          <option value="drying">drying</option>
                          <option value="ready">ready</option>
                          <option value="paid">paid</option>
                        </select>
                        <input type="number" min="0" max="100" name="progress" defaultValue={r.progress || 0} className="input inline-block w-20 ml-2 text-xs"/>
                        <GlassButton className="px-3 py-1.5 text-xs ml-2"><Pencil size={12}/> Update</GlassButton>
                      </form>
                      <form action={deleteJob} className="inline-block ml-2">
                        <input type="hidden" name="id" value={r.id} />
                        <GlassButton className="px-3 py-1.5 text-xs"><Trash2 size={12}/> Del</GlassButton>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-lg font-semibold">Create Job</div>
          <CreateJobForm />
        </GlassCard>
      </div>
    </AppShellTop>
  );
}

function CreateJobForm() {
  return (
    <form action={createJob} className="mt-4 grid gap-3">
      <div>
        <div className="label">Plate</div>
        <input name="plate" className="input" placeholder="CAB-1234" required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="label">Stage</div>
          <select name="stage" className="input">
            <option>queued</option><option>washing</option><option>drying</option><option>ready</option><option>paid</option>
          </select>
        </div>
        <div>
          <div className="label">Progress</div>
          <input name="progress" className="input" type="number" min="0" max="100" defaultValue={0}/>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="label">ETA</div>
          <input name="eta" className="input" type="datetime-local"/>
        </div>
        <div>
          <div className="label">Total (LKR)</div>
          <input name="total_lkr" className="input" type="number" defaultValue={0}/>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <GlassButton type="submit">Save</GlassButton>
      </div>
    </form>
  );
}

// ---------- SERVER ACTIONS ----------
export async function searchJobs(formData: FormData) {
  "use server";
  // Placeholder: add filters/URL params later
  revalidatePath("/admin/jobs");
}

export async function createJob(formData: FormData) {
  "use server";
  const sb = getServiceClient();
  const payload = {
    plate: String(formData.get("plate") || "").toUpperCase(),
    stage: String(formData.get("stage") || "queued"),
    progress: Number(formData.get("progress") || 0),
    eta: formData.get("eta") ? new Date(String(formData.get("eta"))).toISOString() : null,
    total_lkr: Number(formData.get("total_lkr") || 0)
  };
  const { error } = await sb.from("jobs").insert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/jobs");
}

export async function quickStage(formData: FormData) {
  "use server";
  const sb = getServiceClient();
  const id = String(formData.get("id"));
  const stage = String(formData.get("stage"));
  const progress = Number(formData.get("progress"));
  const { error } = await sb.from("jobs").update({ stage, progress }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/jobs");
}

export async function deleteJob(formData: FormData) {
  "use server";
  const sb = getServiceClient();
  const id = String(formData.get("id"));
  const { error } = await sb.from("jobs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/jobs");
}

export async function issueLink(formData: FormData) {
  "use server";
  const job_id = String(formData.get("job_id"));
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/token/issue`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ job_id })
  });
  if (!res.ok) throw new Error(await res.text());
  revalidatePath("/admin/jobs");
}
