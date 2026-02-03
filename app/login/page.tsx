import { login, signup } from '../auth/actions'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form className="w-full max-w-md space-y-4 rounded-lg bg-white p-8 shadow-md">
        <h1 className="text-2xl font-bold text-center">Join Socials</h1>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input name="email" type="email" required className="border p-2 rounded" />
        </div>
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium">Password</label>
          <input name="password" type="password" required className="border p-2 rounded" />
        </div>
        <button formAction={login} className="w-full bg-black text-white p-2 rounded hover:bg-gray-800">
          Log In
        </button>
        <button formAction={signup} className="w-full border border-black p-2 rounded hover:bg-gray-100">
          Sign Up
        </button>
      </form>
    </div>
  )
}