import React from "react";
import { 
  ImageIcon, 
  Camera, 
  UploadCloud, 
  Trash2, 
  Plus, 
  Package, 
  ExternalLink, 
  FileText, 
  AlignLeft,
  ShoppingBag,
  DollarSign,
  Crown
} from "lucide-react";

export default function ShopTab({
  products,
  setProducts,
  productImgRef,
  digitalFileRef,
  setActiveProductId,
  handleProductUpload,
  panelBg = 'rgba(255,255,255,0.03)',
  panelBorder = 'rgba(255,255,255,0.08)',
  dashBtn = '#A855F7',
  dashBtnText = '#FFFFFF',
  profile,
  setProfile
}: any) {
  const currencySign = profile?.design_config?.currency || '$';
  const currencies = [
    { value: '$', label: 'USD ($)' },
    { value: '€', label: 'EUR (€)' },
    { value: '£', label: 'GBP (£)' },
    { value: '₹', label: 'INR (₹)' },
    { value: 'KSh', label: 'KES (KSh)' }
  ];
  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20 px-2 lg:px-4">
      {/* Hidden Inputs */}
      <input type="file" ref={productImgRef} hidden accept="image/*" onChange={(e) => handleProductUpload(e, "image")} />
      <input type="file" ref={digitalFileRef} hidden accept=".pdf,.zip,.epub" onChange={(e) => handleProductUpload(e, "file")} />

      <header className="flex flex-col gap-2">
        <h2 className="text-3xl font-black text-white">Store</h2>
        <div className="flex justify-between items-center">
           <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              Manage your digital products and storefront
           </p>
           <select 
             value={currencySign}
             onChange={(e) => {
               setProfile({
                 ...profile,
                 design_config: { ...profile?.design_config, currency: e.target.value }
               });
             }}
             className="bg-white/10 px-4 py-2 rounded-xl text-white text-xs font-bold uppercase tracking-wider outline-none border border-white/5 cursor-pointer"
           >
             {currencies.map(c => (
               <option key={c.value} value={c.value} className="bg-zinc-900">{c.label}</option>
             ))}
           </select>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        
        {/* CREATE PRODUCT */}
        <button
          onClick={() => setProducts([
            ...products, 
            { 
              id: crypto.randomUUID(), 
              name: "New Product", 
              price: "0.00", 
              description: "",
              product_type: "affiliate", 
              destination_url: "" 
            }
          ])}
          className="border-2 border-dashed rounded-[2.5rem] p-12 flex flex-col items-center justify-center gap-6 transition-all group min-h-[400px] hover:scale-[1.01] hover:bg-white/[0.02] border-white/10"
          style={{ backgroundColor: panelBg }}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-2xl bg-white/5 group-hover:bg-white/10 group-hover:scale-110">
            <Plus size={28} className="text-white" />
          </div>
          <div className="text-center">
            <span className="block font-black uppercase tracking-widest text-[11px] text-white">
               Add New Product
            </span>
            <span className="text-[9px] font-bold uppercase tracking-widest mt-2 text-zinc-600 block">
               Create a digital asset or external link
            </span>
          </div>
        </button>

        {/* PRODUCT LIST */}
        {products.map((product: any, idx: number) => (
          <div key={product.id} className="border rounded-[2.8rem] overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-500" style={{ backgroundColor: panelBg, borderColor: panelBorder }}>
            
            <div 
              onClick={() => { setActiveProductId(product.id); productImgRef.current?.click(); }}
              className="w-full aspect-[4/3] relative cursor-pointer overflow-hidden border-b border-white/5 bg-black/20"
            >
              {product.image_url ? (
                <img src={product.image_url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="product" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-700">
                  <ShoppingBag size={48} strokeWidth={1.5} />
                  <span className="text-[10px] font-black uppercase tracking-widest mt-4 opacity-50">Upload Product Image</span>
                </div>
              )}
              
              <div className="absolute top-6 left-6 flex gap-2">
                <div className="px-4 py-1.5 bg-black/60 backdrop-blur-xl rounded-full border border-white/10 flex items-center gap-2">
                  {product.product_type === 'digital' && <Crown size={10} className="text-yellow-500" />}
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/80">
                    {product.product_type === 'digital' ? 'Digital Download' : 'External Affiliate'}
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[4px]">
                <Camera className="text-white" size={24} />
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-1">
                   <div className="flex items-center gap-2 text-zinc-500">
                      <Package size={12} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Product Name</span>
                   </div>
                   <input
                    value={product.name}
                    onChange={(e) => { const np = [...products]; np[idx].name = e.target.value; setProducts(np); }}
                    className="w-full font-black text-xl outline-none bg-transparent text-white truncate"
                    placeholder="E.g. Digital Art Pack"
                  />
                </div>
                <button 
                  onClick={() => setProducts(products.filter((p: any) => p.id !== product.id))}
                  className="p-3 rounded-2xl bg-white/5 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 transition-all shadow-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="bg-white/5 border border-white/5 p-5 rounded-[1.8rem] flex items-center justify-between">
                 <div className="flex flex-col">
                     <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Price</span>
                     <div className="flex items-center gap-1 mt-1">
                        <span className="text-lg font-black text-white">{currencySign}</span>
                        <input
                         value={product.price}
                         onChange={(e) => { const np = [...products]; np[idx].price = e.target.value; setProducts(np); }}
                         className="font-black text-xl outline-none bg-transparent w-full text-white"
                         placeholder="0.00"
                        />
                     </div>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center gap-1 justify-center text-zinc-400 font-bold text-lg">
                     {currencySign}
                  </div>
              </div>

              <div className="space-y-4 pt-2">
                 <div className="flex gap-2">
                   {['affiliate', 'digital'].map((type) => (
                     <button
                        key={type}
                        onClick={() => { const np = [...products]; np[idx].product_type = type; setProducts(np); }}
                        className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                          product.product_type === type ? 'bg-white text-black border-white' : 'bg-transparent text-zinc-500 border-white/10 hover:bg-white/5'
                        }`}
                     >
                        {type === 'affiliate' ? 'External' : 'Digital'}
                     </button>
                   ))}
                 </div>

                 {product.product_type === 'affiliate' ? (
                   <div className="space-y-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-1">Destination URL</span>
                      <div className="relative">
                        <input 
                          placeholder="https://..." 
                          value={product.destination_url}
                          className="w-full bg-white/5 p-5 rounded-2xl text-[11px] font-bold outline-none border border-white/10 text-white focus:border-white/30 transition-all"
                          onChange={(e) => { const np = [...products]; np[idx].destination_url = e.target.value; setProducts(np); }}
                        />
                        <ExternalLink size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500" />
                      </div>
                   </div>
                 ) : (
                   <button 
                     onClick={() => { setActiveProductId(product.id); digitalFileRef.current?.click(); }}
                     className="w-full p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center border border-dashed border-white/20 justify-center gap-3 text-white hover:bg-white/5 hover:border-white/40"
                   >
                     <UploadCloud size={18} /> 
                     {product.destination_url ? "Update Asset" : "Upload Asset (PDF/ZIP)"}
                   </button>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}