import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function addTransaction(prevState: any, formData: FormData) {
  const cookieStore = await cookies();
  
  // PERBAIKAN: Bungkus cookieStore ke dalam Promise.resolve() 
  // agar cocok dengan tipe data yang diminta createClient
  const supabase = createClient(Promise.resolve(cookieStore) as any);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Sesi telah berakhir" };

  const amount = formData.get("amount");
  const type = formData.get("type");
  const cathegory_id = formData.get("cathegory_id");
  const description = formData.get("description");
  const date = formData.get("date");
  const id = formData.get("id"); // Untuk edit

  const payload = {
    user_id: user.id,
    amount: Number(amount),
    type,
    cathegory_id,
    description,
    date,
  };

  let error;
  if (id) {
    const { error: err } = await supabase.from("transactions").update(payload).eq("id", id);
    error = err;
  } else {
    const { error: err } = await supabase.from("transactions").insert([payload]);
    error = err;
  }

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

export async function deleteTransaction(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(Promise.resolve(cookieStore) as any);

  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
}

export async function addCathegory(prevState: any, formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(Promise.resolve(cookieStore) as any);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Sesi telah berakhir" };

  const name = formData.get("name");
  const type = formData.get("type");

  const { error } = await supabase.from("cathegories").insert([{
    user_id: user.id,
    name,
    type
  }]);

  if (error) return { error: error.message };

  revalidatePath("/");
  return { success: true };
}

export async function deleteCathegory(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(Promise.resolve(cookieStore) as any);

  const { error } = await supabase.from("cathegories").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/");
}