import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'

export default async function PublicProfile(props: { params: Promise<{ username: string }> }) {
  const params = await props.params;
  const username = params.username;
  const supabase = await createClient()

  // 1. Fetch Profile
  // Change the query to look at c_username
const { data: profile } = await supabase
.from('profiles')
.select('*')
.eq('c_username', username) // 'username' here comes from the URL params
.single()

  if (!profile) notFound()

  // 2. Fetch Links
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', profile.id)
    .order('created_at', { ascending: false })

  const tid = profile.template_id || 'midnight';

  // Template Style Map
  const styles: Record<string, any> = {
    midnight: {
      bg: "bg-[#0A0505]",
      card: "bg-[#1A1010] border-white/5 hover:border-[#FF4D00]",
      text: "text-white",
      accent: "text-[#FF4D00]",
      font: "font-sans"
    },
    coder: {
      bg: "bg-[#0D0D0D] border-t-[12px] border-[#10B981]",
      card: "bg-[#161B22] border-[#30363D] hover:border-[#10B981] font-mono",
      text: "text-[#C9D1D9]",
      accent: "text-[#10B981]",
      font: "font-mono",
      prefix: "> "
    },
    doctor: {
      bg: "bg-[#F8FAFC]",
      card: "bg-white border-slate-200 shadow-sm hover:shadow-md text-slate-800",
      text: "text-slate-900",
      accent: "text-cyan-600",
      font: "font-sans"
    },
    vlogger: {
      bg: "bg-black",
      card: "bg-zinc-900 border-zinc-800 hover:scale-[1.03] italic uppercase",
      text: "text-white",
      accent: "text-red-600",
      font: "font-black"
    },
    designer: {
      bg: "bg-[#050505] bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:20px_20px]",
      card: "bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 rounded-none rotate-[-1deg] hover:rotate-0",
      text: "text-white",
      accent: "text-fuchsia-500",
      font: "font-serif"
    },
    legal: {
      bg: "bg-[#111827]",
      card: "bg-[#1F2937] border-amber-900/30 text-amber-100 serif tracking-wide",
      text: "text-amber-50",
      accent: "text-amber-500",
      font: "font-serif"
    },
    chef: {
      bg: "bg-[#FAF7F2]",
      card: "bg-transparent border-b-2 border-dashed border-orange-200 text-orange-950 rounded-none hover:bg-orange-50",
      text: "text-orange-950",
      accent: "text-orange-700",
      font: "font-serif"
    },
    gamer: {
      bg: "bg-[#020205] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]",
      card: "bg-black border-purple-500/50 hover:shadow-[0_0_15px_#A855F7] text-purple-400 skew-x-[-10deg]",
      text: "text-white",
      accent: "text-purple-500",
      font: "font-mono"
    },
    athlete: {
      bg: "bg-[#EAB308]",
      card: "bg-black text-white italic border-none hover:translate-x-2",
      text: "text-black",
      accent: "text-black underline",
      font: "font-black"
    },
    writer: {
      bg: "bg-[#FCFBF7]",
      card: "bg-transparent border-none text-stone-800 underline decoration-stone-300 hover:decoration-stone-800",
      text: "text-stone-900",
      accent: "text-stone-500",
      font: "font-serif"
    }
  };

  const s = styles[tid] || styles.midnight;

  return (
    <div className={`min-h-screen ${s.bg} ${s.text} ${s.font} flex flex-col items-center p-8 transition-colors duration-500`}>
      
      {/* Profile Header */}
      <div className="mt-12 flex flex-col items-center text-center">
        {tid === 'coder' && <div className="text-[10px] opacity-40 mb-2">// Initializing profile...</div>}
        
        <div className={`w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black shadow-2xl mb-6 overflow-hidden 
          ${tid === 'midnight' ? 'bg-[#FF4D00]' : 'bg-gradient-to-tr from-zinc-700 to-zinc-900'}
          ${tid === 'doctor' ? 'border-4 border-cyan-100 shadow-none' : ''}
          ${tid === 'gamer' ? 'border-2 border-purple-500 shadow-[0_0_20px_purple]' : ''}
        `}>
          {profile.avatar_url ? (
             <img src={profile.avatar_url} alt={username} className="w-full h-full object-cover" />
          ) : username[0].toUpperCase()}
        </div>

        <h1 className={`text-3xl font-black tracking-tighter ${tid === 'athlete' ? 'italic uppercase' : ''}`}>
          {tid === 'coder' && <span className="text-[#10B981]">const</span>} @{username}
        </h1>
        
        <p className={`mt-3 max-w-xs text-sm opacity-70 leading-relaxed ${tid === 'writer' ? 'italic' : ''}`}>
          {profile.bio || "Digital Creator"}
        </p>
      </div>

      {/* Links Grid */}
      <div className="w-full max-w-[450px] mt-12 space-y-4">
        {links?.map((link: any) => (
          <a 
            key={link.id} 
            href={link.url} 
            target="_blank" 
            className={`group block w-full p-5 rounded-2xl text-center font-bold transition-all duration-300 border ${s.card}`}
          >
            {s.prefix}{link.title}
          </a>
        ))}
      </div>
      
      {/* Footer / UPI */}
      {profile.upi_id && (
        <div className={`mt-12 text-center text-[10px] font-bold uppercase tracking-widest opacity-50`}>
          Support via UPI: <span className={s.accent}>{profile.upi_id}</span>
        </div>
      )}

      {tid === 'coder' && (
        <div className="fixed bottom-4 right-4 text-[10px] font-mono opacity-20">
          Status: 200 OK | Build: Stable
        </div>
      )}
    </div>
  )
}