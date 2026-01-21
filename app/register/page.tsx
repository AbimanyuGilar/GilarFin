'use client'

import { signup } from "@/app/auth/actions";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function RegisterForm() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <form action={signup} className="flex flex-col gap-5 relative z-10">
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500 ml-4 uppercase tracking-widest">Email</label>
        <input 
          name="email" 
          type="email" 
          placeholder="name@email.com" 
          required 
          className="w-full p-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-700" 
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-500 ml-4 uppercase tracking-widest">Password</label>
        <input 
          name="password" 
          type="password" 
          placeholder="••••••••" 
          required 
          className="w-full p-4 bg-slate-950/50 border border-slate-800 rounded-2xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all placeholder:text-slate-700" 
        />
      </div>

      {message && (
        <div className="text-center text-xs font-bold text-blue-400 bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 animate-pulse">
          {message}
        </div>
      )}

      <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold text-white shadow-lg shadow-blue-500/25 transition-all active:scale-[0.98] mt-2">
        Daftar Sekarang
      </button>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020617] p-4 text-slate-200">
      <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-600/10 blur-[60px] -mr-16 -mt-16" />
        
        <div className="flex flex-col items-center gap-3 mb-10 relative z-10">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C12 3 13 8 18 10C13 11 12 16 12 16C12 16 11 11 6 10C11 8 12 3 12 3Z" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tighter text-white uppercase italic">
            Gilar<span className="text-blue-500">Fin</span>
          </h1>
        </div>

        <Suspense fallback={<div className="text-center text-slate-500 text-xs">Loading form...</div>}>
          <RegisterForm />
        </Suspense>

        <p className="text-center text-xs text-slate-500 mt-8 relative z-10">
          Sudah punya akun? <Link href="/login" className="text-blue-400 hover:text-blue-300 font-bold transition-colors">Login di sini</Link>
        </p>
      </div>
    </div>
  );
}