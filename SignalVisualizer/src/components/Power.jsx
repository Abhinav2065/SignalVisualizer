import React, { useState, useEffect } from 'react'
import '../styles/Power.css'

const Power = () => {
    const [acWave, setAcWave] = useState([])
    const [dcWave, setDcWave] = useState([])
    const [phase, setPhase] = useState(0)

    useEffect(() => {
        const generateACWave = () => {
            const wave = []
            for (let i = 0; i < 100; i++) {
                const x = (i / 100) * 400
                const y = 50 + 40 * Math.sin(2 * Math.PI * (i / 100) * 2 + phase)
                wave.push({ x, y })
            }
            return wave
        }

        setAcWave(generateACWave())
    }, [phase])


    useEffect(() => {
        const generateDCWave = () => {
            const wave = []
            for (let i = 0; i < 100; i++) {
                const x = (i / 100) * 400
                const y = 50 + 40 * Math.sin(2 * Math.PI * (i / 100) * 2 + phase)
                wave.push({ x, y })
            }
            return wave
        }
        setDcWave(generateDCWave())
    }, [phase])

    useEffect(() => {
        const interval = setInterval(() => {
            setPhase(prev => prev + 0.1)
        }, 100)
        return () => clearInterval(interval)
    }, [])

    const createACPath = () => {
        if (acWave.length === 0) return ''
        let path = `M ${acWave[0].x} ${acWave[0].y}`
        acWave.forEach((point, index) => {
            if (index > 0) path += ` L ${point.x} ${point.y}`
        })
        return path
    }


    const createDCPath = () => {
        if (dcWave.length === 0 ) {
            return ''
        }

        let path = `M ${dcWave[0].x} ${dcWave[0].y/2}`
        dcWave.forEach((point, index) => {
            if (index > 0) path += ` L ${point.x} ${point.y/2}`
        })
        return path
    }

    return (
        <div>
            <div className="power">
                <div className="header">
                    <h2>Understand How Power Distribution Works In An Electric Circuit.</h2>
                </div>

                <div className="content">
                    <p>Power signals carry electrical energy from generation sources to our homes and devices.
                    Different types of power signals are used for various applications.</p>
                </div>

                <div className="types">
                    <div className="type-card">
                        <h4>AC (Alternating Current)</h4>
                        <p>Alternating Current is the current that changes its direction periodically. It is what comes to your home!</p>
                    </div>

                    <div className="type-card">
                        <h4>DC (Direct Current)</h4>
                        <p>Direct Current is the current that flows in one direction. It is what runs your electric devices.</p>
                    </div>
                </div>

                <div className="ac">
                    <h3>Here is an example of AC Signal.</h3>
                    <p>In this graph you can see that from the amplitude that it is changing directions periodically.</p>

                    <svg width="800" height="200" viewBox="0 0 400 100" className="ac-svg">
                        <line x1="0" y1="50" x2="400" y2="50" stroke="#e0e0e0" strokeWidth="1" />
                        <line x1="0" y1="10" x2="400" y2="10" stroke="#4CAF50" strokeWidth="1" strokeDasharray="5,5" />
                        <line x1="0" y1="90" x2="400" y2="90" stroke="#4CAF50" strokeWidth="1" strokeDasharray="5,5" />
                        <text x="10" y="15" fontSize="12">+230V</text>
                        <text x="10" y="95" fontSize="12">-230V</text>
                        <text x="350" y="95" fontSize="12">Time →</text>
                        <path 
                            d={createACPath()} 
                            stroke="#2196F3" 
                            strokeWidth="3" 
                            fill="none"
                        />
                    </svg>
                </div>


                <div className="dc">
                    <h3>This is an example of DC Signal.</h3>
                    <p>In this graph you can see the DC signal flowing in a direction.</p>

                    <svg width="800" height="200" viewBox="0 0 400 100" className="ac-svg">
                        <line x1="0" y1="50" x2="400" y2="50" stroke="#e0e0e0" strokeWidth="1" />
                        <line x1="0" y1="10" x2="400" y2="10" stroke="#4CAF50" strokeWidth="1" strokeDasharray="5,5" />
                        <line x1="0" y1="90" x2="400" y2="90" stroke="#4CAF50" strokeWidth="1" strokeDasharray="5,5" />
                        <text x="10" y="15" fontSize="12">+230V</text>
                        <text x="10" y="95" fontSize="12">-230V</text>
                        <text x="350" y="95" fontSize="12">Time →</text>
                        <path 
                            d={createDCPath()} 
                            stroke="#2196F3" 
                            strokeWidth="3" 
                            fill="none"
                        />
                    </svg>
                    

                </div>


                
            </div>
        </div>
    )
}

export default Power