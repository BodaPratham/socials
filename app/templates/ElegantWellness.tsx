"use client";

import React from 'react';
import { 
  Instagram, Youtube, Twitter, Linkedin, Facebook, 
  MapPin, Star, Mail, Phone, ChevronRight, 
  ArrowUpRight, Share2, Globe, Heart
} from 'lucide-react';

export default function ElegantWellness({ profile, links = [], products = [] }: any) {
  const config = profile?.design_config || {};
  const currencySign = config.currency || "$";
  
  // DESIGN TOKENS
  const bgColor = config.bgColor || '#F5F2EE'; 
  const pageFont = config.pageFont || 'Playfair Display'; 
  const pageTextColor = config.pageTextColor || '#2D2D2D';
  const btnColor = config.btnColor || '#8E7D6F'; 
  
  const getSocialIcon = (link: any, size = 20) => {
    const type = link?.icon_type?.toLowerCase() || "";
    const u = link?.url?.toLowerCase() || "";
    if (type === 'email' || u.includes('mailto:')) return <Mail size={size} />;
    if (type === 'phone' || u.includes('tel:')) return <Phone size={size} />;
    if (type === 'instagram' || u.includes('instagram.com')) return <Instagram size={size} />;
    if (type === 'youtube' || u.includes('youtube.com')) return <Youtube size={size} />;
    return <Globe size={size} />;
  };

  const socialLinks = links?.filter((l: any) => l.type === 'social');
  const mainLinks = links?.filter((l: any) => l.type !== 'social');

  return (
    <div 
      className="min-h-screen w-full relative selection:bg-[#EDE4DC] selection:text-black overflow-x-hidden" 
      style={{ backgroundColor: bgColor, fontFamily: pageFont, color: pageTextColor }}
    >
      <link href={`https://fonts.googleapis.com/css2?family=${pageFont.replace(/ /g, '+')}:ital,wght@0,100..900;1,100..900&display=swap`} rel="stylesheet" />
      
      <div className="w-full max-w-[430px] mx-auto min-h-screen shadow-2xl flex flex-col relative pb-32">
        
        {/* HEADER / HERO */}
        <header className="pt-20 pb-12 px-8 text-center flex flex-col items-center">
           <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                 {profile?.avatar_url ? (
                    <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Profile" />
                 ) : (
                    <div className="w-full h-full bg-[#E8E1D9] flex items-center justify-center text-zinc-400">
                       <Heart size={40} />
                    </div>
                 )}
              </div>
              <div className="absolute -inset-4 bg-white/20 blur-2xl rounded-full opacity-50" />
           </div>
           
           <h1 className="text-2xl font-bold tracking-tight mb-3">
              {profile?.display_name || profile?.c_username}
           </h1>
           <p className="text-xs uppercase tracking-[0.2em] opacity-40 font-bold mb-6">
              Skin Edit & Aesthetics
           </p>
           <p className="text-sm leading-relaxed opacity-70 px-4 max-w-[320px]">
              {profile?.bio || "Dive into the unveiling of skin and aesthetic edits using exclusive clean and rituals that will guide you on your journey."}
           </p>

           <div className="flex justify-center gap-6 mt-10">
              {socialLinks.map((s: any) => (
                <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">
                   {getSocialIcon(s, 18)}
                </a>
              ))}
           </div>
        </header>

        {/* FEATURED CARDS */}
        <div className="px-5 space-y-6">
           {mainLinks.map((link: any) => {
              if (link.type === 'image' || link.type === 'shop' || link.type === 'standard') {
                 return (
                   <a 
                     key={link.id} 
                     href={link.url} 
                     target="_blank" 
                     rel="noreferrer"
                     className="group block bg-white/40 backdrop-blur-xl border border-white/60 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                   >
                      <div className="flex">
                         {link.url && (link.url.includes('jpg') || link.url.includes('png')) ? (
                            <div className="w-32 h-32 shrink-0 overflow-hidden bg-zinc-100 border-r border-white/10">
                               <img src={link.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={link.title} />
                            </div>
                         ) : (
                            <div className="w-32 h-32 shrink-0 bg-[#E8E1D9] flex items-center justify-center opacity-20">
                               <Globe size={40} />
                            </div>
                         )}
                         <div className="p-6 flex flex-col justify-center flex-1">
                            <h3 className="font-bold text-[15px] group-hover:text-amber-900 transition-colors">{link.title}</h3>
                            <p className="text-[11px] opacity-40 mt-1 line-clamp-2 italic">Book an appointment or view details.</p>
                         </div>
                      </div>
                   </a>
                 );
              }
              return null;
           })}
        </div>

        {/* PRODUCTS SECTION (SCROLLABLE GRID) */}
        {products?.length > 0 && (
           <section className="mt-16 px-5 pb-20">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30 text-center mb-10">Popular Packages</h4>
              <div className="flex overflow-x-auto gap-4 no-scrollbar pb-8 px-4 -mx-5 select-none touch-pan-x">
                 {products.map((p: any) => (
                    <div key={p.id} className="min-w-[280px] bg-white/40 backdrop-blur-md rounded-[3rem] p-4 border border-white/60 shadow-lg shrink-0">
                       <div className="w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 relative">
                          {p.image_url ? (
                             <img src={p.image_url} className="w-full h-full object-cover" alt={p.name} />
                          ) : (
                             <div className="w-full h-full bg-[#E8E1D9]" />
                          )}
                          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase">
                             15% OFF
                          </div>
                       </div>
                       <div className="text-center px-4 pb-4">
                          <h5 className="font-bold text-lg mb-1">{p.name}</h5>
                          <p className="text-[11px] opacity-40 leading-relaxed truncate">{p.description || "Premium ritual for glow"}</p>
                          <a 
                            href={p.destination_url} target="_blank" rel="noreferrer"
                            className="mt-6 inline-block w-full py-4 rounded-full text-[11px] font-black uppercase tracking-widest text-white shadow-xl hover:scale-105 transition-all"
                            style={{ backgroundColor: btnColor }}
                          >
                             Shop Now
                          </a>
                       </div>
                    </div>
                 ))}
              </div>
           </section>
        )}

        {/* FOOTER */}
        <footer className="mt-auto px-10 py-12 text-center border-t border-white/20 mx-10">
           <p className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-20">Architected by Digital</p>
        </footer>

      </div>
    </div>
  );
}
