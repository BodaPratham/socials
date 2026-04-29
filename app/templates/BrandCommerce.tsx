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

export default function BrandCommerce({ profile, links = [], products = [] }: any) {
  const config = profile?.design_config || {};
  const currencySign = config.currency || "$";
  
  // DESIGN TOKENS
  const bgColor = config.bgColor || '#FFFFFF';
  const pageFont = config.pageFont || 'Montserrat'; 
  const pageTextColor = config.pageTextColor || '#000000';
  const btnColor = config.btnColor || '#000000';
  const btnTextColor = config.btnTextColor || '#FFFFFF';
  const bgImage = config.bgImage;
  const logoUrl = config.logoUrl;
  const buttonRoundness = config.buttonRoundness || 'Round';
  const buttonStyle = config.buttonStyle || 'Solid';

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

  // GALLERY CONTENT
  const galleryItems = config.galleryItems || [];

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
    
    if (type === 'email' || type === 'newsletter' || u.includes('mailto:')) return <Mail size={size} />;
    if (type === 'phone' || type === 'sms' || type === 'whatsapp' || u.includes('wa.me') || u.includes('tel:')) return <Phone size={size} />;
    if (type === 'instagram' || u.includes('instagram.com')) return <Instagram size={size} />;
    if (type === 'youtube' || type === 'youtubemusic' || u.includes('youtube.com') || u.includes('youtu.be')) return <Youtube size={size} />;
    if (type === 'x' || type === 'twitter' || u.includes('twitter.com') || u.includes('x.com')) return <Twitter size={size} />;
    if (type === 'linkedin' || u.includes('linkedin.com')) return <Linkedin size={size} />;
    if (type === 'facebook' || u.includes('facebook.com')) return <Facebook size={size} />;
    if (type === 'tiktok' || u.includes('tiktok.com')) return <Music size={size} />;
    
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
      className="min-h-screen w-full relative selection:bg-black selection:text-white" 
      style={{ 
        backgroundColor: bgColor, 
        fontFamily: pageFont,
        color: pageTextColor 
      }}
    >
      <link href={`https://fonts.googleapis.com/css2?family=${pageFont.replace(/ /g, '+')}:ital,wght@0,100..900;1,100..900&display=swap`} rel="stylesheet" />
      
      {/* GLOBAL BACKGROUND IMAGE */}
      {bgImage && (
        <div className="fixed inset-0 z-0 overflow-hidden">
           <img src={bgImage} className="w-full h-full object-cover" style={{ filter: config.wallpaperStyle === 'Blur' ? 'blur(20px)' : 'none', opacity: 0.1 }} alt="" />
           <div className="absolute inset-0 bg-white/20" />
        </div>
      )}

      {/* MOBILE CENTERED WRAPPER */}
      <div className="relative z-10 w-full max-w-[500px] mx-auto min-h-screen shadow-2xl pb-32 border-x overflow-hidden"
      style={{ backgroundColor: `${bgColor}CC`, borderColor: `${pageTextColor}10` }}>
        
        {/* HERO BANNER SECTION */}
        <div className="relative w-full h-[40dvh] overflow-hidden bg-zinc-100">
           {profile?.cover_url ? (
             <img src={profile.cover_url} className="w-full h-full object-cover" alt="Banner" />
           ) : (
             <div className="w-full h-full bg-gradient-to-tr from-zinc-100 to-zinc-200 flex items-center justify-center opacity-40">
                <ShoppingBag size={80} />
             </div>
           )}
           <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
           
           {/* Overlapping Badge */}
           <div className={`absolute ${headerLayout === 'centered' ? '-bottom-20 left-1/2 -translate-x-1/2' : '-bottom-20 left-12'} p-3 bg-white shadow-2xl rounded-[3rem] z-20`}>
              <div 
                className="rounded-[2.5rem] overflow-hidden border-4 border-white shadow-inner flex items-center justify-center bg-zinc-100"
                style={{ 
                  width: `${60 + (profileSize * 1.5)}px`, 
                  height: `${60 + (profileSize * 1.5)}px`,
                  borderWidth: `${profileBorder / 10}px`,
                  borderColor: config.profileBorderColor || '#FFFFFF',
                  boxShadow: profileShadow > 0 ? `0 ${profileShadow / 5}px ${profileShadow / 2}px rgba(0,0,0,${profileShadow / 200})` : 'none'
                }}
              >
                 {profile?.avatar_url ? (
                   <img src={profile.avatar_url} className="w-full h-full object-cover" alt="Profile" />
                 ) : (
                   <div className="w-full h-full bg-zinc-900 flex items-center justify-center text-white/10">
                      <Star size={profileSize + 20} />
                   </div>
                 )}
              </div>
           </div>
        </div>

         {/* BRAND INFO */}
         <section className={`w-full pt-28 px-12 flex flex-col ${headerLayout === 'centered' ? 'items-center text-center' : 'items-start text-left'} space-y-6`}>
            <div className="space-y-1">
               <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">
                 {profile?.c_username || "AURA STUDIOS"}
                 {config.enableVerifiedBadge && <Star size={16} fill="#A855F7" className="inline ml-2 text-purple-500" />}
               </h1>
               <div className={`flex items-center gap-2 ${headerLayout === 'centered' ? 'justify-center' : ''}`}>
                  <div className="w-8 h-[1px] bg-current opacity-20" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Est. {new Date().getFullYear()}</span>
               </div>
            </div>
            
            <p className={`max-w-md text-sm font-bold opacity-60 leading-relaxed italic ${headerLayout === 'centered' ? 'mx-auto' : ''}`}>
               {profile?.bio || "Elevated essentials for the modern minimalist."}
            </p>
 
            {/* ACTION BUTTONS (Share, Add Contact) */}
            <div className={`flex gap-2 w-full ${headerLayout === 'centered' ? 'justify-center' : ''}`}>
               {config.enableAddContact && (
                 <button className="px-8 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Plus size={12} /> Add Contact
                 </button>
               )}
               {config.enableShareButton && (
                 <button className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center border border-black/10">
                    <Share2 size={18} />
                 </button>
               )}
            </div>

            <div className={`flex flex-wrap gap-6 pt-4 ${headerLayout === 'centered' ? 'justify-center' : ''}`}>
               {socialRowLinks?.map((s: any) => (
                  <a 
                    key={s.id} 
                    href={s.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="opacity-30 hover:opacity-100 hover:scale-110 transition-all flex items-center justify-center"
                    style={{ 
                      width: `${24 + (socialIconSize / 3)}px`, 
                      height: `${24 + (socialIconSize / 3)}px`
                    }}
                  >
                     {getSocialIcon(s, 16 + (socialIconSize / 10))}
                  </a>
               ))}
            </div>
         </section>

        {/* GALLERY GRID */}
        {galleryItems.length > 0 && (
          <section className="w-full px-12 pt-20 pb-10">
             <div className="grid grid-cols-2 gap-4">
                {galleryItems.map((item: any) => (
                   <a key={item.id} href={item.link || '#'} className="group block space-y-3">
                      <div className={`aspect-[3/4] bg-current/5 overflow-hidden border border-current/10 shadow-lg ${getButtonShapeClasses()}`}>
                         <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" alt={item.title} />
                      </div>
                      <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-center opacity-40 group-hover:opacity-100 transition-opacity">{item.title}</h4>
                   </a>
                ))}
             </div>
          </section>
        )}

        {/* PRODUCT HIGHLIGHTS */}
        {products && products.length > 0 && (
           <section className="w-full px-12 pt-20 space-y-12">
              <div className="flex items-center justify-between border-b pb-6" style={{ borderBottomColor: `${pageTextColor}10` }}>
                 <h2 className="text-[11px] font-black uppercase tracking-[0.5em] opacity-30">Prime Selection</h2>
                 <Plus size={14} className="opacity-20" />
              </div>
              <div className="grid grid-cols-1 gap-y-20">
                 {products.map((p: any) => (
                    <a key={p.id}                       href={p.destination_url || `/${profile.c_username}/checkout?type=product&id=${p.id}`}
                      target="_blank"
                      rel="noreferrer"
 className="group block space-y-8">
                       <div className={`aspect-[4/5] bg-current/5 overflow-hidden relative shadow-2xl transition-transform duration-700 hover:-translate-y-2 ${getButtonShapeClasses()}`}>
                          {p.image_url ? (
                             <img src={p.image_url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
                          ) : <ShoppingBag size={48} className="absolute inset-0 m-auto opacity-10" />}
                          <div className="absolute top-6 left-6 p-4 px-6 bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-white/20">
                             <span className="text-sm font-black tracking-tight" style={{ color: btnColor }}>{currencySign}{p.price}</span>
                          </div>
                       </div>
                       <div className="flex justify-between items-end px-2">
                          <div className="space-y-1">
                             <h4 className="text-xl font-black tracking-tighter uppercase leading-none">{p.name}</h4>
                             <p className="text-[10px] font-black opacity-20 uppercase tracking-[0.3em]">Limited Release</p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-xl group-hover:rotate-[360deg] transition-transform duration-1000">
                             <ArrowRight size={18} />
                          </div>
                       </div>
                    </a>
                 ))}
              </div>
           </section>
        )}

        {/* DYNAMIC BLOCKS SECTION */}
        <section className="mt-40 px-12 space-y-10">
           {mainContentLinks?.map((link: any) => {
              
              if (link.type === 'title') {
                 return (
                    <div key={link.id} className="pt-20 pb-10 text-center border-b border-white/10">
                       <h3 className="text-[11px] font-black uppercase tracking-[0.3em] opacity-40 italic">{link.title}</h3>
                       <div className="w-8 h-[1px] mx-auto mt-6" style={{ backgroundColor: `${pageTextColor}20` }} />
                    </div>
                 );
              }

              if (link.type === 'tip') {
                return (
                   <div key={link.id} className={`p-10 border shadow-2xl text-center space-y-8 group ${getButtonShapeClasses()}`} style={{ backgroundColor: `${pageTextColor}05`, borderColor: `${pageTextColor}10` }}>
                      <div className="space-y-2">
                         <h4 className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20">Support the Label</h4>
                         <h3 className="text-3xl font-black tracking-tighter uppercase italic">{link.title || "Brand Support"}</h3>
                      </div>
                      <button 
                        onClick={() => profile?.upi_id && (window.location.href = `upi://pay?pa=${profile.upi_id}`)}
                        className={`inline-block px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 shadow-2xl ${getButtonShapeClasses()}`}
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
                   <div key={link.id} className={`w-full aspect-video overflow-hidden shadow-2xl relative ${getButtonShapeClasses()}`}>
                      <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${vidId}`} frameBorder="0" allowFullScreen />
                   </div>
                 ) : null;
              }

              if (link.type === 'instagram') {
                 const username = link.url?.replace('@', '').split('/').pop() || "instagram";
                 return (
                    <div key={link.id} className={`p-10 border shadow-2xl space-y-8 ${getButtonShapeClasses()}`} style={{ backgroundColor: `${pageTextColor}05`, borderColor: `${pageTextColor}10` }}>
                       <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border shadow-inner text-[#E1306C]">
                                <Instagram size={24} />
                             </div>
                             <h4 className="text-sm font-black italic">@{username}</h4>
                          </div>
                          <a href={`https://instagram.com/${username}`} className="w-10 h-10 rounded-full border border-current flex items-center justify-center opacity-20 hover:opacity-100 transition-opacity"><ArrowUpRight size={18} /></a>
                       </div>
                    </div>
                 );
              }

              if (link.type === 'image') {
                 return (
                    <div key={link.id} className={`w-full aspect-square overflow-hidden mb-8 border border-current/10 p-2 shadow-2xl ${getButtonShapeClasses()}`}>
                       <img src={link.url} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" alt="" />
                    </div>
                 );
              }

              if (link.type === 'gallery_item') {
                return (
                   <div key={link.id} className={`w-full aspect-square overflow-hidden mb-8 border border-current/10 p-2 shadow-2xl group ${getButtonShapeClasses()}`}>
                      <img src={link.url} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={link.title} />
                      <div className="absolute inset-x-2 bottom-2 p-4 bg-white/90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                         <p className="text-[10px] font-black uppercase tracking-widest text-center" style={{ color: btnColor }}>{link.title || "Collection Item"}</p>
                      </div>
                   </div>
                );
              }

              // SHOP BLOCK (Inline Product Card - Commerce Style)
              if (link.type === 'shop') {
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
                    className="group block space-y-8"
                  >
                    <div className={`aspect-[4/5] bg-current/5 overflow-hidden relative shadow-2xl transition-transform duration-700 hover:-translate-y-2 ${getButtonShapeClasses()}`}>
                      {displayImage ? (
                        <img src={displayImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={displayName} />
                      ) : <ShoppingBag size={48} className="absolute inset-0 m-auto opacity-10" />}
                      <div className="absolute top-6 left-6 p-4 px-6 bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-white/20">
                        <span className="text-sm font-black tracking-tight" style={{ color: btnColor }}>{currencySign}{displayPrice}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-end px-2">
                      <div className="space-y-1 flex-1 min-w-0 pr-4">
                        <h4 className="text-xl font-black tracking-tighter uppercase leading-none truncate">{displayName}</h4>
                        <p className="text-[10px] font-black opacity-20 uppercase tracking-[0.3em] truncate">{displayDesc || 'View Details'}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-xl group-hover:rotate-[360deg] transition-transform duration-1000">
                        <ArrowRight size={18} />
                      </div>
                    </div>
                  </a>
                );
              }

              // TEXT BLOCK
              if (link.type === 'text') {
                return (
                  <div key={link.id} className="px-2 py-4">
                    <p className="text-sm font-bold leading-relaxed opacity-60 whitespace-pre-line italic">{link.url}</p>
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
                    className="flex items-center justify-between py-10 px-4 border-b group transition-all" 
                    style={{ 
                      borderBottomColor: `${pageTextColor}10`,
                      marginBottom: `${blockSpacing}px`,
                      borderRadius: tactileBlocks === 'soft' ? `${blockCorner}px` : '0',
                      borderWidth: blockBorder > 0 ? `${blockBorder / 10}px` : undefined,
                      boxShadow: blockShadow > 0 ? `0 ${blockShadow / 5}px ${blockShadow / 2}px rgba(0,0,0,${blockShadow / 200})` : 'none',
                      background: tactileBlocks === 'soft' ? `linear-gradient(135deg, rgba(0,0,0,0.02), rgba(0,0,0,0.05))` : undefined
                    }}
                 >
                    <div className="space-y-1">
                       <p className="text-xl font-black tracking-tighter uppercase opacity-60 group-hover:opacity-100 transition-all italic">{link.title}</p>
                       <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-20">{link.url?.replace(/^https?:\/\//, '').split('/')[0]}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:-translate-y-2 group-hover:translate-x-2 transition-all">
                       <ArrowUpRight size={20} />
                    </div>
                 </a>
              );
           })}
        </section>

        {/* FOOTER */}
        <footer className="mt-56 border-t py-32 flex flex-col items-center gap-12" style={{ borderTopColor: `${pageTextColor}10` }}>
              <div className="text-center space-y-6">
                 {!config.hideBranding && <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20">Architected by Digital</p>}
                 <div className="flex flex-col items-center justify-center gap-6">
                    <div className="w-14 h-14 rounded-[1.2rem] bg-black flex items-center justify-center text-white text-xl font-black italic shadow-2xl">S</div>
                    <span className="text-sm font-black tracking-widest uppercase" style={{ color: pageTextColor }}>Socials <span className="opacity-40">Pro</span></span>
                 </div>
              </div>
              <a href="/" className="px-10 py-4 bg-zinc-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">Create your space</a>
          </footer>
      </div>
    </div>
  );
}
