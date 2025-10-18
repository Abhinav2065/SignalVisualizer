import React, {useState, useEffect, useRef} from 'react'
import '../styles/Home.css'
import analogSignal from '../assets/Analog-Signal.png'
import digitalSignal from '../assets/digitalSignal.png'


const Home = () => {
  return (
    <div>
      
      <div className="signals">
        <div className="image-section">
          <img src={analogSignal} alt="AnalogSignal" className='image'/>
        </div>

        <div className="content-section">
          <h3>What are Signals?</h3>
          <p>A signal is any measurable quantity or information that varies over a dimension like time, space, or frequency.It can be a physical phenomenon, such as an electrical current or sound wave, or a non-physical concept, like a price or a message. Signals are used to convey information and can be represented mathematically as functions, with common types including continuous-time, discrete-time, analog, and digital signals.</p>
        </div>
      </div>

      <div className="example">
        Here is an example of a digital signal!
        <br />
        <img src={digitalSignal} alt="DigitalSignal" />
      </div>
    </div>
  )
}

export default Home