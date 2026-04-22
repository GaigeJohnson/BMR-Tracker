import { useState, useEffect } from 'react'

function App() {

  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('male')
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

      if (gender == 'male') {
        result += 5
      }
      else {
        result -= 161
      }

      setBmr(Math.round(result))
    }
  }

  const saveEntry = () => {
    if (!bmr) return
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      value: bmr,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-6 font-sans">
      
      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-white">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
            BMR Tracker
          </h1>
          <p className="text-blue-200/70 text-sm mt-1">BMR Tracker</p>
        </header>
        
        <form onSubmit={calculateBMR} className="space-y-4">
          <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${gender === 'male' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
            >
              Male
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${gender === 'female' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
            >
              Female
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Weight (lbs)</label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              placeholder="e.g. 165"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Height (inches)</label>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              placeholder="e.g. 68 (5ft8)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input 
              type="number" 
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              placeholder="e.g. 25"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Calculate BMR
          </button>
        </form>

        {bmr && (
          <div className="mt-8 p-4 bg-blue-50 rounded-lg text-center border border-blue-100">
            <p className="text-gray-600 text-xs uppercase font-semibold">Estimated {gender} BMR</p>
            <p className="text-4xl font-black text-blue-600 my-2">{bmr}</p>
            <button 
              onClick={saveEntry}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold hover:bg-blue-700"
            >
              Save Result
            </button>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">History</h2>
              <button onClick={clearHistory} className="text-xs text-red-500 hover:underline">Clear All</button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {history.map((entry) => (
                <div key={entry.id} className="flex justify-between bg-gray-50 p-3 rounded-md text-sm border border-gray-100">
                  <span className="text-gray-500 font-medium">{entry.date}</span>
                  <span className="font-bold text-blue-700">{entry.value} kcal <span className="text-gray-400 font-normal">({entry.weight} lbs)</span></span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App