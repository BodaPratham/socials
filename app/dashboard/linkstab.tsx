import { 
    Camera, Loader2, ImageIcon, Mail, ChevronDown, GripVertical, 
    Phone, Instagram, Youtube, Globe, Settings, Trash2, Link2, 
    Play, ShoppingBag, Type, Heart, Users, UploadCloud, CreditCard, Plus, Share2,
    DollarSign, Search, HelpCircle, FileText, FileAudio, Video, AlignLeft, FormInput, FileIcon, Minus, MousePointerSquareDashed, Heading, Pencil, Crown
  } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
const socialPlatforms = [
  { id: 'email', label: 'Email', icon: <Mail size={14}/> },
  { id: 'newsletter', label: 'Newsletter', icon: <Mail size={14}/> },
  { id: 'phone', label: 'Phone', icon: <Phone size={14}/> },
  { id: 'sms', label: 'SMS', icon: <Phone size={14}/> },
  { id: 'website', label: 'Website', icon: <Globe size={14}/> },
  { id: 'buymeacoffee', label: 'Buy Me a Coffee', icon: <DollarSign size={14}/> },
  { id: 'cashapp', label: 'Cash App', icon: <DollarSign size={14}/> },
  { id: 'gofundme', label: 'GoFundMe', icon: <Heart size={14}/> },
  { id: 'paypal', label: 'PayPal', icon: <DollarSign size={14}/> },
  { id: 'venmo', label: 'Venmo', icon: <DollarSign size={14}/> },
  { id: 'amazon', label: 'Amazon', icon: <ShoppingBag size={14}/> },
  { id: 'applemusic', label: 'Apple Music', icon: <Play size={14}/> },
  { id: 'artstation', label: 'ArtStation', icon: <ImageIcon size={14}/> },
  { id: 'bandcamp', label: 'Bandcamp', icon: <Play size={14}/> },
  { id: 'behance', label: 'Behance', icon: <ImageIcon size={14}/> },
  { id: 'bluesky', label: 'Bluesky', icon: <Share2 size={14}/> },
  { id: 'caffeine', label: 'Caffeine', icon: <Share2 size={14}/> },
  { id: 'clubhouse', label: 'Clubhouse', icon: <Share2 size={14}/> },
  { id: 'discord', label: 'Discord', icon: <Share2 size={14}/> },
  { id: 'dribbble', label: 'Dribbble', icon: <ImageIcon size={14}/> },
  { id: 'duolingo', label: 'Duolingo', icon: <Globe size={14}/> },
  { id: 'facebook', label: 'Facebook', icon: <Share2 size={14}/> },
  { id: 'github', label: 'GitHub', icon: <Globe size={14}/> },
  { id: 'goodreads', label: 'Goodreads', icon: <Globe size={14}/> },
  { id: 'googlepodcasts', label: 'Google Podcasts', icon: <Play size={14}/> },
  { id: 'instagram', label: 'Instagram', icon: <Instagram size={14}/> },
  { id: 'kofi', label: 'Ko-fi', icon: <DollarSign size={14}/> },
  { id: 'lastfm', label: 'Last.fm', icon: <Play size={14}/> },
  { id: 'linkedin', label: 'LinkedIn', icon: <Share2 size={14}/> },
  { id: 'medium', label: 'Medium', icon: <Type size={14}/> },
  { id: 'meetup', label: 'Meetup', icon: <Users size={14}/> },
  { id: 'onlyfans', label: 'OnlyFans', icon: <Heart size={14}/> },
  { id: 'patreon', label: 'Patreon', icon: <Heart size={14}/> },
  { id: 'pinterest', label: 'Pinterest', icon: <ImageIcon size={14}/> },
  { id: 'reddit', label: 'Reddit', icon: <Share2 size={14}/> },
  { id: 'rednote', label: 'RedNote', icon: <Share2 size={14}/> },
  { id: 'signal', label: 'Signal', icon: <Share2 size={14}/> },
  { id: 'slack', label: 'Slack', icon: <Share2 size={14}/> },
  { id: 'snapchat', label: 'Snapchat', icon: <Share2 size={14}/> },
  { id: 'soundcloud', label: 'SoundCloud', icon: <Play size={14}/> },
  { id: 'spotify', label: 'Spotify', icon: <Play size={14}/> },
  { id: 'steam', label: 'Steam', icon: <Play size={14}/> },
  { id: 'strava', label: 'Strava', icon: <Share2 size={14}/> },
  { id: 'telegram', label: 'Telegram', icon: <Share2 size={14}/> },
  { id: 'threads', label: 'Threads', icon: <Share2 size={14}/> },
  { id: 'tidal', label: 'Tidal', icon: <Play size={14}/> },
  { id: 'tiktok', label: 'TikTok', icon: <Play size={14}/> },
  { id: 'tumblr', label: 'Tumblr', icon: <Type size={14}/> },
  { id: 'twitch', label: 'Twitch', icon: <Play size={14}/> },
  { id: 'x', label: 'X (Twitter)', icon: <Share2 size={14}/> },
  { id: 'unsplash', label: 'Unsplash', icon: <ImageIcon size={14}/> },
  { id: 'vimeo', label: 'Vimeo', icon: <Play size={14}/> },
  { id: 'wechat', label: 'WeChat', icon: <Share2 size={14}/> },
  { id: 'whatsapp', label: 'WhatsApp', icon: <Phone size={14}/> },
  { id: 'youtube', label: 'YouTube', icon: <Youtube size={14}/> },
  { id: 'youtubemusic', label: 'YouTube Music', icon: <Play size={14}/> },
];
  
  const LinksTab = ({
    profile,
    setProfile,
    links,
    setShowSocialModal,
    showSocialModal,
    setLinks,
    uploading,
    handleAvatarUpload,
    fileInputRef,
    showAddMenu,
    setShowAddMenu,
    products,
    panelBg = 'rgba(255,255,255,0.05)',
    panelBorder = 'rgba(255,255,255,0.1)',
    dashBtn = '#A855F7',
    dashBtnText = '#FFFFFF'
  }: any) => {
    const [socialSearch, setSocialSearch] = useState("");
    const [blockSearch, setBlockSearch] = useState("");
    const [uploadingLinkId, setUploadingLinkId] = useState<string | null>(null);
    const supabase = createClient();
    
    const handleBlockFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, linkId: string, type: string) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadingLinkId(linkId);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const bucket = type === 'image' ? 'product-images' : 'digital-downloads';
            const ext = file.name.split('.').pop();
            const path = `${user?.id}/block-${linkId}.${ext}`;
            await supabase.storage.from(bucket).upload(path, file, { upsert: true });
            const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);
            
            setLinks((prevLinks: any[]) => prevLinks.map((l: any) => l.id === linkId ? { ...l, url: publicUrl } : l));
        } catch (err) {
            console.error("Upload Error:", err);
            alert("Upload failed.");
        } finally {
            setUploadingLinkId(null);
        }
    };
    
    return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* 1. Profile Section */}
      <section className="border p-10 rounded-[3rem] shadow-sm flex items-center gap-12" style={{ backgroundColor: panelBg, borderColor: panelBorder }}>
        <div className="relative group" onClick={() => fileInputRef.current?.click()}>
          <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} hidden accept="image/*" />
          <div className="w-32 h-32 bg-zinc-50/10 rounded-full border-2 border-dashed border-zinc-500/30 flex items-center justify-center overflow-hidden cursor-pointer hover:border-purple-400 transition-all">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} className="w-full h-full object-cover" alt="avatar" />
            ) : (
              <ImageIcon size={32} className="text-zinc-500" />
            )}
            {uploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="animate-spin text-purple-400" />
              </div>
            )}
          </div>
          <div className="absolute bottom-1 right-1 p-2.5 bg-zinc-900 text-white rounded-full border-4 border-transparent">
            <Camera size={14} />
          </div>
        </div>
  
        <div className="flex-1 grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Handle</label>
            <input
              value={profile.c_username || ""}
              onChange={(e) => {
                const normalized = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
                setProfile({ ...profile, c_username: normalized });
              }}
              className="w-full p-4 border rounded-2xl font-bold text-sm outline-none bg-transparent placeholder-zinc-500"
              style={{ borderColor: panelBorder }}
              placeholder="your-handle"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest opacity-50">Bio</label>
            <input
              value={profile.bio || ""}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full p-4 border rounded-2xl font-bold text-sm outline-none bg-transparent placeholder-zinc-500"
              style={{ borderColor: panelBorder }}
            />
          </div>
        </div>
      </section>
  
      {/* 2. Dedicated Socials Section */}
      <div className="border p-6 rounded-[1.5rem] mb-8 shadow-sm" style={{ backgroundColor: panelBg, borderColor: panelBorder }}>
        <div className="flex items-center gap-2 mb-4">
           <HelpCircle size={16} style={{ color: dashBtn }} />
           <h3 className="font-semibold text-sm">Socials</h3>
        </div>
        
        {links?.filter((l: any) => l.type === 'social').length > 0 && (
          <div className="space-y-3 mb-4">
            {links.filter((l: any) => l.type === 'social').map((link: any) => (
                <div key={link.id} className="flex items-center gap-3 p-4 border rounded-xl relative group transition-all" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderColor: panelBorder }}>
                    <GripVertical size={16} className="text-zinc-500 cursor-grab shrink-0" />
                    
                    <div className="flex-1 flex items-center border rounded-lg overflow-hidden focus-within:ring-1 transition-all" style={{ borderColor: panelBorder }}>
                        <input
                            value={link.url}
                            onChange={(e) => setLinks(links.map((l: any) => l.id === link.id ? { ...l, url: e.target.value } : l))}
                            placeholder={`${link.title} username or URL`}
                            className="w-full bg-transparent text-sm p-2.5 outline-none placeholder-zinc-500"
                        />
                        <div className="px-3 flex items-center justify-center opacity-70">
                             {socialPlatforms.find(p => p.id === link.icon_type)?.icon}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 items-center shrink-0">
                         <button className="text-blue-500 hover:bg-blue-50 p-1.5 rounded-md transition-all">
                            <Pencil size={14} />
                         </button>
                         <button onClick={() => setLinks(links.filter((l: any) => l.id !== link.id))} className="text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-all">
                             <Trash2 size={14} />
                         </button>
                    </div>
                </div>
            ))}
          </div>
        )}

        <div 
          onClick={() => setShowSocialModal(true)}
          className="p-8 border rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer transition-all opacity-80 hover:opacity-100"
          style={{ backgroundColor: 'rgba(0,0,0,0.1)', borderColor: panelBorder }}
        >
          <Link2 size={24} className="opacity-70" />
          <span className="font-bold text-sm text-inherit">Add Social</span>
          <span className="text-xs opacity-50">Link out to your social profiles</span>
        </div>
      </div>
  
      {/* 3. Dynamic Blocks Container */}
      <div className="border p-6 rounded-[1.5rem] mb-8 shadow-sm" style={{ backgroundColor: panelBg, borderColor: panelBorder }}>
        <div className="flex items-center gap-2 mb-4">
           <h3 className="font-semibold text-sm">Blocks</h3>
        </div>

        {links?.filter((l: any) => l.type !== 'social').length > 0 && (
          <div className="space-y-4 mb-4">
             {links.filter((l: any) => l.type !== 'social').map((link: any) => (
                 <div key={link.id} className="p-6 rounded-3xl border transition-all hover:shadow-md group relative" style={{ backgroundColor: 'rgba(0,0,0,0.2)', borderColor: panelBorder }}>
                    <div className="flex items-start gap-4">
                        <GripVertical size={16} className="text-zinc-500 cursor-grab mt-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        
                        <div className="flex-1 space-y-4">
                            {/* Block Header (Title & Type Icon) */}
                            <div className="flex items-center justify-between group/header">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center opacity-60" style={{ backgroundColor: panelBorder }}>
                                        {link.type === 'title' ? <Heading size={16}/> : 
                                         link.type === 'image' ? <ImageIcon size={16}/> : 
                                         link.type === 'instagram' ? <Instagram size={16}/> :
                                         link.type === 'shop' ? <ShoppingBag size={16}/> :
                                         <Link2 size={16}/>}
                                    </div>
                                    <input
                                        value={link.title}
                                        onChange={(e) => setLinks(links.map((l: any) => l.id === link.id ? { ...l, title: e.target.value } : l))}
                                        placeholder={link.type === 'title' ? "Section Title" : "Title"}
                                        className={`bg-transparent outline-none transition-all placeholder-zinc-600 ${link.type === 'title' ? 'font-black text-xl italic uppercase tracking-tighter' : 'font-bold text-sm'}`}
                                    />
                                </div>
                                <button onClick={() => setLinks(links.filter((l: any) => l.id !== link.id))} className="text-red-500/40 hover:text-red-500 p-2 rounded-lg transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            {/* Block Body (URL or specialized inputs) */}
                            <div className="pl-11">
                                {link.type === 'text' && (
                                    <textarea
                                        value={link.url}
                                        onChange={(e) => setLinks(links.map((l: any) => l.id === link.id ? { ...l, url: e.target.value } : l))}
                                        placeholder="Enter your text here..."
                                        className="w-full bg-black/20 border p-4 text-sm rounded-2xl outline-none focus:border-purple-500/50 min-h-[100px] resize-y placeholder-zinc-700 font-medium"
                                        style={{ borderColor: panelBorder }}
                                    />
                                )}
                                
                                {link.type === 'instagram' && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <input 
                                                value={link.url}
                                                onChange={(e) => setLinks(links.map((l: any) => l.id === link.id ? { ...l, url: e.target.value } : l))}
                                                placeholder="@instagram_handle"
                                                className="w-full bg-black/20 border p-3 text-sm rounded-xl outline-none focus:border-purple-500/50 placeholder-zinc-700 font-bold"
                                                style={{ borderColor: panelBorder }}
                                            />
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 px-1">Meta Username</p>
                                        </div>
                                        <div className="space-y-2">
                                            <input 
                                                value={link.follower_count || ""}
                                                onChange={(e) => setLinks(links.map((l: any) => l.id === link.id ? { ...l, follower_count: e.target.value } : l))}
                                                placeholder="e.g. 1.2M"
                                                className="w-full bg-black/20 border p-3 text-sm rounded-xl outline-none focus:border-purple-500/50 placeholder-zinc-700 font-bold"
                                                style={{ borderColor: panelBorder }}
                                            />
                                            <p className="text-[10px] font-black uppercase tracking-widest opacity-30 px-1">Follower Display</p>
                                        </div>
                                    </div>
                                )}
                                
                                {link.type === 'shop' && (
                                    <select
                                        value={link.url}
                                        onChange={(e) => setLinks(links.map((l: any) => l.id === link.id ? { ...l, url: e.target.value } : l))}
                                        className="w-full bg-black/20 border p-3 text-sm rounded-xl outline-none font-bold"
                                        style={{ borderColor: panelBorder, color: 'inherit' }}
                                    >
                                        <option className="bg-[#111] text-white" value="">Select a Product</option>
                                        {products?.map((p: any) => (
                                            <option className="bg-[#111] text-white" key={p.id} value={p.id}>{p.name}</option>
                                        ))}
                                    </select>
                                )}
                                
                                {link.type !== 'title' && link.type !== 'text' && link.type !== 'instagram' && link.type !== 'shop' && (
                                    <div className="flex items-center gap-3 w-full pr-4">
                                        <Link2 size={14} className="opacity-30 shrink-0" />
                                        <div className="flex-1 flex gap-2 items-center">
                                            <input 
                                                value={link.url}
                                                onChange={(e) => setLinks(links.map((l: any) => l.id === link.id ? { ...l, url: e.target.value } : l))}
                                                placeholder={link.type === 'image' || link.type === 'menu_item' || link.type === 'gallery_item' ? "Direct image URL (e.g. .jpg, .png)" : link.type === 'file' ? "Direct file URL (e.g. .pdf)" : "Target URL"}
                                                className="w-full bg-transparent border-b p-1 text-sm outline-none placeholder-zinc-700 font-bold"
                                                style={{ borderColor: panelBorder }}
                                            />
                                            {(link.type === 'image' || link.type === 'file' || link.type === 'menu_item' || link.type === 'gallery_item') && (
                                                <div className="relative shrink-0 flex">
                                                    <input
                                                        type="file"
                                                        id={`file-upload-${link.id}`}
                                                        className="hidden"
                                                        accept={link.type === 'image' ? "image/*" : "*/*"}
                                                        onChange={(e) => handleBlockFileUpload(e, link.id, link.type)}
                                                    />
                                                    <label
                                                        htmlFor={`file-upload-${link.id}`}
                                                        className="flex items-center justify-center p-2 rounded-lg bg-zinc-800 text-white cursor-pointer hover:bg-purple-600 transition-all text-[10px] font-black uppercase tracking-widest gap-2"
                                                        title={`Upload ${link.type}`}
                                                    >
                                                        {uploadingLinkId === link.id ? <Loader2 size={14} className="animate-spin" /> : <UploadCloud size={14} />}
                                                        <span>Upload</span>
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                 </div>
             ))}
          </div>
        )}

        <div 
          onClick={() => setShowAddMenu(true)}
          className="p-10 border border-dashed rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all opacity-80 hover:opacity-100"
          style={{ borderColor: dashBtn, backgroundColor: panelBg }}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: dashBtn, color: dashBtnText }}>
            <Plus size={24} />
          </div>
          <span className="font-bold text-sm text-inherit">Add Block</span>
          <span className="text-xs opacity-60">Add buttons, media, text, products, and more</span>
        </div>
      </div>
  
     {/* 4. Social Modal */}
      {showSocialModal && (
        <div 
          className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm sm:items-center sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setShowSocialModal(false)} // Close when clicking the dark overlay
        >
          <div 
            className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-lg h-full sm:h-auto sm:max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300 mt-16 sm:mt-0"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
          >
            
            {/* Header */}
            <div className="p-4 border-b border-zinc-100 flex items-center justify-between sticky top-0 bg-white z-10 sm:rounded-t-2xl">
              <div className="flex items-center flex-1">
                <Search size={18} className="text-zinc-400 ml-2" />
                <input 
                  type="text"
                  placeholder="Search..."
                  value={socialSearch}
                  onChange={(e) => setSocialSearch(e.target.value)}
                  className="w-full p-2 outline-none text-sm text-zinc-800"
                  autoFocus
                />
              </div>
              <button onClick={() => setShowSocialModal(false)} className="text-zinc-400 hover:text-zinc-800 p-2">
                <Plus size={20} className="rotate-45" />
              </button>
            </div>
            
            {/* Grid */}
            <div className="px-4 py-4 overflow-y-auto flex-1 custom-scrollbar">
              <div className="grid grid-cols-2 gap-2">
                {socialPlatforms
                  .filter(p => p.label.toLowerCase().includes(socialSearch.toLowerCase()))
                  .map((platform) => (
                  <div
                    key={platform.id}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Safely add the new social link to the array
                        setLinks([...(links || []), { 
                          id: crypto.randomUUID(),
                          title: platform.label, 
                          url: "", 
                          type: "social", 
                          icon_type: platform.id,
                          position: links?.length || 0 
                        }]);
                        setSocialSearch("");
                        setShowSocialModal(false);
                    }}
                    className="flex items-center gap-3 p-3 border border-zinc-200 rounded-lg hover:border-zinc-400 hover:bg-zinc-50 transition-all text-left cursor-pointer bg-white"
                  >
                    <div className="text-zinc-700 pointer-events-none">{platform.icon}</div>
                    <span className="text-sm font-medium text-zinc-700 pointer-events-none">{platform.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-100 bg-white sticky bottom-0 sm:rounded-b-2xl">
                <button 
                  onClick={() => setShowSocialModal(false)}
                  className="w-full py-3 bg-[#111] text-white rounded-lg font-bold text-sm hover:bg-black transition-all"
                >
                    Done
                </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Add Block Modal */}
      {showAddMenu && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-sm sm:items-center sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-lg h-full sm:h-auto sm:max-h-[85vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-300 mt-16 sm:mt-0">
            
            {/* Header */}
            <div className="p-6 border-b border-zinc-100 sticky top-0 bg-white z-10 sm:rounded-t-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-xl text-zinc-900">Add Block</h3>
                <button onClick={() => setShowAddMenu(false)} className="text-zinc-400 hover:text-zinc-800">
                  <Plus size={24} className="rotate-45" />
                </button>
              </div>
              <div className="flex items-center border border-zinc-300 rounded-lg bg-white overflow-hidden">
                <Search size={18} className="text-zinc-400 ml-3" />
                <input 
                  type="text"
                  placeholder="Search block types..."
                  value={blockSearch}
                  onChange={(e) => setBlockSearch(e.target.value)}
                  className="w-full p-3 outline-none text-sm text-zinc-800"
                />
              </div>
            </div>
            
            {/* Options */}
            <div className="p-6 overflow-y-auto flex-1 space-y-8">
                
                {/* Buttons Category */}
                <div>
                    <h4 className="font-bold text-[15px] mb-1 text-zinc-900">Buttons</h4>
                    <p className="text-xs text-zinc-500 mb-4">Clickable buttons that direct visitors to links, emails, and files.</p>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => { setLinks([...(links || []), { id: crypto.randomUUID(), title: "Header", url: "", type: "standard" }]); setShowAddMenu(false); }} className="p-4 border border-zinc-200 rounded-xl hover:border-zinc-400 hover:bg-zinc-50 transition-all flex flex-col items-center text-center gap-2">
                            <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600"><Link2 size={18} /></div>
                            <span className="font-bold text-sm text-zinc-800">URL Button</span>
                            <span className="text-[10px] text-zinc-500 leading-tight">Link to any website, social media profile, or online resource.</span>
                        </button>
                        <button onClick={() => { setLinks([...(links || []), { id: crypto.randomUUID(), title: "Email", url: "mailto:", type: "contact" }]); setShowAddMenu(false); }} className="p-4 border border-zinc-200 rounded-xl hover:border-zinc-400 hover:bg-zinc-50 transition-all flex flex-col items-center text-center gap-2">
                            <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600"><Mail size={18} /></div>
                            <span className="font-bold text-sm text-zinc-800">Email Button</span>
                            <span className="text-[10px] text-zinc-500 leading-tight">Opens visitors' email app with your address pre-filled.</span>
                        </button>
                        <button onClick={() => { setLinks([...(links || []), { id: crypto.randomUUID(), title: "Download", url: "", type: "file" }]); setShowAddMenu(false); }} className="p-4 border border-zinc-200 rounded-xl hover:border-zinc-400 hover:bg-zinc-50 transition-all flex flex-col items-center text-center gap-2 relative overflow-hidden">
                            <div className="absolute top-2 right-2 flex items-center gap-1">
                                <Crown size={10} className="text-yellow-500" />
                                <span className="text-[7px] font-black uppercase tracking-widest text-yellow-600">Pro</span>
                            </div>
                            <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600"><FileText size={18} /></div>
                            <span className="font-bold text-sm text-zinc-800">File Button</span>
                            <span className="text-[10px] text-zinc-500 leading-tight">Share downloadable files like PDFs, resumes, or press kits.</span>
                        </button>
                        <button onClick={() => { setLinks([...(links || []), { id: crypto.randomUUID(), title: "Image", url: "", type: "image" }]); setShowAddMenu(false); }} className="p-4 border border-zinc-200 rounded-xl hover:border-zinc-400 hover:bg-zinc-50 transition-all flex flex-col items-center text-center gap-2">
                            <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600"><ImageIcon size={18} /></div>
                            <span className="font-bold text-sm text-zinc-800">Image Button</span>
                            <span className="text-[10px] text-zinc-500 leading-tight">Showcase a photo or graphic in a beautiful full-screen lightbox.</span>
                        </button>
                    </div>
                </div>

                {/* Media Category */}
                <div>
                    <h4 className="font-bold text-[15px] mb-1 text-zinc-900">Media</h4>
                    <p className="text-xs text-zinc-500 mb-4">Embed audio and video from popular platforms</p>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => { setLinks([...(links || []), { id: crypto.randomUUID(), title: "Audio", url: "", type: "audio" }]); setShowAddMenu(false); }} className="p-4 border border-zinc-200 rounded-xl hover:border-zinc-400 hover:bg-zinc-50 transition-all flex flex-col items-center text-center gap-2">
                            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600"><Play size={18} /></div>
                            <span className="font-bold text-sm text-zinc-800">Audio</span>
                            <span className="text-[10px] text-zinc-500 leading-tight">Embed music or podcasts from Spotify, Apple Music, and more.</span>
                        </button>
                        <button onClick={() => { setLinks([...(links || []), { id: crypto.randomUUID(), title: "Video", url: "", type: "youtube" }]); setShowAddMenu(false); }} className="p-4 border border-zinc-200 rounded-xl hover:border-zinc-400 hover:bg-zinc-50 transition-all flex flex-col items-center text-center gap-2">
                            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center text-purple-600"><Youtube size={18} /></div>
                            <span className="font-bold text-sm text-zinc-800">Video</span>
                            <span className="text-[10px] text-zinc-500 leading-tight">Embed videos from YouTube, Vimeo, TikTok, and others.</span>
                        </button>
                    </div>
                </div>

                {/* Content Category */}
                <div>
                    <h4 className="font-bold text-[15px] mb-1 text-zinc-900">Content</h4>
                    <p className="text-xs text-zinc-500 mb-4">Add text, forms, and other content to your profile</p>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => { setLinks([...(links || []), { id: crypto.randomUUID(), title: "Text", url: "", type: "text" }]); setShowAddMenu(false); }} className="p-4 border border-zinc-200 rounded-xl hover:border-zinc-400 hover:bg-zinc-50 transition-all flex flex-col items-center text-center gap-2">
                            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600"><Type size={18} /></div>
                            <span className="font-bold text-sm text-zinc-800">Text</span>
                            <span className="text-[10px] text-zinc-500 leading-tight">Add rich text for announcements, bios, or any written content.</span>
                        </button>
                        <button onClick={() => { setLinks([...(links || []), { id: crypto.randomUUID(), title: "Subscribe", url: "", type: "form" }]); setShowAddMenu(false); }} className="p-4 border rounded-xl hover:opacity-80 transition-all flex flex-col items-center text-center gap-2 relative overflow-hidden" style={{ borderColor: panelBorder }}>
                            <div className="absolute top-2 right-2 flex items-center gap-1">
                                <Crown size={10} className="text-yellow-500" />
                                <span className="text-[7px] font-black uppercase tracking-widest text-yellow-600">Pro</span>
                            </div>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6' }}><FormInput size={18} /></div>
                            <span className="font-bold text-sm text-inherit">Form</span>
                            <span className="text-[10px] opacity-60 leading-tight">Build custom forms to collect sign-ups, RSVPs, or feedback.</span>
                        </button>
                        <button onClick={() => { setLinks([...(links || []), { id: crypto.randomUUID(), title: "Product", url: "", type: "shop" }]); setShowAddMenu(false); }} className="p-4 border rounded-xl hover:opacity-80 transition-all flex flex-col items-center text-center gap-2 relative overflow-hidden" style={{ borderColor: panelBorder }}>
                            <div className="absolute top-2 right-2 flex items-center gap-1">
                                <Crown size={10} className="text-yellow-500" />
                                <span className="text-[7px] font-black uppercase tracking-widest text-yellow-600">Pro</span>
                            </div>
                            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: dashBtn, color: dashBtnText }}><ShoppingBag size={18} /></div>
                            <span className="font-bold text-sm text-inherit">Product</span>
                            <span className="text-[10px] opacity-60 leading-tight">Feature a digital or physical product directly.</span>
                        </button>

                        {profile.template_id === 'cafe-restaurant' && (
                            <button onClick={() => { setLinks([...(links || []), { id: crypto.randomUUID(), title: "Menu Item", url: "", type: "menu_item" }]); setShowAddMenu(false); }} className="p-4 border border-zinc-200 rounded-xl hover:border-zinc-400 hover:bg-zinc-50 transition-all flex flex-col items-center text-center gap-2">
                                <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600"><Plus size={18} /></div>
                                <span className="font-bold text-sm text-zinc-800">Menu Block</span>
                                <span className="text-[10px] text-zinc-500 leading-tight">Quick shortcut to add menu items to your cafe.</span>
                            </button>
                        )}

                        {profile.template_id === 'brand-commerce' && (
                            <button onClick={() => { setLinks([...(links || []), { id: crypto.randomUUID(), title: "Gallery Item", url: "", type: "gallery_item" }]); setShowAddMenu(false); }} className="p-4 border border-zinc-200 rounded-xl hover:border-zinc-400 hover:bg-zinc-50 transition-all flex flex-col items-center text-center gap-2">
                                <div className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-600"><ImageIcon size={18} /></div>
                                <span className="font-bold text-sm text-zinc-800">Gallery Block</span>
                                <span className="text-[10px] text-zinc-500 leading-tight">Quick shortcut to add products to your gallery.</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Engagement Category */}
                <div>
                    <h4 className="font-bold text-[15px] mb-1 text-zinc-900">Engagement</h4>
                    <p className="text-xs text-zinc-500 mb-4">Grow your audience and connect with visitors</p>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => { setLinks([...(links || []), { id: crypto.randomUUID(), title: "Instagram Post", url: "", type: "instagram" }]); setShowAddMenu(false); }} className="p-4 border border-zinc-200 rounded-xl hover:border-zinc-400 hover:bg-zinc-50 transition-all flex flex-col items-center text-center gap-2 relative overflow-hidden">
                            <div className="absolute top-2 right-2 flex items-center gap-1">
                                <Crown size={10} className="text-yellow-500" />
                                <span className="text-[7px] font-black uppercase tracking-widest text-yellow-600">Pro</span>
                            </div>
                            <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center text-pink-600"><Instagram size={18} /></div>
                            <span className="font-bold text-sm text-zinc-800">Instagram Sync</span>
                            <span className="text-[10px] text-zinc-500 leading-tight">Display your latest Instagram posts automatically.</span>
                        </button>
                        <button onClick={() => { setLinks([...(links || []), { id: crypto.randomUUID(), title: "Tip Jar", url: "", type: "tip" }]); setShowAddMenu(false); }} className="p-4 border border-zinc-200 rounded-xl hover:border-zinc-400 hover:bg-zinc-50 transition-all flex flex-col items-center text-center gap-2">
                            <div className="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center text-pink-600"><Heart size={18} /></div>
                            <span className="font-bold text-sm text-zinc-800">Donate</span>
                            <span className="text-[10px] text-zinc-500 leading-tight">Add donation buttons for PayPal, Venmo, and other platforms.</span>
                        </button>
                    </div>
                </div>

                {/* Layout Category */}
                <div>
                    <h4 className="font-bold text-[15px] mb-1 text-zinc-900">Layout</h4>
                    <p className="text-xs text-zinc-500 mb-4">Organize and structure your profile</p>
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => { setLinks([...(links || []), { id: crypto.randomUUID(), title: "Title", url: "", type: "title" }]); setShowAddMenu(false); }} className="p-4 border border-zinc-200 rounded-xl hover:border-zinc-400 hover:bg-zinc-50 transition-all flex flex-col items-center text-center gap-2">
                            <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-amber-600"><Heading size={18} /></div>
                            <span className="font-bold text-sm text-zinc-800">Title</span>
                            <span className="text-[10px] text-zinc-500 leading-tight">Add a title before you start a new section.</span>
                        </button>
                    </div>
                </div>

            </div>

            {/* Footer */}
            <div className="p-4 border-t border-zinc-100 bg-white sticky bottom-0 sm:rounded-b-2xl">
                <button 
                  onClick={() => setShowAddMenu(false)}
                  className="w-full py-3 bg-white border border-zinc-300 text-zinc-800 rounded-lg font-bold text-sm hover:bg-zinc-50 transition-all"
                >
                    Cancel
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  };

  export default LinksTab;