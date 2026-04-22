import { useState, useEffect } from 'react'

function App() {

  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
  const [activity, setActivity] = useState('1.2')
  const [bmr, setBmr] = useState(null)

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
      gender === 'male' ? bmrResult += 5 : bmrResult -= 161
      
      const finalBmr = Math.round(bmrResult)
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

return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center p-6 text-white font-sans selection:bg-teal-600">
      
      <header className="w-full max-w-7xl flex items-center justify-between mb-16 py-4 border-b border-white/10">
        <h1 className="text-xl font-extrabold tracking-tighter text-teal-400">
          <span className="text-white">BMR</span><span className="text-teal-400">TRACKER</span>
        </h1>
        <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
          <div className="w-2.5 h-2.5 bg-teal-500 rounded-full animate-pulse"></div>
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Live Prototype • v1.3</span>
        </div>
      </header>
      
      <main className="max-w-xl w-full flex-grow flex flex-col items-center justify-center">
        <div className="w-full bg-slate-900 rounded-3xl shadow-2xl border border-white/5 p-10 backdrop-blur-3xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black tracking-tight text-white mb-1">
              Analyze Your BMR
            </h2>
            <p className="text-slate-400 text-sm font-medium">Use Imperial Units (lbs / inches)</p>
          </div>
          
          <form onSubmit={calculateBMR} className="space-y-7">
            <div className="flex bg-slate-800 p-1.5 rounded-2xl border border-white/5">
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition duration-200 ${gender === 'male' ? 'bg-teal-500 shadow-md text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                MALE
              </button>
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition duration-200 ${gender === 'female' ? 'bg-teal-500 shadow-md text-slate-950' : 'text-slate-400 hover:text-white'}`}
              >
                FEMALE
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[ 
                {label: "Weight", id: "w", value: weight, setter: setWeight, unit: "lbs", placeholder: "e.g., 185"},
                {label: "Height", id: "h", value: height, setter: setHeight, unit: "in", placeholder: "e.g., 70"},
                {label: "Age", id: "a", value: age, setter: setAge, unit: "years", placeholder: "e.g., 25"}
              ].map((input) => (
                <div key={input.id} className="space-y-2">
                  <label htmlFor={input.id} className="text-xs font-bold text-teal-400 uppercase tracking-widest">{input.label}</label>
                  <div className="relative">
                    <input 
                      id={input.id}
                      type="number" 
                      value={input.value}
                      onChange={(e) => input.setter(e.target.value)}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition placeholder:text-slate-600"
                      placeholder={input.placeholder}
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-medium">{input.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 py-4 rounded-xl font-extrabold text-slate-950 text-sm uppercase tracking-wider hover:from-teal-400 hover:to-emerald-400 transition shadow-xl"
            >
              Calculate BMR
            </button>
          </form>

          {bmr && (
            <div className="mt-10 p-6 bg-slate-800/50 rounded-2xl border border-white/5 text-center animate-in fade-in slide-in-from-top-4 duration-300">
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">Basal Metabolic Rate</p>
              <p className="text-5xl font-black text-white my-2">{bmr}</p>
              <p className="text-slate-500 text-sm italic">Estimated Calories per day</p>
            </div>
          )}
        </div>
      </main>
      
      <footer className="w-full max-w-7xl mt-20 text-center text-slate-700 text-[11px] font-bold tracking-[0.2em] uppercase py-3 border-t border-white/5">
        Built for PSU IST-256 • Spring 2026
      </footer>
    </div>
  )
}

export default App