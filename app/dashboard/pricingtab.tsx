"use client";

import React from 'react';
import { 
  Zap, 
  Check, 
  Sparkles, 
  Crown, 
  Rocket, 
  ArrowRight,
  Monitor,
  Smartphone,
  BarChart3,
  ShoppingBag,
  Palette
} from "lucide-react";

interface PricingTabProps {
  profile: any;
  dashBtn?: string;
  dashBtnText?: string;
  panelBg?: string;
  panelBorder?: string;
  dashText?: string;
}

export default function PricingTab({
  profile,
  dashBtn = '#A855F7',
  dashBtnText = '#FFFFFF',
  panelBg = 'rgba(255,255,255,0.05)',
  panelBorder = 'rgba(255,255,255,0.1)',
  dashText = '#FFFFFF'
}: PricingTabProps) {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for getting started",
      icon: Zap,
      features: [
        "Unlimited Links",
        "Standard Templates",
        "Basic Insights (7 days)",
        "Affiliate Products",
        "Social Icons"
      ],
      buttonText: "Current Plan",
      current: profile?.subscription_plan === 'starter' || !profile?.subscription_plan,
      highlight: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "/month",
      description: "Best for creators & pros",
      icon: Crown,
      features: [
        "Everything in Starter",
        "Premium Templates",
        "Advanced Analytics",
        "Digital Product Sales",
        "Custom Logo & Branding",
        "Priority Support"
      ],
      buttonText: "Upgrade to Pro",
      current: profile?.subscription_plan === 'pro',
      highlight: true
    },
    {
      name: "Enterprise",
      price: "$29",
      period: "/month",
      description: "Scale your digital presence",
      icon: Rocket,
      features: [
        "Everything in Pro",
        "Multiple Managed Pages",
        "Dedicated Account Manager",
        "API Access",
        "White-label Reports",
        "Custom Domain Support"
      ],
      buttonText: "Contact Sales",
      current: profile?.subscription_plan === 'enterprise',
      highlight: false
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter" style={{ color: dashBtn }}>
          Choose Your Plan
        </h2>
        <p className="text-[11px] font-black uppercase tracking-widest opacity-40 max-w-md mx-auto">
          Scale your social presence with premium tools and advanced analytics designed for modern creators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div 
            key={idx}
            className={`relative p-8 rounded-[2.5rem] border transition-all hover:scale-[1.02] flex flex-col ${plan.highlight ? 'shadow-2xl' : 'shadow-xl'}`}
            style={{ 
              backgroundColor: plan.highlight ? 'rgba(168, 85, 247, 0.1)' : panelBg, 
              borderColor: plan.highlight ? dashBtn : panelBorder 
            }}
          >
            {plan.highlight && (
              <div 
                className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg"
                style={{ backgroundColor: dashBtn, color: dashBtnText }}
              >
                <Sparkles size={10} /> Recommended
              </div>
            )}

            <div className="flex items-center justify-between mb-8">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                style={{ backgroundColor: plan.highlight ? dashBtn : 'rgba(255,255,255,0.05)', color: plan.highlight ? dashBtnText : dashBtn }}
              >
                <plan.icon size={24} />
              </div>
              <div className="text-right">
                <div className="text-3xl font-black tracking-tighter">
                  {plan.price}
                  <span className="text-xs opacity-40 italic">{plan.period}</span>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">{plan.name}</h3>
              <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{plan.description}</p>
            </div>

            <div className="flex-1 space-y-4 mb-10">
              {plan.features.map((feature, fIdx) => (
                <div key={fIdx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <Check size={10} className="text-green-500" />
                  </div>
                  <span className="text-[11px] font-bold opacity-70 tracking-tight">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              className={`w-full py-5 rounded-full font-black uppercase text-[11px] tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2 ${plan.current ? 'opacity-50 cursor-default' : ''}`}
              style={{ 
                backgroundColor: plan.highlight || plan.current ? dashBtn : 'transparent',
                color: plan.highlight || plan.current ? dashBtnText : dashText,
                border: plan.highlight || plan.current ? 'none' : `1px solid ${panelBorder}`
              }}
              disabled={plan.current}
            >
              {plan.buttonText}
              {!plan.current && <ArrowRight size={14} />}
            </button>
          </div>
        ))}
      </div>

      {/* Feature Comparison Mockup */}
      <div className="mt-20 p-12 rounded-[3rem] border shadow-2xl overflow-hidden relative" style={{ backgroundColor: panelBg, borderColor: panelBorder }}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] -z-10" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter">Premium Features</h3>
            <div className="space-y-4">
              {[
                { icon: Monitor, text: "Desktop & Mobile Optimized Layouts" },
                { icon: BarChart3, text: "Wait times & Conversion Tracking" },
                { icon: ShoppingBag, text: "Sell Digital Products with 0% Commission" },
                { icon: Palette, text: "Unlimited Custom Theme Engineering" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all cursor-default">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.05)', color: dashBtn }}>
                    <item.icon size={20} />
                  </div>
                  <span className="text-xs font-bold opacity-80 tracking-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative aspect-video rounded-3xl overflow-hidden border-2 shadow-2xl" style={{ borderColor: panelBorder }}>
             <img 
               src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop" 
               alt="Analytics Dashboard" 
               className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-bottom p-8">
                <div className="mt-auto">
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Live Insights</p>
                   <h4 className="text-xl font-black text-white uppercase italic tracking-tight">Real-time Visitor Tracking</h4>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
