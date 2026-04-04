"use client";

import React, { useState, useEffect } from "react";
import { 
  Zap, 
  Instagram, 
  Plus, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  MessageSquare,
  Sparkles,
  Link as LinkIcon
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function ToolsTab({ 
  profile, 
  panelBg = 'rgba(255,255,255,0.03)', 
  panelBorder = 'rgba(255,255,255,0.08)',
  dashBtn = '#A855F7',
  dashBtnText = '#FFFFFF'
}: any) {
  const [automations, setAutomations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // Mock connection state
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [newRule, setNewRule] = useState({
    keyword: "",
    link: ""
  });

  const supabase = createClient();

  useEffect(() => {
    fetchAutomations();
  }, [profile?.id]);

  const fetchAutomations = async () => {
    if (!profile?.id) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('instagram_automations')
        .select('*')
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });
      
      if (data) setAutomations(data);
    } catch (err) {
      console.error("Error fetching automations:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRule.keyword || !newRule.link) return;

    try {
      const { data, error } = await supabase
        .from('instagram_automations')
        .insert({
          user_id: profile.id,
          trigger_keyword: newRule.keyword,
          reply_link: newRule.link,
          is_active: true
        })
        .select()
        .single();

      if (data) {
        setAutomations([data, ...automations]);
        setShowAddModal(false);
        setNewRule({ keyword: "", link: "" });
      }
    } catch (err) {
      console.error("Error adding rule:", err);
    }
  };

  const handleDeleteRule = async (id: string) => {
    try {
      const { error } = await supabase
        .from('instagram_automations')
        .delete()
        .eq('id', id);
      
      if (!error) {
        setAutomations(automations.filter(a => a.id !== id));
      }
    } catch (err) {
      console.error("Error deleting rule:", err);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('instagram_automations')
        .update({ is_active: !currentStatus })
        .eq('id', id);
      
      if (!error) {
        setAutomations(automations.map(a => a.id === id ? { ...a, is_active: !currentStatus } : a));
      }
    } catch (err) {
      console.error("Error toggling status:", err);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      {/* HERO SECTION - Instagram Auto-reply */}
      <div className="relative overflow-hidden rounded-[3rem] bg-white shadow-2xl border border-zinc-100 p-12 lg:p-20">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-[10px] font-black uppercase tracking-widest mb-8">
            <Sparkles size={12} fill="currentColor" /> Feature Spotlight
          </div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-zinc-900 leading-[0.9] mb-8">
            Drive more sales, leads and interest with Instagram auto-reply.
          </h1>
          <p className="text-lg text-zinc-500 font-medium mb-12 max-w-lg">
            Learn how to stay on top of every comment without lifting a finger. Automate your DMs and turn every interaction into a conversion.
          </p>
          
          <button 
            onClick={() => {
              setIsConnecting(true);
              setTimeout(() => {
                setIsConnecting(false);
                setIsConnected(true);
              }, 2000);
            }}
            disabled={isConnecting || isConnected}
            className={`flex items-center gap-3 px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 disabled:opacity-80`}
            style={{ 
              backgroundColor: isConnected ? '#10B981' : '#8B3DFF', 
              color: '#FFFFFF' 
            }}
          >
            {isConnecting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : isConnected ? (
              <CheckCircle2 size={18} />
            ) : (
              <Instagram size={18} />
            )}
            {isConnecting ? "Connecting..." : isConnected ? "Instagram Connected" : "Connect Instagram"}
          </button>
        </div>

        {/* Visual Mockup - Phone Illustration */}
        <div className="hidden lg:block absolute bottom-0 right-0 w-1/2 h-full opacity-100 transform translate-y-1/4 pointer-events-none">
           <div className="relative w-full h-full flex items-center justify-center">
              {/* Background Glow */}
              <div className="absolute w-[500px] h-[500px] bg-orange-500/80 rounded-full blur-[120px]" />
              
              {/* Phone Frame */}
              <div className="relative w-[300px] aspect-[9/19] bg-zinc-900 rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
                 <div className="w-full p-6 flex justify-between items-center bg-white border-b border-zinc-100">
                    <Instagram size={20} className="text-zinc-900" />
                    <div className="flex gap-4">
                       <Zap size={16} className="text-zinc-300" />
                       <MessageSquare size={16} className="text-zinc-300" />
                    </div>
                 </div>
                 <div className="flex-1 bg-zinc-50 p-4 space-y-4">
                    <div className="w-full h-40 bg-zinc-200 rounded-2xl animate-pulse" />
                    <div className="flex gap-3">
                       <div className="w-10 h-10 rounded-full bg-zinc-300 shrink-0" />
                       <div className="space-y-2 flex-1">
                          <div className="w-1/2 h-3 bg-zinc-300 rounded" />
                          <div className="w-full h-12 bg-white rounded-xl border border-zinc-200 p-3 text-[10px] font-bold text-zinc-500">
                             Commented: <span className="text-purple-600 font-black">RECIPE</span>
                          </div>
                       </div>
                    </div>
                    {/* Animated DM Notification */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-4 w-4/5 bg-white shadow-2xl border border-purple-100 rounded-2xl p-4 animate-bounce">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white">
                             <Zap size={14} fill="white" />
                          </div>
                          <div className="flex-1">
                             <p className="text-[10px] font-black uppercase text-purple-600">New DM Sent!</p>
                             <p className="text-[8px] text-zinc-400 font-bold truncate">Here is the link for the recipe...</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* AUTOMATION RULES LIST */}
      <div className="space-y-8">
        <div className="flex justify-between items-end px-2">
           <div className="space-y-2">
             <h3 className="text-3xl font-black tracking-tighter text-white uppercase italic">Active Automations</h3>
             <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Configure your trigger keywords and reply links</p>
           </div>
           <button 
             onClick={() => setShowAddModal(true)}
             className="flex items-center gap-2 px-8 py-4 bg-white rounded-full text-[11px] font-black uppercase tracking-widest text-zinc-900 shadow-xl hover:scale-105 transition active:scale-95"
           >
              <Plus size={16} /> New Rule
           </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1,2].map(i => <div key={i} className="h-32 rounded-[2rem] bg-white/5 animate-pulse" />)}
          </div>
        ) : automations.length === 0 ? (
          <div 
            className="flex flex-col items-center justify-center p-20 rounded-[3rem] border-2 border-dashed transition-all"
            style={{ backgroundColor: panelBg, borderColor: panelBorder }}
          >
             <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-zinc-600 mb-6">
                <MessageSquare size={32} />
             </div>
             <p className="text-lg font-bold text-zinc-400">No automations created yet.</p>
             <p className="text-sm text-zinc-600 font-medium mt-2">Create your first trigger word to start automating.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {automations.map(rule => (
              <div 
                key={rule.id}
                className="group p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8 transition-all hover:bg-white/[0.02]"
                style={{ backgroundColor: panelBg }}
              >
                 <div className="flex items-center gap-8 flex-1">
                    <div className="w-20 h-20 bg-white/5 rounded-[1.8rem] flex items-center justify-center shrink-0 border border-white/5 group-hover:scale-110 transition-transform">
                       <MessageSquare size={28} className="text-purple-400" />
                    </div>
                    <div className="space-y-2">
                       <div className="flex items-center gap-3">
                          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Keyword</span>
                          <span className="px-3 py-1 bg-purple-500/10 rounded-md text-xs font-black text-purple-400">"{rule.trigger_keyword}"</span>
                       </div>
                       <h4 className="text-xl font-bold text-white truncate max-w-sm flex items-center gap-3">
                          <LinkIcon size={16} className="text-zinc-600" /> {rule.reply_link}
                       </h4>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                       <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">Total Hits</p>
                       <p className="text-2xl font-black text-white italic">{rule.click_count || 0}</p>
                    </div>
                    <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />
                    <div className="flex items-center gap-3">
                       <button 
                         onClick={() => toggleStatus(rule.id, rule.is_active)}
                         className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${rule.is_active ? 'bg-zinc-800 text-purple-400' : 'bg-white/5 text-zinc-600'}`}
                       >
                          {rule.is_active ? 'Active' : 'Paused'}
                       </button>
                       <button 
                         onClick={() => handleDeleteRule(rule.id)}
                         className="p-4 bg-red-500/10 rounded-full text-red-500 hover:bg-red-500 transition-all hover:text-white"
                       >
                          <Trash2 size={18} />
                       </button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD NEW RULE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={() => setShowAddModal(false)} />
           <div className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[3rem] p-12 shadow-2xl animate-in zoom-in-95 duration-300">
              <h3 className="text-3xl font-black italic tracking-tighter text-white uppercase mb-8">Create Automation</h3>
              <form onSubmit={handleAddRule} className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500 ml-1">Trigger Keyword</label>
                    <input 
                      type="text" 
                      placeholder="e.g. RECIPE, JOIN, LINK" 
                      className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl text-white font-bold tracking-wide outline-none focus:border-purple-500 transition-all"
                      value={newRule.keyword}
                      onChange={e => setNewRule({ ...newRule, keyword: e.target.value.toUpperCase() })}
                    />
                 </div>
                 <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-widest text-zinc-500 ml-1">Automatic Reply Link</label>
                    <input 
                      type="url" 
                      placeholder="https://..." 
                      className="w-full p-6 bg-white/5 border border-white/10 rounded-3xl text-white font-bold tracking-wide outline-none focus:border-purple-500 transition-all"
                      value={newRule.link}
                      onChange={e => setNewRule({ ...newRule, link: e.target.value })}
                    />
                 </div>
                 
                 <div className="flex flex-col gap-4 pt-4">
                    <button 
                      type="submit"
                      className="w-full py-6 bg-purple-600 rounded-3xl text-white font-black uppercase tracking-widest text-xs shadow-2xl shadow-purple-900/40 hover:scale-[1.02] transition active:scale-95"
                    >
                       Launch Automation
                    </button>
                    <button 
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="w-full py-6 text-zinc-500 font-bold uppercase tracking-widest text-[10px] hover:text-white transition"
                    >
                       Go Back
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}

    </div>
  );
}
