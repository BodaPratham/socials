"use client";

import React from 'react';
import { Instagram, Twitter, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-lp-black text-white py-32 px-6">
       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
             <img src="/logo-white.png" alt="Socials" className="h-8 w-auto" />
             <p className="max-w-xs text-lg opacity-40 leading-relaxed font-medium">Empowering the next generation of digital architects and creators through elegant tools.</p>
             <div className="flex gap-6 opacity-40">
                <Instagram size={20} className="hover:opacity-100 cursor-pointer" />
                <Twitter size={20} className="hover:opacity-100 cursor-pointer" />
                <Youtube size={20} className="hover:opacity-100 cursor-pointer" />
                <Mail size={20} className="hover:opacity-100 cursor-pointer" />
             </div>
          </div>

          <div className="space-y-6">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Platform</h4>
             <div className="flex flex-col gap-4 text-sm font-bold opacity-60">
                <a href="#features" className="hover:text-purple-400">Features</a>
                <a href="#pricing" className="hover:text-purple-400">Pricing</a>
                <a href="#templates" className="hover:text-purple-400">Templates</a>
                <a href="/login" className="hover:text-purple-400">Log In</a>
             </div>
          </div>

          <div className="space-y-6">
             <h4 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Legal</h4>
             <div className="flex flex-col gap-4 text-sm font-bold opacity-60">
                <span className="hover:text-purple-400 cursor-pointer">Privacy Protocol</span>
                <span className="hover:text-purple-400 cursor-pointer">Terms of Architecture</span>
                <span className="hover:text-purple-400 cursor-pointer">Cookie Policy</span>
             </div>
          </div>
       </div>
       <div className="max-w-7xl mx-auto border-t border-white/5 mt-24 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-20">
           <p className="text-[10px] font-black uppercase tracking-[0.3em]">&copy; {new Date().getFullYear()} SOCIALS PROTOCOL. ALL RIGHTS ARCHITECTED.</p>
           <p className="text-[10px] font-black uppercase tracking-[0.3em]">VERSION 1.0.4_BUILD</p>
       </div>
    </footer>
  );
}
