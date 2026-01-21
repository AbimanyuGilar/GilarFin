import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import TransactionForm from "@/components/TransactionForm";
import CathegoryForm from "@/components/CathegoryForm";
import TransactionItem from "@/components/TransactionItem";
import EditTransactionModal from "@/components/EditTransactionModal";
import UserHeader from "@/components/UserHeader";

export default async function Page() {
  // Inisialisasi Supabase Client (Async - Next.js 16)
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const username = user.email?.split('@')[0] || "User";

  // Fetch data kategori dan transaksi secara paralel
  const [catRes, transRes] = await Promise.all([
    supabase
      .from('cathegories')
      .select('*')
      .order('name', { ascending: true }),
    supabase
      .from('transactions')
      .select('*, cathegories(name)')
      .order('date', { ascending: false })
      .order('created_at', { ascending: false })
  ]);

  const cathegories = catRes.data || [];
  const transactions = transRes.data || [];

  // Kalkulasi Ringkasan Keuangan
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const balance = income - expense;

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-4 md:p-8 font-sans selection:bg-purple-500/30">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
        
        {/* HEADER BRANDING */}
        <div className="flex justify-between items-center px-2">
          <div className="flex items-center gap-2 md:gap-3">
            {/* Logo Image GilarFin.png */}
            <div className="w-10 h-10 rounded-lg overflow-hidden shadow-lg shadow-purple-500/20 border border-slate-800 bg-slate-900">
              <img 
                src="/GilarFin.png" 
                alt="GilarFin Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white uppercase italic">
              Gilar<span className="text-purple-500">Fin</span>
            </h1>
          </div>
          
          <UserHeader username={username} />
        </div>

        {/* SUMMARY CARD */}
        <header className="relative p-6 md:p-12 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-2">
              Total Saldo
            </p>
            <h1 className={`text-4xl md:text-6xl font-bold tracking-tight ${balance >= 0 ? 'text-white' : 'text-rose-500'}`}>
              <span className="opacity-40 text-xl md:text-2xl mr-2 font-light font-mono">Rp</span>
              {balance.toLocaleString("id-ID")}
            </h1>
          </div>
          
          {/* GRID PEMASUKAN & PENGELUARAN */}
          <div className="grid grid-cols-2 gap-3 mt-8 relative z-10">
            <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <p className="text-[10px] font-bold text-emerald-500/70 uppercase mb-1 tracking-wide">Pemasukan</p>
              <p className="text-lg md:text-xl font-bold text-emerald-400 truncate font-mono">
                +{income.toLocaleString("id-ID")}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20">
              <p className="text-[10px] font-bold text-rose-500/70 uppercase mb-1 tracking-wide">Pengeluaran</p>
              <p className="text-lg md:text-xl font-bold text-rose-400 truncate font-mono">
                -{expense.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </header>

        {/* FORMS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <TransactionForm cathegories={cathegories} />
          <CathegoryForm cathegories={cathegories} />
        </div>

        {/* HISTORY */}
        <section className="space-y-4 pb-24">
          <div className="flex items-center gap-4 ml-4">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">Riwayat Transaksi</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-slate-800 to-transparent"></div>
          </div>

          <div className="grid gap-3">
            {transactions.length === 0 ? (
              <div className="py-20 text-center border-2 border-dashed border-slate-900 rounded-[2.5rem]">
                <p className="text-slate-600 text-sm uppercase tracking-widest font-medium">Belum ada transaksi</p>
              </div>
            ) : (
              transactions.map((t) => (
                <TransactionItem key={t.id} t={t} />
              ))
            )}
          </div>
        </section>

      </div>

      <EditTransactionModal cathegories={cathegories} />
    </main>
  );
}