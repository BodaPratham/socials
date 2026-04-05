"use client";

import React from 'react';
import { 
  Instagram, Youtube, Twitter, Linkedin, Facebook, 
  Globe, Play, ShoppingBag, Heart, ExternalLink, 
  ImageIcon, Type, Users, Link2, DollarSign, CreditCard,
  Mail, Phone, Share2, Music, Video, MessageCircle, MapPin,
  ArrowRight, ArrowUpRight, Plus, Star, Zap, ChevronRight,
  Send, Smartphone, Coffee, Camera, Layers, Monitor,
  Trello, Github, Figma, Disc, Rocket, Flame, Target
} from 'lucide-react';

export default function Dhurndhar({ profile, links = [], products = [] }: any) {
  const config = profile?.design_config || {};
  
  // DESIGN TOKENS
  const bgColor = config.bgColor || '#FFD600'; // Vibrant Yellow
  const pageFont = config.pageFont || 'Montserrat'; 
  const pageTextColor = config.pageTextColor || '#000000';
  const btnColor = config.btnColor || '#000000';
  const btnTextColor = config.btnTextColor || '#FFFFFF';
  const bgImage = config.bgImage;
  const buttonRoundness = config.buttonRoundness || 'Round';

  const socialRowLinks = links?.filter((l: any) => l.type === 'social');
  const mainContentLinks = links?.filter((l: any) => l.type !== 'social');

  const getYoutubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const trackClick = async (linkId: string) => {
    const { createClient } = require("@/utils/supabase/client");
    const supabase = createClient();
    await supabase.from('link_clicks').insert({ user_id: profile.id, link_id: linkId });
  };

  const getSocialIcon = (link: any, size = 18) => {
    const type = link?.icon_type?.toLowerCase() || "";
    const u = link?.url?.toLowerCase() || "";
    
    if (type === 'instagram' || u.includes('instagram.com')) return <Instagram size={size} />;
    if (type === 'youtube' || u.includes('youtube.com')) return <Youtube size={size} />;
    if (type === 'x' || type === 'twitter' || u.includes('twitter.com') || u.includes('x.com')) return <Twitter size={size} />;
    if (type === 'tiktok' || u.includes('tiktok.com')) return <Music size={size} />;
    if (type === 'linkedin' || u.includes('linkedin.com')) return <Linkedin size={size} />;
    
    return <Link2 size={size} />;
  };

  const getButtonShapeClasses = () => {
    if (buttonRoundness === 'Square') return 'rounded-none';
    if (buttonRoundness === 'Round') return 'rounded-2xl';
    if (buttonRoundness === 'Rounder') return 'rounded-[2.5rem]';
    return 'rounded-full';
  };

  return (
    <div 
      className="min-h-screen w-full relative selection:bg-black selection:text-yellow-400" 
      style={{ 
        backgroundColor: bgColor, 
        fontFamily: pageFont,
        color: pageTextColor 
      }}
    >
      <link href={`https://fonts.googleapis.com/css2?family=${pageFont.replace(/ /g, '+')}:ital,wght@0,100..900;1,100..900&display=swap`} rel="stylesheet" />
      
      {/* GLOBAL BACKGROUND TEXT */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-[0.03]">
         <div className="absolute top-0 left-0 text-[30vw] font-black leading-none uppercase tracking-tighter mix-blend-overlay">DHURNDHAR</div>
         <div className="absolute bottom-0 right-0 text-[30vw] font-black leading-none uppercase tracking-tighter mix-blend-overlay">DHURNDHAR</div>
      </div>

      {bgImage && (
        <div className="fixed inset-0 z-0 overflow-hidden">
           <img src={bgImage} className="w-full h-full object-cover" style={{ filter: config.wallpaperStyle === 'Blur' ? 'blur(20px)' : 'none', opacity: 0.1 }} alt="" />
        </div>
      )}

      {/* MOBILE CENTERED WRAPPER */}
      <div className="relative z-10 w-full max-w-[500px] mx-auto min-h-screen shadow-2xl pb-32 border-x overflow-hidden" 
      style={{ backgroundColor: `${bgColor}EF`, borderColor: `${pageTextColor}10` }}>
        
        {/* HERO BANNER SECTION */}
        <div className="relative w-full h-[40dvh] overflow-hidden">
           {profile?.cover_url ? (
             <img src={profile.cover_url} className="w-full h-full object-cover" alt="Banner" />
           ) : (
             <div className="w-full h-full bg-black flex items-center justify-center">
                <Rocket size={100} className="text-yellow-400" />
             </div>
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
           
           {/* Overlapping Profile Badge - Brutalist Style */}
           <div className="absolute -bottom-16 left-8 p-1 bg-black shadow-2xl z-20">
              <div className="w-32 h-32 overflow-hidden border-4 border-black">
                 {profile?.avatar_url ? (
                   <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Profile" />
                 ) : (
                   <div className="w-full h-full bg-yellow-400 flex items-center justify-center text-black">
                      <Flame size={48} />
                   </div>
                 )}
              </div>
           </div>
        </div>

        {/* INFO SECTION */}
        <section className="w-full pt-24 px-8 flex flex-col items-start gap-6">
           <div className="space-y-1">
              <h1 className="text-5xl font-black tracking-tighter uppercase leading-none italic skew-x-[-10deg]">{profile?.c_username || "DHURNDHAR"}</h1>
              <div className="flex items-center gap-2">
                 <div className="w-12 h-2 bg-black" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">High Performance</span>
              </div>
           </div>
           
           <p className="max-w-md text-sm font-black uppercase leading-tight italic opacity-60">
              {profile?.bio || "Redefining the creative workflow. Extreme precision, uncompromising quality, and bold digital solutions."}
           </p>

           <div className="flex gap-4 pt-4">
              {socialRowLinks?.map((s: any) => (
                 <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="w-12 h-12 flex items-center justify-center bg-black text-white hover:scale-110 active:scale-95 transition-all">
                    {getSocialIcon(s, 22)}
                 </a>
              ))}
           </div>
        </section>

        {/* PRODUCT SECTION (HIGHLIGHTS) */}
        {products && products.length > 0 && (
           <section className="mt-24 px-8 space-y-10">
              <div className="flex items-center justify-between border-b-4 border-black pb-4">
                 <h2 className="text-sm font-black uppercase tracking-[0.5em]">The Armoury</h2>
                 <Target size={20} />
              </div>
              <div className="grid grid-cols-1 gap-8">
                 {products.map((p: any) => (
                    <a key={p.id} href={`/${profile.c_username}/checkout?type=product&id=${p.id}`} className="group block relative aspect-square overflow-hidden border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                       {p.image_url ? (
                          <img src={p.image_url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                       ) : <ShoppingBag size={48} className="absolute inset-0 m-auto opacity-10" />}
                       <div className="absolute top-6 left-6 p-3 px-5 bg-black text-white text-xs font-black tracking-widest skew-x-[-10deg]">
                          ₹{p.price}
                       </div>
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                          <span className="text-white font-black uppercase tracking-[0.4em] italic text-xl border-b-4 border-white">Acquire Now</span>
                       </div>
                    </a>
                 ))}
              </div>
           </section>
        )}

        {/* DYNAMIC BLOCKS SECTION */}
        <section className="mt-24 px-8 space-y-8">
           {mainContentLinks?.map((link: any) => {
              
              if (link.type === 'title') {
                 return (
                    <div key={link.id} className="pt-10 flex items-center justify-center">
                       <h3 className="text-xl font-black uppercase tracking-[0.5em] italic skew-x-[-10deg] border-y-2 border-black py-4 px-8">{link.title}</h3>
                    </div>
                 );
              }

              if (link.type === 'tip') {
                return (
                   <div key={link.id} className={`p-10 bg-black text-white shadow-[12px_12px_0px_0px_rgba(255,214,0,1)] border-4 border-black text-center space-y-8 group ${getButtonShapeClasses()}`}>
                      <div className="space-y-2">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-yellow-400">Battle Support</h4>
                         <h3 className="text-3xl font-black tracking-tighter uppercase italic skew-x-[-10deg]">{link.title || "Tribute"}</h3>
                      </div>
                      <button 
                        onClick={() => profile?.upi_id && (window.location.href = `upi://pay?pa=${profile.upi_id}`)}
                        className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl bg-yellow-400 text-black ${getButtonShapeClasses()}`}
                      >
                         Send Tribute
                      </button>
                   </div>
                );
              }

              if (link.type === 'youtube') {
                 const vidId = getYoutubeId(link.url);
                 return vidId ? (
                   <div key={link.id} className={`w-full aspect-video overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] border-8 border-black relative ${getButtonShapeClasses()}`}>
                      <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${vidId}`} frameBorder="0" allowFullScreen />
                   </div>
                 ) : null;
              }

              if (link.type === 'instagram') {
                 const username = link.url?.replace('@', '').split('/').pop() || "instagram";
                 return (
                    <div key={link.id} className={`p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] space-y-6 bg-white ${getButtonShapeClasses()}`}>
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white">
                                <Instagram size={24} />
                             </div>
                             <h4 className="text-lg font-black italic tracking-tighter">@{username}</h4>
                          </div>
                          <a href={`https://instagram.com/${username}`} className="w-12 h-12 bg-black text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all"><ArrowUpRight size={20} /></a>
                       </div>
                    </div>
                 );
              }

              if (link.type === 'image') {
                 return (
                    <div key={link.id} className={`w-full aspect-square overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] border-8 border-black p-2 ${getButtonShapeClasses()}`}>
                       <img src={link.url} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" alt="" />
                    </div>
                 );
              }

              // SHOP BLOCK (Inline Product Card - Brutalist Style)
              if (link.type === 'shop') {
                // Try multiple matching strategies: by ID, then by name
                const product = products?.find((p: any) => p.id === link.url) 
                  || products?.find((p: any) => p.name === link.title)
                  || (products?.length === 1 ? products[0] : null);
                
                const displayName = product?.name || link.title || 'Product';
                const displayPrice = product?.price || '—';
                const displayImage = product?.image_url;
                const displayDesc = product?.description;
                const checkoutUrl = product 
                  ? `/${profile?.c_username}/checkout?type=product&id=${product.id}`
                  : '#';

                return (
                  <a 
                    key={link.id}
                    href={checkoutUrl}
                    onClick={() => trackClick(link.id)}
                    className={`group block relative overflow-hidden border-[6px] border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all bg-white ${getButtonShapeClasses()}`}
                  >
                    <div className="aspect-[16/10] relative overflow-hidden bg-zinc-100">
                      {displayImage ? (
                        <img src={displayImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={displayName} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag size={48} className="opacity-10" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 p-3 px-5 bg-black text-white text-xs font-black tracking-widest skew-x-[-10deg]">
                        ₹{displayPrice}
                      </div>
                    </div>
                    <div className="p-6 flex items-center justify-between">
                      <div className="flex-1 min-w-0 pr-4">
                        <h4 className="text-lg font-black uppercase tracking-tighter italic truncate">{displayName}</h4>
                        {displayDesc && (
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mt-1 truncate">{displayDesc}</p>
                        )}
                      </div>
                      <div className="w-12 h-12 bg-black text-white flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-700">
                        <ArrowRight size={22} />
                      </div>
                    </div>
                  </a>
                );
              }

              // TEXT BLOCK
              if (link.type === 'text') {
                return (
                  <div key={link.id} className="px-2 py-4">
                    <p className="text-sm font-black uppercase italic leading-relaxed opacity-60 whitespace-pre-line">{link.url}</p>
                  </div>
                );
              }

              return (
                 <a 
                    key={link.id} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    onClick={() => trackClick(link.id)}
                    className={`flex items-center justify-between p-7 border-[6px] border-black bg-white group shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all ${getButtonShapeClasses()}`}
                 >
                    <div className="space-y-1">
                       <h4 className="text-xl font-black tracking-tighter uppercase italic leading-none">{link.title}</h4>
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">{link.url?.replace(/^https?:\/\//, '').split('/')[0]}</p>
                    </div>
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-700">
                       <ArrowRight size={22} />
                    </div>
                 </a>
              );
           })}
        </section>

        {/* FOOTER */}
        <footer className="mt-56 border-t-8 border-black py-32 flex flex-col items-center gap-12 bg-black text-white">
              <div className="text-center space-y-6">
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40 italic">Architected by Digital</p>
                 <div className="flex flex-col items-center justify-center gap-6">
                    <div className="w-20 h-20 bg-yellow-400 flex items-center justify-center text-black text-4xl font-black italic skew-x-[-10deg]">S</div>
                    <span className="text-xl font-black tracking-[0.2em] uppercase italic">Socials <span className="text-yellow-400">Pro</span></span>
                 </div>
              </div>
              <a href="/" className="px-12 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.4em] italic shadow-[0px_0px_40px_rgba(255,214,0,0.3)] hover:scale-105 active:scale-95 transition-all">Join the Revolution</a>
          </footer>
      </div>
    </div>
  );
}