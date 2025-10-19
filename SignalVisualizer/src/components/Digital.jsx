import React, { useState, useEffect } from 'react';
import '../styles/Digital.css'



const Digital = () => {
    const [signal, setSignal] = useState([]);
    const [isActive, setIsActive] = useState(false);

    const getSignal = (len) => {
        return Array.from({len}, () => Math.round(Math.random()));
    }



    const startSignal = () => {
        setIsActive(true);
    };


    const stopSignal = () => {
        setIsActive(false);
    };


    const clearSignal = () => {
        setSignal([]);
    };



    useEffect(() => {
        let timer;
  
        if (isActive) {
            timer = setInterval(() => {
                setSignal(prev => {
                    const newBit = Math.random() > 0.5 ? 1 : 0;
                    const updated = [...prev, newBit];
                    return updated.slice(-20);
                });
            }, 500);
    }



  return () => {
    if (timer) {
      clearInterval(timer);
    }
  };
}, [isActive]);


    const makeSignalPath = () => {
        if (signal.length === 0) {         // No Signal Data Case
            return '';
        }
        
        let path = `M 0 ${signal[0] === 1 ? 30 : 70}`;  // Starting Point

        signal.forEach((bit,index) => {    //looping through bits
            
            const x = index *40 +20;
            const y = bit===1? 30:70;
            
            path = path + `L ${x} ${y}`;

            if (index < signal.length - 1 && signal[index + 1] !== bit) {   // if current and next bits are not the same 
                const nextX = ((index + 1) * 40) + 20;
                const nextY = signal[index + 1] === 1 ? 30 : 70;
                path += ` L ${nextX} ${y} L ${nextX} ${nextY}`;
            }

        });
        
        return path;
    };



  return (
    <div>
        <div className="digital">
            <div className="header">
                <h2>Digital Signal Visualizer!</h2>
                <p>Visualize the digital signals that are running your device that you are using right now.</p>
            </div>


        <div className="controls">
            <button onClick={startSignal}>
                Start
            </button>

            <button onClick={stopSignal}>
                Stop
            </button>

            <button onClick={clearSignal}>
                Clear
            </button>


        </div>


        
        <div className="graph">
            <svg width="800" height="200" viewBox="0 0 800 100" className="signal-svg">   // middle line
            <line x1="0" y1="50" x2="800" y2="50" stroke="#e0e0e0" strokeWidth="1" />

            <line x1="0" y1="30" x2="800" y2="30" stroke="#4CAF50" strokeWidth="1" strokeDasharray="5,5" />
            <text x="10" y="25" fontSize="12">High (1)</text>   // high line
            
            <line x1="0" y1="70" x2="800" y2="70" stroke="#F44336" strokeWidth="1" strokeDasharray="5,5" />
            <text x="10" y="75"  fontSize="12">Low (0)</text>  // low line

                                <path 
                        d={makeSignalPath()} 
                        stroke="#2196F3" 
                        strokeWidth="3" 
                        fill="none"
                    />
                    
                    {signal.map((bit, index) => {      // graph making
                        const x = (index * 40) + 20;
                        const y = bit === 1 ? 30 : 70;
                        return (
                            <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="4"
                                fill="#2196F3"
                            />
                        );
                    })}


            </svg>
        </div>

    </div>
    </div>
  )
}

export default Digital