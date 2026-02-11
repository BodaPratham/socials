'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
// --- COMPLETE ICONSET TO PREVENT "NOT DEFINED" ERRORS ---
import { 
  Link2, ShoppingBag, Palette, BarChart3, Users, DollarSign, 
  Settings, Menu, Zap, ChevronDown, ChevronRight, Plus, 
  Trash2, Instagram, Youtube, Phone, Gift, Image as ImageIcon, 
  Play, Loader2, Camera, ExternalLink, GripVertical, Share2, 
  MoreHorizontal, CreditCard, Monitor, Sparkles, Globe,
  Check, LayoutGrid, Layers, Smartphone
} from 'lucide-react'

// ==========================================
// TYPES & INTERFACES (Mapped to your Schema)
// ==========================================
type LinkItem = {
  id?: string
  user_id?: string
  title: string
  url: string
  icon_type?: string
  is_active?: boolean
  position?: number
  type?: 'standard' | 'youtube' | 'tip'
}

type Profile = {
  id: string
  c_username: string
  bio: string
  avatar_url: string
  whatsapp_number: string
  insta_username: string
  upi_id: string
  theme_color?: string
}

export default function MasterArchitectureDashboard() {
  // --- DATABASE & REFS ---
  const supabase = createClient()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // --- NAVIGATION STATE ---
  const [activeTab, setActiveTab] = useState('links') 
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMyLinkOpen, setIsMyLinkOpen] = useState(true)

  // --- ENGINE STATE ---
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  // --- DATA STATE (With Null-Safety Fix) ---
  const [profile, setProfile] = useState<Profile>({
    id: '', 
    c_username: '', 
    bio: '', 
    avatar_url: '',
    whatsapp_number: '', 
    insta_username: '', 
    upi_id: '',
    theme_color: '#A855F7'
  })
  const [links, setLinks] = useState<LinkItem[]>([])

  // ==========================================
  // 1. DATA SYNCHRONIZATION (Fetch & Save)
  // ==========================================
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          // Fetch Profile
          const { data: pData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
          
          if (pData) {
            setProfile({
              id: pData.id ?? '',
              c_username: pData.c_username ?? '',
              bio: pData.bio ?? '',
              avatar_url: pData.avatar_url ?? '',
              whatsapp_number: pData.whatsapp_number ?? '',
              insta_username: pData.insta_username ?? '',
              upi_id: pData.upi_id ?? '',
              theme_color: pData.theme_color ?? '#A855F7'
            })
          }

          // Fetch Links
          const { data: lData } = await supabase
            .from('links')
            .select('*')
            .eq('user_id', user.id)
            .order('position', { ascending: true })
          
          if (lData) setLinks(lData)
        }
      } catch (err) {
        console.error("Fetch Error:", err)
      } finally {
        setInitialLoading(false)
      }
    }
    fetchAllData()
  }, [])

  const handleDeploy = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("No session found")

      // Update Profiles Table
      const { error: pError } = await supabase
        .from('profiles')
        .update({
          c_username: profile.c_username,
          bio: profile.bio,
          avatar_url: profile.avatar_url,
          whatsapp_number: profile.whatsapp_number,
          insta_username: profile.insta_username,
          upi_id: profile.upi_id,
          theme_color: profile.theme_color
        })
        .eq('id', user.id)

      if (pError) throw pError

      // Re-sync Links Table (Delete & Re-insert for clean order)
      await supabase.from('links').delete().eq('user_id', user.id)
      
      const linksToInsert = links.map((link, index) => ({
        user_id: user.id,
        title: link.title,
        url: link.url,
        position: index,
        is_active: true,
        icon_type: link.type || 'standard'
      }))

      const { error: lError } = await supabase.from('links').insert(linksToInsert)
      if (lError) throw lError

      alert("✅ Digital Architecture Successfully Deployed")
    } catch (err: any) {
      alert(`Deployment Failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  // ==========================================
  // 2. MEDIA UPLOAD LOGIC
  // ==========================================
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return
      
      setUploading(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Math.random()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      setProfile(prev => ({ ...prev, avatar_url: publicUrl }))
    } catch (err) {
      alert("Error uploading image. Check Supabase Storage permissions.")
    } finally {
      setUploading(false)
    }
  }

  // ==========================================
  // 3. UI TAB COMPONENTS
  // ==========================================
  
  const LinksTab = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Identity Card */}
      <section className="bg-white border border-zinc-100 p-10 rounded-[3rem] shadow-sm flex items-center gap-12">
        <div className="relative group">
          <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} hidden accept="image/*" />
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-32 h-32 bg-zinc-50 rounded-full border-2 border-dashed border-zinc-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-purple-500 transition-all"
          >
            {profile.avatar_url ? (
              <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Profile" />
            ) : (
              <ImageIcon size={32} className="text-zinc-200" />
            )}
            {uploading && <div className="absolute inset-0 bg-white/80 flex items-center justify-center"><Loader2 className="animate-spin text-purple-600" /></div>}
          </div>
          <div className="absolute bottom-1 right-1 p-2.5 bg-zinc-900 text-white rounded-full border-4 border-white shadow-lg cursor-pointer"><Camera size={14} /></div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Handle</label>
            <input value={profile.c_username} onChange={e => setProfile({...profile, c_username: e.target.value})} placeholder="@username" className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold text-sm focus:ring-2 focus:ring-purple-500/5 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Bio</label>
            <input value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} placeholder="Describe yourself..." className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold text-sm focus:ring-2 focus:ring-purple-500/5 outline-none" />
          </div>
        </div>
      </section>

      {/* Social Bar */}
      <section className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm grid grid-cols-3 gap-6">
        <div className="relative"><Instagram size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300"/><input value={profile.insta_username} onChange={e => setProfile({...profile, insta_username: e.target.value})} placeholder="Instagram" className="w-full pl-12 p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-xs font-bold outline-none" /></div>
        <div className="relative"><Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300"/><input value={profile.whatsapp_number} onChange={e => setProfile({...profile, whatsapp_number: e.target.value})} placeholder="WhatsApp" className="w-full pl-12 p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-xs font-bold outline-none" /></div>
        <div className="relative"><DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300"/><input value={profile.upi_id} onChange={e => setProfile({...profile, upi_id: e.target.value})} placeholder="UPI ID" className="w-full pl-12 p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-xs font-bold outline-none" /></div>
      </section>

      {/* Node Builder */}
      <div className="space-y-4">
        {links.map((link, index) => (
          <div key={index} className="bg-white border border-zinc-100 p-6 rounded-[2.5rem] flex items-center gap-6 group hover:shadow-md transition-all">
            <div className="cursor-grab text-zinc-200 group-hover:text-zinc-400"><GripVertical size={20} /></div>
            <div className={`p-4 rounded-2xl ${link.type === 'youtube' ? 'bg-red-50 text-red-500' : 'bg-zinc-50 text-zinc-300'}`}>
              {link.type === 'youtube' ? <Play size={22} fill="currentColor" /> : <Link2 size={22} />}
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4">
              <input value={link.title} onChange={e => { const nl = [...links]; nl[index].title = e.target.value; setLinks(nl); }} placeholder="Label" className="font-black text-sm uppercase outline-none" />
              <input value={link.url} onChange={e => { const nl = [...links]; nl[index].url = e.target.value; setLinks(nl); }} placeholder="URL" className="bg-zinc-50 p-3 rounded-xl text-xs font-medium text-zinc-500 outline-none" />
            </div>
            <button onClick={() => setLinks(links.filter((_, i) => i !== index))} className="p-3 text-zinc-200 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
          </div>
        ))}
        
        {/* Buttons */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <button onClick={() => setLinks([...links, { title: 'New Link', url: '', type: 'standard' }])} className="p-6 border-2 border-dashed border-zinc-100 rounded-[2.5rem] text-zinc-400 hover:text-purple-600 hover:border-purple-600 transition-all flex flex-col items-center gap-2">
            <Plus size={24} /><span className="font-black uppercase tracking-widest text-[10px]">Add Node</span>
          </button>
          <button onClick={() => setLinks([...links, { title: 'New Video', url: '', type: 'youtube' }])} className="p-6 border-2 border-dashed border-zinc-100 rounded-[2.5rem] text-zinc-400 hover:text-red-500 hover:border-red-500 transition-all flex flex-col items-center gap-2">
            <Youtube size={24} /><span className="font-black uppercase tracking-widest text-[10px]">Add Video</span>
          </button>
          <button onClick={() => setLinks([...links, { title: 'Support Me', url: '', type: 'tip' }])} className="p-6 border-2 border-dashed border-zinc-100 rounded-[2.5rem] text-zinc-400 hover:text-orange-500 hover:border-orange-500 transition-all flex flex-col items-center gap-2">
            <Gift size={24} /><span className="font-black uppercase tracking-widest text-[10px]">Add Tip</span>
          </button>
        </div>
      </div>
    </div>
  )

  const ShopTab = () => (
    <div className="h-[500px] flex flex-col items-center justify-center animate-in slide-in-from-bottom-5 duration-500">
      <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-200 mb-6"><ShoppingBag size={48} /></div>
      <h2 className="text-2xl font-black uppercase tracking-tighter text-zinc-900">Marketplace Engine</h2>
      <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.3em] mt-2">Coming Soon: Monetize your nodes</p>
    </div>
  )

  const DesignTab = () => (
    <div className="h-[500px] flex flex-col items-center justify-center animate-in slide-in-from-bottom-5 duration-500">
      <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-200 mb-6"><Palette size={48} /></div>
      <h2 className="text-2xl font-black uppercase tracking-tighter text-zinc-900">Visual Studio</h2>
      <p className="text-zinc-400 text-xs font-bold uppercase tracking-[0.3em] mt-2">Coming Soon: Custom Branding</p>
    </div>
  )

  // ==========================================
  // 4. FINAL RENDER
  // ==========================================

  if (initialLoading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#050507] text-white">
      <Loader2 className="animate-spin text-purple-600 mb-4" size={32} />
      <span className="font-black uppercase tracking-[0.5em] text-[10px]">Architecture Loading</span>
    </div>
  )

  return (
    <div className="flex h-screen bg-[#050507] text-[#E4E4E7] font-sans overflow-hidden">
      
      {/* SIDEBAR (10%) */}
      <aside className={`transition-all duration-500 bg-[#09090B] border-r border-white/5 flex flex-col ${isCollapsed ? 'w-20' : 'w-[10%] min-w-[260px]'}`}>
        <div className="p-8 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-2xl shadow-purple-500/20"><Zap size={20} className="text-white fill-white" /></div>
              <span className="font-black tracking-tighter uppercase text-xl italic">Socials</span>
            </div>
          )}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 text-zinc-500 hover:bg-white/5 rounded-lg transition-all"><Menu size={20} /></button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <button onClick={() => setIsMyLinkOpen(!isMyLinkOpen)} className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${isMyLinkOpen ? 'bg-white/5 text-white' : 'text-zinc-500 hover:bg-white/5'}`}>
            <div className="flex items-center gap-4">
              <Link2 size={20} className={isMyLinkOpen ? 'text-purple-500' : ''}/>
              {!isCollapsed && <span className="text-[11px] font-bold uppercase tracking-widest">My Linktree</span>}
            </div>
            {!isCollapsed && <ChevronDown size={14} className={isMyLinkOpen ? '' : '-rotate-90 transition-transform'}/>}
          </button>
          
          {!isCollapsed && isMyLinkOpen && (
            <div className="ml-10 mt-2 border-l border-white/5 flex flex-col gap-1">
              <button onClick={() => setActiveTab('links')} className={`p-3 text-[10px] font-black uppercase tracking-widest text-left pl-8 transition-all ${activeTab === 'links' ? 'text-purple-500 bg-purple-500/5' : 'text-zinc-500 hover:text-white'}`}>Links</button>
              <button onClick={() => setActiveTab('shop')} className={`p-3 text-[10px] font-black uppercase tracking-widest text-left pl-8 transition-all ${activeTab === 'shop' ? 'text-purple-500 bg-purple-500/5' : 'text-zinc-500 hover:text-white'}`}>Shop</button>
              <button onClick={() => setActiveTab('design')} className={`p-3 text-[10px] font-black uppercase tracking-widest text-left pl-8 transition-all ${activeTab === 'design' ? 'text-purple-500 bg-purple-500/5' : 'text-zinc-500 hover:text-white'}`}>Design</button>
            </div>
          )}

          {['Earnings', 'Audience', 'Insights'].map(item => (
            <button key={item} className="w-full flex items-center gap-4 p-4 text-zinc-500 rounded-2xl hover:bg-white/5 hover:text-white transition-all">
              <BarChart3 size={20} />{!isCollapsed && <span className="text-[11px] font-bold uppercase tracking-widest">{item}</span>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button className="flex items-center gap-4 p-3 text-zinc-500 hover:text-white transition-all w-full">
            <Settings size={20} />{!isCollapsed && <span className="text-[11px] font-bold uppercase tracking-widest">Settings</span>}
          </button>
        </div>
      </aside>

      {/* WORKSPACE (70%) */}
      <main className="w-[70%] overflow-y-auto p-16 bg-[#FDFDFD] text-zinc-900">
        <div className="max-w-4xl mx-auto space-y-10 pb-32">
          <header className="flex justify-between items-end">
            <div className="space-y-3">
              <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">Architecture</h1>
              <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.5em] ml-1">Live Engine / {activeTab}</p>
            </div>
            <button onClick={handleDeploy} disabled={loading} className="px-12 py-5 bg-zinc-900 text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] hover:bg-purple-600 transition-all shadow-2xl active:scale-95 disabled:opacity-50">
              {loading ? 'Deploying...' : 'Deploy Changes'}
            </button>
          </header>

          <hr className="border-zinc-100" />

          <div className="min-h-[600px]">
            {activeTab === 'links' && <LinksTab />}
            {activeTab === 'shop' && <ShopTab />}
            {activeTab === 'design' && <DesignTab />}
          </div>
        </div>
      </main>

      {/* PREVIEW (20%) */}
      <aside className="w-[20%] bg-white border-l border-zinc-100 flex flex-col items-center justify-center p-8 relative">
        <div className="relative w-full max-w-[280px] scale-[0.85] origin-center">
          {/* iPhone Frame */}
          <div className="relative aspect-[9/19.2] bg-[#0F0F0F] rounded-[3.8rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-[10px] border-[#1c1c1e]">
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20" />
            
            {/* Screen Content */}
            <div className="h-full w-full bg-white rounded-[2.8rem] overflow-hidden flex flex-col relative">
              <div className="absolute top-0 w-full h-32 bg-zinc-50 border-b border-zinc-100" />
              <div className="relative flex-1 overflow-y-auto pt-16 px-6 pb-12 flex flex-col items-center no-scrollbar">
                
                <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden mb-5 shrink-0 z-10">
                  {profile.avatar_url ? (
                    <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <div className="w-full h-full bg-zinc-50 flex items-center justify-center text-zinc-200"><ImageIcon size={24} /></div>
                  )}
                </div>

                <h3 className="font-black text-zinc-900 text-sm tracking-tighter uppercase">@{profile.c_username || 'username'}</h3>
                <p className="text-[10px] text-zinc-400 font-bold text-center mt-2 px-4 uppercase tracking-widest leading-loose line-clamp-2">
                  {profile.bio || 'Digital Architect'}
                </p>
                
                <div className="flex gap-5 my-8 text-zinc-300">
                  <Instagram size={14} className={profile.insta_username ? 'text-black' : ''} />
                  <Phone size={14} className={profile.whatsapp_number ? 'text-black' : ''} />
                  <DollarSign size={14} className={profile.upi_id ? 'text-black' : ''} />
                </div>

                <div className="w-full space-y-3.5">
                  {links.map((link, i) => (
                    <div key={i} className="w-full p-4 rounded-2xl border border-zinc-100 bg-white text-[10px] font-black uppercase tracking-widest text-zinc-900 shadow-sm text-center transition-all hover:scale-105 active:scale-95 cursor-pointer">
                      {link.title || 'Untitled Node'}
                    </div>
                  ))}
                  {links.length === 0 && (
                    <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-zinc-50 rounded-[2.5rem] opacity-20">
                      <Zap size={24} className="mb-2" />
                      <span className="text-[8px] font-black uppercase">Nodes Pending</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white px-5 py-2.5 rounded-full border border-zinc-100 shadow-lg whitespace-nowrap">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
             <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Live Architecture</span>
          </div>
        </div>
        
        {/* Fixed Quick Actions */}
        <div className="absolute top-10 right-10 flex flex-col gap-4">
          <button className="p-4 bg-white border border-zinc-200 rounded-2xl text-zinc-300 hover:text-black shadow-sm transition-all hover:scale-110"><Share2 size={20} /></button>
          <button className="p-4 bg-white border border-zinc-200 rounded-2xl text-zinc-300 hover:text-black shadow-sm transition-all hover:scale-110"><Globe size={20} /></button>
        </div>
      </aside>
    </div>
  )
}