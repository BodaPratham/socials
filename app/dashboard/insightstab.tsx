"use client";

import React from 'react';
import { 
  BarChart3, 
  Eye, 
  MousePointer2, 
  UserPlus, 
  Info, 
  ChevronDown, 
  Share2, 
  Instagram, 
  Youtube, 
  ExternalLink,
  ChevronRight,
  Sparkles
} from "lucide-react";

interface InsightsTabProps {
  profile: any;
  dashBtn?: string;
  dashBtnText?: string;
  panelBg?: string;
  panelBorder?: string;
  dashText?: string;
}

export default function InsightsTab({
  profile,
  dashBtn = '#A855F7',
  dashBtnText = '#FFFFFF',
  panelBg = 'rgba(255,255,255,0.05)',
  panelBorder = 'rgba(255,255,255,0.1)',
  dashText = '#FFFFFF'
}: InsightsTabProps) {
  const [stats, setStats] = React.useState({
    views: 0,
    clicks: 0,
    contacts: 0
  });
  const [loading, setLoading] = React.useState(true);
  const supabase = React.useMemo(() => {
    // We assume the component is client-side and can use a client util
    // or we can expect it to be passed. Since it's in dashboard, we use the client.
    const { createClient } = require("@/utils/supabase/client");
    return createClient();
  }, []);

  React.useEffect(() => {
    async function fetchStats() {
      if (!profile?.id) return;
      try {
        setLoading(true);
        // Fetch last 7 days stats
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const isoDate = weekAgo.toISOString();

        const [viewsRes, clicksRes, contactsRes] = await Promise.all([
          supabase.from('page_visits').select('*', { count: 'exact', head: true }).eq('user_id', profile.id).gte('created_at', isoDate),
          supabase.from('link_clicks').select('*', { count: 'exact', head: true }).eq('user_id', profile.id).gte('created_at', isoDate),
          supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('user_id', profile.id).gte('created_at', isoDate)
        ]);

        setStats({
          views: viewsRes.count || 0,
          clicks: clicksRes.count || 0,
          contacts: contactsRes.count || 0
        });
      } catch (error) {
        console.error("Error fetching insights:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [profile, supabase]);

  const handleShare = () => {
    const url = `${window.location.origin}/${profile?.c_username}`;
    navigator.clipboard.writeText(url);
    alert("Profile Link Copied!");
  };

  const StatCard = ({ icon: Icon, label, value }: { icon: any, label: string, value: string | number }) => (
    <div className="p-8 rounded-[2rem] border shadow-xl flex flex-col gap-4 transition-all hover:scale-[1.02]" style={{ backgroundColor: panelBg, borderColor: panelBorder }}>
      <div className="flex items-center justify-between">
        <Icon size={20} className="opacity-60" />
      </div>
      <div>
        <div className="text-4xl font-black tracking-tighter mb-1">{value}</div>
        <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{label}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-black uppercase italic tracking-tighter" style={{ color: dashBtn }}>Insights</h2>
          <Info size={16} className="opacity-40 cursor-help" />
        </div>
        
        <button 
          className="flex items-center gap-3 px-6 py-3 rounded-full border text-[10px] font-black uppercase tracking-widest transition-all hover:bg-white/5"
          style={{ borderColor: panelBorder }}
        >
          <span>Last 7 days</span>
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Top Row Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={Eye} label="Views" value={loading ? "..." : stats.views} />
        <StatCard icon={MousePointer2} label="Clicks" value={loading ? "..." : stats.clicks} />
        <StatCard icon={UserPlus} label="New contacts" value={loading ? "..." : stats.contacts} />
      </div>

      {/* Main Activity Chart Area */}
      <div className="rounded-[2.5rem] border p-12 relative overflow-hidden flex flex-col items-center justify-center min-h-[450px] shadow-2xl transition-all" style={{ backgroundColor: panelBg, borderColor: panelBorder }}>
        <div className="absolute top-8 left-10 flex flex-col gap-1">
          <div className="flex items-center gap-3 group">
            <h3 className="text-sm font-black uppercase tracking-widest opacity-60">Linktree activity</h3>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
          </div>
          <button className="text-[10px] font-black uppercase tracking-widest underline decoration-dotted opacity-40 hover:opacity-100 transition-all">Show sample data</button>
        </div>

        {/* Illustration Placeholder */}
        <div className="flex flex-col items-center gap-8 text-center max-w-sm">
           <div className="relative w-48 h-32 flex items-center justify-center">
             {/* Styled Chart Placeholder */}
             <div className="absolute inset-0 bg-white/5 rounded-3xl border-2 border-dashed flex items-end justify-around p-4 gap-2" style={{ borderColor: panelBorder }}>
                <div className="w-full bg-white/10 rounded-t-lg transition-all duration-1000" style={{ height: '30%' }}></div>
                <div className="w-full bg-white/10 rounded-t-lg transition-all duration-1000 delay-100" style={{ height: '50%' }}></div>
                <div className="w-full bg-white/10 rounded-t-lg transition-all duration-1000 delay-200" style={{ height: '20%' }}></div>
                <div className="w-full bg-white/10 rounded-t-lg transition-all duration-1000 delay-300" style={{ height: '70%' }}></div>
                <div className="w-full bg-white/10 rounded-t-lg transition-all duration-1000 delay-400" style={{ height: '40%' }}></div>
             </div>
             {/* Visitor Badge Mock */}
             <div className="absolute -right-4 -top-4 px-4 py-2 rounded-2xl bg-white/10 border backdrop-blur-md shadow-xl" style={{ borderColor: panelBorder }}>
                <div className="text-lg font-black tracking-tighter">256k</div>
                <div className="text-[8px] font-black uppercase tracking-widest opacity-40">visitors</div>
             </div>
           </div>

           <div className="space-y-3">
             <p className="text-sm font-bold opacity-60">No Linktree activity during this time</p>
             <button 
               onClick={handleShare}
               className="px-10 py-5 rounded-full font-black uppercase text-[11px] tracking-widest flex items-center gap-3 shadow-2xl active:scale-95 transition-all mx-auto"
               style={{ backgroundColor: '#000000', color: '#FFFFFF' }}
             >
               <Share2 size={16} />
               Share your Linktree
             </button>
           </div>
        </div>

        {/* Floating Tooltip Mock */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded-full border bg-white/5 backdrop-blur-sm group cursor-pointer hover:bg-white/10 transition-all" style={{ borderColor: panelBorder }}>
           <div className="w-6 h-6 rounded-full flex items-center justify-center bg-purple-600/20">
             <Sparkles size={12} className="text-purple-400" />
           </div>
           <span className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-all">How can I get more visitors to my Linktree?</span>
        </div>
      </div>

      {/* Bottom Row Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Social Follower Growth */}
        <div className="p-8 rounded-[2rem] border shadow-xl flex flex-col gap-6" style={{ backgroundColor: panelBg, borderColor: panelBorder }}>
           <div className="flex items-center justify-between group cursor-pointer">
             <h3 className="text-[11px] font-black uppercase tracking-widest opacity-60">Social follower growth</h3>
             <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
           </div>
           <button className="text-[10px] font-black uppercase tracking-widest underline decoration-dotted opacity-40 hover:opacity-100 text-left">Show sample data</button>
           
           <div className="grid grid-cols-3 gap-4 mt-2">
             <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 shadow-lg flex items-center justify-center">
                  <Instagram size={24} className="text-white" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Connect</span>
             </div>
             <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-black shadow-lg flex items-center justify-center border border-white/10">
                  <div className="font-black text-xl italic skew-x-[-12deg]">T</div>
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Connect</span>
             </div>
             <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FF0000] shadow-lg flex items-center justify-center">
                  <Youtube size={24} className="text-white" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Connect</span>
             </div>
           </div>
        </div>

        {/* Most Engaging Posts */}
        <div className="p-8 rounded-[2rem] border shadow-xl flex flex-col gap-6" style={{ backgroundColor: panelBg, borderColor: panelBorder }}>
           <div className="flex items-center justify-between group cursor-pointer">
             <h3 className="text-[11px] font-black uppercase tracking-widest opacity-60">Most engaging posts</h3>
             <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
           </div>
           <button className="text-[10px] font-black uppercase tracking-widest underline decoration-dotted opacity-40 hover:opacity-100 text-left">Show sample data</button>
           
           <div className="flex justify-around items-center mt-2 opacity-20 filter grayscale">
             <Instagram size={32} />
             <div className="font-black text-3xl italic skew-x-[-12deg]">T</div>
             <Youtube size={32} />
           </div>
        </div>

        {/* Most Clicked Links */}
        <div className="p-8 rounded-[2rem] border shadow-xl flex flex-col gap-6" style={{ backgroundColor: panelBg, borderColor: panelBorder }}>
           <div className="flex items-center justify-between group cursor-pointer">
             <h3 className="text-[11px] font-black uppercase tracking-widest opacity-60">Most clicked links</h3>
             <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
           </div>
           <button className="text-[10px] font-black uppercase tracking-widest underline decoration-dotted opacity-40 hover:opacity-100 text-left">Show sample data</button>
           
           <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2 py-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <ExternalLink size={20} className="opacity-20" />
              </div>
              <p className="text-[10px] font-bold opacity-40">No clicks during this time</p>
           </div>
        </div>
      </div>
    </div>
  );
}
