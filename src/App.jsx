import { useState, useEffect } from 'react'

function App() {

  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [activity, setActivity] = useState('1.2')
  const [bmr, setBmr] = useState(null)
  const [tdee, setTdee] = useState(null)

  const [openSection, setOpenSection] = useState(null)

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('bmr_history')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('bmr_history', JSON.stringify(history))
  }, [history])

  const calculateBMR = (e) => {
    e.preventDefault()
    if (weight && height && age) {
      let result = (4.536 * weight) + (15.88 * height) - (5 * age)
      
      if (gender === 'male') {
        result += 5
      } else {
        result -= 161
      }
      
      const finalBmr = Math.round(result)
      setBmr(finalBmr)
      setTdee(Math.round(finalBmr * parseFloat(activity)))
    }
  }

  const saveEntry = () => {
    if (!bmr) return
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      value: bmr,
      tdee: tdee,
      weight: weight
    }
    setHistory([newEntry, ...history])
  }

  const clearHistory = () => {
    if (window.confirm("Clear all saved entries?")) {
      setHistory([])
    }
  }

  const infoSections = [
    { id: 1,
      title: "Why Your BMR Matters",
      content: `Your BMR is the main metric you need to worry about when you want to change or maintain your weight.
                 Actively keeping up with your estimated BMR is essential, because as you lose or gain weight, your 
                 BMR changes, meaning your daily "budget" changes.` },
    { id: 2,
      title: "How weight Loss Works",
      content: `If you go above your daily BMR, you gain weight. If you go below your daily BMR, you lose weight. 
      There are plenty of trending diets that suggest only eating meat or completely avoiding sugar and they do work,  
      soley because you stuck to or avoided certain foods. These diets indirectly have you stay in a caloric deficit, because the
      foods you have to eat in these diets are low in calories, so you'd have to really over eat in order to not lose weight. 
      Realistically, you can eat anything you want and lose weight, as long as you stay below your daily BMR`},
    { id: 3,
      title: "Tracking Calories",
      content: `On the back of almost everything you can buy from a store, there will be a nutrition label. In the biggest font, the calories 
      will be listed for the specified serving size. If there is no label available, you can simply google the calories for the item. You'll
       want to force yourself to track the calories in your head, on an app, or on paper until it becomes something you don't even think about.` },
    { id: 4,
      title: "Realistic Timeframe",
      content: `The reccommended deficit to be in by medical professionals is 500. This would translate to 1lb of fat burned a week, because every 
      3,500 calories lost through a deficit results in 1lb of fat being burned. If you go beyond 1,000 a caloric deficit, you run the risk 
      of losing significant muscle mass, temporary loss of hair, nutrient deficiency, and various other negative side effects.`}
  ]

return (
<div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-teal-600 p-6">

      <header className="max-w-6xl mx-auto flex items-center justify-between mb-12 py-4 border-b border-white/10">
        <h1 className="text-xl font-extrabold tracking-tighter">
          <span className="text-white">BMR</span><span className="text-teal-400">TRACKER</span>
        </h1>
        <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-[11px] font-bold text-slate-300 uppercase tracking-wider">
          <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
          Active Session
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        <section className="bg-slate-900 rounded-3xl border border-white/5 p-8 shadow-2xl backdrop-blur-3xl">
          <header className="mb-8">
            <h2 className="text-2xl font-black tracking-tight">Daily Metabolism</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Input Metrics (Imperial)</p>
          </header>

          <form onSubmit={calculateBMR} className="space-y-6">
            <div className="flex bg-slate-800 p-1 rounded-xl border border-white/5">
              {['male', 'female'].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`flex-1 py-2 text-xs font-black rounded-lg transition ${gender === g ? 'bg-teal-500 text-slate-950' : 'text-slate-400'}`}
                >{g.toUpperCase()}</button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-teal-400 uppercase">Weight (lbs)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-teal-500 outline-none" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-teal-400 uppercase">Height (in)</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-teal-500 outline-none" required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-teal-400 uppercase">Activity Level</label>
              <select 
                value={activity} 
                onChange={(e) => setActivity(e.target.value)}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-teal-500 outline-none appearance-none"
              >
                <option value="1.2">Sedentary (Bedrotting)</option>
                <option value="1.375">Lightly Active (1-3 days of exercise a week)</option>
                <option value="1.55">Moderately Active (3-5 days of exercise a week)</option>
                <option value="1.725">Very Active (6-7 days of exercise a week)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-teal-400 uppercase">Age</label>
              <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-teal-500 outline-none" required />
            </div>

            <button type="submit" className="w-full bg-teal-500 py-4 rounded-xl font-black text-slate-950 text-xs uppercase tracking-widest hover:bg-teal-400 transition shadow-lg shadow-teal-500/20">
              Analyze Metrics
            </button>
          </form>

          {bmr && (
            <div className="mt-8 pt-8 border-t border-white/5 animate-in fade-in slide-in-from-bottom-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center">
                  <p className="text-[9px] font-black text-slate-500 uppercase">BMR</p>
                  <p className="text-2xl font-black text-teal-400">{bmr}</p>
                </div>
                <div className="p-4 bg-teal-500/10 rounded-2xl border border-teal-500/20 text-center">
                  <p className="text-[9px] font-black text-teal-400 uppercase">TDEE</p>
                  <p className="text-2xl font-black text-white">{tdee}</p>
                </div>
              </div>
              <button onClick={saveEntry} className="w-full mt-4 py-2 border border-white/10 rounded-full text-[10px] font-bold text-slate-400 hover:text-white hover:bg-white/5 transition">
                + COMMIT TO HISTORY
              </button>
            </div>
          )}
        </section>

        <div className="space-y-3">
            {infoSections.map((section) => (
              <div key={section.id} className="border border-white/5 bg-slate-900/40 rounded-2xl overflow-hidden">
                <button 
                  onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition"
                >
                  <span className="text-xs font-black uppercase tracking-widest text-slate-300">{section.title}</span>
                  <span className={`text-teal-500 transition-transform duration-300 ${openSection === section.id ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <div className={`transition-all duration-300 ease-in-out ${openSection === section.id ? 'max-h-40 p-5 pt-0 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

        <section className="bg-slate-900/50 rounded-3xl border border-white/5 p-8 backdrop-blur-sm min-h-[400px]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Data Logs</h3>
            {history.length > 0 && (
              <button onClick={() => setHistory([])} className="text-[10px] font-bold text-red-500/50 hover:text-red-500 transition">PURGE</button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl">
              <p className="text-slate-600 text-xs font-medium">No encrypted logs found.</p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2 scrollbar-hide">
              {history.map((entry) => (
                <div key={entry.id} className="bg-slate-800/40 p-5 rounded-2xl border border-white/5 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase">{entry.date}</p>
                    <p className="text-xs text-slate-300 font-medium">{entry.weight} lbs</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-teal-400">{entry.value} <span className="text-[9px] text-slate-500">BMR</span></p>
                    <p className="text-xs font-bold text-white">{entry.tdee} <span className="text-[9px] text-slate-500 uppercase">TDEE</span></p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="max-w-6xl mx-auto mt-12 text-center py-6 border-t border-white/5">
        <p className="text-[10px] font-black text-slate-700 tracking-[0.3em] uppercase">PSU • IST-256 • Spring 2026</p>
      </footer>
    </div>
  )
}

export default App