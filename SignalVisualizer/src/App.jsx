import { useState } from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './index.css'

function App() {

  return (
    <>
      <Navbar/>
      <Hero/>
      <Home/>
    </>
  )
}

export default App
