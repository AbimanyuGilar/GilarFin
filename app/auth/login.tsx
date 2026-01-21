import { login } from './actions'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form className="p-8 border rounded-lg shadow-md w-96 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Login</h1>
        <input name="email" type="email" placeholder="Email" required className="p-2 border rounded" />
        <input name="password" type="password" placeholder="Password" required className="p-2 border rounded" />
        <button formAction={login} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Log In
        </button>
        <p className="text-sm">
          Belum punya akun? <a href="/register" className="text-blue-500">Daftar di sini</a>
        </p>
      </form>
    </div>
  )
}