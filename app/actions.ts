'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addTransaction(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Sesi telah berakhir" };

  const payload = {
    user_id: user.id,
    amount: Number(formData.get("amount")),
    type: formData.get("type"),
    cathegory_id: formData.get("cathegory_id"),
    description: formData.get("description"),
    date: formData.get("date"),
  };

  const id = formData.get("id");
  const { error } = id 
    ? await supabase.from("transactions").update(payload).eq("id", id)
    : await supabase.from("transactions").insert([payload]);

  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function deleteTransaction(id: string) {
  const supabase = await createClient();
  await supabase.from("transactions").delete().eq("id", id);
  revalidatePath("/");
}

export async function addCathegory(prevState: any, formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Sesi telah berakhir" };

  const { error } = await supabase.from("cathegories").insert([{
    user_id: user.id,
    name: formData.get("name"),
    type: formData.get("type")
  }]);

  if (error) return { error: error.message };
  revalidatePath("/");
  return { success: true };
}

export async function deleteCathegory(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("cathegories").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/");
}