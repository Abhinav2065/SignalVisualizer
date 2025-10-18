import React from 'react'
import '../styles/Navbar.css'


const Navbar = () => {
  return (
    <div>
        <div className="navbar">
            <ul>
                <li>Home</li>
                <li>Analog Signals</li>
                <li>Digital Signals</li>
                <li>Periodic Signals</li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar