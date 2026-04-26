"use client";

import React, { useState } from 'react';
import { 
  Instagram, Youtube, Twitter, Linkedin, Facebook, 
  Search, SlidersHorizontal, ChevronLeft, MapPin,
  Star
} from 'lucide-react';

export default function CafeRestaurant({ profile, links = [], products = [] }: any) {
  const config = profile?.design_config || {};
  
  // DESIGN TOKENS
  const bgColor = config.bgColor || '#1A1A1A'; 
  const pageFont = config.pageFont || 'Montserrat'; 
  const pageTextColor = config.pageTextColor || '#FFFFFF';
  const btnColor = config.btnColor || '#c88053'; 
  const btnTextColor = config.btnTextColor || '#FFFFFF';

  // CUSTOM CONFIG FIELDS FROM DASHBOARD
  const heroHeadline = config.heroHeadline || "Fall in Love with Coffee in Blissful Delight!";
  const heroButtonText = config.heroButtonText || "Get Started";
  const locationText = config.locationText || "Bilzen, Tanjungbalai";

  const menuCategories = config.menuCategories || ['All Coffee', 'Machiato', 'Latte', 'Americano'];
  const menuItems = products || [];

  const [activeScreen, setActiveScreen] = useState<'splash' | 'menu' | 'detail'>('splash');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState(menuCategories[0] || 'All Coffee');
  const [activeSize, setActiveSize] = useState('M');

  return (
    <div 
      className="min-h-screen w-full relative selection:bg-orange-900 selection:text-white" 
      style={{ backgroundColor: '#000000', fontFamily: pageFont }}
    >
      <link href={`https://fonts.googleapis.com/css2?family=${pageFont.replace(/ /g, '+')}:ital,wght@0,100..900;1,100..900&display=swap`} rel="stylesheet" />
      
      {/* MOBILE CENTERED WRAPPER */}
      <div 
        className="relative z-10 w-full max-w-[430px] mx-auto min-h-screen shadow-2xl overflow-hidden flex flex-col"
        style={{ backgroundColor: bgColor, color: pageTextColor }}
      >
        
        {/* =========================================
            SPLASH SCREEN
            ========================================= */}
        {activeScreen === 'splash' && (
          <div className="absolute inset-0 w-full h-full flex flex-col bg-black">
             {profile?.avatar_url ? (
               <img src={profile.avatar_url} className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-lighten" alt="Splash Background" />
             ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-stone-900 to-black"></div>
             )}
             
             {/* Gradient Overlay for text readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

             {/* Content */}
             <div className="relative z-10 mt-auto px-8 pb-16 flex flex-col items-center text-center animate-in slide-in-from-bottom-10 duration-1000">
                <h1 className="text-[2.2rem] font-bold leading-tight tracking-tight text-white px-2">
                  {heroHeadline}
                </h1>
                
                <p className="text-zinc-300/80 text-sm mt-4 px-4 font-normal leading-relaxed">
                  {profile?.bio || "Welcome to our cozy coffee corner, where every cup is a delightful for you."}
                </p>

                <button 
                  onClick={() => setActiveScreen('menu')}
                  className="mt-10 w-full py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-900/20 active:scale-95 transition-all text-white"
                  style={{ backgroundColor: btnColor }}
                >
                  {heroButtonText}
                </button>
             </div>
          </div>
        )}

        {/* =========================================
            MENU SCREEN
            ========================================= */}
        {activeScreen === 'menu' && (
          <div className="flex-1 flex flex-col w-full h-full overflow-y-auto pb-10 bg-[#1e1e1e] animate-in fade-in zoom-in-95 duration-500">
             
             {/* Header */}
             <div className="px-6 pt-12">
               <span className="text-zinc-400 text-xs font-medium">Location</span>
               <div className="flex items-center gap-1 mt-1 text-white font-semibold">
                  <span>{locationText}</span>
                  <ChevronLeft size={16} className="rotate-270" />
               </div>
             </div>

             {/* Search Bar */}
             <div className="px-6 mt-6 flex items-center gap-4">
                <div className="flex-1 bg-[#2a2a2a] rounded-2xl flex items-center px-4 py-3 border border-white/5">
                   <Search size={20} className="text-zinc-500 mr-3" />
                   <input 
                     type="text" 
                     placeholder="Search coffee" 
                     className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-zinc-500"
                   />
                </div>
                <button className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 shadow-lg active:scale-95 transition-all" style={{ backgroundColor: btnColor, color: btnTextColor }}>
                   <SlidersHorizontal size={20} />
                </button>
             </div>

             {/* Promo Banner */}
             <div className="px-6 mt-8">
                <div className="w-full relative rounded-[2rem] overflow-hidden bg-gradient-to-r from-[#ce875c] to-amber-700 h-36 flex border border-white/10 shadow-2xl">
                   {config.promoBannerUrl ? (
                      <img src={config.promoBannerUrl} className="absolute inset-0 w-full h-full object-cover" alt="Promo" />
                   ) : (
                     <>
                        <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold uppercase px-2 py-1 rounded-full tracking-wider z-10">Promo</div>
                        <div className="relative z-10 flex flex-col justify-center px-6 text-white h-full max-w-[60%]">
                          <h2 className="text-3xl font-bold leading-none mt-4 -ml-1">Buy one get</h2>
                          <div className="flex items-center">
                             <span className="text-3xl font-bold leading-none -ml-1">one</span>
                             <span className="text-3xl font-bold leading-none ml-2">FREE</span>
                          </div>
                        </div>
                        <div className="absolute right-0 bottom-0 w-40 h-40">
                           {/* Decorative circles */}
                           <div className="absolute top-4 right-4 w-24 h-24 rounded-full border-4 border-white/20 shadow-[-10px_10px_20px_rgba(0,0,0,0.2)]"></div>
                           <div className="absolute top-8 right-8 w-16 h-16 rounded-full border-2 border-white/10 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                             <div className="w-8 h-8 rounded-full bg-[#ce875c]"></div>
                           </div>
                        </div>
                     </>
                   )}
                </div>
             </div>

             {/* Categories */}
             <div className="mt-8 px-6 flex gap-3 overflow-x-auto no-scrollbar pb-2">
                {menuCategories.map((cat: string) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all shadow-sm ${activeCategory === cat ? '' : 'bg-transparent text-zinc-400 bg-white/5'}`}
                    style={activeCategory === cat ? { backgroundColor: btnColor, color: btnTextColor } : {}}
                  >
                    {cat}
                  </button>
                ))}
             </div>

             {/* Product Grid */}
             <div className="mt-6 px-6 grid grid-cols-2 gap-4 pb-10">
                {menuItems.filter((p: any) => activeCategory === 'All Coffee' ? true : p.category === activeCategory).map((p: any) => (
                   <button 
                     key={p.id}
                     onClick={() => {
                        setSelectedProduct(p);
                        setActiveScreen('detail');
                     }}
                     className="bg-white rounded-3xl p-3 flex flex-col items-center text-left hover:scale-[1.02] active:scale-95 transition-all relative group shadow-sm"
                   >
                     <div className="w-full aspect-square rounded-2xl overflow-hidden bg-stone-100 relative">
                        {p.image_url ? (
                           <img src={p.image_url} className="w-full h-full object-cover" alt={p.name} />
                        ) : (
                           <div className="w-full h-full bg-[#3c2a21] flex items-center justify-center">Coffee</div>
                        )}
                        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 text-[9px] text-white font-bold">
                           <Star size={8} className="fill-amber-400 text-amber-400" />
                           4.8
                        </div>
                     </div>
                     <div className="w-full mt-3 px-1">
                        <h4 className="text-[15px] font-bold text-zinc-900 leading-tight">{p.name}</h4>
                        <p className="text-[10px] text-zinc-400 mt-1 truncate">{p.description || "Deep Foam"}</p>
                        <div className="flex items-center justify-between mt-3">
                           <span className="text-lg font-bold text-zinc-900 tracking-tight">$ {(p.price || 0).toFixed(2)}</span>
                           <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-lg leading-none shadow-md" style={{ backgroundColor: btnColor }}>
                              +
                           </div>
                        </div>
                     </div>
                   </button>
                ))}
             </div>
          </div>
        )}

        {/* =========================================
            DETAIL SCREEN
            ========================================= */}
        {activeScreen === 'detail' && selectedProduct && (
          <div className="flex-1 flex flex-col w-full h-full overflow-y-auto bg-stone-50 animate-in slide-in-from-right duration-300">
             
             {/* Product Image Section */}
             <div className="relative w-full h-[50dvh] bg-[#3c2a21] rounded-b-[3rem] overflow-hidden shadow-sm">
                {selectedProduct.image_url && (
                   <img src={selectedProduct.image_url} className="w-full h-full object-cover" alt={selectedProduct.name} />
                )}
                
                {/* Back Button */}
                <button 
                  onClick={() => setActiveScreen('menu')}
                  className="absolute top-12 left-6 w-10 h-10 bg-white flex items-center justify-center shadow-lg text-black rounded-xl active:scale-95 transition-all"
                >
                   <ChevronLeft size={24} />
                </button>
             </div>

             {/* Detail Content */}
             <div className="px-6 pt-6 pb-24 text-zinc-900">
                <div className="flex justify-between items-start">
                   <div>
                     <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                     <p className="text-zinc-500 text-xs mt-1">Ice/Hot</p>
                   </div>
                   <div className="flex gap-2">
                      <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-zinc-500">
                         {/* Icons matching screenshot */}
                         ⭐
                      </div>
                      <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-zinc-500">☕</div>
                   </div>
                </div>

                <div className="flex items-center gap-1 mt-3 text-sm font-bold text-zinc-800">
                   <Star size={16} className="fill-amber-400 text-amber-400" />
                   <span className="text-lg">4.8</span>
                   <span className="text-zinc-400 ml-1 font-normal">(230)</span>
                </div>

                <div className="mt-8">
                   <h3 className="text-lg font-bold">Description</h3>
                   <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                      {selectedProduct.description || "A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk... "}
                      <span className="font-bold cursor-pointer" style={{ color: btnColor }}>Read More</span>
                   </p>
                </div>

                <div className="mt-8">
                   <h3 className="text-lg font-bold">Size</h3>
                   <div className="flex gap-4 mt-3">
                      {['S', 'M', 'L'].map(size => (
                         <button 
                           key={size}
                           onClick={() => setActiveSize(size)}
                           className={`flex-1 py-3 rounded-2xl font-semibold border-2 transition-all ${activeSize === size ? 'bg-stone-50' : 'bg-white border-stone-200 text-stone-900'}`}
                           style={activeSize === size ? { borderColor: btnColor, color: btnColor } : {}}
                         >
                            {size}
                         </button>
                      ))}
                   </div>
                </div>
             </div>

             {/* Bottom Buy Bar */}
             <div className="fixed bottom-0 w-full max-w-[430px] bg-white rounded-t-[2.5rem] px-6 py-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-stone-100">
                <div className="flex items-center justify-between gap-6">
                   <div className="flex flex-col">
                      <span className="text-zinc-400 text-sm font-medium">Price</span>
                      <span className="text-2xl font-bold tracking-tight" style={{ color: btnColor }}>
                        $ {(selectedProduct.price || 0).toFixed(2)}
                      </span>
                   </div>
                   <button 
                     onClick={() => {
                        window.open(selectedProduct.destination_url || `/${profile.c_username}/checkout?type=product&id=${selectedProduct.id}`, '_blank');
                     }}
                     className="flex-1 py-4 rounded-3xl font-bold text-lg text-white shadow-xl active:scale-95 transition-all text-center"
                     style={{ backgroundColor: btnColor }}
                   >
                      Buy Now
                   </button>
                </div>
             </div>
          </div>
        )}

      </div>
    </div>
  );
}