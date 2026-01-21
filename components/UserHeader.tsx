'use client'

import { useState } from 'react'
import { signOut } from '@/app/auth/actions'

export default function UserHeader({ username }: { username: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* Tombol Profil & Nama */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 bg-slate-900/40 p-1 rounded-full border border-slate-800 
          cursor-pointer hover:bg-slate-800/60 transition-all duration-300 select-none
          ${isOpen ? 'pr-4' : 'pr-1'}
        `}
      >
        {/* Avatar */}
        <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-b from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-purple-400 font-bold uppercase text-xs shadow-inner flex-shrink-0">
          {username[0]}
        </div>

        {/* Username: Hanya muncul jika isOpen (baik di mobile maupun desktop) */}
        {isOpen && (
          <div className="flex flex-col animate-in fade-in slide-in-from-left-2 duration-300">
            <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-0.5">User</p>
            <p className="text-[10px] md:text-xs font-bold text-slate-200 truncate max-w-[80px] md:max-w-[120px]">
              {username}
            </p>
          </div>
        )}
      </div>

      {/* Dropdown Menu (Logout) */}
      {isOpen && (
        <>
          {/* Overlay klik di luar untuk menutup */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          
          <div className="absolute right-0 mt-3 w-40 bg-slate-900 border border-slate-800 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] z-20 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
            <form action={signOut} className="p-1.5">
              <button 
                type="submit"
                className="w-full text-center py-3 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                Keluar Aplikasi
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  )
}