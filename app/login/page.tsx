import { login, signup } from '../auth/actions'

export default function LoginPage() {
  return (
    // 1. Full-screen background image with overlay for readability
    <div 
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4"
      style={{ 
        backgroundImage: `url('https://i.pinimg.com/1200x/a3/30/d4/a330d4fab5119b2649ca36f353ecd051.jpg')` 
      }}
    >
      {/* 2. Dark Overlay to make the card "pop" */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      {/* 3. The Premium Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 p-10 shadow-2xl backdrop-blur-2xl">
        
        {/* Top Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black tracking-tighter text-white mb-2">
            SOCIALS<span className="text-blue-500">.</span>
          </h1>
          <p className="text-sm font-light uppercase tracking-[0.2em] text-white/60">
            Elevate Your Presence
          </p>
        </div>

        <form className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <input 
              name="email" 
              type="email" 
              placeholder="Email Address"
              required 
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/10 transition-all" 
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <input 
              name="password" 
              type="password" 
              placeholder="Password"
              required 
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-white placeholder-white/40 outline-none focus:border-white/40 focus:bg-white/10 transition-all" 
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 space-y-4">
            <button 
              formAction={login} 
              className="w-full rounded-2xl bg-white py-4 font-bold text-black shadow-xl hover:bg-gray-200 active:scale-[0.98] transition-all"
            >
              Sign In
            </button>
            
            <button 
              formAction={signup} 
              className="w-full rounded-2xl border border-white/20 bg-transparent py-4 font-bold text-white hover:bg-white/10 active:scale-[0.98] transition-all"
            >
              Join the Club
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="mt-10 text-center">
          <a href="#" className="text-xs font-medium text-white/40 hover:text-white transition-colors">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  )
}