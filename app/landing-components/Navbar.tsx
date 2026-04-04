"use client";

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-glass py-6 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
            <img src="/logo-white.png" alt="Socials" className="h-7 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
           <a href="#features" className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Features</a>
           <a href="#pricing" className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Pricing</a>
           <a href="#templates" className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Templates</a>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <Link href="/login" className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Login</Link>
        <Link href="/login" className="px-8 py-3 rounded-full btn-lp-primary text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-500/20">
           Start for Free
        </Link>
      </div>
    </nav>
  );
}
