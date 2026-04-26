"use client";

import React from 'react';
import { 
  Instagram, Youtube, Twitter, Linkedin, Facebook, 
  Globe, Play, ShoppingBag, Heart, ExternalLink, 
  ImageIcon, Type, Users, Link2, DollarSign, CreditCard,
  Mail, Phone, Share2, Music, Video, MessageCircle, MapPin,
  ArrowRight, ArrowUpRight, Plus, Star, Zap, ChevronRight,
  Send, Smartphone, Coffee, Camera, Layers, Monitor,
  Trello, Github, Figma, Disc
} from 'lucide-react';

export default function MinimalModern({ profile, links = [], products = [] }: any) {
  const config = profile?.design_config || {};
  const currencySign = config.currency || "$";
  
  // 0. DESIGN CONFIG EXTRACTION
  const theme = config.theme || 'Minimal';
  const wallpaperStyle = config.wallpaperStyle || 'Fill';
  const bgColor = config.bgColor || '#F8F8F8';
  const buttonStyle = config.buttonStyle || 'Solid';
  const buttonRoundness = config.buttonRoundness || 'Round';
  const buttonShadow = config.buttonShadow || 'None';
  const btnColor = config.btnColor || '#FFFFFF';
  const btnTextColor = config.btnTextColor || '#000000';
  const pageFont = config.pageFont || 'Montserrat';
  const pageTextColor = config.pageTextColor || '#111111';
  const titleColor = config.titleColor || '#000000';
  const titleSize = config.titleSize || 'Small';
  const bgImage = config.bgImage;

  // NEW DESIGN TOKENS
  const profileSize = config.profileSize || 50;
  const profileShadow = config.profileShadow || 0;
  const profileBorder = config.profileBorder || 0;
  const headerLayout = config.headerLayout || 'centered';
  const tactileBlocks = config.tactileBlocks;
  const blockCorner = config.blockCorner ?? 16;
  const blockShadow = config.blockShadow || 0;
  const blockBorder = config.blockBorder || 0;
  const blockSpacing = config.blockSpacing ?? 10;
  const socialIconSize = config.socialIconSize || 50;

  // 1. ADVANCED YOUTUBE ID EXTRACTOR
  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // 2. UPI / PAYMENT REDIRECT
  const handleTipJar = async () => {
    const { createClient } = require("@/utils/supabase/client");
    const supabase = createClient();
    await supabase.from('link_clicks').insert({ user_id: profile.id, link_id: links.find((l: any) => l.type === 'tip')?.id });

    if (profile?.upi_id) {
      window.location.href = `upi://pay?pa=${profile.upi_id}&pn=${profile.c_username || 'Creator'}&cu=INR`;
    } else {
      alert("UPI ID not configured in your settings.");
    }
  };

  const trackClick = async (linkId: string) => {
    const { createClient } = require("@/utils/supabase/client");
    const supabase = createClient();
    await supabase.from('link_clicks').insert({ user_id: profile.id, link_id: linkId });
  };

  // 3. ENHANCED SOCIAL ICON MAPPER
  const getSocialIcon = (link: any, size = 20) => {
    const type = link?.icon_type?.toLowerCase() || "";
    const u = link?.url?.toLowerCase() || "";
    
    if (type === 'email' || type === 'newsletter' || u.includes('mailto:')) return <Mail size={size} />;
    if (type === 'phone' || type === 'sms' || type === 'whatsapp' || u.includes('wa.me') || u.includes('tel:')) return <Phone size={size} />;
    if (type === 'instagram' || u.includes('instagram.com')) return <Instagram size={size} />;
    if (type === 'youtube' || type === 'youtubemusic' || u.includes('youtube.com') || u.includes('youtu.be')) return <Youtube size={size} />;
    if (type === 'x' || type === 'twitter' || u.includes('twitter.com') || u.includes('x.com')) return <Twitter size={size} />;
    if (type === 'linkedin' || u.includes('linkedin.com')) return <Linkedin size={size} />;
    if (type === 'facebook' || u.includes('facebook.com')) return <Facebook size={size} />;
    if (type === 'tiktok' || u.includes('tiktok.com')) return <Music size={size} />;
    if (type === 'snapchat' || u.includes('snapchat.com')) return <Video size={size} />;
    if (type === 'discord' || u.includes('discord.gg')) return <MessageCircle size={size} />;
    if (type === 'spotify' || type === 'applemusic' || u.includes('spotify.com') || u.includes('apple.com/music')) return <Music size={size} />;
    if (type === 'pinterest' || u.includes('pinterest.com')) return <ImageIcon size={size} />;
    if (type === 'github' || u.includes('github.com')) return <Github size={size} />;
    if (type === 'figma' || u.includes('figma.com')) return <Figma size={size} />;
    if (type === 'telegram' || u.includes('t.me')) return <Send size={size} />;
    
    return <Link2 size={size} />;
  };

  // 4. STYLE GENERATORS
  const getButtonStyle = () => {
    let style: any = {
      backgroundColor: buttonStyle === 'Outline' ? 'transparent' : btnColor,
      color: btnTextColor,
      borderColor: buttonStyle === 'Solid' ? 'transparent' : btnColor,
      borderWidth: buttonStyle === 'Solid' ? '0px' : '2px',
    };

    if (buttonStyle === 'Glass') {
      style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
      style.backdropFilter = 'blur(12px)';
      style.borderColor = 'rgba(255, 255, 255, 0.2)';
    }

    if (buttonRoundness === 'Square') style.borderRadius = '0px';
    else if (buttonRoundness === 'Round') style.borderRadius = '16px';
    else if (buttonRoundness === 'Rounder') style.borderRadius = '28px';
    else style.borderRadius = '9999px';

    if (buttonShadow === 'Soft') style.boxShadow = '0 8px 30px rgba(0,0,0,0.04)';
    else if (buttonShadow === 'Strong') style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
    else if (buttonShadow === 'Hard') style.boxShadow = '8px 8px 0px rgba(0,0,0,1)';

    return style;
  };

  const getButtonShapeClasses = () => {
     if (buttonRoundness === 'Square') return 'rounded-none';
     if (buttonRoundness === 'Round') return 'rounded-2xl';
     if (buttonRoundness === 'Rounder') return 'rounded-[2rem]';
     return 'rounded-full';
  };

  const socialRowLinks = links?.filter((l: any) => l.type === 'social');
  const mainContentLinks = links?.filter((l: any) => l.type !== 'social');

  return (
    <div 
      className="min-h-screen w-full relative selection:bg-purple-500 selection:text-white" 
      style={{ 
        backgroundColor: bgColor, 
        fontFamily: pageFont,
        color: pageTextColor 
      }}
    >
      <link href={`https://fonts.googleapis.com/css2?family=${pageFont.replace(/ /g, '+')}:ital,wght@0,100..900;1,100..900&display=swap`} rel="stylesheet" />
      
      {/* SOLID BACKGROUND ONLY */}

      {/* MOBILE CONTAINER */}
      <div className="relative z-10 w-full max-w-[500px] mx-auto min-h-screen pb-40">
        
        {/* PREMIUM HEADER - OVERLAPPING STYLE */}
        <div className="relative w-full h-56 overflow-hidden bg-zinc-900 shadow-2xl">
           {profile?.cover_url ? (
             <img src={profile.cover_url} className="w-full h-full object-cover opacity-80" alt="Banner" />
           ) : bgImage ? (
             <img src={bgImage} className="w-full h-full object-cover opacity-60" alt="Wallpaper" />
           ) : (
             <div className="w-full h-full opacity-30" style={{ backgroundColor: bgColor }} />
           )}
           <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

         {/* PROFILE BADGE OVERLAP */}
         <div className={`px-6 -mt-20 flex flex-col ${headerLayout === 'centered' ? 'items-center text-center' : 'items-start text-left'} w-full`}>
            <div 
              className="rounded-full bg-white relative z-20 group transition-transform hover:scale-105 shadow-2xl overflow-hidden"
              style={{ 
                width: `${60 + (profileSize * 1.5)}px`, 
                height: `${60 + (profileSize * 1.5)}px`,
                borderWidth: `${profileBorder / 10}px`,
                borderColor: config.profileBorderColor || bgColor,
                boxShadow: profileShadow > 0 ? `0 ${profileShadow / 5}px ${profileShadow / 2}px rgba(0,0,0,${profileShadow / 200})` : 'none'
              }}
            >
               {profile?.avatar_url ? (
                 <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Profile" />
               ) : (
                 <div className="w-full h-full bg-zinc-100 flex items-center justify-center text-zinc-300">
                   <Users size={profileSize + 20} />
                 </div>
               )}
            </div>

            <div className={`mt-6 space-y-2 ${headerLayout === 'centered' ? 'items-center' : 'items-start'}`}>
               <h1 className={`font-black tracking-tight ${titleSize === 'Large' ? 'text-3xl' : titleSize === 'Medium' ? 'text-2xl' : 'text-xl'}`}>
                 {profile?.c_username || "Socials Creator"}
                 {config.enableVerifiedBadge && <Star size={16} fill="#A855F7" className="inline ml-2 text-purple-500" />}
               </h1>
               <p className={`text-sm font-bold opacity-60 leading-relaxed max-w-xs mx-auto italic ${headerLayout === 'centered' ? '' : 'ml-0'}`}>
                 {profile?.bio || "Digital Architect & Content Creator."}
               </p>
            </div>

            {/* ACTION BUTTONS (Share, Add Contact) */}
            <div className="flex gap-2 mt-6">
               {config.enableAddContact && (
                 <button className="px-6 py-2 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Plus size={12} /> Add Contact
                 </button>
               )}
               {config.enableShareButton && (
                 <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                    <Share2 size={16} />
                 </button>
               )}
            </div>

            {/* SOCIAL ROW - PREMIUM CHIPS */}
            <div className={`flex flex-wrap ${headerLayout === 'centered' ? 'justify-center' : 'justify-start'} gap-3 mt-8 w-full`}>
               {socialRowLinks?.map((s: any) => (
                 <a 
                   key={s.id} 
                   href={s.url} 
                   target="_blank" 
                   rel="noreferrer"
                   className="flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 shadow-lg hover:scale-110 active:scale-95 transition-all group"
                   style={{ 
                     width: `${32 + (socialIconSize / 2.5)}px`, 
                     height: `${32 + (socialIconSize / 2.5)}px`,
                     backgroundColor: buttonStyle === 'Glass' ? 'rgba(255,255,255,0.05)' : `${btnColor}11`, 
                     borderColor: `${btnColor}22` 
                   }}
                 >
                   <div style={{ color: btnColor }}>
                     {getSocialIcon(s, 16 + (socialIconSize / 10))}
                   </div>
                 </a>
               ))}
            </div>
         </div>

        {/* MAIN CONTENT BLOCKS */}
        <div className="mt-16 px-6 flex flex-col gap-5">
           {mainContentLinks?.map((link: any) => {
              
              // 1. SECTION TITLE
              if (link.type === 'title') {
                return (
                  <div key={link.id} className="pt-10 pb-2 flex items-center gap-4">
                     <div className="h-px flex-1 bg-current opacity-10" />
                     <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 whitespace-nowrap">{link.title}</h2>
                     <div className="h-px flex-1 bg-current opacity-10" />
                  </div>
                );
              }

              // 2. YOUTUBE EMBED
              if (link.type === 'youtube') {
                const vidId = getYoutubeId(link.url);
                return vidId ? (
                  <div 
                    key={link.id} 
                    className="w-full aspect-video bg-black overflow-hidden shadow-2xl border-4"
                    style={{ borderRadius: buttonRoundness === 'Square' ? '0px' : '2rem', borderColor: `${btnColor}22` }}
                  >
                    <iframe 
                      className="w-full h-full" 
                      src={`https://www.youtube.com/embed/${vidId}`} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen 
                    />
                  </div>
                ) : null;
              }

              // 3. IMAGE BLOCK (Gallery Style)
              if (link.type === 'image') {
                return (
                  <div 
                    key={link.id} 
                    className="w-full overflow-hidden shadow-2xl relative group"
                    style={{ borderRadius: buttonRoundness === 'Square' ? '0px' : '2.5rem' }}
                  >
                    <img src={link.url} className="w-full h-auto object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    {link.title && (
                      <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl flex justify-between items-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                         <span className="text-[11px] font-black uppercase tracking-widest text-black">{link.title}</span>
                         <ArrowUpRight size={14} className="text-black" />
                      </div>
                    )}
                  </div>
                );
              }

              // 4. INSTAGRAM FEED (Premium Card)
              if (link.type === 'instagram') {
                const username = link.url?.replace('@', '').split('/').pop() || "instagram";
                return (
                  <div 
                    key={link.id}
                    className="w-full overflow-hidden shadow-2xl transition-all border"
                    style={{ 
                      ...getButtonStyle(), 
                      padding: 0, 
                      backgroundColor: buttonStyle === 'Glass' ? 'rgba(255,255,255,0.05)' : btnColor
                    }}
                  >
                    <div className="p-6 flex items-center justify-between border-b" style={{ borderColor: 'rgba(0,0,0,0.05)' }}>
                       <div className="flex items-center gap-4 text-left">
                          <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                             <div className="w-full h-full rounded-full border-2 border-white overflow-hidden flex items-center justify-center bg-zinc-50">
                                <Instagram size={20} style={{ color: '#E1306C' }} />
                             </div>
                          </div>
                          <div>
                             <h4 className="text-xs font-black tracking-tight" style={{ color: btnTextColor }}>@{username}</h4>
                             <p className="text-[9px] font-bold opacity-40 uppercase tracking-widest" style={{ color: btnTextColor }}>Instagram Feed</p>
                          </div>
                       </div>
                       <a 
                         href={`https://instagram.com/${username}`} 
                         target="_blank" 
                         rel="noreferrer"
                         className="px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all"
                         style={{ backgroundColor: btnTextColor, color: btnColor }}
                       >
                         Visit
                       </a>
                    </div>
                    <div className="grid grid-cols-3 gap-[2px]">
                       {[1,2,3,4,5,6].map(i => (
                         <div key={i} className="aspect-square bg-zinc-200/20 hover:bg-zinc-200/40 transition-colors pointer-events-none" />
                       ))}
                    </div>
                  </div>
                );
              }

              // 5. TIP JAR (UPI)
              if (link.type === 'tip') {
                return (
                  <button 
                    key={link.id} 
                    onClick={handleTipJar}
                    className={`w-full flex items-center justify-between p-7 group transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] ${buttonShadow !== 'None' ? 'shadow-xl' : ''}`}
                    style={{ ...getButtonStyle() }}
                  >
                    <div className="flex items-center gap-5">
                       <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/20 shadow-inner group-hover:rotate-12 transition-transform">
                          <Heart size={24} fill="currentColor" />
                       </div>
                       <div className="text-left">
                          <h4 className="text-sm font-black tracking-tight">{link.title || 'Support My Work'}</h4>
                          <p className="text-[10px] font-bold opacity-40 mt-1 uppercase italic tracking-widest">Digital Tip Jar</p>
                       </div>
                    </div>
                    <ChevronRight size={20} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </button>
                );
              }

              // 6. SHOP BLOCK (Inline Product Card)
              if (link.type === 'shop') {
                // Try multiple matching strategies: by ID, then by name
                const product = products?.find((p: any) => p.id === link.url) 
                  || products?.find((p: any) => p.name === link.title)
                  || (products?.length === 1 ? products[0] : null);
                
                const displayName = product?.name || link.title || 'Product';
                const displayPrice = product?.price || '—';
                const displayImage = product?.image_url;
                const displayDesc = product?.description;
                const checkoutUrl = product?.destination_url || (product 
                  ? `/${profile?.c_username}/checkout?type=product&id=${product.id}`
                  : '#');

                return (
                  <a 
                    key={link.id}
                    href={checkoutUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackClick(link.id)}
                    className={`w-full overflow-hidden group transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] border ${getButtonShapeClasses()}`}
                    style={{ 
                      backgroundColor: buttonStyle === 'Glass' ? 'rgba(255,255,255,0.05)' : `${bgColor}08`,
                      borderColor: `${btnColor}22`
                    }}
                  >
                    <div className="aspect-[16/10] relative overflow-hidden bg-zinc-100">
                      {displayImage ? (
                        <img src={displayImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={displayName} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag size={40} className="opacity-10" />
                        </div>
                      )}
                      <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-black/5">
                        <span className="text-[11px] font-black text-purple-600">{currencySign}{displayPrice}</span>
                      </div>
                    </div>
                    <div className="p-5 flex items-center justify-between">
                      <div className="flex-1 min-w-0 pr-4">
                        <h4 className="text-[13px] font-black uppercase tracking-tight truncate">{displayName}</h4>
                        {displayDesc && (
                          <p className="text-[10px] font-bold opacity-40 mt-1 truncate">{displayDesc}</p>
                        )}
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-widest opacity-30 shrink-0">View Details</span>
                    </div>
                  </a>
                );
              }

              // 7. TEXT BLOCK
              if (link.type === 'text') {
                return (
                  <div key={link.id} className="px-2 py-4">
                    <p className="text-sm font-medium leading-relaxed opacity-70 whitespace-pre-line">{link.url}</p>
                  </div>
                );
              }

              // 8. DEFAULT CTA LINK
              let icon = getSocialIcon(link, 22);
              if (link.type === 'contact') icon = <Mail size={22} />;

              return (
                <a 
                  key={link.id} 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  onClick={() => trackClick(link.id)}
                  className={`flex items-center p-4 sm:p-5 group transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] ${blockShadow > 0 ? 'shadow-lg' : ''}`}
                  style={{ 
                    ...getButtonStyle(),
                    marginBottom: `${blockSpacing}px`,
                    borderRadius: `${blockCorner}px`,
                    borderWidth: `${blockBorder / 10}px`,
                    boxShadow: blockShadow > 0 ? `0 ${blockShadow / 5}px ${blockShadow / 2}px rgba(0,0,0,${blockShadow / 200})` : 'none',
                    background: tactileBlocks === 'soft' ? `linear-gradient(135deg, ${btnColor}, ${btnColor}dd)` : undefined
                  }}
                >
                  <div 
                    className={`shrink-0 w-12 h-12 flex items-center justify-center transition-all group-hover:scale-110 ${getButtonShapeClasses()}`}
                    style={{ backgroundColor: `${btnTextColor}11`, color: btnTextColor }}
                  >
                    {icon}
                  </div>
                  <div className="ml-5 flex-1 text-left min-w-0 pr-4">
                    <h4 className="text-[13px] font-black tracking-tight uppercase truncate">{link.title}</h4>
                    <p className="text-[9px] font-bold mt-1 truncate opacity-30 uppercase tracking-[0.2em]">
                      {link.url?.replace(/^https?:\/\//, '').split('/')[0]}
                    </p>
                  </div>
                  <ArrowUpRight size={18} className="shrink-0 opacity-10 group-hover:opacity-100 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              );
           })}
        </div>

        {/* PRODUCTS SECTION */}
        {products && products.length > 0 && (
          <div className="mt-20 px-6 gap-6 flex flex-col">
             <div className="flex items-center gap-4">
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 whitespace-nowrap">Shop Collection</h2>
                <div className="h-px w-full bg-current opacity-10" />
             </div>
             <div className="grid grid-cols-2 gap-4">
                {products.map((p: any) => (
                  <a 
                    key={p.id}
                    href={p.destination_url || `/${profile?.c_username}/checkout?type=product&id=${p.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-4 bg-white/5 border border-white/10 group transition-all duration-700 hover:shadow-2xl hover:-translate-y-1 ${getButtonShapeClasses()}`}
                    style={{ backgroundColor: buttonStyle === 'Glass' ? 'rgba(255,255,255,0.05)' : `${bgColor}08` }}
                  >
                    <div className="aspect-square relative overflow-hidden mb-4 rounded-2xl bg-zinc-100 shadow-inner">
                       {p.image_url ? (
                         <img src={p.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={p.name} />
                       ) : <ShoppingBag size={30} className="absolute inset-0 m-auto opacity-10" />}
                       <div className="absolute top-2 right-2 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-xl border border-black/5">
                          <span className="text-[10px] font-black text-purple-600">{currencySign}{p.price}</span>
                       </div>
                    </div>
                    <div className="px-1 text-center">
                       <h4 className="text-[11px] font-black uppercase truncate tracking-tight">{p.name}</h4>
                       <span className="text-[8px] font-black uppercase tracking-widest opacity-30 mt-2 block">View Details</span>
                    </div>
                 </a>
               ))}
             </div>
          </div>
        )}

        {/* PREMIUM FOOTER */}
        <footer className="mt-56 flex flex-col items-center gap-8 px-6 text-center">
            <div className={`p-8 w-full border border-current shadow-2xl relative overflow-hidden group ${getButtonShapeClasses()}`} style={{ borderColor: 'rgba(0,0,0,0.05)', backgroundColor: `${bgColor}05` }}>
               <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[60px] pointer-events-none" />
               <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20 mb-6">Build your own dream</p>
               <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white text-xl font-black italic shadow-2xl group-hover:rotate-[360deg] transition-transform duration-1000">S</div>
                  <h3 className="text-lg font-black tracking-tighter uppercase">Socials <span className="text-zinc-400">Pro</span></h3>
                  <a href="/" className="px-8 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Get Started Free</a>
               </div>
            </div>
            {!config.hideBranding && <p className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-10 mt-10">Architected by Digital Socials &copy; {new Date().getFullYear()}</p>}
        </footer>

      </div>
    </div>
  );
}