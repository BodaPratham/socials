import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { Instagram, Phone, DollarSign, ShoppingBag, ChevronRight, Play } from 'lucide-react'

export default async function PublicProfile(props: { params: Promise<{ username: string }> }) {
  const params = await props.params;
  const username = params.username;
  const supabase = await createClient()

  // 1. Fetch Profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('c_username', username)
    .single()

  if (!profile) notFound()

  // 2. Fetch Links (Ordered by position)
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', profile.id)
    .order('position', { ascending: true })

  // 3. Fetch Products (For Shop Blocks)
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', profile.id)

  const tid = profile.template_id || 'midnight';

  // Hardcoded Template Styles
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
      card: "bg-[#161B22] border-[#30363D] hover:border-[#10B981]",
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
    gamer: {
      bg: "bg-[#020205] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]",
      card: "bg-black border-purple-500/50 hover:shadow-[0_0_15px_#A855F7] text-purple-400 skew-x-[-10deg]",
      text: "text-white",
      accent: "text-purple-500",
      font: "font-mono"
    }
  };

  // 4. Fetch Custom/Marketplace Template if not in hardcoded list
  let customStyleConfig = null;
  if (!styles[tid]) {
    const { data: templateData } = await supabase
      .from('templates')
      .select('config')
      .eq('id', tid)
      .single()
    if (templateData) customStyleConfig = templateData.config;
  }

  // Apply either hardcoded style or dynamic custom style
  const s = styles[tid] || {
    bg: `bg-[${customStyleConfig?.bg_color || '#ffffff'}]`,
    text: `text-[${customStyleConfig?.text_color || '#000000'}]`,
    card: "bg-white/10 backdrop-blur-md border-white/20",
    accent: "text-purple-500",
    font: "font-sans"
  };

  // Helper for YouTube
  const getYouTubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
    const match = url.match(regExp)
    return (match && match[2].length === 11) ? match[2] : null
  }

  return (
    <div className={`min-h-screen ${s.bg} ${s.text} ${s.font} flex flex-col items-center p-8 transition-colors duration-500`}>
      
      {/* Profile Header */}
      <div className="mt-12 flex flex-col items-center text-center">
        <div className={`w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black shadow-2xl mb-6 overflow-hidden border-4 border-white/10
          ${tid === 'midnight' ? 'bg-[#FF4D00]' : 'bg-gradient-to-tr from-zinc-700 to-zinc-900'}
          ${tid === 'gamer' ? 'border-2 border-purple-500 shadow-[0_0_20px_purple]' : ''}
        `}>
          {profile.avatar_url ? (
             <img src={profile.avatar_url} alt={username} className="w-full h-full object-cover" />
          ) : username[0].toUpperCase()}
        </div>

        <h1 className={`text-3xl font-black tracking-tighter`}>
          @{username}
        </h1>
        
        <p className={`mt-3 max-w-xs text-sm opacity-70 leading-relaxed`}>
          {profile.bio || "Digital Creator"}
        </p>

        {/* Social Icons Row */}
        <div className="flex gap-6 mt-6 opacity-80">
          {profile.insta_username && (
            <a href={`https://instagram.com/${profile.insta_username}`} target="_blank" className="hover:scale-110 transition-transform">
              <Instagram size={20} />
            </a>
          )}
          {profile.whatsapp_number && (
            <a href={`https://wa.me/${profile.whatsapp_number}`} target="_blank" className="hover:scale-110 transition-transform">
              <Phone size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Dynamic Blocks Grid */}
      <div className="w-full max-w-[450px] mt-12 space-y-4">
        {links?.map((link: any) => {
          
          // --- YOUTUBE BLOCK ---
          if (link.type === 'youtube') {
            const vid = getYouTubeID(link.url);
            if (!vid) return null;
            return (
              <div key={link.id} className={`w-full overflow-hidden rounded-[2rem] border shadow-sm ${s.card}`}>
                <iframe className="w-full aspect-video" src={`https://www.youtube.com/embed/${vid}`} frameBorder="0" allowFullScreen />
                <div className="p-4 text-[10px] font-black uppercase text-center opacity-70">{link.title}</div>
              </div>
            )
          }

          // --- SHOP BLOCK ---
          if (link.type === 'shop') {
            const product = products?.find(p => p.id === link.url);
            return (
              <a key={link.id} href={product?.destination_url || '#'} target="_blank" className={`flex items-center gap-4 p-3 rounded-[2rem] border transition-all hover:scale-[1.02] ${s.card}`}>
                <div className="w-16 h-16 bg-white/10 rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {product?.image_url ? <img src={product.image_url} className="w-full h-full object-cover" /> : <ShoppingBag size={20} />}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[11px] font-black uppercase">{product?.name || link.title}</div>
                  <div className={`text-[10px] font-bold mt-1 ${s.accent}`}>
                    {product?.product_type === 'digital' ? 'Download' : 'Buy Now'} — ${product?.price || '0.00'}
                  </div>
                </div>
                <div className="pr-4 opacity-30"><ChevronRight size={16} /></div>
              </a>
            )
          }

          // --- DIVIDER ---
          if (link.type === 'divider') {
            return <div key={link.id} className="w-full h-px bg-white/10 my-6" />
          }

          // --- STANDARD LINK ---
          return (
            <a 
              key={link.id} 
              href={link.url} 
              target="_blank" 
              className={`group block w-full p-5 rounded-2xl text-center font-bold transition-all duration-300 border ${s.card}`}
            >
              {s.prefix}{link.title}
            </a>
          )
        })}
      </div>
      
      {/* Payment / UPI Footer */}
      {profile.upi_id && (
        <div className={`mt-12 text-center text-[10px] font-bold uppercase tracking-widest opacity-40 flex flex-col items-center gap-2`}>
          <div className="flex items-center gap-2">
            <DollarSign size={12} className={s.accent} /> 
            Support this creator
          </div>
          <span className={`px-4 py-1 rounded-full border border-white/10 ${s.accent}`}>{profile.upi_id}</span>
        </div>
      )}

      {/* Branding */}
      <div className="mt-20 opacity-20 text-[9px] font-black uppercase tracking-[0.3em]">
        Built with Digital Architecture
      </div>
    </div>
  )
}