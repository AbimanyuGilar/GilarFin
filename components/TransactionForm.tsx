'use client'

import { useActionState, useState, useEffect } from "react";
import { addTransaction } from "@/app/actions";
import { useSearchParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

function TombolSimpan({ tipe }: { tipe: 'income' | 'expense' }) {
  const { pending } = useFormStatus();
  return (
    <button 
      disabled={pending} 
      className={`w-full py-4 rounded-2xl font-bold text-white transition-all active:scale-95 shadow-lg flex items-center justify-center gap-3 ${
        pending ? 'bg-slate-800 cursor-not-allowed' : (tipe === 'expense' ? 'bg-rose-600 hover:bg-rose-500' : 'bg-emerald-600 hover:bg-emerald-500')
      }`}
    >
      {pending ? (
        <>
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span>Menyimpan...</span>
        </>
      ) : (
        <span>Simpan Transaksi</span>
      )}
    </button>
  );
}

export default function TransactionForm({ cathegories }: { cathegories: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [state, formAction] = useActionState(addTransaction, null);
  const [selectedType, setSelectedType] = useState<'income' | 'expense'>('expense');
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="space-y-4">
      <button 
        onClick={() => setIsVisible(!isVisible)} 
        className={`w-full py-4 rounded-3xl font-bold text-xs tracking-widest border-2 transition-all ${
          isVisible ? 'bg-slate-900 border-slate-700 text-slate-500' : 'bg-slate-900 border-purple-500/50 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
        }`}
      >
        {isVisible ? "TUTUP FORM" : "TAMBAH TRANSAKSI"}
      </button>

      {isVisible && (
        <form action={formAction} className="bg-slate-900/80 p-6 rounded-[2.5rem] border border-purple-500/30 backdrop-blur-xl space-y-4 animate-in slide-in-from-top-4">
          <div className="flex p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
            <button type="button" onClick={() => setSelectedType('expense')}
              className={`flex-1 py-2 text-[10px] font-bold rounded-xl transition-all ${selectedType === 'expense' ? 'bg-rose-600 text-white shadow-lg' : 'text-slate-500'}`}>
              PENGELUARAN
            </button>
            <button type="button" onClick={() => setSelectedType('income')}
              className={`flex-1 py-2 text-[10px] font-bold rounded-xl transition-all ${selectedType === 'income' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500'}`}>
              PEMASUKAN
            </button>
          </div>
          <input type="hidden" name="type" value={selectedType} />
          <div className="grid grid-cols-2 gap-4">
            <input name="amount" type="number" placeholder="Jumlah" required className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:border-purple-500 transition-colors" />
            <select name="cathegory_id" required className="p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:border-purple-500 transition-colors">
              <option value="">Kategori</option>
              {cathegories.filter(c => c.type === selectedType).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <input name="description" placeholder="Keterangan" className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:border-purple-500 transition-colors" />
          <input name="date" type="date" required className="w-full p-3 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:border-purple-500 [color-scheme:dark]" defaultValue={new Date().toISOString().split('T')[0]} />
          
          <TombolSimpan tipe={selectedType} />
          {state?.error && <p className="text-rose-500 text-[10px] font-bold text-center p-2">{state.error}</p>}
        </form>
      )}
    </div>
  );
}