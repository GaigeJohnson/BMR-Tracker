import { useState } from 'react'

function App() {

  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [sex, setSex] = useState('male')
  const [bmr, setBmr] = useState(null)

  const calcBMR = (e) => {
    e.preventDefault()
    if (weight && height && age) {
      let result = (10 * weight) + (6.25 * height) - (5 * age)

      if (sex == 'male') {
        result += 5
      }
      else {
        result -= 161
      }

      setBmr(Math.round(result))
    }
  }

return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">MetabolicTrack BMR</h1>
        
        <form onSubmit={calculateBMR} className="space-y-4">
          {/* Gender Selection Toggle */}
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
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              placeholder="e.g. 85"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              placeholder="e.g. 180"
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
            <p className="text-gray-600 text-xs uppercase tracking-widest font-semibold">
            Estimated {gender} BMR
            </p>
            <p className="text-4xl font-black text-blue-600 my-2">{bmr}</p>
            <p className="text-gray-500 text-sm italic">Calories per day</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App