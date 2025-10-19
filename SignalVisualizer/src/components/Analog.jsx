import React, { useState , useEffect} from 'react'
import '../styles/Analog.css'




const Analog = () => {

    const [sinWave, setSinWave] = useState([]);
    const [isSinActive, setIsSinActive] = useState(true);
    const [frequency, setFrequency] = useState(1); // Hz
    const [amplitude, setAmplitude] = useState(50); // pixels
    const [phase, setPhase] = useState(0); // radians

    const [radio, setRadio] = useState(false);

    const radio1StreamUrl = "https://stream.live.vc.bbcmedia.co.uk/bbc_radio_one";




    const getSinWave = (points = 100) => {
        const newWave = [];
        for (let i = 0; i < points; i++) {
            const x = (i / points) * 400; 
            const y = 100 + amplitude * Math.sin(2 * Math.PI * frequency * (i / points) + phase);
            newWave.push({ x, y });
        }
        return newWave;
    };

    const startSinSignal = () => {
        setIsSinActive(true);
    };


    const stopSinSignal = () => {
        setIsSinActive(false);
    };


    const clearSinSignal = () => {
        setSinWave([]);
    };

    useEffect(() => {
        setSinWave(getSinWave());
    }, []);

    useEffect(() => {
        setSinWave(getSinWave());
    }, [frequency, amplitude, phase]);




    useEffect(() => {
        let animationFrame;
        
        if (isSinActive) {
            const animate = () => {
                setPhase(prev => prev + 0.05);
                animationFrame = requestAnimationFrame(animate);
            };
            animationFrame = requestAnimationFrame(animate);
        }

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isSinActive]);

    const createSinPath = () => {
        if (sinWave.length === 0) return '';
        
        let path = `M ${sinWave[0].x} ${sinWave[0].y}`;
        sinWave.forEach((point, index) => {
            if (index > 0) {
                path += ` L ${point.x} ${point.y}`;
            }
        });
        return path;
    };





  return (
    <div>
        <div className="analog">
            <h2>Analog Signal Visualizer!</h2>

            <p>Analog signals are continuous, time-varying waveforms that can take on an infinite number of values within a given range, representing information like sound waves or voltage.</p>

            <p className='end'>Analog Signals are used in Audio, Video, ECG, EEG, Radio, etc.</p>


            <div className="sin-wave">
                <h3>Here is an example of a Analog Signal</h3>
                <p>This is a sin wave!</p>
                <p>It is a type of Analog Wave.</p>

                <div className="sin-controls">
                    <button onClick={startSinSignal}>Start</button>
                    <button onClick={stopSinSignal}>Stop</button>
                    <button onClick={clearSinSignal}>Clear</button>

                        <div className="control-group">
                            <label>
                                Frequency: {frequency} Hz
                                <input 
                                    type="range" 
                                    min="0.1" 
                                    max="5" 
                                    step="0.1"
                                    value={frequency}
                                    onChange={(e) => setFrequency(parseFloat(e.target.value))}
                                />
                            </label>
                        </div>

                        <div className="control-group">
                            <label>
                                Amplitude: {amplitude} px
                                <input 
                                    type="range" 
                                    min="10" 
                                    max="80" 
                                    step="5"
                                    value={amplitude}
                                    onChange={(e) => setAmplitude(parseInt(e.target.value))}
                                />
                            </label>
                        </div>
                        <div className="wave-visualization">
                        <svg width="1200" height="600" viewBox="0 0 400 200" className="wave-svg">
                            <line x1="0" y1="100" x2="400" y2="100" stroke="#e0e0e0" strokeWidth="1" />
                            <line x1="0" y1="50" x2="400" y2="50" stroke="#4CAF50" strokeWidth="1" strokeDasharray="5,5" />
                            <line x1="0" y1="150" x2="400" y2="150" stroke="#4CAF50" strokeWidth="1" strokeDasharray="5,5" />
                        
                            <text x="10" y="45" fill="#4CAF50" fontSize="12">+Amplitude</text>
                            <text x="10" y="165" fill="#4CAF50" fontSize="12">-Amplitude</text>
                            <text x="350" y="190" fill="#666" fontSize="12">Time →</text>
                            
                            <path 
                                d={createSinPath()} 
                                stroke="#2196F3" 
                                strokeWidth="3" 
                                fill="none"
                            />
                            
                            {/* Data points */}
                            {sinWave.map((point, index) => (
                                <circle
                                    key={index}
                                    cx={point.x}
                                    cy={point.y}
                                    r="2"
                                    fill="#2196F3"
                                    opacity="0.6"
                                />
                            ))}
                        </svg>
                    </div>

                    <div className="wave-info">
                        <div className="info-card">
                            <h4>Sine Wave Properties</h4>
                            <p><strong>Formula:</strong> y = A·sin(2πft + φ)</p>
                            <p><strong>Amplitude (A):</strong> {amplitude} px</p>
                            <p><strong>Frequency (f):</strong> {frequency} Hz</p>
                            <p><strong>Phase (φ):</strong> {phase.toFixed(2)} rad</p>
                        </div>
                    </div>
                </div>


            </div>

            <div className="fm">
                <h3>FM Signals are a type of Analog Signal.</h3>
                <p>You may have heard about FM from FM radio. One of the most popular FM Station is BBC Radio 1.</p>

                <audio src={radio1StreamUrl}>BBC Radio 1</audio>

                <div className="fm-controls">
                    <button>Play Radio</button>
                    <button>Stop Radio</button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Analog