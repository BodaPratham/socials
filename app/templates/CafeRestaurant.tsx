"use client";

import React, { useRef } from 'react';
import { 
  Instagram, Youtube, Twitter, Linkedin, Facebook, 
  Search, SlidersHorizontal, ChevronRight, MapPin,
  Star, Mail, Phone, Music, Video, MessageCircle, 
  Link2, ImageIcon, ArrowUpRight, ShoppingBag,
  ExternalLink, Play, Heart, Smartphone, Coffee,
  Globe, Share2, Plus
} from 'lucide-react';

export default function CafeRestaurant({ profile, links = [], products = [] }: any) {
  const config = profile?.design_config || {};
  const currencySign = config.currency || "$";
  const menuRef = useRef<HTMLDivElement>(null);
  
  // DESIGN TOKENS
  const bgColor = config.bgColor || '#1A1A1A'; 
  const pageFont = config.pageFont || 'Montserrat'; 
  const pageTextColor = config.pageTextColor || '#FFFFFF';
  const btnColor = config.btnColor || '#c88053'; 
  const btnTextColor = config.btnTextColor || '#FFFFFF';

  // CUSTOM CONFIG FIELDS
  const heroHeadline = config.heroHeadline || "Fall in Love with Coffee in Blissful Delight!";
  const heroButtonText = config.heroButtonText || "Get Started";
  const locationText = config.locationText || "Bilzen, Tanjungbalai";

  const getSocialIcon = (link: any, size = 20) => {
    const type = link?.icon_type?.toLowerCase() || "";
    const u = link?.url?.toLowerCase() || "";
    if (type === 'email' || u.includes('mailto:')) return <Mail size={size} />;
    if (type === 'phone' || u.includes('tel:')) return <Phone size={size} />;
    if (type === 'instagram' || u.includes('instagram.com')) return <Instagram size={size} />;
    if (type === 'youtube' || u.includes('youtube.com')) return <Youtube size={size} />;
    if (type === 'x' || u.includes('twitter.com') || u.includes('x.com')) return <Twitter size={size} />;
    return <Link2 size={size} />;
  };

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const scrollToMenu = () => {
    menuRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const socialLinks = links?.filter((l: any) => l.type === 'social');
  const mainLinks = links?.filter((l: any) => l.type !== 'social');

  return (
    <div 
      className="min-h-screen w-full relative selection:bg-orange-900 selection:text-white overflow-x-hidden" 
      style={{ backgroundColor: '#000000', fontFamily: pageFont }}
    >
      <link href={`https://fonts.googleapis.com/css2?family=${pageFont.replace(/ /g, '+')}:ital,wght@0,100..900;1,100..900&display=swap`} rel="stylesheet" />
      
      <div 
        className="relative z-10 w-full max-w-[430px] mx-auto min-h-screen shadow-2xl flex flex-col"
        style={{ backgroundColor: bgColor, color: pageTextColor }}
      >
        
        {/* HERO SECTION (SPLASH REPLACEMENT) */}
        <section className="relative w-full min-h-[90dvh] flex flex-col bg-black overflow-hidden shrink-0">
           {profile?.avatar_url ? (
             <img src={profile.avatar_url} className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-lighten" alt="Hero" />
           ) : (
             <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-stone-900 to-black"></div>
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
           
           <div className="relative z-10 mt-auto px-8 pb-20 flex flex-col items-center text-center">
              <div className="mb-6 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                 <MapPin size={14} className="text-orange-400" />
                 <span className="text-[10px] font-bold uppercase tracking-widest">{locationText}</span>
              </div>
              
              <div className="mb-4">
                <h2 className="text-sm font-black uppercase tracking-[0.3em] text-orange-400/80 mb-1">
                  @{profile?.c_username}
                </h2>
                <h3 className="text-xs font-bold opacity-40 uppercase tracking-widest">
                  {profile?.display_name || "Socials Creator"}
                </h3>
              </div>

              <h1 className="text-[2.2rem] font-bold leading-tight tracking-tight text-white mb-6">
                {heroHeadline}
              </h1>
              <p className="text-zinc-300/80 text-sm px-4 leading-relaxed line-clamp-3 italic opacity-60">
                {profile?.bio || "Welcome to our cozy coffee corner, where every cup is a delightful experience built for you."}
              </p>
              <button 
                onClick={scrollToMenu}
                className="mt-10 w-full py-5 rounded-2xl font-bold text-lg shadow-2xl active:scale-95 transition-all text-white hover:scale-[1.02]"
                style={{ backgroundColor: btnColor }}
              >
                {heroButtonText}
              </button>
           </div>
        </section>

        {/* SOCIAL STRIP */}
        {socialLinks?.length > 0 && (
          <div className="flex justify-center gap-4 py-8 px-6 bg-black/20 border-b border-white/5">
             {socialLinks.map((s: any) => (
               <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 hover:scale-110 hover:bg-white/10 transition-all">
                  <div style={{ color: btnColor }}>{getSocialIcon(s, 22)}</div>
               </a>
             ))}
          </div>
        )}

        {/* PROMO BANNER */}
        <div className="px-6 mt-10">
            <div className="w-full relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-stone-800 to-stone-900 h-40 flex border border-white/5 shadow-2xl">
                {config.promoBannerUrl ? (
                    <img src={config.promoBannerUrl} className="absolute inset-0 w-full h-full object-cover" alt="Promo" />
                ) : (
                    <div className="relative z-10 flex flex-col justify-center px-8 text-white h-full">
                        <div className="bg-orange-500 w-fit px-3 py-1 rounded-full text-[9px] font-black uppercase mb-3">Special Offer</div>
                        <h2 className="text-2xl font-bold leading-tight">Claim your free <br/> cup of bliss</h2>
                        <p className="text-xs opacity-50 mt-2">Visit us today</p>
                    </div>
                )}
            </div>
        </div>

        {/* MENU / SHOP SECTION */}
        {products?.length > 0 && (
          <section ref={menuRef} className="px-6 pt-12 pb-10">
             <div className="flex justify-between items-end mb-8">
                <div>
                   <h2 className="text-2xl font-bold">Featured Menu</h2>
                   <p className="text-zinc-500 text-xs mt-1">Handpicked collection of our best brews</p>
                </div>
                <SlidersHorizontal size={20} className="text-zinc-500 mb-2" />
             </div>

             <div className="grid grid-cols-2 gap-4">
                {products?.map((p: any) => (
                  <a 
                    key={p.id}
                    href={p.destination_url || `/${profile.c_username}/checkout?type=product&id=${p.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white rounded-3xl p-3 flex flex-col text-left hover:-translate-y-1 transition-all group shadow-sm border border-black/5"
                  >
                    <div className="w-full aspect-square rounded-2xl overflow-hidden bg-stone-100 relative mb-3">
                       {p.image_url ? (
                          <img src={p.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name} />
                       ) : (
                          <div className="w-full h-full flex items-center justify-center bg-stone-100">
                             <Coffee size={30} className="text-stone-300" />
                          </div>
                       )}
                       <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 text-[9px] text-white font-bold">
                          <Star size={8} className="fill-amber-400 text-amber-400" />
                          4.8
                       </div>
                    </div>
                    <h4 className="text-[14px] font-bold text-zinc-900 leading-tight truncate px-1">{p.name}</h4>
                    <p className="text-[9px] text-zinc-400 mt-1 truncate px-1">{p.description || "Fresh Brew"}</p>
                    <div className="flex items-center justify-between mt-3 px-1">
                       <span className="text-lg font-bold text-zinc-900">{currencySign}{parseFloat(p.price || 0).toFixed(2)}</span>
                       <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold transition-transform group-hover:scale-110" style={{ backgroundColor: btnColor }}>
                          <Plus size={16} />
                       </div>
                    </div>
                  </a>
                ))}
             </div>
          </section>
        )}

        {/* ALL BLOCKS RENDERER */}
        <div className="px-6 flex flex-col gap-6 pb-40">
           {mainLinks?.map((link: any) => {
              if (link.type === 'title') {
                return (
                  <div key={link.id} className="pt-12 pb-2">
                     <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 text-center">{link.title}</h2>
                  </div>
                );
              }

              if (link.type === 'youtube') {
                const vidId = getYoutubeId(link.url);
                return vidId ? (
                  <div key={link.id} className="w-full aspect-video rounded-3xl overflow-hidden bg-black shadow-lg border border-white/5">
                    <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${vidId}`} frameBorder="0" allowFullScreen />
                  </div>
                ) : null;
              }

              if (link.type === 'image') {
                return (
                  <div key={link.id} className="w-full rounded-[2.5rem] overflow-hidden shadow-xl group border border-white/5">
                    <img src={link.url} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" alt="" />
                    {link.title && <p className="p-5 text-sm font-bold bg-white/5 text-center italic">{link.title}</p>}
                  </div>
                );
              }

              return (
                <a 
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center p-5 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 active:scale-95 transition-all group"
                >
                  <div className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12" style={{ backgroundColor: `${btnColor}22`, color: btnColor }}>
                     {getSocialIcon(link, 24)}
                  </div>
                  <div className="ml-5 flex-1">
                     <h4 className="text-[15px] font-bold truncate tracking-tight">{link.title}</h4>
                     <p className="text-[10px] opacity-30 truncate uppercase tracking-[0.2em] mt-1 italic">{link.url?.split('/')[2]}</p>
                  </div>
                  <ArrowUpRight size={18} className="opacity-10 group-hover:opacity-100 transition-all group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              );
           })}
        </div>

        {/* FOOTER */}
        <footer className="mt-auto px-10 pb-20 text-center flex flex-col items-center">
           <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mb-8 border border-white/5 shadow-inner">
              <Coffee size={28} style={{ color: btnColor }} />
           </div>
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-10">Architected by Digital</p>
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-10 mt-2 italic">Socials &copy; {new Date().getFullYear()}</p>
        </footer>

      </div>
    </div>
  );
}