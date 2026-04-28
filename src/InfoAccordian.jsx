export default function InfoAccordion({ sections, openSection, setOpenSection }) {
  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <div key={section.id} className="border border-white/5 bg-slate-900/40 rounded-2xl overflow-hidden">
          <button 
            onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition"
          >
            <span className="text-xs font-black uppercase tracking-widest text-slate-300">{section.title}</span>
            <span className={`text-teal-500 transition-transform duration-300 ${openSection === section.id ? 'rotate-180' : ''}`}>▼</span>
          </button>
          
          <div className={`transition-all duration-300 ease-in-out ${openSection === section.id ? 'max-h-96 p-5 pt-0 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <p className="text-sm text-slate-500 leading-relaxed">
              {section.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}