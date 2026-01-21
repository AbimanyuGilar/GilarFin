'use client'

import { useActionState, useState, useTransition } from "react";
import { addCathegory, deleteCathegory } from "@/app/actions";
import { useFormStatus } from "react-dom";
import ConfirmModal from "./ConfirmModal";

function TombolKategori() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-2xl text-white font-bold transition-all disabled:bg-slate-800 flex items-center justify-center min-w-[80px]">
      {pending ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : "TAMBAH"}
    </button>
  );
}

export default function CathegoryForm({ cathegories }: { cathegories: any[] }) {
  const [state, formAction] = useActionState(addCathegory, null);
  const [selectedType, setSelectedType] = useState<'income' | 'expense'>('expense');
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleting, startTransition] = useTransition();
  
  // State untuk modal konfirmasi
  const [confirmData, setConfirmData] = useState<{show: boolean, id: string | null}>({ show: false, id: null });

  return (
    <div className="space-y-4">
      <button onClick={() => setIsVisible(!isVisible)} className={`w-full py-4 rounded-3xl font-bold text-xs tracking-widest border-2 transition-all ${isVisible ? 'bg-slate-900 border-slate-700 text-slate-500' : 'bg-slate-900 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.1)]'}`}>
        {isVisible ? "TUTUP KATEGORI" : "TAMBAH KATEGORI"}
      </button>

      {isVisible && (
        <div className="bg-slate-900/80 p-6 rounded-[2.5rem] border border-cyan-500/30 backdrop-blur-xl animate-in zoom-in">
          <form action={formAction} className="space-y-4 mb-6">
            <div className="flex p-1 bg-slate-950 rounded-2xl border border-slate-800">
              <button type="button" onClick={() => setSelectedType('expense')} className={`flex-1 py-2 text-[10px] font-bold rounded-xl ${selectedType === 'expense' ? 'bg-rose-600 text-white' : 'text-slate-500'}`}>PENGELUARAN</button>
              <button type="button" onClick={() => setSelectedType('income')} className={`flex-1 py-2 text-[10px] font-bold rounded-xl ${selectedType === 'income' ? 'bg-emerald-600 text-white' : 'text-slate-500'}`}>PEMASUKAN</button>
            </div>
            <input type="hidden" name="type" value={selectedType} />
            <div className="flex gap-2">
              <input name="name" placeholder="Nama Kategori..." required className="flex-1 p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white text-sm outline-none focus:border-cyan-500" />
              <TombolKategori />
            </div>
          </form>

          <div className="space-y-2">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Kategori Aktif</p>
            <div className="flex flex-wrap gap-2">
              {cathegories.map(c => (
                <div key={c.id} className="flex items-center gap-2 px-3 py-1 bg-slate-950 border border-slate-800 rounded-full group">
                  <span className={`text-[10px] font-bold ${c.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>{c.name}</span>
                  <button 
                    disabled={isDeleting}
                    onClick={() => setConfirmData({ show: true, id: c.id })} 
                    className="text-slate-700 hover:text-rose-500 text-[10px] font-bold transition-colors"
                  >✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <ConfirmModal 
        isOpen={confirmData.show}
        title="Hapus Kategori"
        message="Menghapus kategori ini tidak dapat dibatalkan. Pastikan tidak ada transaksi yang menggunakan kategori ini."
        variant="danger"
        onCancel={() => setConfirmData({ show: false, id: null })}
        onConfirm={() => {
          if (confirmData.id) startTransition(() => deleteCathegory(confirmData.id!));
        }}
      />
    </div>
  );
}