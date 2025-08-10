import AppShellTop from "@/components/AppShellTop";
import { GlassButton, GlassCard } from "@/components/ui";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { getServiceClient } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";

type Branch = { id: string; name: string; address: string | null; active: boolean };

async function getBranches(): Promise<Branch[]> {
  const sb = getServiceClient();
  const { data } = await sb.from("branches").select("id, name, address, active").order("created_at", { ascending: false });
  return (data ?? []) as Branch[];
}

export default async function Branches() {
  const rows = await getBranches();

  return (
    <AppShellTop active="/admin/branches">
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-[1fr_360px]">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Branches</div>
            <div className="flex gap-2">
              <form action={search} className="flex gap-2">
                <input name="q" placeholder="Search name..." className="input w-64"/>
                <GlassButton type="submit">Search</GlassButton>
              </form>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-white/60">
                <tr><th className="py-2 pr-4">Name</th><th className="py-2 pr-4">Address</th><th className="py-2 pr-4">Status</th><th className="py-2 pr-4 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map((r)=> (
                  <tr key={r.id}>
                    <td className="py-3 pr-4 font-semibold">{r.name}</td>
                    <td className="py-3 pr-4">{r.address ?? "—"}</td>
                    <td className="py-3 pr-4">{r.active ? "Active" : "Disabled"}</td>
                    <td className="py-3 pr-4 text-right space-x-2">
                      <form action={toggleBranch} className="inline-block">
                        <input type="hidden" name="id" value={r.id} />
                        <GlassButton className="px-3 py-1.5 text-xs">{r.active ? <ToggleRight size={12}/> : <ToggleLeft size={12}/> } Toggle</GlassButton>
                      </form>
                      <form action={deleteBranch} className="inline-block ml-2">
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
          <div className="text-lg font-semibold">Create / Edit Branch</div>
          <form action={createBranch} className="mt-4 grid gap-3">
            <div><div className="label">Name</div><input name="name" className="input" placeholder="Branch name" required/></div>
            <div><div className="label">Address</div><input name="address" className="input" placeholder="Address"/></div>
            <div><div className="label">Active</div><select name="active" className="input"><option value="true">Active</option><option value="false">Disabled</option></select></div>
            <div className="flex gap-2 mt-2"><GlassButton type="submit">Save</GlassButton></div>
          </form>
        </GlassCard>
      </div>
    </AppShellTop>
  );
}

export async function search() { "use server"; revalidatePath("/admin/branches"); }
export async function createBranch(formData: FormData) {
  "use server";
  const sb = getServiceClient();
  const payload = { name: String(formData.get("name")), address: String(formData.get("address")||""), active: String(formData.get("active")) === "true" };
  const { error } = await sb.from("branches").insert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/branches");
}
export async function toggleBranch(formData: FormData) {
  "use server";
  const sb = getServiceClient();
  const id = String(formData.get("id"));
  const { data, error } = await sb.from("branches").select("active").eq("id", id).single();
  if (error) throw new Error(error.message);
  const { error: err2 } = await sb.from("branches").update({ active: !data.active }).eq("id", id);
  if (err2) throw new Error(err2.message);
  revalidatePath("/admin/branches");
}
export async function deleteBranch(formData: FormData) {
  "use server";
  const sb = getServiceClient();
  const id = String(formData.get("id"));
  const { error } = await sb.from("branches").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/branches");
}
