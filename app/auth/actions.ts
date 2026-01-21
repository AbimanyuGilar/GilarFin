'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(Promise.resolve(cookieStore) as any);

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect('/login?message=Gagal masuk: ' + error.message);
  }

  redirect('/');
}

export async function signup(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(Promise.resolve(cookieStore) as any);

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const origin = (await cookies()).get('origin')?.value || ''; // Optional: untuk email confirmation

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirect('/login?message=Gagal mendaftar: ' + error.message);
  }

  // Biasanya setelah signup sukses, arahkan ke halaman info atau langsung login
  redirect('/login?message=Cek email Anda untuk konfirmasi pendaftaran');
}

export async function signOut() {
  const cookieStore = await cookies();
  const supabase = createClient(Promise.resolve(cookieStore) as any);
  
  await supabase.auth.signOut();
  redirect('/login');
}