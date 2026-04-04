"use client";

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Sparkles, ArrowRight, Github, Mail, Globe, Zap, Heart } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({ 
          email, 
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        })
        if (error) throw error
        alert('Check your email for the confirmation link!')
      }
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOAuth = async (provider: 'github' | 'google') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      }
    })
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden font-montserrat text-white">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] -z-10 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 blur-[100px] -z-10 rounded-full" />

      {/* Header Logo */}
      <div className="mb-10 animate-fade-up">
         <img src="/logo-white.png" alt="Socials" className="h-10 w-auto" />
      </div>

      <div className="w-full max-w-[400px] bg-white/[0.03] border border-white/5 p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl animate-fade-up">
        
        <div className="flex flex-col items-center mb-10 text-center">
           <h1 className="text-2xl font-black syne-font tracking-tight mb-2">
             {isLogin ? 'Login' : 'Create Account'}
           </h1>
           <p className="text-sm font-medium text-slate-500">
             {isLogin ? 'Welcome back! Please enter your details.' : 'Join 10,000+ creators on Socials.'}
           </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:border-purple-500 outline-none transition-all font-bold"
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 ml-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/5 text-white placeholder:text-white/20 focus:border-purple-500 outline-none transition-all font-bold"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 rounded-xl bg-white text-black font-black text-xs uppercase tracking-[0.2em] hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? 'Wait...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[9px] font-bold uppercase tracking-widest">
              <span className="bg-[#0b0b0b] px-3 text-slate-600">OR</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleOAuth('github')}
              className="flex items-center justify-center gap-3 py-4 border border-white/5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            >
              <Github size={18} className="text-white" />
            </button>
            <button
              onClick={() => handleOAuth('github')}
              className="flex items-center justify-center gap-3 py-4 border border-white/5 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
            >
               <Mail size={18} className="text-white" />
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-[11px]">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-bold text-purple-500 hover:text-purple-400 transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Log in"}
          </button>
        </div>
      </div>
      
      {/* Footer Branding */}
      <div className="mt-20 flex items-center gap-6 opacity-20">
         <div className="flex items-center gap-2 text-white">
            <Zap size={14} fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Protocol v0.8</span>
         </div>
         <div className="w-[1px] h-3 bg-white" />
         <div className="flex items-center gap-2 text-white">
            <Heart size={14} fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Built for Creators</span>
         </div>
      </div>
    </div>
  )
}