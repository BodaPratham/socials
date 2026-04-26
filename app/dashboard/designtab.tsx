"use client";

import React, { useState, useEffect } from "react";
import { 
  ChevronRight, 
  ChevronLeft, 
  Zap, 
  Grid,
  Type,
  LayoutGrid,
  Image as ImageIcon,
  MousePointer2,
  Palette,
  Layout,
  PlaySquare,
  Upload,
  Image as IconImage
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

type ViewState = 'main' | 'theme' | 'wallpaper' | 'buttons' | 'text' | 'colors' | 'header' | 'layout' | 'portfolio';

export default function DesignTab({ 
  profile, 
  setProfile, 
  templates = [], 
  handleApplyTheme,
  panelBg = 'rgba(255,255,255,0.03)',
  panelBorder = 'rgba(255,255,255,0.08)',
  dashBtn = '#A855F7',
  dashBtnText = '#FFFFFF'
}: any) {
  const [activeView, setActiveView] = useState<ViewState>('main');
  const [uploading, setUploading] = useState(false);
  const logoRef = React.useRef<HTMLInputElement>(null);
  const bgRef = React.useRef<HTMLInputElement>(null);
  const promoRef = React.useRef<HTMLInputElement>(null);
  
  const supabase = createClient();

  const config = profile?.design_config || {};

  const [selectedTheme, setSelectedTheme] = useState(config.theme || 'Minimal');
  const [wallpaperStyle, setWallpaperStyle] = useState(config.wallpaperStyle || 'Fill');
  const [bgColor, setBgColor] = useState(config.bgColor || '#F8F8F8');
  const [buttonStyle, setButtonStyle] = useState(config.buttonStyle || 'Solid');
  const [buttonRoundness, setButtonRoundness] = useState(config.buttonRoundness || 'Round');
  const [buttonShadow, setButtonShadow] = useState(config.buttonShadow || 'None');
  const [btnColor, setBtnColor] = useState(config.btnColor || '#FFFFFF');
  const [btnTextColor, setBtnTextColor] = useState(config.btnTextColor || '#000000');
  const [pageFont, setPageFont] = useState(config.pageFont || 'Montserrat');
  const [pageTextColor, setPageTextColor] = useState(config.pageTextColor || '#111111');
  const [altTitleFont, setAltTitleFont] = useState(config.altTitleFont || false);
  const [titleColor, setTitleColor] = useState(config.titleColor || '#000000');
  const [titleSize, setTitleSize] = useState(config.titleSize || 'Small');

  const updateDesign = async (key: string, value: any) => {
    if (key === 'template_id') {
      setProfile((prev: any) => ({ ...prev, template_id: value }));
      if (!profile?.id) return;
      await supabase
        .from('profiles')
        .update({ template_id: value })
        .eq('id', profile.id);
      return;
    }

    const newConfig = { ...(profile.design_config || {}), [key]: value };
    setProfile((prev: any) => ({ ...prev, design_config: newConfig }));

    if (!profile?.id) return;
    await supabase
      .from('profiles')
      .update({ design_config: newConfig })
      .eq('id', profile.id);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'bg' | 'promo') => {
    const file = e.target.files?.[0];
    if (!file || !profile?.id) return;
    
    setUploading(true);
    try {
      const path = `${type === 'logo' ? 'logos' : type === 'bg' ? 'wallpapers' : 'promos'}/${profile.id}-${Date.now()}`;
      const { data, error } = await supabase.storage.from('avatars').upload(path, file);
      
      if (error) throw error;
      
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path);
      updateDesign(type === 'logo' ? 'logoUrl' : type === 'bg' ? 'bgImage' : 'promoBannerUrl', publicUrl);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Upload failed. Make sure the 'avatars' bucket is public.");
    } finally {
      setUploading(false);
    }
  };

  const HeaderControls = ({ title, onBack }: any) => (
    <div className="flex justify-between items-center mb-10 mt-2 px-2">
      <div className="flex items-center gap-4">
         <button onClick={onBack} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition text-white">
            <ChevronLeft size={20} />
         </button>
         <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
    </div>
  );

  const DesignItem = ({ icon: Icon, label, value, onClick, premium }: any) => (
    <button 
      onClick={onClick} 
      className="w-full border p-4 pr-6 py-[18px] rounded-[1.8rem] flex items-center justify-between shadow-sm transition group hover:bg-white/[0.02]" 
      style={{ backgroundColor: panelBg, borderColor: panelBorder }}
    >
      <div className="flex items-center gap-[18px]">
        <div className="w-[52px] h-[52px] bg-white/[0.05] flex items-center justify-center rounded-[1.2rem] shrink-0 ml-1 group-hover:bg-white/[0.1] transition-colors">
          <Icon size={22} className="text-white/70 group-hover:text-white transition-colors" />
        </div>
        <span className="text-[15px] font-bold text-white/90">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        {premium && <Zap size={14} className="text-purple-400 fill-purple-400" />}
        <span className="text-[14px] font-bold text-zinc-500 uppercase tracking-tight">{value}</span>
        <ChevronRight size={18} className="text-zinc-600 group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );

  const ColorInput = ({ label, value, onChange }: any) => (
    <div className="space-y-2">
       <span className="text-[11px] font-black uppercase tracking-widest text-zinc-500 ml-1">{label}</span>
       <div className="flex items-center justify-between border-2 border-white/10 rounded-3xl p-5 bg-white/5 hover:border-white/20 transition-all">
          <input 
            type="text" value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="bg-transparent border-none outline-none text-white font-bold uppercase w-full"
          />
          <input 
            type="color" value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 rounded-full cursor-pointer bg-transparent border-none"
          />
       </div>
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto pb-32 pt-6 pl-2 pr-6 animate-in fade-in duration-500">
       
       {activeView === 'main' && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 px-2">
          
          <div className="space-y-4">
            <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500 ml-1">Theme</h3>
            <button 
              onClick={() => setActiveView('theme')}
              className="w-full rounded-[2.2rem] p-8 flex items-center justify-between group hover:scale-[0.99] transition-all overflow-hidden relative shadow-2xl h-[140px]"
              style={{ backgroundColor: bgColor }}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
              <div 
                className="w-[110px] h-[180px] rounded-t-[2rem] rounded-b-xl absolute -bottom-[40px] left-10 p-5 shadow-2xl border border-white/10 flex flex-col items-start pt-[20px] backdrop-blur-md"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              >
                 <span className="text-[32px] font-black tracking-tighter leading-none mb-1" style={{ color: pageTextColor }}>Aa</span>
                 <div className="w-full h-10 rounded-lg mt-auto mb-4" style={{ backgroundColor: btnColor }} />
              </div>
              <div className="flex items-center gap-2 absolute right-10 font-black text-[16px] uppercase tracking-widest" style={{ color: pageTextColor }}>
                <span>{selectedTheme}</span>
                <ChevronRight size={24} />
              </div>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6 pl-1">
               <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500">Customize theme</h3>
               <button 
                 onClick={() => {
                     const colors = [
                        { bg: '#0F172A', btn: '#3B82F6', text: '#FFFFFF' },
                        { bg: '#111111', btn: '#FFFFFF', text: '#FFFFFF' },
                        { bg: '#F2EFE8', btn: '#000000', text: '#111111' },
                        { bg: '#4C1D95', btn: '#8B5CF6', text: '#FFFFFF' },
                     ];
                     const c = colors[Math.floor(Math.random() * colors.length)];
                     updateDesign('bgColor', c.bg);
                     updateDesign('btnColor', c.btn);
                     updateDesign('pageTextColor', c.text);
                     setBgColor(c.bg); setBtnColor(c.btn); setPageTextColor(c.text);
                 }}
                 className="flex items-center gap-2 px-6 py-3 bg-white rounded-full text-[12px] font-black uppercase tracking-widest text-zinc-900 shadow-xl hover:scale-105 transition active:scale-95"
               >
                  <Grid size={14} /> Shuffle
               </button>
            </div>
            
            <div className="space-y-4">

              <DesignItem icon={Layout} label="Layout" value={profile.template_id?.split('-').join(' ') || 'Minimal'} onClick={() => setActiveView('layout')} />
              {profile.template_id === 'creator-pro' && (
                <DesignItem 
                  icon={Grid} 
                  label="Portfolio Content" 
                  value="Configure" 
                  onClick={() => setActiveView('portfolio')} 
                  premium
                />
              )}
              {profile.template_id === 'cafe-restaurant' && (
                 <DesignItem 
                   icon={LayoutGrid} 
                   label="Menu Management" 
                   value="Configure" 
                   onClick={() => setActiveView('portfolio')} 
                   premium
                 />
              )}
              {profile.template_id === 'brand-commerce' && (
                 <DesignItem 
                   icon={Grid} 
                   label="Gallery Management" 
                   value="Configure" 
                   onClick={() => setActiveView('portfolio')} 
                   premium
                 />
              )}
              <DesignItem icon={Type} label="Header" value={titleSize} onClick={() => setActiveView('header')} />
              <DesignItem icon={ImageIcon} label="Wallpaper" value={wallpaperStyle} onClick={() => setActiveView('wallpaper')} />
              <DesignItem icon={MousePointer2} label="Buttons" value={buttonStyle} onClick={() => setActiveView('buttons')} />
              <DesignItem icon={Type} label="Text" value={pageFont} onClick={() => setActiveView('text')} />
              <DesignItem icon={Palette} label="Colors" value="Custom" onClick={() => setActiveView('colors')} />
            </div>
          </div>
        </div>
       )}

       {/* THEME VIEW */}
       {activeView === 'theme' && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
           <HeaderControls title="Theme" onBack={() => setActiveView('main')} />
           <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-2">
             {templates.map((tpl: any) => {
                const isPremium = tpl.price > 0 || tpl.category === 'Pro';
                return (
                <button
                  key={tpl.id}
                  onClick={() => {
                     if (isPremium) {
                         alert("This theme is a premium feature. Please upgrade to unlock.");
                         return;
                     }
                     handleApplyTheme && handleApplyTheme(tpl);
                     setSelectedTheme(tpl.name);
                  }}
                  className={`group relative flex flex-col items-center gap-4 transition-all ${
                    profile.template_id === tpl.id ? 'scale-105' : 'opacity-70 hover:opacity-100 hover:scale-[1.02]'
                  }`}
                >
                  <div className={`w-full aspect-[4/5] rounded-[2.5rem] border-4 transition-all overflow-hidden relative shadow-2xl flex items-center justify-center ${
                    profile.template_id === tpl.id ? 'border-purple-500 p-1' : 'border-white/5'
                  } ${isPremium ? 'opacity-50 grayscale hover:grayscale-0 hover:opacity-100' : ''}`} style={{ backgroundColor: tpl.config?.bgColor || '#111' }}>
                    
                    {isPremium && (
                       <div className="absolute top-4 right-4 px-2.5 py-1.5 bg-black/80 backdrop-blur-md rounded-full flex items-center gap-1.5 border border-white/20 z-20 shadow-xl">
                          <Zap size={10} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                          <span className="text-[8px] font-black uppercase tracking-widest text-white">PRO</span>
                       </div>
                    )}

                    <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">
                       {/* Subtle depth gradient */}
                       <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                       
                       <span className="text-5xl font-black tracking-tighter relative z-10 mb-6 drop-shadow-md" style={{ 
                         color: tpl.config?.pageTextColor || '#fff',
                         fontFamily: tpl.config?.pageFont || 'inherit'
                       }}>Aa</span>

                       <div className="w-16 h-5 relative z-10 shadow-xl border border-white/5" style={{ 
                         backgroundColor: tpl.config?.btnColor || 'rgba(255,255,255,0.2)',
                         borderRadius: tpl.config?.buttonRoundness === 'Square' ? '4px' : 
                                       tpl.config?.buttonRoundness === 'Round' ? '8px' : 
                                       tpl.config?.buttonRoundness === 'Rounder' ? '12px' : '24px'
                       }} />
                    </div>
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">{tpl.name}</span>
                </button>
             )})}
           </div>
        </div>
       )}

       {/* WALLPAPER VIEW */}
       {activeView === 'wallpaper' && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 px-2 space-y-10">
           <HeaderControls title="Wallpaper" onBack={() => setActiveView('main')} />
           <div className="space-y-6">
              <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500 ml-1">Wallpaper Style</h3>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {[
                  { id: 'Fill', className: 'bg-[#8B3DFF]', label: 'Fill' },
                  { id: 'Gradient', className: 'bg-gradient-to-br from-[#8B3DFF] to-[#3B82F6]', label: 'Gradient' },
                  { id: 'Blur', className: 'bg-[#8B3DFF]', label: 'Blur', isBlur: true },
                  { id: 'Pattern', className: 'bg-[#9b51e0]', label: 'Pattern', pro: true, isPattern: true },
                ].map(style => (
                  <div key={style.id} className="flex flex-col items-center gap-3 shrink-0">
                    <button 
                      onClick={() => { setWallpaperStyle(style.label); updateDesign('wallpaperStyle', style.label); }}
                      className={`w-24 h-24 rounded-3xl relative overflow-hidden transition-all ${wallpaperStyle === style.label ? 'border-4 border-white' : 'border-2 border-white/5 hover:border-white/20'} ${style.className}`}
                    >
                      {style.isBlur && <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />}
                      {style.pro && <div className="absolute top-2 right-2 w-5 h-5 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white"><Zap size={12} fill="currentColor" strokeWidth={0} /></div>}
                    </button>
                    <span className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest">{style.label}</span>
                  </div>
                ))}
              </div>
              <ColorInput label="Background Color" value={bgColor} onChange={(val: string) => { setBgColor(val); updateDesign('bgColor', val); }} />
               
               <div className="pt-6">
                  <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500 ml-1 mb-4">Custom Wallpaper</h3>
                  <button 
                    onClick={() => bgRef.current?.click()}
                    className="w-full h-40 rounded-[2.5rem] border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-all group overflow-hidden relative"
                  >
                    {config.bgImage ? (
                      <>
                        <img src={config.bgImage} className="absolute inset-0 w-full h-full object-cover opacity-40" />
                        <div className="relative z-10 flex flex-col items-center gap-2">
                           <Upload size={24} className="text-white" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-white">Replace Image</span>
                        </div>
                      </>
                    ) : (
                      <>
                         <div className="p-4 bg-white/5 rounded-2xl text-zinc-500 group-hover:text-white transition-colors">
                            <Upload size={24} />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Upload custom background</span>
                      </>
                    )}
                  </button>
                  {config.bgImage && (
                    <button 
                      onClick={() => updateDesign('bgImage', null)}
                      className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-red-500/60 hover:text-red-500 transition-colors ml-4"
                    >
                      Remove Wallpaper
                    </button>
                  )}
               </div>
            </div>
        </div>
       )}

       {/* BUTTONS VIEW */}
       {activeView === 'buttons' && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 px-2 space-y-10">
           <HeaderControls title="Buttons" onBack={() => setActiveView('main')} />
           <div className="space-y-8">
              <div className="space-y-4">
                 <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500">Style</h3>
                 <div className="grid grid-cols-3 gap-3">
                   {['Solid', 'Glass', 'Outline'].map(id => (
                     <button 
                       key={id} onClick={() => { setButtonStyle(id); updateDesign('buttonStyle', id); }}
                       className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${buttonStyle === id ? 'border-white bg-white/10' : 'border-white/5 bg-white/5'}`}
                     >
                       <div className={`w-full h-8 rounded-lg ${id === 'Solid' ? 'bg-white' : id === 'Glass' ? 'bg-white/20 border border-white/20' : 'border-2 border-white'}`} />
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/70">{id}</span>
                     </button>
                   ))}
                 </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500">Roundness</h3>
                 <div className="grid grid-cols-4 gap-3">
                    {['Square', 'Round', 'Rounder', 'Full'].map(id => (
                      <button 
                        key={id} onClick={() => { setButtonRoundness(id); updateDesign('buttonRoundness', id); }}
                        className={`py-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${buttonRoundness === id ? 'border-white bg-white/10' : 'border-white/5 bg-white/5'}`}
                      >
                         <div className={`w-8 h-8 border-t-2 border-l-2 border-white ${id === 'Square' ? '' : id === 'Round' ? 'rounded-md' : id === 'Rounder' ? 'rounded-xl' : 'rounded-full'}`} />
                         <span className="text-[9px] font-black uppercase tracking-widest text-white/50">{id}</span>
                      </button>
                    ))}
                 </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500">Shadow</h3>
                 <div className="grid grid-cols-4 gap-3">
                    {['None', 'Soft', 'Strong', 'Hard'].map(id => (
                      <button 
                        key={id} onClick={() => { setButtonShadow(id); updateDesign('buttonShadow', id); }}
                        className={`py-4 rounded-2xl border-2 transition-all flex items-center justify-center ${buttonShadow === id ? 'border-white bg-white/10' : 'border-white/5 bg-white/5'}`}
                      >
                         <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{id}</span>
                      </button>
                    ))}
                 </div>
              </div>

              <ColorInput label="Button Color" value={btnColor} onChange={(val: string) => { setBtnColor(val); updateDesign('btnColor', val); }} />
              <ColorInput label="Button Text" value={btnTextColor} onChange={(val: string) => { setBtnTextColor(val); updateDesign('btnTextColor', val); }} />
           </div>
        </div>
       )}

       {/* TEXT VIEW */}
       {activeView === 'text' && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 px-2 space-y-10">
           <HeaderControls title="Typography" onBack={() => setActiveView('main')} />
           <div className="space-y-4">
              <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500">Page Font</h3>
              <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Inter:wght@400;700;900&family=Space+Grotesk:wght@400;700&family=Outfit:wght@400;700;900&family=Plus+Jakarta+Sans:wght@400;700&family=Syne:wght@400;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,400;0,700;0,900;1,400&family=Lora:ital,wght@0,400..700;1,400..700&family=Bebas+Neue&family=Clash+Display:wght@400;500;600;700&family=Roboto:wght@400;700;900&family=Lato:wght@400;700;900&family=Open+Sans:wght@400;700;800&family=Oswald:wght@400;700&family=Raleway:wght@400;700;900&family=Ubuntu:wght@400;700&family=Nunito:wght@400;700;900&family=Merriweather:ital,wght@0,400;0,700;0,900&display=swap" rel="stylesheet" />
              <div className="grid grid-cols-1 gap-3">
                 {[
                    'Montserrat', 'Inter', 'Space Grotesk', 'Outfit', 
                    'Plus Jakarta Sans', 'Syne', 'Playfair Display', 
                    'Poppins', 'Lora', 'Bebas Neue', 'Clash Display',
                    'Roboto', 'Lato', 'Open Sans', 'Oswald', 
                    'Raleway', 'Ubuntu', 'Nunito', 'Merriweather'
                 ].map(font => (
                    <button 
                      key={font} onClick={() => { setPageFont(font); updateDesign('pageFont', font); }}
                      className={`w-full p-6 rounded-3xl border-2 flex items-center justify-between transition-all ${pageFont === font ? 'border-white bg-white/10 shadow-lg' : 'border-white/5 bg-white/5 hover:bg-white/[0.08]'}`}
                      style={{ fontFamily: font }}
                    >
                       <span className="text-lg text-white">{font}</span>
                       <span className="text-xs text-zinc-500">The quick brown fox</span>
                    </button>
                 ))}
              </div>
           </div>
           <ColorInput label="Text Color" value={pageTextColor} onChange={(val: string) => { setPageTextColor(val); updateDesign('pageTextColor', val); }} />
        </div>
       )}

       {/* COLORS VIEW */}
       {activeView === 'colors' && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 px-2 space-y-10">
           <HeaderControls title="Preset Colors" onBack={() => setActiveView('main')} />
           <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Midnight', bg: '#0F172A', btn: '#3B82F6', text: '#FFFFFF' },
                { name: 'Sunset', bg: '#7C2D12', btn: '#F97316', text: '#FFFFFF' },
                { name: 'Forest', bg: '#064E3B', btn: '#10B981', text: '#FFFFFF' },
                { name: 'Lavender', bg: '#4C1D95', btn: '#8B5CF6', text: '#FFFFFF' },
                { name: 'Minimal', bg: '#F8F8F8', btn: '#000000', text: '#111111' },
                { name: 'Dark Mode', bg: '#000000', btn: '#FFFFFF', text: '#FFFFFF' },
                { name: 'Cyberpunk', bg: '#000000', btn: '#FF00FF', text: '#00FFFF' },
                { name: 'Royal Gold', bg: '#1A1A1A', btn: '#FFD700', text: '#FFFFFF' },
                { name: 'Soft Peach', bg: '#FFF5F5', btn: '#FF8A8A', text: '#4A4A4A' },
                { name: 'Neon Night', bg: '#0D0D0D', btn: '#39FF14', text: '#FFFFFF' },
              ].map(scheme => (
                <button 
                  key={scheme.name}
                  onClick={() => {
                    setBgColor(scheme.bg); setBtnColor(scheme.btn); setPageTextColor(scheme.text);
                    updateDesign('bgColor', scheme.bg); updateDesign('btnColor', scheme.btn); updateDesign('pageTextColor', scheme.text);
                  }}
                  className="p-6 bg-white/5 border border-white/5 rounded-3xl flex flex-col gap-4 hover:border-white/20 transition-all group"
                >
                  <div className="flex gap-2">
                    <div className="w-10 h-10 rounded-full border border-white/10" style={{ backgroundColor: scheme.bg }} />
                    <div className="w-10 h-10 rounded-full border border-white/10" style={{ backgroundColor: scheme.btn }} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/80">{scheme.name}</span>
                </button>
              ))}
           </div>

           {/* CUSTOM COLORS SECTION */}
           <div className="mt-16 pt-16 border-t border-white/5 space-y-10">
              <div className="flex items-center gap-4 mb-4">
                 <Palette size={20} className="text-purple-400" />
                 <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500">Custom Colors</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <ColorInput label="Background" value={bgColor} onChange={(val: string) => { setBgColor(val); updateDesign('bgColor', val); }} />
                 <ColorInput label="Button Color" value={btnColor} onChange={(val: string) => { setBtnColor(val); updateDesign('btnColor', val); }} />
                 <ColorInput label="Button Text" value={btnTextColor} onChange={(val: string) => { setBtnTextColor(val); updateDesign('btnTextColor', val); }} />
                 <ColorInput label="Page Text" value={pageTextColor} onChange={(val: string) => { setPageTextColor(val); updateDesign('pageTextColor', val); }} />
              </div>
           </div>
        </div>
       )}

       {/* HEADER VIEW */}
       {activeView === 'header' && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300 px-2 space-y-10">
           <HeaderControls title="Header" onBack={() => setActiveView('main')} />
           <div className="space-y-6">
              <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500">Title Size</h3>
              <div className="grid grid-cols-3 gap-3">
                 {['Small', 'Medium', 'Large'].map(size => (
                    <button 
                      key={size} onClick={() => { setTitleSize(size); updateDesign('titleSize', size); }}
                      className={`py-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 ${titleSize === size ? 'border-white bg-white/10' : 'border-white/5 bg-white/5'}`}
                    >
                       <span className={`font-black uppercase tracking-widest text-white ${size === 'Small' ? 'text-xs' : size === 'Medium' ? 'text-lg' : 'text-2xl'}`}>Aa</span>
                       <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">{size}</span>
                    </button>
                 ))}
              </div>
           </div>

           <div className="p-8 bg-white/5 rounded-[2.8rem] border border-white/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6">Header Style</p>
              <div className="space-y-4">
                 <button className="w-full p-5 bg-white rounded-3xl flex items-center justify-between text-black font-black text-xs uppercase tracking-widest">
                    Classic Centered
                    <div className="w-2 h-2 rounded-full bg-black" />
                 </button>
                 <button className="w-full p-5 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between text-white/40 font-black text-xs uppercase tracking-widest">
                    Minimal Left
                 </button>
              </div>
           </div>
        </div>
       )}

       {/* LAYOUT VIEW */}
       {activeView === 'layout' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 px-2 space-y-10">
             <HeaderControls title="Layout" onBack={() => setActiveView('main')} />
             <div className="space-y-4">
                {[
                  { id: 'minimal-modern', name: 'Minimal Modern', desc: 'Sleek architectural design', free: true },
                  { id: 'creator-pro', name: 'Creator Pro', desc: 'Bold professional focus', free: false },
                  { id: 'cafe-restaurant', name: 'Cafe & Restaurant', desc: 'Classic dining and cafe aesthetic', free: true },
                  { id: 'dhurndhar', name: 'Dhurndhar', desc: 'Creative portfolio for personal creator', free: false },
                  { id: 'brand-commerce', name: 'Brand & Commerce', desc: 'Optimized for products & sales', free: false }
                ].map(l => (
                  <button 
                    key={l.id} 
                    onClick={() => {
                        if (!l.free) {
                           alert("This layout is a premium layout. Please upgrade to unlock.");
                           return;
                        }
                        updateDesign('template_id', l.id);
                    }}
                    className={`w-full p-10 rounded-[2.8rem] border-4 text-left transition-all relative overflow-hidden ${profile.template_id === l.id ? 'border-purple-500 bg-purple-500/10 shadow-2xl scale-[1.02]' : 'border-white/5 bg-white/5 hover:bg-white/[0.08]'} ${!l.free ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                  >
                    {!l.free && (
                       <div className="absolute top-6 right-8 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full flex items-center gap-2 border border-white/10">
                          <Zap size={12} className="text-purple-400 fill-purple-400" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-white">PREMIUM</span>
                       </div>
                    )}
                    <span className="text-xl font-black uppercase tracking-widest text-white">{l.name}</span>
                    <p className="text-[11px] font-bold text-zinc-600 uppercase tracking-tight mt-2">{l.desc}</p>
                  </button>
                ))}
             </div>
          </div>
       )}

        {/* PORTFOLIO CONTENT VIEW */}
       {activeView === 'portfolio' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300 px-2 space-y-10 pb-20">
             <HeaderControls 
               title={
                 profile.template_id === 'creator-pro' ? "Portfolio Content" : 
                 profile.template_id === 'cafe-restaurant' ? "Menu Management" : 
                 profile.template_id === 'brand-commerce' ? "Gallery Management" : "Content Management"
               } 
               onBack={() => setActiveView('main')} 
             />
             
             {/* CREATOR PRO SECTIONS */}
             {profile.template_id === 'creator-pro' && (
               <>
                 {/* HERO SECTION */}
                 <div className="space-y-6">
                    <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500 ml-1">Hero Details</h3>
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Headline</span>
                          <input 
                            type="text" 
                            value={config.heroHeadline || ""} 
                            onChange={(e) => updateDesign('heroHeadline', e.target.value)}
                            placeholder="e.g. I'm Oliver Scott"
                            className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white font-bold placeholder:opacity-20 outline-none focus:border-purple-500 transition-all"
                          />
                       </div>
                       <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Subheadline</span>
                          <input 
                            type="text" 
                            value={config.heroSubheadline || ""} 
                            onChange={(e) => updateDesign('heroSubheadline', e.target.value)}
                            placeholder="e.g. Product Designer based in USA"
                            className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white font-bold placeholder:opacity-20 outline-none focus:border-purple-500 transition-all"
                          />
                       </div>
                    </div>
                 </div>

                 {/* STATS SECTION */}
                 <div className="space-y-6">
                    <div className="flex justify-between items-center px-1">
                       <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500">Key Stats</h3>
                       <button 
                         onClick={() => {
                            const newStats = [...(config.portfolioStats || []), { value: '0', label: 'New Stat' }];
                            updateDesign('portfolioStats', newStats);
                         }}
                         className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors"
                       >
                          + Add Stat
                       </button>
                    </div>
                    <div className="space-y-3">
                       {(config.portfolioStats || []).map((stat: any, index: number) => (
                          <div key={index} className="flex gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 group">
                             <input 
                               type="text" value={stat.value} placeholder="Value"
                               onChange={(e) => {
                                  const newStats = [...config.portfolioStats];
                                  newStats[index].value = e.target.value;
                                  updateDesign('portfolioStats', newStats);
                               }}
                               className="w-24 bg-black/20 border-white/5 rounded-xl p-2 text-white font-bold text-center outline-none"
                             />
                             <input 
                               type="text" value={stat.label} placeholder="Label"
                               onChange={(e) => {
                                  const newStats = [...config.portfolioStats];
                                  newStats[index].label = e.target.value;
                                  updateDesign('portfolioStats', newStats);
                               }}
                               className="flex-1 bg-black/20 border-white/5 rounded-xl p-2 text-white font-bold outline-none"
                             />
                             <button 
                               onClick={() => {
                                  const newStats = config.portfolioStats.filter((_: any, i: number) => i !== index);
                                  updateDesign('portfolioStats', newStats);
                               }}
                               className="p-2 text-red-500/40 hover:text-red-500 transition-colors"
                             >
                                &times;
                             </button>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* SERVICES SECTION */}
                 <div className="space-y-6">
                    <div className="flex justify-between items-center px-1">
                       <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500">Services</h3>
                       <button 
                         onClick={() => {
                            const newServices = [...(config.portfolioServices || []), { title: 'New Service', desc: 'Description of the service' }];
                            updateDesign('portfolioServices', newServices);
                         }}
                         className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors"
                       >
                          + Add Service
                       </button>
                    </div>
                    <div className="space-y-4">
                       {(config.portfolioServices || []).map((service: any, index: number) => (
                          <div key={index} className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4 relative group">
                             <button 
                               onClick={() => {
                                  const newServices = config.portfolioServices.filter((_: any, i: number) => i !== index);
                                  updateDesign('portfolioServices', newServices);
                               }}
                               className="absolute top-4 right-4 text-red-500/40 hover:text-red-500 transition-colors"
                             >
                                &times;
                             </button>
                             <div className="space-y-2">
                               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Service Title</span>
                               <input 
                                 type="text" value={service.title}
                                 onChange={(e) => {
                                    const newServices = [...config.portfolioServices];
                                    newServices[index].title = e.target.value;
                                    updateDesign('portfolioServices', newServices);
                                 }}
                                 className="w-full bg-black/20 border-white/5 rounded-xl p-3 text-white font-bold outline-none"
                               />
                             </div>
                             <div className="space-y-2">
                               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Description</span>
                               <textarea 
                                 value={service.desc}
                                 onChange={(e) => {
                                    const newServices = [...config.portfolioServices];
                                    newServices[index].desc = e.target.value;
                                    updateDesign('portfolioServices', newServices);
                                 }}
                                 className="w-full bg-black/20 border-white/5 rounded-xl p-3 text-white font-medium text-sm outline-none min-h-[80px]"
                               />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>

                 {/* EXPERIENCE SECTION */}
                 <div className="space-y-6">
                    <div className="flex justify-between items-center px-1">
                       <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500">Work Experience</h3>
                       <button 
                         onClick={() => {
                            const newExp = [...(config.portfolioExperience || []), { role: 'Role Name', company: 'Company', duration: '2020 - Present' }];
                            updateDesign('portfolioExperience', newExp);
                         }}
                         className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors"
                       >
                          + Add Experience
                       </button>
                    </div>
                    <div className="space-y-4">
                       {(config.portfolioExperience || []).map((exp: any, index: number) => (
                          <div key={index} className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4 relative group">
                             <button 
                               onClick={() => {
                                  const newExp = config.portfolioExperience.filter((_: any, i: number) => i !== index);
                                  updateDesign('portfolioExperience', newExp);
                               }}
                               className="absolute top-4 right-4 text-red-500/40 hover:text-red-500 transition-colors"
                             >
                                &times;
                             </button>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Role</span>
                                  <input 
                                    type="text" value={exp.role}
                                    onChange={(e) => {
                                       const newExp = [...config.portfolioExperience];
                                       newExp[index].role = e.target.value;
                                       updateDesign('portfolioExperience', newExp);
                                    }}
                                    className="w-full bg-black/20 border-white/5 rounded-xl p-3 text-white font-bold outline-none text-xs"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Company</span>
                                  <input 
                                    type="text" value={exp.company}
                                    onChange={(e) => {
                                       const newExp = [...config.portfolioExperience];
                                       newExp[index].company = e.target.value;
                                       updateDesign('portfolioExperience', newExp);
                                    }}
                                    className="w-full bg-black/20 border-white/5 rounded-xl p-3 text-white font-bold outline-none text-xs"
                                  />
                                </div>
                             </div>
                             <div className="space-y-2">
                               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Duration</span>
                               <input 
                                 type="text" value={exp.duration}
                                 onChange={(e) => {
                                    const newExp = [...config.portfolioExperience];
                                    newExp[index].duration = e.target.value;
                                    updateDesign('portfolioExperience', newExp);
                                 }}
                                 className="w-full bg-black/20 border-white/5 rounded-xl p-3 text-white font-bold outline-none text-xs"
                               />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
               </>
             )}

             {/* CAFE & RESTAURANT SECTIONS */}
             {profile.template_id === 'cafe-restaurant' && (
               <div className="space-y-10">
                 
                 {/* HERO / ONBOARDING CONFIG */}
                 <div className="space-y-6">
                    <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500 ml-1">Landing Screen config</h3>
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Hero Title Line</span>
                          <input 
                            type="text" 
                            value={config.heroHeadline || ""} 
                            onChange={(e) => updateDesign('heroHeadline', e.target.value)}
                            placeholder="e.g. Fall in Love with Coffee in Blissful Delight!"
                            className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white font-bold placeholder:opacity-20 outline-none focus:border-purple-500 transition-all"
                          />
                       </div>
                       <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Get Started Custom Line (Button Text)</span>
                          <input 
                            type="text" 
                            value={config.heroButtonText || ""} 
                            onChange={(e) => updateDesign('heroButtonText', e.target.value)}
                            placeholder="e.g. Get Started"
                            className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white font-bold placeholder:opacity-20 outline-none focus:border-purple-500 transition-all"
                          />
                       </div>
                       <div className="space-y-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Location Subtext</span>
                          <input 
                            type="text" 
                            value={config.locationText || ""} 
                            onChange={(e) => updateDesign('locationText', e.target.value)}
                            placeholder="e.g. Bilzen, Tanjungbalai"
                            className="w-full bg-white/5 border-2 border-white/10 rounded-2xl p-4 text-white font-bold placeholder:opacity-20 outline-none focus:border-purple-500 transition-all"
                          />
                       </div>
                    </div>
                 </div>

                 {/* MENU CATEGORIES */}
                 <div className="space-y-6">
                    <div className="flex justify-between items-center px-1">
                       <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500">Menu Categories</h3>
                       <button 
                         onClick={() => {
                            const newCats = [...(config.menuCategories || []), "New Category"];
                            updateDesign('menuCategories', newCats);
                         }}
                         className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors"
                       >
                          + Add Category
                       </button>
                    </div>
                    <div className="space-y-3">
                       {(config.menuCategories || ['Appetizers', 'Main Course', 'Desserts', 'Drinks']).map((cat: string, index: number) => (
                          <div key={index} className="flex gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 group">
                             <input 
                               type="text" value={cat} placeholder="Category Name"
                               onChange={(e) => {
                                  const newCats = [...(config.menuCategories || ['Appetizers', 'Main Course', 'Desserts', 'Drinks'])];
                                  newCats[index] = e.target.value;
                                  updateDesign('menuCategories', newCats);
                               }}
                               className="flex-1 bg-black/20 border-white/5 rounded-xl p-2 text-white font-bold outline-none font-bold"
                             />
                             <button 
                               onClick={() => {
                                  const newCats = (config.menuCategories || []).filter((_: any, i: number) => i !== index);
                                  updateDesign('menuCategories', newCats);
                               }}
                               className="p-2 text-red-500/40 hover:text-red-500 transition-colors"
                             >
                                &times;
                             </button>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex justify-between items-center px-1">
                       <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500">Menu Items</h3>
                       <button 
                         onClick={() => {
                            const newItems = [...(config.menuItems || []), { name: 'New Dish', price: '0', category: 'Appetizers', desc: '', image: '' }];
                            updateDesign('menuItems', newItems);
                         }}
                         className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors"
                       >
                          + Add Item
                       </button>
                    </div>
                    <div className="space-y-4">
                       {(config.menuItems || []).map((item: any, index: number) => (
                          <div key={index} className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4 relative group">
                             <button 
                               onClick={() => {
                                  const newItems = config.menuItems.filter((_: any, i: number) => i !== index);
                                  updateDesign('menuItems', newItems);
                               }}
                               className="absolute top-4 right-4 text-red-500/40 hover:text-red-500 transition-colors"
                             >
                                &times;
                             </button>
                             <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-2">
                                 <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Dish Name</span>
                                 <input 
                                   type="text" value={item.name}
                                   onChange={(e) => {
                                      const newItems = [...config.menuItems];
                                      newItems[index].name = e.target.value;
                                      updateDesign('menuItems', newItems);
                                   }}
                                   className="w-full bg-black/20 border-white/5 rounded-xl p-3 text-white font-bold outline-none text-xs"
                                 />
                               </div>
                               <div className="space-y-2">
                                 <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Price</span>
                                 <input 
                                   type="text" value={item.price}
                                   onChange={(e) => {
                                      const newItems = [...config.menuItems];
                                      newItems[index].price = e.target.value;
                                      updateDesign('menuItems', newItems);
                                   }}
                                   className="w-full bg-black/20 border-white/5 rounded-xl p-3 text-white font-bold outline-none text-xs"
                                 />
                               </div>
                             </div>
                             <div className="space-y-2">
                               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Category</span>
                               <select 
                                 value={item.category}
                                 onChange={(e) => {
                                    const newItems = [...config.menuItems];
                                    newItems[index].category = e.target.value;
                                    updateDesign('menuItems', newItems);
                                 }}
                                 className="w-full bg-black/20 border-white/5 rounded-xl p-3 text-white font-bold outline-none text-xs bg-zinc-900"
                               >
                                 {(config.menuCategories || ['Appetizers', 'Main Course', 'Desserts', 'Drinks']).map((c: string) => (
                                   <option key={c} value={c}>{c}</option>
                                 ))}
                               </select>
                             </div>
                             <div className="space-y-2">
                               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Description</span>
                               <textarea 
                                 value={item.desc}
                                 onChange={(e) => {
                                    const newItems = [...config.menuItems];
                                    newItems[index].desc = e.target.value;
                                    updateDesign('menuItems', newItems);
                                 }}
                                 className="w-full bg-black/20 border-white/5 rounded-xl p-3 text-white font-medium text-xs outline-none min-h-[60px]"
                               />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
               </div>
             )}

             {/* BRAND & COMMERCE SECTIONS */}
             {profile.template_id === 'brand-commerce' && (
               <div className="space-y-10">
                 <div className="space-y-6">
                    <div className="flex justify-between items-center px-1">
                       <h3 className="text-[13px] font-black uppercase tracking-widest text-zinc-500">Gallery Items</h3>
                       <button 
                         onClick={() => {
                            const newItems = [...(config.galleryItems || []), { name: 'New Product', category: 'Cleansers', image: '', labels: ['Natural'] }];
                            updateDesign('galleryItems', newItems);
                         }}
                         className="text-[10px] font-black uppercase tracking-widest text-purple-400 hover:text-purple-300 transition-colors"
                       >
                          + Add Product
                       </button>
                    </div>
                    <div className="space-y-4">
                       {(config.galleryItems || []).map((item: any, index: number) => (
                          <div key={index} className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4 relative group">
                             <button 
                               onClick={() => {
                                  const newItems = config.galleryItems.filter((_: any, i: number) => i !== index);
                                  updateDesign('galleryItems', newItems);
                               }}
                               className="absolute top-4 right-4 text-red-500/40 hover:text-red-500 transition-colors"
                             >
                                &times;
                             </button>
                             <div className="grid grid-cols-2 gap-4">
                               <div className="space-y-2">
                                 <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Product Name</span>
                                 <input 
                                   type="text" value={item.name}
                                   onChange={(e) => {
                                      const newItems = [...config.galleryItems];
                                      newItems[index].name = e.target.value;
                                      updateDesign('galleryItems', newItems);
                                   }}
                                   className="w-full bg-black/20 border-white/5 rounded-xl p-3 text-white font-bold outline-none text-xs"
                                 />
                               </div>
                               <div className="space-y-2">
                                 <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Category</span>
                                 <input 
                                   type="text" value={item.category}
                                   onChange={(e) => {
                                      const newItems = [...config.galleryItems];
                                      newItems[index].category = e.target.value;
                                      updateDesign('galleryItems', newItems);
                                   }}
                                   className="w-full bg-black/20 border-white/5 rounded-xl p-3 text-white font-bold outline-none text-xs"
                                   placeholder="e.g. Cleansers"
                                 />
                               </div>
                             </div>
                             <div className="space-y-2">
                               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Image URL</span>
                               <input 
                                 type="text" value={item.image}
                                 onChange={(e) => {
                                    const newItems = [...config.galleryItems];
                                    newItems[index].image = e.target.value;
                                    updateDesign('galleryItems', newItems);
                                 }}
                                 className="w-full bg-black/20 border-white/5 rounded-xl p-3 text-white font-bold outline-none text-xs"
                                 placeholder="https://..."
                               />
                             </div>
                             <div className="space-y-2">
                               <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Tags (comma separated)</span>
                               <input 
                                 type="text" value={item.labels?.join(', ')}
                                 onChange={(e) => {
                                    const newItems = [...config.galleryItems];
                                    newItems[index].labels = e.target.value.split(',').map((s: string) => s.trim());
                                    updateDesign('galleryItems', newItems);
                                 }}
                                 className="w-full bg-black/20 border-white/5 rounded-xl p-3 text-white font-bold outline-none text-xs"
                                 placeholder="Natural, Vegan, etc."
                               />
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
               </div>
             )}
          </div>
       )}

    </div>
  );
}