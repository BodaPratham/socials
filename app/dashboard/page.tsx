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
  Shield
} from "lucide-react";

// ==========================================
// TYPES & INTERFACES
// ==========================================
type LinkItem = {
  id?: string;
  user_id?: string;
  title: string;
  url: string;
  icon_type?: string;
  is_active?: boolean;
  position?: number;
  type?:
    | "standard"
    | "youtube"
    | "tip"
    | "form"
    | "file"
    | "social"
    | "divider"
    | "shop"
    | "text"
    | "contact";
};

type Product = {
  id: string;
  name: string;
  price: string;
  description?: string;
  image_url?: string;
  product_type: "affiliate" | "digital";
  destination_url: string;
};

// 1. Update Profile Type
type Profile = {
  id: string;
  c_username: string;
  bio: string;
  avatar_url: string;
  whatsapp_number: string;
  insta_username: string;
  upi_id: string;
  theme_color?: string;
  template_id?: string; // Add this
};

// ==========================================
// SUB-COMPONENTS
// ==========================================

const LinksTab = ({
  profile,
  setProfile,
  links,
  setLinks,
  uploading,
  handleAvatarUpload,
  fileInputRef,
  showAddMenu,
  setShowAddMenu,
  products,
}: any) => (
  <div className="space-y-8 animate-in fade-in duration-500">
    {/* Profile Section */}
    <section className="bg-white border border-zinc-100 p-10 rounded-[3rem] shadow-sm flex items-center gap-12">
      <div
        className="relative group"
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAvatarUpload}
          hidden
          accept="image/*"
        />
        <div className="w-32 h-32 bg-zinc-50 rounded-full border-2 border-dashed border-zinc-200 flex items-center justify-center overflow-hidden cursor-pointer hover:border-purple-400 transition-all">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              className="w-full h-full object-cover"
              alt="avatar"
            />
          ) : (
            <ImageIcon size={32} className="text-zinc-200" />
          )}
          {uploading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
              <Loader2 className="animate-spin text-purple-600" />
            </div>
          )}
        </div>
        <div className="absolute bottom-1 right-1 p-2.5 bg-zinc-900 text-white rounded-full border-4 border-white">
          <Camera size={14} />
        </div>
      </div>
      <div className="flex-1 grid grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
            Handle
          </label>
          <input
            value={profile.c_username}
            onChange={(e) =>
              setProfile({ ...profile, c_username: e.target.value })
            }
            className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-purple-500/10"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
            Bio
          </label>
          <input
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-purple-500/10"
          />
        </div>
      </div>
    </section>

    {/* Social Quick-Links */}
    <section className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm grid grid-cols-3 gap-6">
      <div className="relative">
        <Instagram
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300"
        />
        <input
          value={profile.insta_username}
          onChange={(e) =>
            setProfile({ ...profile, insta_username: e.target.value })
          }
          placeholder="Instagram"
          className="w-full pl-12 p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-xs font-bold outline-none"
        />
      </div>
      <div className="relative">
        <Phone
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300"
        />
        <input
          value={profile.whatsapp_number}
          onChange={(e) =>
            setProfile({ ...profile, whatsapp_number: e.target.value })
          }
          placeholder="WhatsApp"
          className="w-full pl-12 p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-xs font-bold outline-none"
        />
      </div>
      <div className="relative">
        <DollarSign
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300"
        />
        <input
          value={profile.upi_id}
          onChange={(e) => setProfile({ ...profile, upi_id: e.target.value })}
          placeholder="UPI ID"
          className="w-full pl-12 p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-xs font-bold outline-none"
        />
      </div>
    </section>

    {/* Dynamic Blocks */}
    <div className="space-y-4">
      {links.map((link: any, index: number) => (
        <div
          key={index}
          className="bg-white border border-zinc-100 p-6 rounded-[2.5rem] flex items-center gap-6 group hover:shadow-md transition-all"
        >
          <div className="cursor-grab text-zinc-200">
            <GripVertical size={20} />
          </div>
          <div
            className={`p-4 rounded-2xl ${
              link.type === "youtube"
                ? "bg-red-50 text-red-500"
                : link.type === "social"
                ? "bg-pink-50 text-pink-500"
                : link.type === "shop"
                ? "bg-violet-50 text-violet-500"
                : "bg-zinc-50 text-zinc-300"
            }`}
          >
            {link.type === "youtube" ? (
              <Play size={22} />
            ) : link.type === "social" ? (
              <Instagram size={22} />
            ) : link.type === "shop" ? (
              <ShoppingBag size={22} />
            ) : (
              <Link2 size={22} />
            )}
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest">
                {link.type} Title
              </span>
              <input
                value={link.title}
                onChange={(e) => {
                  const nl = [...links];
                  nl[index].title = e.target.value;
                  setLinks(nl);
                }}
                className="w-full font-black text-sm uppercase outline-none"
                placeholder="Block Title"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest">
                Configuration
              </span>
              {link.type === "shop" ? (
                <select
                  className="w-full bg-zinc-50 p-3 rounded-xl text-xs font-bold text-zinc-500 outline-none"
                  value={link.url}
                  onChange={(e) => {
                    const nl = [...links];
                    nl[index].url = e.target.value;
                    setLinks(nl);
                  }}
                >
                  <option value="">Select a Product...</option>
                  {products.map((p: any) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  value={link.url}
                  onChange={(e) => {
                    const nl = [...links];
                    nl[index].url = e.target.value;
                    if (e.target.value.includes("instagram.com"))
                      nl[index].type = "social";
                    setLinks(nl);
                  }}
                  placeholder={
                    link.type === "social" ? "@username" : "Destination URL"
                  }
                  disabled={link.type === "divider"}
                  className={`w-full bg-zinc-50 p-3 rounded-xl text-xs text-zinc-500 outline-none ${
                    link.type === "divider" ? "opacity-20" : ""
                  }`}
                />
              )}
            </div>
          </div>
          <button
            onClick={() =>
              setLinks(links.filter((_: any, i: number) => i !== index))
            }
            className="p-3 text-zinc-200 hover:text-red-500"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}

      {/* Add Menu */}
      {!showAddMenu ? (
        <button
          onClick={() => setShowAddMenu(true)}
          className="w-full py-10 border-2 border-dashed border-zinc-100 rounded-[3rem] text-zinc-300 hover:text-purple-600 hover:bg-purple-50/30 transition-all flex flex-col items-center justify-center gap-3"
        >
          <div className="p-4 bg-zinc-50 rounded-full shadow-sm">
            <Plus size={24} />
          </div>
          <span className="font-black uppercase tracking-[0.3em] text-[10px]">
            Add New Block
          </span>
        </button>
      ) : (
        <div className="bg-zinc-50/50 border border-zinc-100 p-8 rounded-[3rem] animate-in slide-in-from-top-4 duration-500">
          <div className="flex justify-between mb-8">
            <h3 className="font-black text-[11px] text-zinc-400 uppercase tracking-widest">
              Architecture Modules
            </h3>
            <button
              onClick={() => setShowAddMenu(false)}
              className="text-[10px] font-black uppercase text-zinc-400 hover:text-black"
            >
              Cancel
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                label: "URL Link",
                type: "standard",
                icon: <Link2 size={20} />,
                color: "hover:text-blue-500",
              },
              {
                label: "Video Feed",
                type: "youtube",
                icon: <Play size={20} />,
                color: "hover:text-red-500",
              },
              {
                label: "Tip Jar",
                type: "tip",
                icon: <DollarSign size={20} />,
                color: "hover:text-orange-500",
              },
              {
                label: "Subscribers",
                type: "form",
                icon: <Users size={20} />,
                color: "hover:text-purple-500",
              },
              {
                label: "File Drop",
                type: "file",
                icon: <Layers size={20} />,
                color: "hover:text-emerald-500",
              },
              {
                label: "Social Sync",
                type: "social",
                icon: <Instagram size={20} />,
                color: "hover:text-pink-500",
              },
              {
                label: "Divider",
                type: "divider",
                icon: <MoreHorizontal size={20} />,
                color: "hover:text-zinc-400",
              },
              {
                label: "Shop Item",
                type: "shop",
                icon: <ShoppingBag size={20} />,
                color: "hover:text-violet-500",
              },
            ].map((b) => (
              <button
                key={b.label}
                onClick={() => {
                  setLinks([
                    ...links,
                    { title: b.label, url: "", type: b.type as any },
                  ]);
                  setShowAddMenu(false);
                }}
                className={`flex flex-col items-center justify-center p-6 bg-white border border-zinc-100 rounded-[2rem] gap-3 transition-all hover:shadow-xl ${b.color}`}
              >
                {b.icon}
                <span className="font-black uppercase text-[9px]">
                  {b.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

const ShopTab = ({
  products,
  setProducts,
  productImgRef,
  digitalFileRef,
  setActiveProductId,
  handleProductUpload,
}: any) => (
  <div className="space-y-10 animate-in fade-in duration-500">
    <input
      type="file"
      ref={productImgRef}
      hidden
      accept="image/*"
      onChange={(e) => handleProductUpload(e, "image")}
    />
    <input
      type="file"
      ref={digitalFileRef}
      hidden
      accept=".pdf,.zip,.epub"
      onChange={(e) => handleProductUpload(e, "file")}
    />

    <header className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter italic">
          Store Inventory
        </h2>
        <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mt-1">
          Manage physical & digital assets
        </p>
      </div>
      <button
        onClick={() =>
          setProducts([
            ...products,
            {
              id: Date.now().toString(),
              name: "New Item",
              price: "0.00",
              description: "",
              product_type: "affiliate",
              destination_url: "",
            },
          ])
        }
        className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 transition-all shadow-xl"
      >
        + Create Product
      </button>
    </header>

    <div className="grid grid-cols-1 gap-6">
      {products.map((product: any, idx: number) => (
        <div
          key={product.id}
          className="bg-white border border-zinc-100 p-8 rounded-[3rem] shadow-sm flex gap-8 group hover:shadow-md transition-all"
        >
          <div
            onClick={() => {
              setActiveProductId(product.id);
              productImgRef.current?.click();
            }}
            className="w-40 h-40 bg-zinc-50 rounded-[2.5rem] flex-shrink-0 flex items-center justify-center text-zinc-200 border border-dashed border-zinc-200 cursor-pointer hover:border-purple-500 relative overflow-hidden"
          >
            {product.image_url ? (
              <img
                src={product.image_url}
                className="w-full h-full object-cover"
                alt="product"
              />
            ) : (
              <ImageIcon size={32} />
            )}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="text-white" size={24} />
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="flex gap-6">
              <div className="flex-1 space-y-1">
                <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest">
                  Item Name
                </span>
                <input
                  value={product.name}
                  onChange={(e) => {
                    const np = [...products];
                    np[idx].name = e.target.value;
                    setProducts(np);
                  }}
                  className="w-full font-black text-xl outline-none bg-transparent uppercase tracking-tight"
                />
              </div>
              <div className="w-24 space-y-1">
                <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest">
                  Price ($)
                </span>
                <input
                  value={product.price}
                  onChange={(e) => {
                    const np = [...products];
                    np[idx].price = e.target.value;
                    setProducts(np);
                  }}
                  className="w-full font-black text-xl outline-none text-purple-600 bg-transparent"
                />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest flex items-center gap-2">
                <AlignLeft size={10} /> Description
              </span>
              <textarea
                value={product.description || ""}
                onChange={(e) => {
                  const np = [...products];
                  np[idx].description = e.target.value;
                  setProducts(np);
                }}
                className="w-full bg-zinc-50 p-4 rounded-2xl text-[11px] font-bold text-zinc-600 outline-none h-20 resize-none"
                placeholder="Briefly describe your product..."
              />
            </div>

            <div className="bg-zinc-50/80 p-5 rounded-[2rem] space-y-4">
              <div className="flex gap-6 border-b border-zinc-200 pb-3">
                <button
                  onClick={() => {
                    const np = [...products];
                    np[idx].product_type = "affiliate";
                    setProducts(np);
                  }}
                  className={`text-[9px] font-black uppercase tracking-widest ${
                    product.product_type === "affiliate"
                      ? "text-zinc-900"
                      : "text-zinc-400"
                  }`}
                >
                  Affiliate Link
                </button>
                <button
                  onClick={() => {
                    const np = [...products];
                    np[idx].product_type = "digital";
                    setProducts(np);
                  }}
                  className={`text-[9px] font-black uppercase tracking-widest ${
                    product.product_type === "digital"
                      ? "text-zinc-900"
                      : "text-zinc-400"
                  }`}
                >
                  Digital Asset
                </button>
              </div>

              {product.product_type === "affiliate" ? (
                <input
                  placeholder="Paste external affiliate link..."
                  value={product.destination_url}
                  onChange={(e) => {
                    const np = [...products];
                    np[idx].destination_url = e.target.value;
                    setProducts(np);
                  }}
                  className="w-full bg-transparent text-xs font-bold outline-none text-zinc-600"
                />
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-zinc-500 truncate max-w-[200px]">
                    {product.destination_url
                      ? "File Uploaded ✅"
                      : "No file attached"}
                  </span>
                  <button
                    onClick={() => {
                      setActiveProductId(product.id);
                      digitalFileRef.current?.click();
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-xl text-[9px] font-black uppercase hover:bg-zinc-100"
                  >
                    <UploadCloud size={12} /> Upload PDF/Zip
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() =>
              setProducts(products.filter((p: any) => p.id !== product.id))
            }
            className="text-zinc-300 hover:text-red-500 self-start p-2"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

// ==========================================
// MAIN DASHBOARD ENGINE
// ==========================================

export default function MasterArchitectureDashboard() {
  // 1. CONSTANTS & REFS
  const MASTER_ADMIN_ID = "1cef0ce0-63ef-4289-8053-e186b4284b6a";
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const productImgRef = useRef<HTMLInputElement>(null);
  const digitalFileRef = useRef<HTMLInputElement>(null);

  // 2. CONSOLIDATED STATE (Declared ONLY once)
  const [profile, setProfile] = useState<Profile>({
    id: "",
    c_username: "",
    bio: "",
    avatar_url: "",
    whatsapp_number: "",
    insta_username: "",
    upi_id: "",
    theme_color: "#A855F7",
    template_id: "midnight"
  });
  
  const [templates, setTemplates] = useState<any[]>([]);
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("midnight");
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

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    price: 0,
    config: {
      bg_color: '#ffffff',
      text_color: '#000000',
      card_bg: '#f3f4f6',
      card_radius: 'rounded-xl',
      font_family: 'sans',
      header_image: ''
    }
  });

  // 3. SIDE EFFECTS
  useEffect(() => {
    // Only trigger if we have a real template_id
    if (profile?.template_id && profile.template_id !== "midnight") {
      setIsDeploying(true);
      const timer = setTimeout(() => setIsDeploying(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [profile?.template_id]);

  // 4. HELPERS
  const getYouTubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        // ... existing profile/links/products fetch ...

        // Fetch Templates
        const { data: tData } = await supabase
          .from("templates")
          .select("*")
          .or(`is_approved.eq.true,creator_id.eq.${user.id}`); // Show approved OR your own creations

        if (tData) setTemplates(tData);

        const { data: p } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (p) {
          setProfile(p);
          setSelectedTemplateId(p.template_id || "midnight");
        }
      }
      setInitialLoading(false);
    };
    fetchData();
  }, []);

  const handleDeploy = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      // Update profile including the selected template_id
      const { error: pErr } = await supabase
        .from("profiles")
        .update({
          ...profile,
          template_id: selectedTemplateId,
        })
        .eq("id", user.id);

      if (pErr) throw pErr;

      // ... existing links and products sync logic ...

      alert("✅ Digital Architecture Successfully Deployed");
    } catch (err) {
      console.error(err);
      alert("Deployment failed.");
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
      setProfile((prev) => ({ ...prev, avatar_url: publicUrl }));
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
  
  // Generate a random UUID in JS using the built-in crypto API
  const newId = crypto.randomUUID(); 

  const { error } = await supabase.from('templates').insert({
    id: newId, 
    name: newTemplate.name,
    price: newTemplate.price,
    config: newTemplate.config,
    is_approved: profile?.id === MASTER_ADMIN_ID
  });

  if (!error) {
    // Now you can use 'newId' to redirect or update local state immediately
    setShowSubmitModal(false);
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
      return handleUpdateProfile({ template_id: template.id });
    }
  
    // 2. CHECK PURCHASE HISTORY: Has this user bought it before?
    const { data: purchase, error: purchaseError } = await supabase
      .from('marketplace_transactions')
      .select('id')
      .eq('template_id', template.id)
      .eq('buyer_id', profile.id)
      .single();
  
    if (purchase) {
      return handleUpdateProfile({ template_id: template.id });
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
        handleUpdateProfile({ template_id: template.id });
        alert(`✅ ${template.name} is now part of your architecture.`);
      }
    }
  };

  if (initialLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-white font-black uppercase text-[10px] tracking-[0.5em]">
            Syncing System...
          </span>
        </div>
      </div>
    );

  return (
    <div className="flex h-screen bg-[#050507] text-[#E4E4E7] font-sans overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`transition-all duration-500 bg-[#09090B] border-r border-white/5 flex flex-col ${
          isCollapsed ? "w-20" : "w-[260px]"
        }`}
      >
        <div className="p-8 flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                <Zap size={20} className="text-white fill-white" />
              </div>
              <span className="font-black uppercase text-xl italic tracking-tighter">
                Socials
              </span>
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
              <Link2 size={20} className="text-purple-500" />
              {!isCollapsed && (
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  Architecture
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
            <div className="ml-10 mt-2 border-l border-white/5 flex flex-col gap-1">
              <button
                onClick={() => setActiveTab("links")}
                className={`p-3 text-[10px] font-black uppercase text-left pl-8 ${
                  activeTab === "links"
                    ? "text-purple-500 bg-purple-500/5"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                Links
              </button>
              <button
                onClick={() => setActiveTab("shop")}
                className={`p-3 text-[10px] font-black uppercase text-left pl-8 ${
                  activeTab === "shop"
                    ? "text-purple-500 bg-purple-500/5"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => setActiveTab("design")}
                className={`p-3 text-[10px] font-black uppercase text-left pl-8 ${
                  activeTab === "design"
                    ? "text-purple-500 bg-purple-500/5"
                    : "text-zinc-500 hover:text-white"
                }`}
              >
                Design
              </button>
            </div>
          )}
          <div className="pt-4 space-y-1">
            {["Analytics", "Audience", "Settings"].map((item) => (
              <button
                key={item}
                className="w-full flex items-center gap-4 p-4 text-zinc-500 rounded-2xl hover:bg-white/5 hover:text-white transition-all"
              >
                <BarChart3 size={20} />
                {!isCollapsed && (
                  <span className="text-[11px] font-bold uppercase tracking-widest">
                    {item}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* WORKSPACE */}
      <main className="flex-1 overflow-y-auto px-8 py-10 lg:px-12 bg-[#FDFDFD] text-zinc-900">
        <div className="max-w-4xl mx-auto space-y-10 pb-32">
          <header className="flex justify-between items-end">
            <div className="space-y-3">
              <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none text-zinc-900">
                Management
              </h1>
              <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.5em] ml-1">
                {activeTab} core system / v2.1
              </p>
            </div>
            <button
              onClick={handleDeploy}
              disabled={loading}
              className="px-12 py-5 bg-zinc-900 text-white rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-purple-600 transition-all shadow-2xl active:scale-95 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Deploy Changes"}
            </button>
          </header>

          <hr className="border-zinc-100" />

          <div className="min-h-[600px]">
            {activeTab === "links" && (
              <LinksTab
                profile={profile}
                setProfile={setProfile}
                links={links}
                setLinks={setLinks}
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
              />
            )}
           {activeTab === "design" && (
  <div className="space-y-10 animate-in fade-in duration-500">
    
    {/* --- ADMIN QUEUE (Only for Master Admin) --- */}
    {profile?.id === MASTER_ADMIN_ID && templates.some((t) => !t.is_approved) && (
      <section className="bg-amber-50/50 border-2 border-dashed border-amber-200 rounded-[3rem] p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-amber-500 rounded-lg text-white">
            <Shield size={18} />
          </div>
          <h3 className="font-black uppercase italic tracking-tighter text-amber-900">Review Queue</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {templates.filter((t) => !t.is_approved).map((t) => (
            <div key={t.id} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-amber-100 shadow-sm">
              <div className="flex flex-col">
                <span className="font-black text-[10px] uppercase tracking-tight">{t.name}</span>
                <span className="text-[9px] font-bold text-amber-600">${t.price} Marketplace</span>
              </div>
              <button
                onClick={async () => {
                  const { error } = await supabase.from('templates').update({ is_approved: true }).eq('id', t.id);
                  if (!error) setTemplates(prev => prev.map(tmpl => tmpl.id === t.id ? {...tmpl, is_approved: true} : tmpl));
                }}
                className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[9px] font-black uppercase hover:bg-green-600 transition-all"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      </section>
    )}

    {/* --- HEADER & NAVIGATION --- */}
    <header className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-black uppercase tracking-tighter italic">Visual Studio</h2>
        <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mt-1">
          {view === 'studio' ? "Manage your deployed architecture" : "Marketplace / Discover new themes"}
        </p>
      </div>
      <div className="flex gap-3">
        {view === 'studio' ? (
          <button 
            onClick={() => setView('browse')}
            className="px-6 py-3 bg-zinc-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-purple-600 transition-all"
          >
            Browse Marketplace
          </button>
        ) : (
          <button 
            onClick={() => setView('studio')}
            className="px-6 py-3 border-2 border-zinc-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-900 hover:text-white transition-all"
          >
            Back to Studio
          </button>
        )}
      </div>
    </header>

    {/* --- DYNAMIC CONTENT (STUDIO OR BROWSE) --- */}
  {/* Template Grid */}
  <div className="grid grid-cols-2 gap-8 mt-10">
  {templates.map((template) => (
  <div
    key={template.id}
    onClick={() => handleUpdateProfile({ template_id: template.id })}
    className={`group relative aspect-[4/5] rounded-[2.5rem] border-2 transition-all cursor-pointer overflow-hidden
      ${profile?.template_id === template.id ? "border-purple-600 ring-4 ring-purple-100" : "border-zinc-100 hover:border-zinc-300"}
    `}
  >
    {/* Design Preview Engine */}
    <div 
      className="absolute inset-0 p-6 flex flex-col items-center" 
      style={{ backgroundColor: template.config?.bg_color || '#F4F4F5' }}
    >
      <div className="w-12 h-12 rounded-full bg-zinc-400/20 mb-6 mt-4" />
      <div className="w-full space-y-3">
        <div 
          className={`h-10 w-full shadow-sm ${template.config?.card_radius}`} 
          style={{ backgroundColor: template.config?.card_bg || '#FFFFFF' }} 
        />
        <div 
          className={`h-10 w-full shadow-sm opacity-60 ${template.config?.card_radius}`} 
          style={{ backgroundColor: template.config?.card_bg || '#FFFFFF' }} 
        />
      </div>
    </div>

    {/* Info Label */}
    <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
      <p className="font-black text-[12px] uppercase italic tracking-tighter">{template.name}</p>
      <p className="text-[9px] font-bold opacity-60">{template.price > 0 ? `$${template.price}` : 'FREE'}</p>
    </div>
  </div>
))}
</div>
  </div>
)}
          </div>
        </div>
      </main>

      {/* IPHONE PREVIEW */}
      <aside className="w-[420px] bg-white border-l border-zinc-100 flex flex-col items-center justify-center p-8 relative">
  <div className="relative w-full scale-[0.8] origin-center">
    {/* Action Buttons */}
    <div className="absolute -top-16 flex gap-3 z-10 w-full justify-center px-4">
      <button
        onClick={() =>
          profile.c_username &&
          window.open(`/${profile.c_username}`, "_blank")
        }
        className="flex-1 py-3 bg-white border border-zinc-200 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm hover:bg-zinc-50 hover:scale-105 transition-all"
      >
        <Globe size={12} className="text-purple-600" /> Public Web
      </button>
      <button
        onClick={() => {
          navigator.clipboard.writeText(
            `${window.location.origin}/${profile.c_username}`
          );
          alert("Link Copied!");
        }}
        className="flex-1 py-3 bg-zinc-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm hover:bg-zinc-700 hover:scale-105 transition-all"
      >
        <Share2 size={12} /> Share Link
      </button>
    </div>

    {/* iPhone Frame with Deploy Pulse Effect */}
    <div className={`relative aspect-[9/19.2] bg-[#0F0F0F] rounded-[3.8rem] p-3 shadow-2xl border-[10px] border-[#1c1c1e] transition-all duration-500 ${isDeploying ? 'ring-[20px] ring-purple-500/20 scale-[1.02]' : 'ring-0'}`}>
      
      {/* Dynamic Island */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20" />
      
      {/* Screen Content */}
      <div 
        className="h-full w-full rounded-[2.8rem] overflow-hidden flex flex-col relative no-scrollbar overflow-y-auto transition-all duration-700"
        style={{ 
          backgroundColor: templates.find(t => t.id === profile?.template_id)?.config?.bg_color || '#FFFFFF',
          fontFamily: templates.find(t => t.id === profile?.template_id)?.config?.font_family === 'serif' ? 'serif' : 
                      templates.find(t => t.id === profile?.template_id)?.config?.font_family === 'mono' ? 'monospace' : 'sans-serif'
        }}
      >
        {/* Dynamic Header Banner (Ark.Curate Style) */}
        {templates.find(t => t.id === profile?.template_id)?.config?.header_style === 'black-banner' && (
          <div className="absolute top-0 w-full h-32 bg-black animate-in slide-in-from-top duration-500" />
        )}

        <div className="flex-1 pt-16 px-6 pb-12 flex flex-col items-center relative z-10">
          {/* Profile Avatar */}
          <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden mb-5">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                className="w-full h-full object-cover"
                alt="avatar"
              />
            ) : (
              <div className="w-full h-full bg-zinc-50" />
            )}
          </div>

          {/* Profile Identity */}
          <h3 
            className="font-black text-sm uppercase tracking-tight"
            style={{ color: templates.find(t => t.id === profile?.template_id)?.config?.text_color || '#18181b' }}
          >
            @{profile.c_username || "username"}
          </h3>
          <p 
            className="text-[10px] font-bold text-center mt-2 px-4 uppercase leading-relaxed line-clamp-2 opacity-70"
            style={{ color: templates.find(t => t.id === profile?.template_id)?.config?.text_color || '#71717a' }}
          >
            {profile.bio || "Architecting digital space..."}
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 my-6 opacity-80" style={{ color: templates.find(t => t.id === profile?.template_id)?.config?.text_color || '#e4e4e7' }}>
            <Instagram size={14} className={profile.insta_username ? "opacity-100" : "opacity-30"} />
            <Phone size={14} className={profile.whatsapp_number ? "opacity-100" : "opacity-30"} />
            <DollarSign size={14} className={profile.upi_id ? "opacity-100" : "opacity-30"} />
          </div>

          {/* Links Grid */}
          <div className="w-full space-y-4">
            {links.map((link, i) => {
              const theme = templates.find(t => t.id === profile?.template_id)?.config;
              
              if (link.type === "youtube" && getYouTubeID(link.url)) {
                return (
                  <div
                    key={i}
                    className="w-full overflow-hidden shadow-sm transition-all duration-500"
                    style={{ 
                      backgroundColor: theme?.card_bg || '#FFFFFF',
                      borderRadius: theme?.card_radius || '2rem',
                      border: theme?.card_border || '1px solid #f4f4f5'
                    }}
                  >
                    <iframe
                      className="w-full aspect-video"
                      src={`https://www.youtube.com/embed/${getYouTubeID(link.url)}`}
                      frameBorder="0"
                      allowFullScreen
                    />
                    <div className="p-4 text-[9px] font-black uppercase text-center" style={{ color: theme?.text_color || '#18181b' }}>
                      {link.title}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={i}
                  className="w-full p-4 text-[10px] font-black uppercase tracking-widest shadow-sm text-center active:scale-95 transition-all duration-500"
                  style={{ 
                    backgroundColor: theme?.card_bg || '#FFFFFF',
                    borderRadius: theme?.card_radius || '1rem',
                    color: theme?.text_color || '#18181b',
                    border: theme?.card_border || '1px solid #f4f4f5'
                  }}
                >
                  {link.title || "Untitled"}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Status Badge with Live Indicator */}
  <div className={`absolute bottom-10 flex items-center gap-3 px-6 py-3 rounded-full text-white shadow-2xl transition-all duration-500 ${isDeploying ? 'bg-purple-600 scale-110' : 'bg-zinc-900'}`}>
    <div className={`w-2 h-2 rounded-full ${isDeploying ? 'bg-white animate-ping' : 'bg-green-500 animate-pulse'}`} />
    <span className="text-[9px] font-black uppercase tracking-widest">
      {isDeploying ? 'Syncing Architecture...' : 'Live Architectural Preview'}
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
