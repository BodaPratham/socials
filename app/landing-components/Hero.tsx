"use client";

import React from 'react';
import { Sparkles, ArrowRight, MousePointer2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-40 pb-20 md:pt-64 md:pb-40 px-6 overflow-hidden">
       {/* Ambient Glows */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 opacity-60 blur-[150px] -z-10 rounded-full" />
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 opacity-40 blur-[130px] -z-10 rounded-full" />

       <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 text-purple-400 rounded-full text-[10px] font-black uppercase tracking-[0.2em] animate-fade-up">
             <Sparkles size={14} className="fill-purple-400" /> Trusted by 10,000+ creators
          </div>
          
          <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
             <h1 className="text-6xl md:text-9xl font-black syne-font tracking-tighter leading-[0.85]">
                One link for <br className="hidden md:block" />
                <span className="pacifico-font text-purple-500 lowercase pr-4">everything</span>
             </h1>
             <div className="max-w-3xl mx-auto pt-4">
                <p className="text-lg md:text-2xl font-medium text-slate-400 leading-relaxed uppercase tracking-tight">
                   Your Digital Storefront_v2.0 architected for <br className="hidden md:block" /> extreme <span className="text-white italic underline underline-offset-8 decoration-purple-500">conversions</span> and viral growth.
                </p>
             </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
             <div className="relative group p-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-3xl">
                <input 
                  type="text" 
                  placeholder="socials.me/yourname" 
                  className="px-10 py-5 rounded-full bg-transparent text-white w-72 md:w-96 text-lg font-bold placeholder:text-white/20 outline-none transition-all"
                />
                <button className="absolute right-1.5 top-1.5 bottom-1.5 px-8 py-3 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group">
                   Claim <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>

          {/* MASTER MOCKUP PREVIEW */}
          <div className="relative mt-16 md:mt-24 max-w-6xl mx-auto animate-fade-up px-4" style={{ animationDelay: '0.3s' }}>
             <img 
                src="/image.png" 
                alt="Socials Platform Preview" 
                className="w-full h-auto object-contain drop-shadow-[0_0_100px_rgba(111,76,255,0.2)] rounded-[2rem] hover:scale-[1.02] transition-transform duration-700" 
             />
          </div>
       </div>
    </section>
  );
}
