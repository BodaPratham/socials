"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Link2,
  ShoppingBag,
  Palette,
  BarChart3,
  Users,
  DollarSign,
  Settings,
  Menu,
  Zap,
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Instagram,
  Youtube,
  Phone,
  Gift,
  Image as ImageIcon,
  Play,
  Loader2,
  Camera,
  ExternalLink,
  GripVertical,
  Share2,
  MoreHorizontal,
  CreditCard,
  Monitor,
  Sparkles,
  Globe,
  Check,
  LayoutGrid,
  Layers,
  Smartphone,
  Mail,
  Type,
  FormInput,
  UploadCloud,
  AlignLeft,
  Heart,      // <--- ADD THIS FOR THE TIP JAR
  Shield
} from "lucide-react";
import { RenderTemplate } from '../templates';

import LinksTab from "./linkstab";
import ShopTab from "./shoptab";
import DesignTab from "./designtab";
import EarningsTab from "./earnings";
import InsightsTab from "./insightstab";
import ToolsTab from "./toolstab";

// ==========================================
// INTERFACES (Replaces Types to fix Parsing Error)
// ==========================================
interface LinkItem {
  id?: string;
  user_id?: string;
  title: string;
  url: string;
  icon_type?: string;
  is_active?: boolean;
  position?: number;
  type?: "standard" | "youtube" | "tip" | "form" | "file" | "social" | "divider" | "shop" | "text" | "contact";
}

interface Product {
  id: string;
  name: string;
  price: string;
  description?: string;
  image_url?: string;
  product_type: "affiliate" | "digital";
  destination_url: string;
}

interface Profile {
  id: string;
  c_username: string;
  bio: string;
  avatar_url: string;
  whatsapp_number: string;
  insta_username: string;
  upi_id: string;
  theme_color?: string;
  template_id?: string;
}

// ==========================================
// MAIN DASHBOARD ENGINE
// ==========================================

export default function MasterArchitectureDashboard() {
  // 1. CONSTANTS & REFS
  const MASTER_ADMIN_ID = "1cef0ce0-63ef-4289-8053-e186b4284b6a";
  const supabase = createClient();

// 2. CONSOLIDATED STATE
const [profile, setProfile] = useState<any>(null); // Start as null for the safety guard
const availableTemplates = [
  // { id: 'minimal-modern', name: 'Minimal Modern', category: 'minimal' },
  { id: 'creator-pro', name: 'Creator Pro', category: 'social' },
  { id: 'ark-curate', name: 'ARK Curate', category: 'card' },
];
const [links, setLinks] = useState<any[]>([]);
const [products, setProducts] = useState<any[]>([]);
const [templates, setTemplates] = useState<any[]>([
  { id: 'default', name: 'Classic Minimal' },
  { id: 'creator-pro', name: 'Creator Pro' },
  { id: 'glass', name: 'Glassmorphism' }
]);
const [showSocialModal, setShowSocialModal] = useState(false);
const fileInputRef = useRef<HTMLInputElement>(null);
const productImgRef = useRef<HTMLInputElement>(null);
const digitalFileRef = useRef<HTMLInputElement>(null);
  
 
  const [isDeploying, setIsDeploying] = useState(false);
  
  // UI States
  const [activeTab, setActiveTab] = useState("links");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMyLinkOpen, setIsMyLinkOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [view, setView] = useState<'studio' | 'browse'>('studio');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showAddMenu, setShowAddMenu] = useState(false);

  // Inside MasterArchitectureDashboard
const [newTemplate, setNewTemplate] = useState({
  name: '',
  price: 0,
  thumbnail_url: '', // New field for the card image
  config: {
    bg_color: '#ffffff',
    text_color: '#000000',
    card_bg: '#f3f4f6',
    card_radius: 'rounded-xl',
    font_family: 'sans',
    header_style: 'classic' 
  }
});

// Dynamic values for Dashboard Theme
const config = profile?.design_config || {};
const dashBg = config.bgColor || '#0B0914';
const dashText = config.pageTextColor || '#FFFFFF';
const dashBtn = config.btnColor || '#A855F7';
const dashBtnText = config.btnTextColor || '#FFFFFF';
const dashFont = config.pageFont || 'sans-serif';

// Compute if dashBg is light or dark (naive check for hex or rgb) to set panel backgrounds
const isLightBg = (bg: string) => {
  if (bg.startsWith('#')) {
    const hex = bg.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return ((r * 299) + (g * 587) + (b * 114)) / 1000 > 128;
  }
  return false; // Default to dark for complex values
};
const panelBg = isLightBg(dashBg) ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.05)';
const panelBorder = isLightBg(dashBg) ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)';

// 3. MASTER DATA ENGINE
useEffect(() => {
  const fetchAllData = async () => {
    try {
      setInitialLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Parallel fetch for speed
      const [profRes, linksRes, prodRes, templRes] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('links').select('*').eq('user_id', user.id).order('position'),
        supabase.from('products').select('*').eq('user_id', user.id),
        supabase.from('templates').select('*').order('created_at', { ascending: false })
      ]);

      if (profRes.data) setProfile(profRes.data);
      if (linksRes.data) setLinks(linksRes.data);
      if (prodRes.data) setProducts(prodRes.data);
      if (templRes.data && templRes.data.length > 0) setTemplates(templRes.data);

    } catch (error) {
      console.error("Dashboard Load Error:", error);
    } finally {
      setInitialLoading(false);
    }
  };

  fetchAllData();
}, []);

  // 4. HELPERS
  const getYouTubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };


  const handleDeploy = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Update profile - spread without overriding template_id with invalid 'midnight' state
      const { error: pErr } = await supabase
        .from("profiles")
        .update(profile)
        .eq("id", user.id);

      if (pErr) throw pErr;

      // 2. Save links (Delete and Insert for simplicity and order preservation)
      await supabase.from("links").delete().eq("user_id", user.id);
      
      const linksToSave = links.map((link: any, index: number) => {
        const { id, ...saveData } = link;
        const payload = {
          ...saveData,
          user_id: user.id,
          position: index,
        };
        // ONLY send ID if it is a valid UUID (contains a hyphen)
        if (id && typeof id === 'string' && id.includes('-')) {
          payload.id = id;
        }
        return payload;
      });

      if (linksToSave.length > 0) {
        const { error: lErr } = await supabase.from("links").insert(linksToSave);
        if (lErr) throw lErr;
      }

      // 3. Save products (Upsert to maintain IDs and handle new products)
      if (products && products.length > 0) {
        const productsToSave = products.map((p: any) => {
          const { id, ...saveData } = p;
          const payload = {
            ...saveData,
            user_id: user.id
          };
          // ONLY send ID if it is a valid UUID
          if (id && typeof id === 'string' && id.includes('-')) {
            payload.id = id;
          }
          return payload;
        });
        
        const { error: prErr } = await supabase
          .from("products")
          .upsert(productsToSave);
        if (prErr) throw prErr;
      }

      alert("✅ Page Successfully Updated");
    } catch (err: any) {
      console.error("Deploy Error:", err);
      alert(`Update failed. ${err.message || "Please check console."}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const path = `avatars/${user?.id}-${Date.now()}`;
      await supabase.storage.from("avatars").upload(path, file);
      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(path);
      setProfile((prev: any) => ({ ...prev, avatar_url: publicUrl }));
    } finally {
      setUploading(false);
    }
  };

  const handleProductUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "file"
  ) => {
    const file = e.target.files?.[0];
    if (!file || !activeProductId) return;
    setUploading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const bucket = type === "image" ? "product-images" : "digital-downloads";
      const ext = file.name.split(".").pop();
      const path = `${user?.id}/${activeProductId}-${type}.${ext}`;
      await supabase.storage.from(bucket).upload(path, file, { upsert: true });
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(path);
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id !== activeProductId) return p;
          return type === "image"
            ? { ...p, image_url: publicUrl }
            : { ...p, destination_url: publicUrl };
        })
      );
    } finally {
      setUploading(false);
      setActiveProductId(null);
    }
  };

 

 // At the top of your handleSubmitTemplate function:
 const handleSubmitTemplate = async (e: React.FormEvent) => {
  e.preventDefault();
  const newId = crypto.randomUUID(); 

  const { error } = await supabase.from('templates').insert({
    id: newId,
    name: newTemplate.name,
    price: newTemplate.price,
    thumbnail_url: newTemplate.thumbnail_url, // Save the visual preview
    creator_id: profile?.id,
    config: newTemplate.config,
    is_approved: profile?.id === MASTER_ADMIN_ID
  });

  if (!error) {
    setShowSubmitModal(false);
    alert("Theme saved successfully!");
  }
};

  const handleUpdateProfile = async (updates: any) => {
    if (!profile?.id) return;
  
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', profile.id);
  
    if (!error) {
      // This updates your state so the iPhone preview changes color instantly
      setProfile((prev: any) => ({ ...prev, ...updates }));
    } else {
      console.error("Update Error:", error.message);
    }
  };

  const handleApplyTheme = async (template: any) => {
    if (!profile) return;
  
    // 1. FREE OR OWNED: Apply immediately
    // If price is 0 OR the user is the one who created it
    if (template.price === 0 || template.creator_id === profile.id) {
      return handleUpdateProfile({ 
        template_id: template.id,
        design_config: { ...(profile.design_config || {}), ...(template.config || {}) }
      });
    }
  
    // 2. CHECK PURCHASE HISTORY: Has this user bought it before?
    const { data: purchase, error: purchaseError } = await supabase
      .from('marketplace_transactions')
      .select('id')
      .eq('template_id', template.id)
      .eq('buyer_id', profile.id)
      .single();
  
    if (purchase) {
      return handleUpdateProfile({ 
        template_id: template.id,
        design_config: { ...(profile.design_config || {}), ...(template.config || {}) }
      });
    }
  
    // 3. MOCK PURCHASE FLOW: If not owned and not free
    const confirmPurchase = confirm(
      `UNLOCKED REQUIRED: Would you like to license "${template.name}" for $${template.price}?`
    );
  
    if (confirmPurchase) {
      // Insert transaction (Database trigger handles the revenue split automatically)
      const { error: txError } = await supabase
        .from('marketplace_transactions')
        .insert({
          template_id: template.id,
          buyer_id: profile.id,
          total_amount: template.price
        });
  
      if (txError) {
        console.error("Transaction Error:", txError);
        alert("Transaction failed. Please check your connection.");
      } else {
        // Success: Apply the theme now that it is licensed
        handleUpdateProfile({ 
          template_id: template.id,
          design_config: { ...(profile.design_config || {}), ...(template.config || {}) }
        });
        alert(`✅ ${template.name} is now applied to your page.`);
      }
    }
  }; 

  const handleTemplateChange = async (templateId: string) => {
    if (!profile?.id) return; // Guard

    try {
      // 1. Instant UI update so the preview reacts immediately
      setProfile((prev: any) => ({ ...prev, template_id: templateId }));

      // 2. Database update
      const { error } = await supabase
        .from('profiles')
        .update({ template_id: templateId })
        .eq('id', profile.id);

      if (error) throw error;
    } catch (error) {
      console.error('Template Update Error:', error);
    }
  };

  // --- ADD THE SAFETY GUARD HERE (Just before the return) ---
  if (initialLoading || !profile) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Loading Profile...</p>
        </div>
      </div>
    );
  }

    

  return (
    <div 
      className="flex h-screen font-sans overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: dashBg, color: dashText, fontFamily: dashFont }}
    >
      {/* The Main Menu */}
      <aside
        className={`transition-all duration-500 border-r flex flex-col ${
          isCollapsed ? "w-20" : "w-[260px]"
        }`}
        style={{ borderColor: panelBorder }}
      >
        <div className="p-8 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <img 
                src={config.logoUrl || "/logo-white.png"} 
                alt="Socials" 
                className="h-8 w-auto object-contain transition-all" 
              />
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 text-zinc-500 hover:bg-white/5 rounded-lg transition-all"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <button
            onClick={() => setIsMyLinkOpen(!isMyLinkOpen)}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 text-white"
          >
            <div className="flex items-center gap-4">
              <Link2 size={20} style={{ color: dashBtn }} />
              {!isCollapsed && (
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  My Page
                </span>
              )}
            </div>
            {!isCollapsed && (
              <ChevronDown
                size={14}
                className={isMyLinkOpen ? "" : "-rotate-90"}
              />
            )}
          </button>
          {!isCollapsed && isMyLinkOpen && (
            <div className="ml-10 mt-2 border-l flex flex-col gap-1" style={{ borderColor: panelBorder }}>
              <button
                onClick={() => setActiveTab("links")}
                className="p-3 text-[10px] font-black uppercase text-left pl-8 transition-colors"
                style={{
                  color: activeTab === "links" ? dashBtn : "inherit",
                  backgroundColor: activeTab === "links" ? 'rgba(255,255,255,0.05)' : 'transparent',
                  opacity: activeTab === "links" ? 1 : 0.6
                }}
              >
                Links
              </button>
              <button
                onClick={() => setActiveTab("shop")}
                className="p-3 text-[10px] font-black uppercase text-left pl-8 transition-colors"
                style={{
                  color: activeTab === "shop" ? dashBtn : "inherit",
                  backgroundColor: activeTab === "shop" ? 'rgba(255,255,255,0.05)' : 'transparent',
                  opacity: activeTab === "shop" ? 1 : 0.6
                }}
              >
                Shop
              </button>
              <button
                onClick={() => setActiveTab("design")}
                className="p-3 text-[10px] font-black uppercase text-left pl-8 transition-colors"
                style={{
                  color: activeTab === "design" ? dashBtn : "inherit",
                  backgroundColor: activeTab === "design" ? 'rgba(255,255,255,0.05)' : 'transparent',
                  opacity: activeTab === "design" ? 1 : 0.6
                }}
              >
                Design
              </button>
            </div>
          )}
          <div className="pt-4 space-y-1">
            <button
              onClick={() => setActiveTab("earnings")}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'earnings' ? 'opacity-100 bg-white/10' : 'opacity-60 hover:opacity-100 hover:bg-white/5'}`}
            >
              <DollarSign size={20} />
              {!isCollapsed && (
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  Earnings
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("insights")}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'insights' ? 'opacity-100 bg-white/10' : 'opacity-60 hover:opacity-100 hover:bg-white/5'}`}
            >
              <BarChart3 size={20} />
              {!isCollapsed && (
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  Insights
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("tools")}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${activeTab === 'tools' ? 'opacity-100 bg-white/10' : 'opacity-60 hover:opacity-100 hover:bg-white/5'}`}
            >
              <Layers size={20} />
              {!isCollapsed && (
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  Tools
                </span>
              )}
            </button>
          </div>
        </nav>
      </aside>

      {/* WORKSPACE */}
      <main className="flex-1 overflow-y-auto px-8 py-10 lg:px-12" style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
        <div className="max-w-4xl mx-auto space-y-10 pb-32">
          <header className="flex justify-between items-end">
            <div className="space-y-3">
              <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none opacity-90">
                Dashboard
              </h1>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] ml-1 opacity-50">
                {activeTab} view
              </p>
            </div>
            <button
              onClick={handleDeploy}
              disabled={loading}
              className="px-12 py-5 rounded-full font-black text-[11px] uppercase tracking-widest transition-all shadow-2xl active:scale-95 disabled:opacity-50"
              style={{ backgroundColor: dashBtn, color: dashBtnText }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </header>

          <hr className="border-t opacity-10" style={{ borderColor: dashText }} />

          <div className="min-h-[600px]">
         {activeTab === "links" && (
  <LinksTab
    profile={profile}
    panelBg={panelBg}
    panelBorder={panelBorder}
    dashBtn={dashBtn}
    dashBtnText={dashBtnText}
    setProfile={setProfile}
    links={links}
    setLinks={setLinks}
    showSocialModal={showSocialModal}       // <-- MUST PASS THIS
    setShowSocialModal={setShowSocialModal} // <-- MUST PASS THIS
    uploading={uploading}
    handleAvatarUpload={handleAvatarUpload}
    fileInputRef={fileInputRef}
    showAddMenu={showAddMenu}
    setShowAddMenu={setShowAddMenu}
    products={products}
  />
)}
            {activeTab === "shop" && (
              <ShopTab
                products={products}
                setProducts={setProducts}
                productImgRef={productImgRef}
                digitalFileRef={digitalFileRef}
                setActiveProductId={setActiveProductId}
                handleProductUpload={handleProductUpload}
                panelBg={panelBg}
                panelBorder={panelBorder}
                dashBtn={dashBtn}
                dashBtnText={dashBtnText}
              />
            )}
            {activeTab === "design" && (
              <DesignTab 
                profile={profile} 
                setProfile={setProfile} 
                templates={templates} 
                handleApplyTheme={handleApplyTheme}
                panelBg={panelBg}
                panelBorder={panelBorder}
                dashBtn={dashBtn}
                dashBtnText={dashBtnText}
              />
            )}
            {activeTab === "tools" && (
              <ToolsTab 
                profile={profile}
                panelBg={panelBg}
                panelBorder={panelBorder}
                dashBtn={dashBtn}
                dashBtnText={dashBtnText}
              />
            )}
            {activeTab === "earnings" && (
              <EarningsTab 
                profile={profile} 
                products={products} 
                dashBtn={dashBtn}
                dashText={dashText}
                panelBg={panelBg}
                panelBorder={panelBorder}
              />
            )}
            {activeTab === "insights" && (
              <InsightsTab 
                profile={profile}
                dashBtn={dashBtn}
                dashBtnText={dashBtnText}
                panelBg={panelBg}
                panelBorder={panelBorder}
                dashText={dashText}
              />
            )}
          </div>
        </div>
      </main>

      {/* IPHONE PREVIEW */}
      <aside className="w-[420px] border-l flex flex-col items-center justify-center p-8 relative" style={{ borderColor: panelBorder, backgroundColor: panelBg }}>
  <div className="relative w-full scale-[0.8] origin-center">
    {/* Action Buttons */}
    <div className="absolute -top-16 flex gap-3 z-10 w-full justify-center px-4">
      <button
        onClick={() =>
          profile?.c_username &&
          window.open(`/${encodeURIComponent(profile.c_username)}`, "_blank")
        }
        className="flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm hover:scale-105 transition-all"
        style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
      >
        <Globe size={12} /> Public Web
      </button>
      <button
        onClick={() => {
          navigator.clipboard.writeText(
            `${window.location.origin}/${encodeURIComponent(profile?.c_username || '')}`
          );
          alert("Link Copied!");
        }}
        className="flex-1 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm hover:scale-105 transition-all"
        style={{ backgroundColor: dashBtn, color: dashBtnText }}
      >
        <Share2 size={12} /> Share Link
      </button>
    </div>

    {/* iPhone Frame with Deploy Pulse Effect */}
    <div className={`relative aspect-[9/19.2] bg-[#0F0F0F] rounded-[3.8rem] p-3 shadow-2xl border-[10px] border-[#1c1c1e] transition-all duration-500 ${isDeploying ? 'ring-[20px] ring-purple-500/20 scale-[1.02]' : 'ring-0'}`}>
      
      {/* Dynamic Island */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20" />
      
      {/* Dynamic Screen Content mapped to Templates */}
      <div className="h-full w-full rounded-[2.8rem] overflow-hidden relative no-scrollbar overflow-y-auto bg-white">
        <RenderTemplate 
          templateId={profile?.template_id} 
          data={{ profile, links, products }} 
        />
      </div>
    </div>
  </div>

  {/* Status Badge with Live Indicator */}
  <div className={`absolute bottom-10 flex items-center gap-3 px-6 py-3 rounded-full text-white shadow-2xl transition-all duration-500 ${isDeploying ? 'bg-purple-600 scale-110' : 'bg-zinc-900'}`}>
    <div className={`w-2 h-2 rounded-full ${isDeploying ? 'bg-white animate-ping' : 'bg-green-500 animate-pulse'}`} />
    <span className="text-[9px] font-black uppercase tracking-widest">
      {isDeploying ? 'Syncing...' : 'Live Preview'}
    </span>
  </div>
</aside>
      {showSubmitModal && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
    <div className="bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden flex h-[80vh] shadow-2xl">
      
      {/* LEFT: Controls */}
      <div className="w-1/2 p-10 overflow-y-auto border-r border-zinc-100">
        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6">Engineer New Theme</h3>
        <form onSubmit={handleSubmitTemplate} className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Theme Name</label>
            <input 
              type="text" 
              required
              className="w-full mt-2 p-4 bg-zinc-50 rounded-2xl border-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">BG Color</label>
              <input 
                type="color" 
                className="w-full h-12 mt-2 rounded-xl cursor-pointer"
                value={newTemplate.config.bg_color}
                onChange={(e) => setNewTemplate({...newTemplate, config: {...newTemplate.config, bg_color: e.target.value}})}
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Card Color</label>
              <input 
                type="color" 
                className="w-full h-12 mt-2 rounded-xl cursor-pointer"
                value={newTemplate.config.card_bg}
                onChange={(e) => setNewTemplate({...newTemplate, config: {...newTemplate.config, card_bg: e.target.value}})}
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Button Corner Radius</label>
            <select 
              className="w-full mt-2 p-4 bg-zinc-50 rounded-2xl border-none"
              onChange={(e) => setNewTemplate({...newTemplate, config: {...newTemplate.config, card_radius: e.target.value}})}
            >
              <option value="rounded-none">Sharp (0px)</option>
              <option value="rounded-xl">Soft (12px)</option>
              <option value="rounded-[2rem]">Hyper (32px)</option>
              <option value="rounded-full">Pill</option>
            </select>
          </div>

          <div className="flex gap-4 pt-6">
            <button type="submit" className="flex-1 py-4 bg-zinc-900 text-white rounded-2xl font-black uppercase text-xs hover:bg-purple-600 transition-all">Submit for Review</button>
            <button type="button" onClick={() => setShowSubmitModal(false)} className="px-8 py-4 bg-zinc-100 rounded-2xl font-black uppercase text-xs">Cancel</button>
          </div>
        </form>
      </div>

      {/* RIGHT: Live Preview */}
      <div className="w-1/2 bg-zinc-100 flex items-center justify-center p-12">
        <div 
          className="w-full aspect-[9/16] shadow-2xl overflow-hidden flex flex-col items-center p-8 transition-all duration-500"
          style={{ 
            backgroundColor: newTemplate.config.bg_color,
            borderRadius: '3rem'
          }}
        >
          <div className="w-16 h-16 rounded-full bg-zinc-400/20 mb-4" />
          <div className="w-32 h-3 bg-zinc-400/20 rounded-full mb-10" />
          <div className="w-full space-y-4">
            <div className={`h-12 w-full shadow-sm ${newTemplate.config.card_radius}`} style={{ backgroundColor: newTemplate.config.card_bg }} />
            <div className={`h-12 w-full shadow-sm ${newTemplate.config.card_radius}`} style={{ backgroundColor: newTemplate.config.card_bg }} />
            <div className={`h-12 w-full shadow-sm ${newTemplate.config.card_radius}`} style={{ backgroundColor: newTemplate.config.card_bg }} />
          </div>
        </div>
      </div>
    </div>
  </div>
)}
    </div>
  );
}
