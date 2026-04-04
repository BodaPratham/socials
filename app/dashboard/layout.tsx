import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

// This forces the layout to check the database on every request
// Preventing the "Stuck on Onboarding" cache bug
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // 1. Authenticate User
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // 2. Fetch Profile - using maybeSingle to prevent crash if row is missing
  const { data: profile } = await supabase
    .from('profiles')
    .select('c_username')
    .eq('id', user.id)
    .maybeSingle()

  /** * ONBOARDING OVERLAY
   * If the user doesn't have a c_username, we intercept the UI here.
   */
  if (!profile?.c_username) {
    return (
      <div className="h-screen bg-[#050507] flex items-center justify-center p-6 font-sans antialiased">
        {/* Background Aesthetic Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A855F7]/10 blur-[140px] rounded-full" />
        </div>

        <div className="max-w-md w-full bg-[#09090B]/60 backdrop-blur-2xl border border-white/5 p-12 rounded-[3.5rem] shadow-2xl text-center relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-[#A855F7] to-[#6366F1] rounded-[2rem] mx-auto mb-8 flex items-center justify-center text-4xl shadow-[0_0_40px_rgba(168,85,247,0.3)]">
            <span className="animate-pulse">✨</span>
          </div>
          
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic mb-3">Claim Your Handle</h1>
          <p className="text-zinc-500 text-[11px] mb-10 uppercase tracking-[0.3em] font-bold opacity-70">Create your unique bridge link</p>
          
          <form className="space-y-5">
             <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-500 font-bold text-sm tracking-tight">socials.me/</span>
                <input 
                  name="c_username" 
                  required 
                  autoFocus
                  className="w-full bg-black/40 border border-white/10 p-5 pl-[110px] rounded-[1.5rem] text-white font-bold focus:border-[#A855F7] outline-none transition-all placeholder:text-zinc-700"
                  placeholder="username"
                />
             </div>
             
             <button 
               formAction={async (formData: FormData) => {
                 'use server'
                 const supabase = await createClient()
                 const { data: { user } } = await supabase.auth.getUser()
                 const c_username = formData.get('c_username') as string
                 
                 if (!user || !c_username) return;

                 // Format: lowercase, remove spaces, no special chars
                 const cleanHandle = c_username.toLowerCase().trim().replace(/[^a-z0-9]/g, '');

                 const { error } = await supabase
                   .from('profiles')
                   .upsert({ id: user.id, c_username: cleanHandle })
                   
                 if (!error) {
                   // This is the key: clear the cache for the dashboard path
                   revalidatePath('/dashboard', 'layout')
                 }
               }}
               className="w-full bg-white text-black py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-[#A855F7] hover:text-white transition-all shadow-xl active:scale-[0.98]"
             >
               Launch My Bridge
             </button>
          </form>
          
          <p className="mt-8 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
            Identity setup is required
          </p>
        </div>
      </div>
    )
  }

  // 3. If c_username exists, render the dashboard normally
  return (
    <div className="antialiased selection:bg-[#A855F7]/30">
        {children}
    </div>
  )
}