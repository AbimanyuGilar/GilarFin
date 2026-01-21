'use client'

import { useActionState, useEffect } from "react";
import { addTransaction } from "@/app/actions";
import { useSearchParams, useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

function TombolUpdate() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2">
      {pending ? <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : "Perbarui Data"}
    </button>
  );
}

export default function EditTransactionModal({ cathegories }: { cathegories: any[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isOpen = searchParams.get('edit') === 'true';
  const [state, formAction] = useActionState(addTransaction, null);

  useEffect(() => {
    if (state?.success) router.push('/');
  }, [state, router]);

  if (!isOpen) return null;

  const type = searchParams.get('type') || 'expense';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 w-full max-w-md rounded-[2.5rem] border border-purple-500/50 shadow-2xl overflow-hidden animate-in zoom-in">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-bold text-purple-400 uppercase tracking-widest">Ubah Transaksi</h2>
            <button onClick={() => router.push('/')} className="text-slate-500 hover:text-white transition-colors text-xl font-bold">✕</button>
          </div>

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="id" value={searchParams.get('id') || ''} />
            <input type="hidden" name="type" value={type} />
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase">Jumlah</label>
              <input name="amount" type="number" defaultValue={searchParams.get('amount') || ''} required 
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:border-purple-500" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase">Kategori</label>
              <select name="cathegory_id" defaultValue={searchParams.get('cat') || ''} required 
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:border-purple-500">
                {cathegories.filter(c => c.type === type).map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase">Keterangan</label>
              <input name="description" defaultValue={searchParams.get('desc') || ''} 
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:border-purple-500" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 ml-2 uppercase">Tanggal</label>
              <input name="date" type="date" defaultValue={searchParams.get('date') || ''} required 
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white outline-none focus:border-purple-500 [color-scheme:dark]" />
            </div>

            <div className="pt-2">
              <TombolUpdate />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}