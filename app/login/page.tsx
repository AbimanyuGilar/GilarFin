import { login } from "../auth/actions";

// Tambahkan async di sini
export default async function LoginPage({ 
  searchParams 
}: { 
  searchParams: Promise<{ error?: string, message?: string }> 
}) {
  // Unwrapping searchParams (Wajib di Next.js 16)
  const { error, message } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form action={login} className="w-full max-w-sm space-y-4 rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-center text-blue-600">MASUK</h1>
        
        {/* Sekarang pakai variabel yang sudah di-await */}
        {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded-lg border border-red-100">{error}</p>}
        {message && <p className="text-blue-500 text-sm text-center font-medium bg-blue-50 p-2 rounded-lg border border-blue-100">{message}</p>}
        
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400">EMAIL</label>
          <input name="email" type="email" placeholder="email@contoh.com" required className="w-full rounded-lg border p-2 outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-400">PASSWORD</label>
          <input name="password" type="password" placeholder="••••••••" required className="w-full rounded-lg border p-2 outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        
        <button className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white hover:bg-blue-700 transition">
          LOGIN
        </button>
        
        <p className="text-center text-sm text-gray-500">
          Belum punya akun? <a href="/register" className="text-blue-600 font-bold hover:underline">Daftar</a>
        </p>
      </form>
    </div>
  );
}