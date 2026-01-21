'use client'

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'primary';
}

export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, variant = 'primary' }: ConfirmModalProps) {
  if (!isOpen) return null;

  const colorClass = variant === 'danger' ? 'border-rose-500/50 shadow-rose-500/20' : 'border-purple-500/50 shadow-purple-500/20';
  const btnClass = variant === 'danger' ? 'bg-rose-600 hover:bg-rose-500' : 'bg-purple-600 hover:bg-purple-500';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in">
      <div className={`bg-slate-900 w-full max-w-sm rounded-[2rem] border ${colorClass} shadow-2xl overflow-hidden animate-in zoom-in duration-200`}>
        <div className="p-8 text-center space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={onCancel}
              className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition-colors"
            >
              Batal
            </button>
            <button 
              onClick={() => {
                onConfirm();
                onCancel();
              }}
              className={`flex-1 py-3 rounded-xl text-white font-bold text-xs transition-all ${btnClass}`}
            >
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}