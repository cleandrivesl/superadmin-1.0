import AppShellTop from "@/components/AppShellTop";
import { GlassButton, GlassCard } from "@/components/ui";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { getServiceClient } from "@/lib/supabaseClient";
import { revalidatePath } from "next/cache";

type Pack = { id: string; name: string; price_lkr: number };

async function getPackages(): Promise<Pack[]> {
  const sb = getServiceClient();
  const { data } = await sb.from("packages").select("id, name, price_lkr").order("created_at", { ascending: false });
  return (data ?? []) as Pack[];
}

export default async function Packages() {
  const rows = await getPackages();

  return (
    <AppShellTop active="/admin/packages">
      <div className="grid gap-4 grid-cols-1 xl:grid-cols-[1fr_360px]">
        <GlassCard>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Packages</div>
            <div className="flex gap-2">
              <form action={search} className="flex gap-2">
                <input name="q" placeholder="Search package..." className="input w-64"/>
                <GlassButton type="submit" className="flex items-center gap-2"><Plus size={14}/> New</GlassButton>
              </form>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-white/60">
                <tr><th className="py-2 pr-4">Name</th><th className="py-2 pr-4">Price (LKR)</th><th className="py-2 pr-4 text-right">Actions</th></tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {rows.map((r)=> (
                  <tr key={r.id}>
                    <td className="py-3 pr-4 font-semibold">{r.name}</td>
                    <td className="py-3 pr-4">{Number(r.price_lkr ?? 0).toLocaleString()}</td>
                    <td className="py-3 pr-4 text-right space-x-2">
                      <form action={deletePackage} className="inline-block">
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
          <div className="text-lg font-semibold">Create / Edit Package</div>
          <form action={createPackage} className="mt-4 grid gap-3">
            <div><div className="label">Name</div><input name="name" className="input" placeholder="Package name" required/></div>
            <div><div className="label">Price (LKR)</div><input name="price_lkr" className="input" type="number" placeholder="0.00" required/></div>
            <div className="flex gap-2 mt-2"><GlassButton type="submit">Save</GlassButton></div>
          </form>
        </GlassCard>
      </div>
    </AppShellTop>
  );
}

export async function search() { "use server"; revalidatePath("/admin/packages"); }
export async function createPackage(formData: FormData) {
  "use server";
  const sb = getServiceClient();
  const payload = { name: String(formData.get("name")), price_lkr: Number(formData.get("price_lkr")||0) };
  const { error } = await sb.from("packages").insert(payload);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/packages");
}
export async function deletePackage(formData: FormData) {
  "use server";
  const sb = getServiceClient();
  const id = String(formData.get("id"));
  const { error } = await sb.from("packages").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/packages");
}
