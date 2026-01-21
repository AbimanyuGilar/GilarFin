'use server'

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function addTransaction(prevState: any, formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Session expired" };

  const id = formData.get('id') as string;
  const payload = {
    user_id: user.id,
    amount: Number(formData.get('amount')),
    description: formData.get('description'),
    cathegory_id: formData.get('cathegory_id'),
    type: formData.get('type'),
    date: formData.get('date'),
  };

  const { error } = id 
    ? await supabase.from('transactions').update(payload).eq('id', id)
    : await supabase.from('transactions').insert([payload]);

  if (error) return { error: error.message };
  revalidatePath('/');
  return { success: true };
}

export async function deleteTransaction(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  await supabase.from('transactions').delete().eq('id', id);
  revalidatePath('/');
}

export async function addCathegory(prevState: any, formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Session expired" };

  const name = formData.get('name');
  const type = formData.get('type');

  const { error } = await supabase.from('cathegories').insert([{ name, type, user_id: user.id }]);
  if (error) return { error: error.message };
  revalidatePath('/');
  return { success: true };
}

export async function deleteCathegory(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { error } = await supabase.from('cathegories').delete().eq('id', id);
  if (error) return { error: "Cannot delete: Cathegory might be in use" };
  revalidatePath('/');
}