import React, { useEffect, useState } from 'react';
import { TrendingUp, Coffee, Package, Share2, Sparkles, Crown } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface EarningsPageProps {
  profile: any;
  products: any[];
  dashBtn?: string;
  dashText?: string;
  panelBg?: string;
  panelBorder?: string;
  setActiveTab?: (tab: string) => void;
}

export default function EarningsPage({ 
  profile, 
  products,
  dashBtn = '#A855F7',
  dashText = '#FFFFFF',
  panelBg = 'rgba(255,255,255,0.05)',
  panelBorder = 'rgba(255,255,255,0.1)',
  setActiveTab
}: EarningsPageProps) {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    async function fetchEarnings() {
      if (!profile?.id) return;
      try {
        const { data: salesData, error } = await supabase
          .from('marketplace_transactions')
          .select('*')
          .eq('creator_id', profile.id);

        if (salesData && !error) {
          setTransactions(salesData);
        }
      } catch (error) {
        console.error("Error fetching earnings:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchEarnings();
  }, [profile]);

  const totalRevenue = transactions.reduce((acc, curr) => acc + (curr.total_amount || 0), 0);
  const productRevenue = transactions.filter(t => t.type !== 'tip').reduce((acc, curr) => acc + (curr.total_amount || 0), 0);
  const tipRevenue = transactions.filter(t => t.type === 'tip').reduce((acc, curr) => acc + (curr.total_amount || 0), 0);

  const hasEarnings = totalRevenue > 0 || transactions.length > 0;

  const handleShare = () => {
    const url = `${window.location.origin}/${profile?.c_username}`;
    navigator.clipboard.writeText(url);
    alert("Storefront Link Copied!");
  };

  if (loading) {
    return (
      <div className="flex-1 w-full h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: dashBtn }}></div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-8 min-h-screen pb-20" style={{ color: dashText }}>
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight" style={{ color: dashBtn }}>Earnings</h2>
        </div>
        {hasEarnings && (
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleShare} 
              className="flex items-center rounded-full px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95"
              style={{ backgroundColor: dashBtn, color: '#FFFFFF' }}
            >
              <Share2 className="mr-2 h-4 w-4" /> Share My Links
            </button>
          </div>
        )}
      </div>

      {!hasEarnings ? (
        <div className="flex flex-col items-center justify-center mt-20 space-y-8 animate-in fade-in duration-700">
          <div className="relative w-80 h-48 flex items-center justify-center mb-6">
             {/* Dynamic Themed Illustration */}
             <div className="absolute top-4 left-10 -rotate-12 w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-lg z-0" style={{ backgroundColor: dashBtn, borderColor: panelBorder }}>
               <Sparkles size={20} className="text-white" />
             </div>
             <div className="absolute bottom-2 right-12 rotate-12 w-14 h-14 rounded-full border-2 flex items-center justify-center shadow-lg z-30" style={{ backgroundColor: dashBtn, borderColor: panelBorder }}>
               <span className="text-2xl font-black text-white">$</span>
             </div>
             
             <div className="flex items-end justify-center z-10 w-full">
               <div className="w-24 h-32 rounded-2xl border-2 shadow-2xl -rotate-12 translate-x-8 z-10 overflow-hidden relative" style={{ backgroundColor: panelBg, borderColor: panelBorder, backdropFilter: 'blur(10px)' }}>
                 <div className="absolute inset-0 opacity-20" style={{ backgroundColor: dashBtn }} />
                 <div className="absolute bottom-2 right-2 text-[8px] font-black px-2 py-1 rounded-full border z-20" style={{ backgroundColor: panelBg, borderColor: panelBorder, color: dashText }}>PSD</div>
               </div>
               
               <div className="w-28 h-40 rounded-2xl border-2 shadow-2xl z-20 overflow-hidden flex flex-col items-center" style={{ backgroundColor: panelBg, borderColor: panelBorder, backdropFilter: 'blur(10px)' }}>
                 <div className="w-full h-24 relative" style={{ backgroundColor: dashBtn }}>
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                   <div className="absolute bottom-2 left-0 right-0 text-[10px] font-black text-white uppercase text-center leading-tight tracking-widest drop-shadow-md">Track 1</div>
                 </div>
                 <div className="flex-1 w-full flex items-center justify-center p-2" style={{ backgroundColor: panelBg }}>
                   <div className="text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-wider text-center" style={{ backgroundColor: dashBtn, color: '#FFFFFF' }}>MP3</div>
                 </div>
               </div>

               <div className="w-24 h-32 rounded-2xl border-2 shadow-2xl rotate-12 -translate-x-8 z-10 overflow-hidden flex flex-col relative" style={{ backgroundColor: panelBg, borderColor: panelBorder, backdropFilter: 'blur(10px)' }}>
                 <div className="p-3 pb-0 text-[10px] font-black uppercase text-center leading-tight tracking-wider" style={{ color: dashText }}>Barista<br/>Basics</div>
                 <div className="flex-1 flex justify-center items-center">
                   <Coffee size={24} style={{ color: dashBtn }} className="mb-2"/>
                 </div>
                 <div className="absolute bottom-2 right-2 text-[8px] font-black px-2 py-1 rounded-full border" style={{ backgroundColor: panelBg, borderColor: panelBorder, color: dashText }}>PDF</div>
               </div>
             </div>
          </div>
          
          <h3 className="text-2xl font-semibold" style={{ color: dashText }}>Let's get your first sale.</h3>
          <p className="text-sm text-center max-w-sm leading-relaxed mt-2 opacity-60">
            You've added products, now share them! Creators earn 2X more when they share their page to social media.
          </p>
          
          <div className="pt-4">
            <button 
              onClick={handleShare} 
              className="px-10 py-5 rounded-full font-black uppercase text-[11px] tracking-widest shadow-xl active:scale-95 transition-all"
              style={{ backgroundColor: dashBtn, color: '#FFFFFF' }}
            >
              Share my Page
            </button>
          </div>

          <div className="mt-20 w-full max-w-xs flex items-center gap-4 p-4 rounded-2xl border" style={{ backgroundColor: panelBg, borderColor: panelBorder }}>
             <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-lg" style={{ backgroundColor: dashBtn, color: '#FFFFFF' }}>
                ★
             </div>
             <div className="flex-1">
               <p className="text-sm font-bold leading-tight" style={{ color: dashText }}>Got Ideas?</p>
               <p className="text-xs opacity-60 mt-0.5">We're listening! <span className="underline cursor-pointer transition-colors" style={{ color: dashBtn }}>Share feedback</span></p>
             </div>
          </div>

          {(profile?.subscription_plan === 'starter' || !profile?.subscription_plan) && (
            <div className="mt-8 w-full max-w-sm p-6 rounded-[2rem] border border-dashed flex flex-col items-center text-center gap-4" style={{ borderColor: panelBorder, backgroundColor: 'rgba(168, 85, 247, 0.05)' }}>
              <Crown size={24} className="text-yellow-500" />
              <div>
                <h4 className="text-sm font-black uppercase tracking-tighter">Unlock Pro Earnings</h4>
                <p className="text-[10px] font-bold opacity-60 mt-1 max-w-[200px]">Sell digital products with 0% commission and get advanced sales reports.</p>
              </div>
              <button 
                onClick={() => setActiveTab?.('plans')}
                className="px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all hover:scale-105"
                style={{ backgroundColor: dashBtn, color: '#FFFFFF' }}
              >
                View Pro Plans
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 border shadow-xl rounded-[2rem] flex flex-col transition-all" style={{ backgroundColor: panelBg, borderColor: panelBorder }}>
              <div className="flex flex-row items-center justify-between pb-2">
                <h3 className="text-[11px] font-black uppercase tracking-widest opacity-60">Total Revenue</h3>
                <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-80" style={{ backgroundColor: panelBorder }}>
                  <TrendingUp className="h-4 w-4" style={{ color: dashBtn }} />
                </div>
              </div>
              <div className="pt-2">
                <div className="text-4xl font-black tracking-tighter">${totalRevenue.toFixed(2)}</div>
                <p className="text-[10px] font-bold uppercase tracking-widest mt-2" style={{ color: dashBtn }}>+12.5% from last month</p>
              </div>
            </div>
            
            <div className="p-6 border shadow-xl rounded-[2rem] flex flex-col transition-all" style={{ backgroundColor: panelBg, borderColor: panelBorder }}>
              <div className="flex flex-row items-center justify-between pb-2">
                <h3 className="text-[11px] font-black uppercase tracking-widest opacity-60">Product Sales</h3>
                <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-80" style={{ backgroundColor: panelBorder }}>
                  <Package className="h-4 w-4" style={{ color: dashBtn }} />
                </div>
              </div>
              <div className="pt-2">
                <div className="text-4xl font-black tracking-tighter">${productRevenue.toFixed(2)}</div>
                <p className="text-[10px] font-bold uppercase tracking-widest mt-2 opacity-60">{transactions.filter(t => t.type !== 'tip').length} total orders</p>
              </div>
            </div>

            <div className="p-6 border shadow-xl rounded-[2rem] flex flex-col transition-all" style={{ backgroundColor: panelBg, borderColor: panelBorder }}>
              <div className="flex flex-row items-center justify-between pb-2">
                <h3 className="text-[11px] font-black uppercase tracking-widest opacity-60">Tips (Coffee)</h3>
                <div className="w-10 h-10 rounded-full flex items-center justify-center opacity-80" style={{ backgroundColor: panelBorder }}>
                  <Coffee className="h-4 w-4" style={{ color: dashBtn }} />
                </div>
              </div>
              <div className="pt-2">
                <div className="text-4xl font-black tracking-tighter">${tipRevenue.toFixed(2)}</div>
                <p className="text-[10px] font-bold uppercase tracking-widest mt-2 opacity-60">{transactions.filter(t => t.type === 'tip').length} direct supporters</p>
              </div>
            </div>
          </div>

          {/* Recent History */}
          <div className="border shadow-xl rounded-[2rem] overflow-hidden flex flex-col transition-all" style={{ backgroundColor: panelBg, borderColor: panelBorder }}>
            <div className="p-8 pb-6 border-b" style={{ borderColor: panelBorder }}>
              <h3 className="text-[16px] font-black tracking-widest uppercase" style={{ color: dashBtn }}>Recent Transactions</h3>
            </div>
            <div className="p-0 overflow-x-auto w-full">
              <table className="w-full text-sm">
                <thead style={{ backgroundColor: panelBorder }}>
                  <tr>
                    <th className="font-black uppercase text-[10px] tracking-widest text-left pl-8 py-4 opacity-60">Type</th>
                    <th className="font-black uppercase text-[10px] tracking-widest text-left py-4 opacity-60">Item/Source</th>
                    <th className="font-black uppercase text-[10px] tracking-widest text-left py-4 opacity-60">Date</th>
                    <th className="font-black uppercase text-[10px] tracking-widest text-right pr-8 py-4 opacity-60">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.slice(0, 10).map((tx) => (
                    <tr key={tx.id} className="border-b last:border-0 transition-colors hover:opacity-80" style={{ borderColor: panelBorder }}>
                      <td className="pl-8 py-6">
                        {tx.type === 'tip' ? (
                          <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-black inline-flex items-center gap-2" style={{ backgroundColor: panelBorder, color: dashText }}><Coffee size={12}/> Tip</span>
                        ) : (
                          <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-black inline-flex items-center gap-2" style={{ backgroundColor: panelBorder, color: dashText }}><Package size={12}/> Product</span>
                        )}
                      </td>
                      <td className="font-bold text-sm tracking-wide">{tx.item_name || 'Support from fan'}</td>
                      <td className="opacity-60 font-bold text-[11px] tracking-wider uppercase">
                        {new Date(tx.created_at).toLocaleDateString()}
                      </td>
                      <td className="text-right pr-8">
                        <span className="font-black px-3 py-1.5 rounded-xl text-[12px] tracking-wider" style={{ color: dashBtn, backgroundColor: panelBorder }}>
                          +${(tx.total_amount || 0).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}