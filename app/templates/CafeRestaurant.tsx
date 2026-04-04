"use client";

import React from 'react';
import { 
  Instagram, Youtube, Twitter, Linkedin, Facebook, 
  Globe, Play, ShoppingBag, Heart, ExternalLink, 
  ImageIcon, Type, Users, Link2, DollarSign, CreditCard,
  Mail, Phone, Share2, Music, Video, MessageCircle, MapPin,
  ArrowRight, ArrowUpRight, Plus, Star, Zap, ChevronRight,
  Send, Smartphone, Coffee, Camera, Layers, Monitor,
  Trello, Github, Figma, Disc, Utensils, Clock
} from 'lucide-react';

export default function CafeRestaurant({ profile, links = [], products = [] }: any) {
  const config = profile?.design_config || {};
  
  // DESIGN TOKENS
  const bgColor = config.bgColor || '#FDFCF8'; // Creamy White
  const pageFont = config.pageFont || 'Montserrat'; 
  const pageTextColor = config.pageTextColor || '#1A1A1A';
  const btnColor = config.btnColor || '#1A1A1A';
  const btnTextColor = config.btnTextColor || '#FFFFFF';
  const bgImage = config.bgImage;
  const logoUrl = config.logoUrl;
  const buttonRoundness = config.buttonRoundness || 'Round';

  // MENU DATA (CAFE SPECIFIC)
  const menuCategories = config.menuCategories || ['Signature Drinks', 'Handcrafted Pastries'];
  const menuItems = products || [];

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
    if (type === 'facebook' || u.includes('facebook.com')) return <Facebook size={size} />;
    if (type === 'linkedin' || u.includes('linkedin.com')) return <Linkedin size={size} />;
    if (type === 'x' || type === 'twitter' || u.includes('twitter.com') || u.includes('x.com')) return <Twitter size={size} />;
    if (type === 'phone' || u.includes('tel:')) return <Phone size={size} />;
    if (type === 'email' || u.includes('mailto:')) return <Mail size={size} />;
    
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
      className="min-h-screen w-full relative selection:bg-amber-100 selection:text-amber-900" 
      style={{ 
        backgroundColor: bgColor, 
        fontFamily: pageFont,
        color: pageTextColor 
      }}
    >
      <link href={`https://fonts.googleapis.com/css2?family=${pageFont.replace(/ /g, '+')}:ital,wght@0,100..900;1,100..900&display=swap`} rel="stylesheet" />
      
      {/* GLOBAL BACKGROUND */}
      {bgImage && (
        <div className="fixed inset-0 z-0 overflow-hidden opacity-10">
           <img src={bgImage} className="w-full h-full object-cover" style={{ filter: config.wallpaperStyle === 'Blur' ? 'blur(15px)' : 'none' }} alt="" />
        </div>
      )}

      {/* MOBILE CONTENT WRAPPER */}
      <div className="relative z-10 w-full max-w-[500px] mx-auto min-h-screen shadow-2xl pb-32 border-x overflow-hidden" 
      style={{ backgroundColor: `${bgColor}F0`, borderColor: `${pageTextColor}10` }}>
        
        {/* HERO SECTION */}
        <div className="relative w-full h-[35dvh] overflow-hidden bg-stone-100">
           {profile?.cover_url ? (
             <img src={profile.cover_url} className="w-full h-full object-cover" alt="Ambience" />
           ) : (
             <div className="w-full h-full bg-stone-200 flex items-center justify-center opacity-30">
                <Utensils size={64} />
             </div>
           )}
           <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* PROFILE OVERLAP BADGE */}
        <div className="px-8 -mt-24 relative z-20 flex flex-col items-center">
           <div className="w-40 h-40 rounded-full border-[10px] shadow-2xl overflow-hidden bg-white" style={{ borderColor: bgColor }}>
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Brand Logo" />
              ) : (
                <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-300">
                  <Coffee size={60} />
                </div>
              )}
           </div>
           
           <div className="mt-8 text-center space-y-3">
              <h1 className="text-3xl font-black tracking-tighter uppercase italic">{profile?.c_username || "THE ARTISAN CUP"}</h1>
              <div className="flex items-center justify-center gap-3">
                 <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-full border border-amber-100">
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-black uppercase text-amber-900 tracking-widest">Premium Choice</span>
                 </div>
              </div>
              <p className="max-w-xs mx-auto text-sm font-bold opacity-50 italic leading-relaxed pt-2">
                 {profile?.bio || "Crafting moments through exceptional roasts and authentic flavors. Experience the art of culinary precision."}
              </p>
           </div>

           {/* SOCIAL CHIPS */}
           <div className="flex flex-wrap justify-center gap-3 mt-10">
              {socialRowLinks?.map((s: any) => (
                 <a 
                   key={s.id} 
                   href={s.url} 
                   target="_blank" 
                   rel="noreferrer" 
                   className="w-12 h-12 flex items-center justify-center rounded-2xl bg-current/5 border border-current/10 hover:scale-110 active:scale-95 transition-all text-current"
                 >
                    {getSocialIcon(s, 20)}
                 </a>
              ))}
           </div>
        </div>

        {/* DYNAMIC MENU BLOCKS */}
        <section className="mt-24 px-8 space-y-20">
           {/* CATEGORIZED PRODUCTS AS MENU ITEMS */}
           {menuCategories.map((category: string) => {
              const items = menuItems.filter((i: any) => i.category === category || (!i.category && category === menuCategories[0]));
              if (items.length === 0) return null;

              return (
                 <div key={category} className="space-y-12">
                    <div className="flex items-center gap-4">
                       <h2 className="text-sm font-black uppercase tracking-[0.4em] opacity-30 italic whitespace-nowrap">{category}</h2>
                       <div className="h-[1px] w-full bg-current opacity-10" />
                    </div>
                    
                    <div className="space-y-10">
                       {items.map((p: any) => (
                          <a 
                            key={p.id} 
                            href={`/${profile.c_username}/checkout?type=product&id=${p.id}`}
                            className="group flex gap-6 items-start text-left"
                          >
                             <div className="w-24 h-24 shrink-0 rounded-3xl overflow-hidden bg-stone-100 shadow-lg relative group-hover:scale-105 transition-transform duration-500">
                                {p.image_url ? (
                                   <img src={p.image_url} className="w-full h-full object-cover" alt="" />
                                ) : <Utensils size={24} className="absolute inset-0 m-auto opacity-10" />}
                             </div>
                             <div className="flex-1 space-y-1 min-w-0">
                                <div className="flex justify-between items-end gap-4 overflow-hidden">
                                   <h4 className="text-xl font-black uppercase italic truncate tracking-tight">{p.name}</h4>
                                   <div className="h-[1px] flex-1 mb-1 border-b border-dotted border-current opacity-20" />
                                   <span className="text-xl font-bold tracking-tighter opacity-80 whitespace-nowrap">₹{p.price}</span>
                                </div>
                                <p className="text-xs font-bold opacity-40 leading-relaxed italic line-clamp-2">{p.description || "Indulge in our chef's special creation with premium ingredients."}</p>
                                <div className="flex items-center gap-1.5 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <span className="text-[9px] font-black uppercase tracking-widest">Order Now</span>
                                   <Plus size={12} />
                                </div>
                             </div>
                          </a>
                       ))}
                    </div>
                 </div>
              );
           })}

           {/* OTHER BLOCKS */}
           {mainContentLinks?.map((link: any) => {
              
              if (link.type === 'title') {
                return (
                   <div key={link.id} className="pt-10 flex flex-col items-center text-center gap-4">
                      <div className="w-12 h-1 px-1 bg-amber-400 rounded-full" />
                      <h3 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 italic">{link.title}</h3>
                   </div>
                );
              }

              if (link.type === 'tip') {
                return (
                   <div key={link.id} className={`p-10 border shadow-2xl space-y-8 group relative overflow-hidden bg-stone-900 text-stone-100 ${getButtonShapeClasses()}`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 blur-[60px] pointer-events-none" />
                      <div className="space-y-2 text-center">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-40">Support the Chef</h4>
                         <h3 className="text-3xl font-black tracking-tighter uppercase italic">{link.title || "Gratitude Jar"}</h3>
                      </div>
                      <button 
                        onClick={() => profile?.upi_id && (window.location.href = `upi://pay?pa=${profile.upi_id}`)}
                        className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl bg-amber-400 text-stone-900 ${getButtonShapeClasses()}`}
                      >
                         Send Appreciation
                      </button>
                   </div>
                );
              }

              if (link.type === 'youtube') {
                 const vidId = getYoutubeId(link.url);
                 return vidId ? (
                   <div key={link.id} className={`w-full aspect-video overflow-hidden shadow-2xl relative border-4 border-current/5 ${getButtonShapeClasses()}`}>
                      <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${vidId}`} frameBorder="0" allowFullScreen />
                   </div>
                 ) : null;
              }

              if (link.type === 'instagram') {
                 const username = link.url?.replace('@', '').split('/').pop() || "instagram";
                 return (
                    <div key={link.id} className={`p-8 border shadow-lg space-y-6 bg-stone-50/50 ${getButtonShapeClasses()}`} style={{ borderColor: `${pageTextColor}10` }}>
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border shadow-inner text-[#E1306C]">
                                <Instagram size={24} />
                             </div>
                             <h4 className="text-sm font-black italic tracking-tight">@{username}</h4>
                          </div>
                          <a href={`https://instagram.com/${username}`} className="w-10 h-10 rounded-full border border-current flex items-center justify-center opacity-20 hover:opacity-100 transition-opacity"><ArrowUpRight size={18} /></a>
                       </div>
                    </div>
                 );
              }

              if (link.type === 'image') {
                 return (
                    <div key={link.id} className={`w-full aspect-square overflow-hidden shadow-2xl border-stone-100 border p-3 ${getButtonShapeClasses()}`}>
                       <img src={link.url} className="w-full h-full object-cover rounded-[inherit] transition-transform duration-1000 hover:scale-110" alt="" />
                    </div>
                 );
              }

              // DEFAULT LINK
              return (
                 <a 
                    key={link.id} 
                    href={link.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    onClick={() => trackClick(link.id)}
                    className={`flex items-center p-6 sm:p-7 group transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] border shadow-xl ${getButtonShapeClasses()}`} 
                    style={{ backgroundColor: `${btnColor}05`, borderColor: `${btnColor}10` }}
                 >
                    <div className="flex-1 space-y-1">
                       <h4 className="text-lg font-black tracking-tighter uppercase italic leading-none">{link.title}</h4>
                       <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-20 truncate">{link.url?.replace(/^https?:\/\//, '').split('/')[0]}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-current/5 flex items-center justify-center opacity-20 group-hover:opacity-100 group-hover:-translate-y-1 transition-all">
                       <ArrowRight size={20} />
                    </div>
                 </a>
              );
           })}
        </section>

        {/* FOOTER */}
        <footer className="mt-56 border-t py-32 flex flex-col items-center gap-12" style={{ borderTopColor: `${pageTextColor}10` }}>
              <div className="text-center space-y-6">
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20 italic">Architected by Digital</p>
                 <div className="flex flex-col items-center justify-center gap-6">
                    <div className="w-14 h-14 rounded-[1.2rem] bg-stone-900 flex items-center justify-center text-white text-xl font-black italic shadow-2xl border-4 border-amber-400">S</div>
                    <span className="text-sm font-black tracking-[0.3em] uppercase">Socials <span className="opacity-20 italic">Pro</span></span>
                 </div>
              </div>
              <a href="/" className="px-10 py-4 bg-stone-900 text-stone-100 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">Create your menu</a>
          </footer>
      </div>
    </div>
  );
}