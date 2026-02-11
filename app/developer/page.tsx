// app/developer/page.tsx
export default function DeveloperLab() {
    return (
      <div className="min-h-screen bg-black text-white p-20">
        <h1 className="text-4xl font-black mb-4 italic">DEVELOPER LAB<span className="text-blue-500">.</span></h1>
        <p className="text-gray-400 mb-10">Submit your template config for approval. 2% royalty logic applied on sale.</p>
        
        <form action="/api/templates/submit" method="POST" className="max-w-xl space-y-6">
          <input name="name" placeholder="Template Name" className="w-full bg-white/10 p-4 rounded-xl outline-none" />
          <textarea 
            name="config" 
            placeholder='{"bg": "bg-red-500", "button": "..."}' 
            className="w-full bg-white/10 p-4 rounded-xl h-64 font-mono text-xs"
          />
          <button className="w-full bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all">
            Submit for Approval
          </button>
        </form>
      </div>
    )
  }