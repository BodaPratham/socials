"use client";

import React from 'react';
import { Check, Zap, Shield, Crown } from 'lucide-react';

export default function Pricing() {
  const tiers = [
    {
      name: "Starter",
      price: "$0",
      desc: "For the minimalist creator",
      features: ["Unlimited Links", "Basic Templates", "Tip Jar Enabled", "Standard Analytics"],
      btn: "Get Started",
      highlight: false
    },
    {
      name: "Creator Pro",
      price: "$4",
      desc: "For the professional architect",
      features: ["Everything in Starter", "Viral Automation", "Shop Integration", "Premium Templates", "Custom Domains", "Advanced Insights"],
      btn: "Try Pro Now",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      desc: "For businesses and agencies",
      features: ["Everything in Pro", "Priority Architect Support", "Custom Branding", "Multiple User Access", "Dedicated Account Manager", "White-label Options"],
      btn: "Contact Sales",
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-56 px-6 relative">
       <div className="max-w-7xl mx-auto space-y-32">
          <div className="text-center space-y-6">
             <h2 className="text-4xl md:text-7xl font-black syne-font tracking-tighter leading-none">Simple, <span className="pacifico-font text-purple-500 lowercase pr-4">affordable</span> pricing</h2>
             <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-medium">Start for free, upgrade when you flourish. No hidden protocols.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {tiers.map((tier, i) => (
                <div 
                  key={i} 
                  className={`p-16 rounded-[3rem] border transition-all duration-500 relative flex flex-col justify-between ${
                    tier.highlight 
                    ? 'bg-purple-600/10 border-purple-500 shadow-[0_0_100px_rgba(124,58,237,0.15)] scale-105 z-10' 
                    : 'bg-white/[0.02] border-white/5 hover:border-white/20'
                  }`}
                >
                   {tier.highlight && (
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-purple-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-b-2xl shadow-xl">
                        Most Popular
                     </div>
                   )}
                   
                   <div className="space-y-12">
                      <div className="space-y-3">
                         <div className="flex items-center gap-3">
                            <h3 className={`text-2xl font-black syne-font ${tier.highlight ? 'text-purple-400' : 'text-white'}`}>{tier.name}</h3>
                            {tier.name === 'Enterprise' && <Crown size={18} className="text-amber-500" />}
                         </div>
                         <p className="text-sm font-medium text-slate-500">{tier.desc}</p>
                      </div>
                      
                      <div className="space-y-2">
                         <div className="flex items-baseline gap-2">
                            <span className="text-6xl font-black tracking-tighter">{tier.price}</span>
                            {tier.price !== 'Custom' && <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">/mo</span>}
                         </div>
                      </div>

                      <div className="space-y-5">
                         {tier.features.map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                               <div className={`p-1 rounded-full ${tier.highlight ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-slate-400'}`}>
                                  <Check size={12} />
                               </div>
                               <span className="text-[14px] font-medium text-slate-300">{item}</span>
                            </div>
                         ))}
                      </div>
                   </div>

                   <button className={`w-full py-6 rounded-full mt-16 font-black text-[11px] uppercase tracking-[0.2em] transition-all ${
                     tier.highlight 
                     ? 'bg-white text-black shadow-2xl hover:scale-105 active:scale-95' 
                     : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                   }`}>
                      {tier.btn}
                   </button>
                </div>
             ))}
          </div>
       </div>
    </section>
  );
}
