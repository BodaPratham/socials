"use client";

import React from 'react';
import { 
  Instagram, Youtube, Twitter, Linkedin, Facebook, 
  Globe, Play, ShoppingBag, Heart, ExternalLink, 
  ImageIcon, Type, Users, Link2, DollarSign, CreditCard,
  Mail, Phone, Share2, Music, Video, MessageCircle, MapPin,
  ArrowRight, ArrowUpRight, Plus, Star, Zap, ChevronRight,
  Send, Smartphone, Coffee, Camera, Layers, Monitor,
  Trello, Github, Figma, Disc, Briefcase, Award, GraduationCap
} from 'lucide-react';

export default function CreatorPro({ profile, links = [], products = [] }: any) {
  const config = profile?.design_config || {};
  
  // DESIGN TOKENS
  const bgColor = config.bgColor || '#0A0A0A'; // Deep Black
  const pageFont = config.pageFont || 'Montserrat'; 
  const pageTextColor = config.pageTextColor || '#FFFFFF';
  const btnColor = config.btnColor || '#FFFFFF';
  const btnTextColor = config.btnTextColor || '#000000';
  const bgImage = config.bgImage;
  const buttonRoundness = config.buttonRoundness || 'Round';

  // STATS & SECTIONS (CREATOR SPECIFIC)
  const stats = config.stats || [
    { label: 'Followers', value: '1.2M' },
    { label: 'Projects', value: '150+' },
    { label: 'Awards', value: '12' }
  ];

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
    if (type === 'linkedin' || u.includes('linkedin.com')) return <Linkedin size={size} />;
    if (type === 'x' || type === 'twitter' || u.includes('twitter.com') || u.includes('x.com')) return <Twitter size={size} />;
    if (type === 'tiktok' || u.includes('tiktok.com')) return <Music size={size} />;
    if (type === 'github' || u.includes('github.com')) return <Github size={size} />;
    if (type === 'figma' || u.includes('figma.com')) return <Figma size={size} />;
    
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
      className="min-h-screen w-full relative selection:bg-zinc-800 selection:text-white" 
      style={{ 
        backgroundColor: bgColor, 
        fontFamily: pageFont,
        color: pageTextColor 
      }}
    >
      <link href={`https://fonts.googleapis.com/css2?family=${pageFont.replace(/ /g, '+')}:ital,wght@0,100..900;1,100..900&display=swap`} rel="stylesheet" />
      
      {/* GLOBAL BACKGROUND ELEMENTS */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full" />
         {bgImage && (
           <img src={bgImage} className="w-full h-full object-cover opacity-10 grayscale" style={{ filter: config.wallpaperStyle === 'Blur' ? 'blur(20px)' : 'none' }} alt="" />
         )}
      </div>

      {/* MOBILE CENTERED WRAPPER */}
      <div className="relative z-10 w-full max-w-[500px] mx-auto min-h-screen shadow-2xl pb-32 border-x overflow-hidden" 
      style={{ backgroundColor: `${bgColor}E0`, borderColor: `${pageTextColor}10` }}>
        
        {/* HERO BANNER SECTION */}
        <div className="relative w-full h-[30dvh] overflow-hidden">
           {profile?.cover_url ? (
             <img src={profile.cover_url} className="w-full h-full object-cover" alt="Banner" />
           ) : (
             <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center opacity-40">
                <Layers size={80} />
             </div>
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        {/* OVERLAPPING PROFILE SECTION */}
        <div className="px-8 -mt-20 relative z-20">
           <div className="flex items-end gap-6">
              <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 shadow-2xl transition-transform hover:scale-105 duration-500" style={{ borderColor: bgColor }}>
                 {profile?.avatar_url ? (
                   <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Profile" />
                 ) : (
                   <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                      <Star size={40} className="text-white/10" />
                   </div>
                 )}
              </div>
              <div className="pb-2 space-y-1">
                 <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">{profile?.c_username || "CREATIVE PRO"}</h1>
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Digital Architect</p>
              </div>
           </div>

           <div className="mt-10 space-y-6">
              <p className="text-sm font-bold opacity-60 leading-relaxed italic border-l-2 pl-6" style={{ borderColor: `${pageTextColor}20` }}>
                 {profile?.bio || "Pushing boundaries at the intersection of design and technology. Creating high-fidelity digital experiences."}
              </p>

              {/* SOCIAL CHIPS */}
              <div className="flex flex-wrap gap-3">
                 {socialRowLinks?.map((s: any) => (
                    <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white hover:text-black hover:scale-110 active:scale-95 transition-all">
                       {getSocialIcon(s, 18)}
                    </a>
                 ))}
              </div>
           </div>
        </div>

        {/* STATS SECTION */}
        <section className="mt-20 px-8">
           <div className="grid grid-cols-3 gap-4 p-8 bg-white/5 rounded-[2.5rem] border border-white/10 shadow-2xl backdrop-blur-md">
              {stats.map((stat: any, idx: number) => (
                 <div key={idx} className="text-center space-y-1">
                    <p className="text-xl font-black tracking-tighter">{stat.value}</p>
                    <p className="text-[8px] font-black uppercase tracking-[0.2em] opacity-30">{stat.label}</p>
                 </div>
              ))}
           </div>
        </section>

        {/* PRODUCT HIGHLIGHTS (PORTFOLIO) */}
        {products && products.length > 0 && (
           <section className="mt-24 px-8 space-y-10">
              <div className="flex items-center justify-between border-b pb-6" style={{ borderBottomColor: `${pageTextColor}10` }}>
                 <h2 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30">Featured Work</h2>
                 <ArrowUpRight size={14} className="opacity-20" />
              </div>
              <div className="grid grid-cols-1 gap-6">
                 {products.map((p: any) => (
                    <a key={p.id} href={`/${profile.c_username}/checkout?type=product&id=${p.id}`} className="group block relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                       {p.image_url ? (
                          <img src={p.image_url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100" alt="" />
                       ) : <Briefcase size={32} className="absolute inset-0 m-auto opacity-10" />}
                       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                       <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                          <div className="space-y-1">
                             <h4 className="text-lg font-black uppercase tracking-tight">{p.name}</h4>
                             <p className="text-[9px] font-black opacity-40 uppercase tracking-widest">Case Study</p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center shadow-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-all">
                             <ArrowUpRight size={18} />
                          </div>
                       </div>
                    </a>
                 ))}
              </div>
           </section>
        )}

        {/* DYNAMIC BLOCKS SECTION */}
        <section className="mt-24 px-8 space-y-10">
           {mainContentLinks?.map((link: any) => {
              
              if (link.type === 'title') {
                 return (
                    <div key={link.id} className="pt-10 flex items-center gap-4">
                       <h3 className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.5em] opacity-30 italic">{link.title}</h3>
                       <div className="h-[1px] w-full bg-white/10" />
                    </div>
                 );
              }

              if (link.type === 'tip') {
                return (
                   <div key={link.id} className={`p-10 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 shadow-2xl text-center space-y-8 group ${getButtonShapeClasses()}`}>
                      <div className="space-y-2">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20">Direct Support</h4>
                         <h3 className="text-3xl font-black tracking-tighter uppercase italic">{link.title || "Gratitude Jar"}</h3>
                      </div>
                      <button 
                        onClick={() => profile?.upi_id && (window.location.href = `upi://pay?pa=${profile.upi_id}`)}
                        className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl ${getButtonShapeClasses()}`}
                       style={{ backgroundColor: btnColor, color: btnTextColor }}
                      >
                         Send Gratitude
                      </button>
                   </div>
                );
              }

              if (link.type === 'youtube') {
                 const vidId = getYoutubeId(link.url);
                 return vidId ? (
                   <div key={link.id} className={`w-full aspect-video overflow-hidden shadow-2xl relative border border-white/10 ${getButtonShapeClasses()}`}>
                      <iframe className="w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" src={`https://www.youtube.com/embed/${vidId}`} frameBorder="0" allowFullScreen />
                   </div>
                 ) : null;
              }

              if (link.type === 'instagram') {
                 const username = link.url?.replace('@', '').split('/').pop() || "instagram";
                 return (
                    <div key={link.id} className={`p-8 border border-white/10 shadow-2xl space-y-8 bg-white/5 backdrop-blur-md ${getButtonShapeClasses()}`}>
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center border border-white/10 shadow-inner">
                                <Instagram size={24} />
                             </div>
                             <h4 className="text-sm font-bold italic tracking-tight">@{username}</h4>
                          </div>
                          <a href={`https://instagram.com/${username}`} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-90 transition-all"><ArrowUpRight size={18} /></a>
                       </div>
                    </div>
                 );
              }

              if (link.type === 'image') {
                 return (
                    <div key={link.id} className={`w-full aspect-square overflow-hidden shadow-2xl border border-white/10 p-2 ${getButtonShapeClasses()}`}>
                       <img src={link.url} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110 grayscale hover:grayscale-0" alt="" />
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
                    className={`flex items-center justify-between p-6 sm:p-7 border transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] shadow-2xl ${getButtonShapeClasses()}`} 
                    style={{ backgroundColor: `rgba(255,255,255,0.03)`, borderColor: `rgba(255,255,255,0.08)` }}
                 >
                    <div className="space-y-1">
                       <h4 className="text-lg font-black tracking-tighter uppercase italic leading-none">{link.title}</h4>
                       <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-20">{link.url?.replace(/^https?:\/\//, '').split('/')[0]}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center opacity-20 border border-white/5 transition-all">
                       <ArrowRight size={20} />
                    </div>
                 </a>
              );
           })}
        </section>

        {/* FOOTER */}
        <footer className="mt-56 border-t py-32 flex flex-col items-center gap-12" style={{ borderTopColor: `${pageTextColor}10` }}>
              <div className="text-center space-y-6">
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20">Architected by Digital</p>
                 <div className="flex flex-col items-center justify-center gap-6">
                    <div className="w-14 h-14 rounded-[1.2rem] bg-white flex items-center justify-center text-black text-xl font-black italic shadow-2xl border-4 border-white/10">S</div>
                    <span className="text-sm font-black tracking-[0.3em] uppercase" style={{ color: pageTextColor }}>Socials <span className="opacity-20 italic">Pro</span></span>
                 </div>
              </div>
              <a href="/" className="px-10 py-4 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">Create your space</a>
          </footer>
      </div>
    </div>
  );
}