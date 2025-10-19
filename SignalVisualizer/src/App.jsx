import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Digital from './components/Digital';
import Analog from './components/Analog';
import PWM from './components/PWM';
import './index.css'

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={
          <>
            <Hero/>
            <Home/>
          </>
        }/>
        <Route path='/digital' element={
          <>
          <Digital/>
          </>
        }/>
        <Route path='/analog' element={
          <>
          <Analog/>
          </>
        } />

        <Route path='/pwm' element= {
          <>
          <PWM/>
          </>
        } />
      </Routes>
    </Router>
  )
}

export default App