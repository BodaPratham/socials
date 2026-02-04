import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { addLink, updateUpi, deleteLink } from '../auth/actions'
import { revalidatePath } from 'next/cache'

export default async function DashboardPage() {
  const supabase = await createClient()

  // 1. Get the User Session
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  // 2. Fetch Profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // 3. Fetch Links
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
      <div className="max-w-xl mx-auto">
        
        {/* Header Area */}
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-2xl font-black tracking-tighter italic">SOCIALS<span className="text-blue-500">.</span></h1>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-white/40">Your Handle</p>
            <p className="text-sm font-bold text-blue-400">socials.in/{profile?.username}</p>
          </div>
        </header>

        {/* 1. UPI Configuration */}
        <section className="mb-12 bg-white/5 border border-white/10 p-6 rounded-[2rem]">
          <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-4 font-bold">Configure UPI Payments</label>
          <form action={updateUpi} className="flex gap-2">
            <input 
              name="upi"
              defaultValue={profile?.upi_id || ''}
              placeholder="name@okaxis"
              className="flex-1 bg-black/40 border border-white/10 p-3 rounded-xl outline-none focus:border-blue-500 transition-all text-white"
            />
            <button className="bg-blue-600 px-6 rounded-xl font-bold text-sm hover:bg-blue-500 transition-all">Save</button>
          </form>
        </section>

        {/* 2. Link Management */}
        <section className="mb-12">
          <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4 font-bold">Active Links</p>
          <div className="space-y-3 mb-8">
            {links?.map((link) => (
              <div key={link.id} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex justify-between items-center group">
                <div>
                  <p className="font-bold text-sm">{link.title}</p>
                  <p className="text-[10px] text-white/30 truncate max-w-[200px]">{link.url}</p>
                </div>
                
                {/* Delete Button Form */}
                <form action={async () => {
                  'use server'
                  await deleteLink(link.id)
                }}>
                  <button className="text-[10px] uppercase font-black text-red-500/50 hover:text-red-500 transition-colors">
                    Remove
                  </button>
                </form>
              </div>
            ))}

            {links?.length === 0 && (
              <div className="text-center py-8 border border-dashed border-white/10 rounded-2xl text-white/20 text-sm italic">
                No links added yet
              </div>
            )}
          </div>

          {/* 3. Add New Link Form */}
          <div className="bg-white text-black p-8 rounded-[2.5rem]">
            <h3 className="text-sm font-black uppercase tracking-tighter mb-4 text-center">Add Content Block</h3>
            <form action={addLink} className="space-y-4">
              <input 
                name="title" 
                placeholder="Link Title (e.g. My Instagram)" 
                className="w-full bg-gray-100 p-4 rounded-xl outline-none focus:ring-2 ring-blue-500 text-black" 
                required 
              />
              <input 
                name="url" 
                placeholder="https://..." 
                className="w-full bg-gray-100 p-4 rounded-xl outline-none focus:ring-2 ring-blue-500 text-black" 
                required 
              />
              <button className="w-full bg-black text-white py-4 rounded-xl font-bold hover:opacity-90 transition-all">
                Add to Profile
              </button>
            </form>
          </div>
          
        </section>
      </div>
    </div>
  )
}