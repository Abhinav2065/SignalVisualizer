import React from 'react'
import '../styles/Home.css'
import analogSignal from '../assets/Analog-Signal.png'


const Home = () => {
  return (
    <div>
      
      <div className="signals">
        <h3>What are Signals?</h3>
        <img src={analogSignal} alt="AnalogSignal" className='image'/>
        <p>A signal is any measurable quantity or information that varies over a dimension like time, space, or frequency.It can be a physical phenomenon, such as an electrical current or sound wave, or a non-physical concept, like a price or a message. Signals are used to convey information and can be represented mathematically as functions, with common types including continuous-time, discrete-time, analog, and digital signals.</p>
      </div>

    </div>
  )
}

export default Home