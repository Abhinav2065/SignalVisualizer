import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'


const Navbar = () => {
  return (
    <div>
        <div className="navbar">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/digital">Digital Signal</Link></li>
                <li><Link to="/analog">Analog Signal</Link></li>
                <li><Link to="/pwm">PWM signal</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar