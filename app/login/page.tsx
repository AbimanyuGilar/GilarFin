'use client'

import { login } from "@/app/auth/actions";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <form action={login} className="flex flex-col gap-5 relative z-10">
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500 ml-4 uppercase tracking-widest">Email Address</label>
        <input 
          name="email" 
          type="email" 
          placeholder="name@email.com" 
          required 
          className="w-full p-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all placeholder:text-slate-700" 
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500 ml-4 uppercase tracking-widest">Password</label>
        <input 
          name="password" 
          type="password" 
          placeholder="••••••••" 
          required 
          className="w-full p-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all placeholder:text-slate-700" 
        />
      </div>

      {message && (
        <div className="text-center text-xs font-bold text-rose-400 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20 animate-pulse">
          {message}
        </div>
      )}

      <button className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl font-bold text-white shadow-lg shadow-purple-500/25 transition-all active:scale-[0.98] mt-2">
        Masuk Sekarang
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] p-4 text-slate-200">
      <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[60px] -mr-16 -mt-16" />
        
        {/* Logo Image Branding */}
        <div className="flex flex-col items-center gap-3 mb-10 relative z-10">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg shadow-purple-500/20 border border-slate-700 bg-slate-950">
            <img 
              src="/GilarFin.png" 
              alt="GilarFin Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-white uppercase italic">
            Gilar<span className="text-purple-500">Fin</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold">Finance Management</p>
        </div>

        <Suspense fallback={<div className="text-center text-slate-600 text-xs">Memuat Form...</div>}>
          <LoginForm />
        </Suspense>

        <p className="text-center text-xs text-slate-500 mt-8 relative z-10">
          Belum punya akun? <Link href="/register" className="text-purple-400 hover:text-purple-300 font-bold transition-colors">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}