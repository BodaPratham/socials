import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { RenderTemplate } from '@/app/templates' // Import your template engine

export default async function PublicProfile(props: { params: Promise<{ username: string }> }) {
  const params = await props.params;
  const username = decodeURIComponent(params.username);
  const supabase = await createClient()

  // 1. Fetch Profile (Ensuring case-insensitive matching by lowercasing the param)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .ilike('c_username', username)
    .single()

  if (!profile) notFound()
  
  // 1.1 Track Visit (Fire and forget, but inside server component)
  // We don't await this to keep the page load fast, or we can await it if we want consistency
  await supabase.from('page_visits').insert({ user_id: profile.id });

  // 2. Fetch Links (Ordered by position/order_index)
 // Inside your PublicProfile function
 const { data: links } = await supabase
 .from('links')
 .select('*') // Ensure 'type' is included here
 .eq('user_id', profile.id)
 .order('position', { ascending: true });
 
  // 3. Fetch Products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', profile.id)

 // Replace your return statement with this
return (
  <main className="min-h-screen w-full overflow-x-hidden">
    <RenderTemplate 
      templateId={profile.template_id || 'minimal-modern'} 
      data={{ 
        profile, 
        links: links || [], 
        products: products || [] 
      }} 
    />
    
    {/* Global Footer - Fixed at bottom */}
    <div className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-50">
      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400/50 mix-blend-difference">
        Architected by Digital
      </span>
    </div>
  </main>
)
}