import React, { useState } from 'react'
import '../styles/PWM.css'

const PWM = () => {
    const [dutyCycle, setDutyCycle] = useState(50);

    const createPWMPath = (cycle) => {
        let path = 'M 0 100';
        const onTime = (cycle / 100) * 100;
        const offTime = 100 - onTime;
        
        for (let i = 0; i < 8; i++) {
            const startX = i * 100;
            const endX = startX + onTime;
            path += ` L ${startX} 100 L ${startX} 0 L ${endX} 0 L ${endX} 100`;
        }
        path += ' L 800 100';
        return path;
    };

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
 
                <div className="graph-50">
                    <svg width="800" height="200" viewBox="0 0 800 100" className="signal-svg">
                        <line x1="0" y1="50" x2="800" y2="50" stroke="#e0e0e0" strokeWidth="1" />
                        <line x1="0" y1="0" x2="800" y2="0" stroke="#4CAF50" strokeWidth="1" strokeDasharray="5,5" />
                        <text x="0" y="15" fontSize="12">High (1)</text>
                        <line x1="0" y1="100" x2="800" y2="100" stroke="#F44336" strokeWidth="1" strokeDasharray="5,5" />
                        <text x="0" y="95" fontSize="12">Low (0)</text>
                        <path 
                            d={createPWMPath(50)} 
                            stroke="#2196F3" 
                            strokeWidth="3" 
                            fill="none"
                        />
                    </svg>
                    <p>This is a graph showing a PWM signal with 50% duty cycle. We can see that half of the time the signal is 1 and the other half the signal is 0. <br />If the frequency of the signal is fast enough for human eye to not notice the on/off (13 to 70 ms) then a bulb is seen as half brightness</p>
                </div>

                <div className="custom-pwm">
                    <h3>Test out how the signal changes based on the duty cycle!</h3>
                    <div className="slider-container">
                        <label>Duty Cycle: {dutyCycle}%</label>
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={dutyCycle}
                            onChange={(e) => setDutyCycle(parseInt(e.target.value))}
                            className="duty-slider"
                        />
                    </div>
                    <svg width="800" height="200" viewBox="0 0 800 100" className="signal-svg">
                        <line x1="0" y1="50" x2="800" y2="50" stroke="#e0e0e0" strokeWidth="1" />
                        <line x1="0" y1="0" x2="800" y2="0" stroke="#4CAF50" strokeWidth="1" strokeDasharray="5,5" />
                        <text x="0" y="15" fontSize="12">High (1)</text>
                        <line x1="0" y1="100" x2="800" y2="100" stroke="#F44336" strokeWidth="1" strokeDasharray="5,5" />
                        <text x="0" y="95" fontSize="12">Low (0)</text>
                        <path 
                            d={createPWMPath(dutyCycle)} 
                            stroke="#2196F3" 
                            strokeWidth="3" 
                            fill="none"
                        />
                    </svg>
                    <div className="pwm-info">
                        <p>Duty Cycle: {dutyCycle}%</p>
                        <p>On Time: {dutyCycle}% of period</p>
                        <p>Off Time: {100 - dutyCycle}% of period</p>
                        <p>Average Voltage: {(5 * dutyCycle / 100).toFixed(2)}V (assuming 5V system)</p>
                    </div>
                </div>


                

            </div>
        </div>
    )
}

export default PWM