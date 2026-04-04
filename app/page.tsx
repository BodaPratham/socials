"use client";

import React from 'react';
import "./landing.css";
import Navbar from "./landing-components/Navbar";
import Hero from "./landing-components/Hero";
import Features from "./landing-components/Features";
import Pricing from "./landing-components/Pricing";
import Footer from "./landing-components/Footer";
import { Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="landing-container min-h-screen">
      <Navbar />
      
      <Hero />

      {/* MARQUEE BAND */}
      <div className="py-12 bg-black/80 text-white overflow-hidden flex whitespace-nowrap border-y border-white/5">
         <div className="marquee-container text-[12px] font-black uppercase tracking-[0.5em] flex items-center gap-20">
            {[1,2,3,4,5,6,7,8].map(i => (
               <React.Fragment key={i}>
                  <div className="flex items-center gap-4 group">
                     <Sparkles size={16} fill="white" className="group-hover:rotate-180 transition-transform duration-1000" />
                     <span>Redefining the Link-in-Bio</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                     <Sparkles size={16} fill="white" className="group-hover:rotate-180 transition-transform duration-1000" />
                     <span className="text-purple-400">10,000+ Creators Joined</span>
                  </div>
                  <div className="flex items-center gap-4 group">
                     <Sparkles size={16} fill="white" className="group-hover:rotate-180 transition-transform duration-1000" />
                     <span>Automation First Architecture</span>
                  </div>
               </React.Fragment>
            ))}
         </div>
      </div>

      <Features />

      {/* MID-LANDING CTA */}
      <section className="py-40 px-6">
         <div className="max-w-6xl mx-auto p-20 md:p-32 bg-white flex flex-col items-center rounded-[5rem] text-center space-y-12 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/5 -z-10" />
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-125 duration-1000">
               <Sparkles size={32} className="text-purple-600" />
            </div>
            <div className="space-y-6">
               <h2 className="text-5xl md:text-8xl font-black syne-font tracking-tighter text-black leading-none">Ready to claim <br /> your spot?</h2>
               <p className="max-w-xl mx-auto text-black/50 font-medium text-lg md:text-xl leading-relaxed">Join the thousands of creators who switched to Socials for a more premium, automated, and powerful link-in-bio.</p>
            </div>
            <button className="px-16 py-7 bg-black text-white rounded-full font-black text-sm uppercase tracking-widest hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-black/20">
               Get Started for Free
            </button>
         </div>
      </section>

      <Pricing />

      {/* TEMPLATE SHOWCASE */}
      <section id="templates" className="py-56 px-6 relative">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] -z-10 rounded-full" />
         <div className="max-w-7xl mx-auto space-y-24">
            <div className="text-center space-y-6">
               <h2 className="text-4xl md:text-7xl font-black syne-font tracking-tighter leading-none">Built for your <span className="pacifico-font text-purple-500 lowercase pr-4">vibe</span></h2>
               <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-medium leading-relaxed">Choose from our signature premium layouts, designed to convert and architected for extreme visual impact.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {[
                 { name: 'Dhurndhar', desc: 'The bold architecture', img: '/brutalist_preview.png' },
                 { name: 'Cafe & Restaurant', desc: 'The artisan experience', img: '/cafe_preview.png' },
                 { name: 'Creator Pro', desc: 'The professional portfolio', img: '/portfolio_preview.png' }
               ].map((item, i) => (
                  <div key={i} className="space-y-10 group">
                     <div className="aspect-[4/5] bg-white/[0.02] rounded-[4rem] border border-white/10 shadow-2xl p-6 group-hover:scale-[1.05] group-hover:border-purple-500/40 transition-all duration-1000 overflow-hidden relative">
                        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-full h-full bg-[#0B0C10] rounded-[3rem] border border-white/5 p-2 overflow-hidden relative">
                           <img src={item.img} alt={item.name} className="w-full h-full object-cover rounded-[2.5rem] opacity-80 group-hover:opacity-100 filter group-hover:brightness-110 transition-all duration-700" />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-6">
                           <p className="text-white font-black uppercase tracking-[0.3em] text-[10px]">{item.desc}</p>
                           <button className="px-10 py-5 bg-white text-black rounded-full font-black text-xs uppercase tracking-widest hover:scale-110 active:scale-95 transition-all outline-none">Preview Layout</button>
                        </div>
                     </div>
                     <div className="text-center space-y-2 pt-2">
                        <h3 className="text-2xl font-black">{item.name}</h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-20 hover:opacity-100 transition-opacity">Premium Feature</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}