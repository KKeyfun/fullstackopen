import { useState } from 'react'
import './App.css'
import BMICalculator from './components/BMI/bmiCalculator'
import ExerciseCalculator from './components/ExerciseCalculator/exerciseCalculator'

function App() {
  return (
    <>
      <BMICalculator />
      <ExerciseCalculator />
    </>
  )
}

export default App
