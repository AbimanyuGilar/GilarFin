import { signup } from "../auth/actions";

export default async function RegisterPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ error?: string }> 
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form action={signup} className="w-full max-w-sm space-y-4 rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-center text-green-600">DAFTAR</h1>
        
        {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>}
        
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400">EMAIL</label>
          <input name="email" type="email" required className="w-full rounded-lg border p-2 outline-none focus:ring-2 focus:ring-green-500" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400">PASSWORD</label>
          <input name="password" type="password" required className="w-full rounded-lg border p-2 outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        
        <button className="w-full rounded-lg bg-green-600 py-3 font-bold text-white hover:bg-green-700 transition">
          BUAT AKUN
        </button>

        <p className="text-center text-sm text-gray-500">
          Sudah punya akun? <a href="/login" className="text-green-600 font-bold hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
}