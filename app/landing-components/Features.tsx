"use client";

import React from 'react';
import { 
  Zap, 
  ShoppingBag, 
  Heart, 
  BarChart3, 
  Globe, 
  Layers, 
  ShieldCheck 
} from 'lucide-react';

export default function Features() {
  const feats = [
    {
      title: "Tip Jar Support",
      desc: "Let your fans show appreciation directly with our one-tap tip integration. Seamless payments, zero friction.",
      icon: Heart,
      color: "text-red-500",
      image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Digital Shoppable Links",
      desc: "Turn your links into a high-conversion storefront. Sell products without redirecting users.",
      icon: ShoppingBag,
      color: "text-orange-500",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
    },
    {
       title: "Viral Automation",
       desc: "Automate your Instagram DMs. Turn 'COMMENT' into sales instantly with our AI-driven triggers.",
       icon: Zap,
       color: "text-purple-400",
       image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800"
    },
    {
       title: "Advanced Analytics",
       desc: "Understand your audience with real-time deep architectural insights and UTM tracking.",
       icon: BarChart3,
       color: "text-blue-400",
       image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="features" className="py-56 px-6 relative overflow-hidden">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 blur-[150px] -z-10 rounded-full" />
       
       <div className="max-w-7xl mx-auto space-y-32">
          <div className="text-center space-y-6">
             <h2 className="text-4xl md:text-7xl font-black syne-font tracking-tighter leading-none">Everything you need <br /> to <span className="text-purple-500 italic">dominate</span> online.</h2>
             <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-medium leading-relaxed">Built for the elite creator. Professional-grade tools architected for extreme performance and scalability.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             {feats.map((f, i) => (
                <div key={i} className="bento-card group flex flex-col md:flex-row gap-8 items-stretch min-h-[350px]">
                   <div className="flex-1 p-10 space-y-8 flex flex-col justify-center">
                      <div className={`w-14 h-14 bg-white/5 rounded-[1.2rem] flex items-center justify-center ${f.color} border border-white/5 shadow-2xl`}>
                         <f.icon size={26} />
                      </div>
                      <div className="space-y-3">
                         <h3 className="text-2xl font-black tracking-tight">{f.title}</h3>
                         <p className="text-[15px] font-medium text-slate-400 leading-relaxed">{f.desc}</p>
                      </div>
                   </div>
                   <div className="w-full md:w-[45%] h-full relative overflow-hidden">
                      <img src={f.image} alt={f.title} className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100" />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-transparent to-transparent hidden md:block" />
                   </div>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}
