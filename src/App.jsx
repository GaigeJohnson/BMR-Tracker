import { useState } from 'react'

function App() {

  const [weight, setWeight] = useState('')
  const [height, setHeight] = useState('')
  const [age, setAge] = useState('')
  const [bmr, setBmr] = useState(null)

  const calcBMR = (e) => {
    e.preventDefault()
    if (weight && age) {
      const result = (10 * weight) + (6.25 * height) - (5 * age) + 5
      setBmr(Math.round(result))
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">BMR Tracker</h1>
        
        <p className="text-gray-600">
          *Calculator*
        </p>
      </div>
    </div>
  )
}

export default App