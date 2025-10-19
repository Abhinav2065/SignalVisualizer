import React from 'react'
import '../styles/PWM.css'


const PWM = () => {
  return (
    <div>
        <div className="pwm">
            <div className="pwm-hero">
                <h2>Pulse Width Modulation (PWM)</h2>
                <p>PWM is a way to simulate analog Signal by Digital Devices.</p>
            </div>

            <div className="content">
                We all know that digital devices run a 0s and 1s. On or Off. So how can we adjust the brightness of our Computer Screen?
                It is all because of the magic of PWM. 

                So imagine that you are at your room's light switch, you turn the light on but its too bright, you turn off the light and well.. there is no light. 
                What if you could get it at half brightnes? with just that switch. <br />

                What PWM does is it takes the switch and turns it on and off very fast. While the switch is being turned off and on if we keep it on half the time and off half the time 
                then it is called to have 50% duty cycle. What it does is if we do that fast enough then we will not be able to see on and off of a light but we will see the light at half brightness.
                In terms of Voltage if we use PWM with 50% duty cycle with a voltage non PWM voltage of 5V then it will look like the voltage is halved.

            </div>



            

        </div>
    </div>
  )
}

export default PWM