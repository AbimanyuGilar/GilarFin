'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

/**
 * Fungsi pembantu untuk inisialisasi Supabase.
 * Sekarang createClient() sudah async dan mengurus cookies sendiri,
 * jadi kita tinggal panggil tanpa argumen apapun.
 */
async function getSupabase() {
  return await createClient();
}

export async function login(formData: FormData) {
  const supabase = await getSupabase();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect('/login?message=Gagal masuk: ' + error.message);
  }

  return redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = await getSupabase();

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  // Karena ini Server Action, kita bisa panggil createClient() langsung
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // Sesuaikan origin jika Anda menggunakan redirect konfirmasi email
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return redirect('/login?message=Gagal mendaftar: ' + error.message);
  }

  return redirect('/login?message=Cek email Anda untuk konfirmasi pendaftaran');
}

export async function signOut() {
  const supabase = await getSupabase();
  
  await supabase.auth.signOut();
  return redirect('/login');
}