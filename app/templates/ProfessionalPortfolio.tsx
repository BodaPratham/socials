"use client";

import React from 'react';
import { 
  Instagram, Youtube, Twitter, Linkedin, Facebook, 
  ArrowUpRight, Share2, Globe, Shield, Zap, Search,
  Menu, X, ExternalLink, Play, ShoppingBag, ArrowRight
} from 'lucide-react';

export default function ProfessionalPortfolio({ profile, links = [], products = [] }: any) {
  const config = profile?.design_config || {};
  const currencySign = config.currency || "$";
  
  // DESIGN TOKENS
  const bgColor = config.bgColor || '#000000'; 
  const pageFont = config.pageFont || 'Inter'; 
  const pageTextColor = config.pageTextColor || '#FFFFFF';
  const btnColor = config.btnColor || '#38BDF8'; 
  
  const getSocialIcon = (link: any, size = 20) => {
    const type = link?.icon_type?.toLowerCase() || "";
    const u = link?.url?.toLowerCase() || "";
    if (type === 'instagram' || u.includes('instagram.com')) return <Instagram size={size} />;
    if (type === 'youtube' || u.includes('youtube.com')) return <Youtube size={size} />;
    if (type === 'linkedin' || u.includes('linkedin.com')) return <Linkedin size={size} />;
    if (type === 'x' || u.includes('twitter.com') || u.includes('x.com')) return <Twitter size={size} />;
    return <Globe size={size} />;
  };

  const socialLinks = links?.filter((l: any) => l.type === 'social');
  const mainLinks = links?.filter((l: any) => l.type !== 'social');

  return (
    <div 
      className="min-h-screen w-full relative selection:bg-sky-900 selection:text-white overflow-x-hidden" 
      style={{ backgroundColor: bgColor, fontFamily: pageFont, color: pageTextColor }}
    >
      <link href={`https://fonts.googleapis.com/css2?family=${pageFont.replace(/ /g, '+')}:ital,wght@0,100..900;1,100..900&display=swap`} rel="stylesheet" />
      
      <div className="w-full max-w-[430px] mx-auto min-h-screen shadow-2xl flex flex-col relative pb-40">
        
        {/* TOP BAR */}
        <div className="flex justify-between items-center p-6 bg-black/40 backdrop-blur-md sticky top-0 z-50">
           <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <Zap size={14} style={{ color: btnColor }} />
           </div>
           <div className="flex gap-4">
              <Search size={20} className="opacity-40" />
              <Menu size={20} className="opacity-40" />
           </div>
        </div>

        {/* HERO SECTION */}
        <header className="pt-10 pb-12 px-8 flex flex-col items-center text-center">
           <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-white/5 bg-zinc-900 shadow-2xl relative p-1">
              {profile?.avatar_url ? (
                 <img src={profile.avatar_url} className="w-full h-full object-cover rounded-full" alt="Profile" />
              ) : (
                 <div className="w-full h-full flex items-center justify-center text-zinc-800">
                    <Zap size={32} />
                 </div>
              )}
           </div>
           
           <div className="flex items-center gap-2 mb-2">
              <h1 className="text-xl font-black uppercase tracking-tight">
                {profile?.display_name || profile?.c_username}
              </h1>
              <div className="w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center p-0.5">
                 <Shield size={10} className="text-white fill-white" />
              </div>
           </div>
           
           <p className="text-xs opacity-50 font-bold mb-8 max-w-[280px] leading-relaxed">
              {profile?.bio || "Work smarter. Smart workspace + Personal AI built for how you actually work."}
           </p>

           <div className="flex justify-center gap-8 mb-12">
              {socialLinks.map((s: any) => (
                <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="opacity-60 hover:opacity-100 hover:scale-110 transition-all">
                   {getSocialIcon(s, 20)}
                </a>
              ))}
           </div>
        </header>

        {/* LARGE IMAGE BLOCKS (PRODUCTS) */}
        <div className="px-5 space-y-12">
           {products?.slice(0, 4).map((p: any) => (
              <div key={p.id} className="group flex flex-col gap-6">
                 <div className="w-full aspect-[16/10] rounded-[2rem] overflow-hidden bg-zinc-900 border border-white/5 relative shadow-2xl">
                    {p.image_url ? (
                       <img src={p.image_url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={p.name} />
                    ) : (
                       <div className="w-full h-full bg-zinc-800" />
                    )}
                    {p.price > 0 && (
                       <div className="absolute top-4 right-4 bg-orange-600 text-white font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-widest">
                          NEW
                       </div>
                    )}
                 </div>
                 <div className="text-center flex flex-col items-center">
                    <h3 className="text-[15px] font-black uppercase tracking-widest mb-1">{p.name}</h3>
                    <p className="text-[11px] opacity-40 leading-relaxed max-w-[320px] mb-6">{p.description || "Everything you need for a smarter workspace."}</p>
                    <a 
                      href={p.destination_url} target="_blank" rel="noreferrer"
                      className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#000000] transition-all hover:scale-105 active:scale-95"
                      style={{ backgroundColor: btnColor }}
                    >
                       Browse All
                    </a>
                 </div>
              </div>
           ))}
        </div>

        {/* FEED / LINKS SECTION */}
        {mainLinks?.length > 0 && (
           <section className="mt-24 px-5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20 text-center mb-10">Links / Items</h4>
              <div className="space-y-4">
                 {mainLinks.map((link: any) => (
                    <a 
                      key={link.id} 
                      href={link.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center justify-between p-6 rounded-3xl bg-zinc-900/40 border border-white/5 hover:bg-zinc-800/40 transition-all group"
                    >
                       <span className="text-sm font-bold opacity-80 group-hover:opacity-100">{link.title}</span>
                       <ArrowRight size={16} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </a>
                 ))}
              </div>
           </section>
        )}

        {/* FOOTER */}
        <footer className="mt-20 px-10 py-20 text-center bg-zinc-950">
           <div className="flex justify-center mb-8">
              <div className="w-12 h-12 rounded-full border-4 border-white/10 flex items-center justify-center opacity-20">
                 <Zap size={20} />
              </div>
           </div>
           <p className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-20">Architected by Digital</p>
        </footer>

      </div>
    </div>
  );
}
