'use client'

import { useState, useTransition } from "react";
import { deleteTransaction } from "@/app/actions";
import Link from "next/link";
import ConfirmModal from "./ConfirmModal";

export default function TransactionItem({ t }: { t: any }) {
  const [isDeleting, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <div className={`flex items-center justify-between p-4 md:p-6 bg-slate-900/30 rounded-[2rem] border transition-all duration-300 ${
        isDeleting ? 'opacity-50 grayscale scale-95' : 'hover:scale-[1.01]'
      } ${t.type === 'income' ? 'border-emerald-500/20 hover:border-emerald-500/50' : 'border-rose-500/20 hover:border-rose-500/50'}`}>
        <div className="flex items-center gap-4 md:gap-6">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl ${
            t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
          }`}>
            {isDeleting ? "..." : (t.type === 'income' ? '↓' : '↑')}
          </div>
          <div>
            <p className="font-bold text-white text-sm md:text-lg leading-tight">{t.description || 'Tanpa keterangan'}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase mt-1 tracking-wider">
              <span className="text-purple-500/80">{t.cathegories?.name}</span> • {new Date(t.date).toLocaleDateString('id-ID')}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <p className={`font-mono font-bold text-xs md:text-xl ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {Number(t.amount).toLocaleString('id-ID')}
          </p>
          <div className="flex flex-col gap-2 border-l border-slate-800 pl-4">
            <Link 
              href={`?edit=true&id=${t.id}&amount=${t.amount}&desc=${t.description}&cat=${t.cathegory_id}&date=${t.date}&type=${t.type}`} 
              className="text-slate-600 hover:text-blue-400 text-xs transition-colors p-1"
            >✎</Link>
            <button 
              disabled={isDeleting}
              onClick={() => setShowConfirm(true)}
              className="text-slate-600 hover:text-rose-500 text-xs transition-colors p-1"
            >
              {isDeleting ? "..." : "✕"}
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal 
        isOpen={showConfirm}
        title="Hapus Transaksi"
        message="Apakah Anda yakin ingin menghapus data transaksi ini secara permanen?"
        variant="danger"
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => startTransition(() => deleteTransaction(t.id))}
      />
    </>
  );
}