import React, { useState, useEffect, useRef } from 'react'
import '../styles/Analog.css'

const Analog = () => {
    const [sinWave, setSinWave] = useState([]);
    const [isSinActive, setIsSinActive] = useState(false);
    const [frequency, setFrequency] = useState(1);
    const [amplitude, setAmplitude] = useState(50);
    const [phase, setPhase] = useState(0);

    const [isRadioActive, setIsRadioActive] = useState(false);
    const [audioData, setAudioData] = useState(new Uint8Array(128));
    const animationRef = useRef(null);

    const getSinWave = (points = 100) => {
        const newWave = [];
        for (let i = 0; i < points; i++) {
            const x = (i / points) * 400; 
            const y = 100 + amplitude * Math.sin(2 * Math.PI * frequency * (i / points) + phase);
            newWave.push({ x, y });
        }
        return newWave;
    };

    const generateFMSignal = () => {
        const bufferLength = 128;
        const simulatedData = new Uint8Array(bufferLength);
        const time = Date.now() * 0.001;
        
        for (let i = 0; i < bufferLength; i++) {
            const base = 80 + Math.sin(time * 0.5) * 20;
            const low = Math.sin(i * 0.1 + time * 2) * 30;
            const mid = Math.sin(i * 0.3 + time * 3) * 40;
            const high = Math.sin(i * 0.7 + time * 5) * 25;
            const noise = (Math.random() - 0.5) * 20;
            const peak1 = i > 20 && i < 30 ? Math.sin(time * 8) * 50 + 50 : 0;
            const peak2 = i > 60 && i < 70 ? Math.sin(time * 6) * 40 + 40 : 0;
            
            let value = base + low + mid + high + noise + peak1 + peak2;
            value = Math.max(0, Math.min(255, value));
            simulatedData[i] = value;
        }
        
        return simulatedData;
    };

    const startFMSignal = () => {
        setIsRadioActive(true);
        
        const updateSignal = () => {
            if (!isRadioActive) return;
            const newData = generateFMSignal();
            setAudioData(newData);
            animationRef.current = requestAnimationFrame(updateSignal);
        };
        
        updateSignal();
    };

    const stopFMSignal = () => {
        setIsRadioActive(false);
        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }
    };

    const createFMSignalPath = () => {
        if (audioData.length === 0) return '';
        
        let path = `M 0 100`;
        for (let i = 0; i < audioData.length; i += 2) {
            const x = (i / audioData.length) * 400;
            const y = 100 - (audioData[i] / 255) * 80;
            path += ` L ${x} ${y}`;
        }
        return path;
    };

    const createFrequencyBars = () => {
        if (audioData.length === 0) return null;
        
        return audioData.slice(0, 64).map((value, index) => {
            const barHeight = (value / 255) * 100;
            const barWidth = 400 / 64;
            const x = index * barWidth;
            const hue = (index / 64) * 360;
            
            return (
                <rect
                    key={index}
                    x={x}
                    y={200 - barHeight}
                    width={barWidth - 0.5}
                    height={barHeight}
                    fill={`hsl(${hue}, 70%, 50%)`}
                    opacity="0.8"
                />
            );
        });
    };

    const startSinSignal = () => {
        setIsSinActive(true);
    };

    const stopSinSignal = () => {
        setIsSinActive(false);
    };

    const clearSinSignal = () => {
        setSinWave([]);
        setPhase(0);
    };

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

    useEffect(() => {
        setSinWave(getSinWave());
        setAudioData(generateFMSignal());
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

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <div>
            <div className="analog">
                <h2>Analog Signal Visualizer!</h2>

                <p>Analog signals are continuous, time-varying waveforms that can take on an infinite number of values within a given range, representing information like sound waves or voltage.</p>

                <p className='end'>Analog Signals are used in Audio, Video, ECG, EEG, Radio, etc.</p>

                <div className="sin-wave">
                    <h3>Sine Wave - Basic Analog Signal</h3>
                    <p>This is a synthetic sine wave that demonstrates fundamental analog signal properties.</p>

                    <div className="sin-controls">
                        <button onClick={startSinSignal} disabled={isSinActive}>Start</button>
                        <button onClick={stopSinSignal} disabled={!isSinActive}>Stop</button>
                        <button onClick={clearSinSignal}>Clear</button>

                        <div className="control-group">
                            <label>Frequency: {frequency} Hz
                                <input 
                                    type="range" 
                                    min="0.1" max="5" step="0.1"
                                    value={frequency}
                                    onChange={(e) => setFrequency(parseFloat(e.target.value))}
                                />
                            </label>
                        </div>

                        <div className="control-group">
                            <label>Amplitude: {amplitude} px
                                <input 
                                    type="range" 
                                    min="10" max="80" step="5"
                                    value={amplitude}
                                    onChange={(e) => setAmplitude(parseInt(e.target.value))}
                                />
                            </label>
                        </div>
                        
                        <div className="wave-visualization">
                            <svg width="800" height="300" viewBox="0 0 400 200" className="wave-svg">
                                <line x1="0" y1="100" x2="400" y2="100" stroke="#e0e0e0" strokeWidth="1" />
                                <line x1="0" y1="50" x2="400" y2="50" stroke="#4CAF50" strokeWidth="1" strokeDasharray="5,5" />
                                <line x1="0" y1="150" x2="400" y2="150" stroke="#4CAF50" strokeWidth="1" strokeDasharray="5,5" />
                            
                                <text x="10" y="45" fill="#4CAF50" fontSize="12">+Amplitude</text>
                                <text x="10" y="165" fill="#4CAF50" fontSize="12">-Amplitude</text>
                                <text x="350" y="190" fill="#666" fontSize="12">Time →</text>
                                
                                <path d={createSinPath()} stroke="#2196F3" strokeWidth="3" fill="none"/>
                                
                                {sinWave.map((point, index) => (
                                    <circle key={index} cx={point.x} cy={point.y} r="2" fill="#2196F3" opacity="0.6"/>
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
                    <h3>FM Signal Simulation</h3>
                    <p>This shows a simulated FM radio signal waveform.</p>

                    <div className="fm-controls">
                        <button onClick={startFMSignal} disabled={isRadioActive}>
                            {isRadioActive ? ' Analyzing...' : ' Start FM Analysis'}
                        </button>
                        <button onClick={stopFMSignal} disabled={!isRadioActive}>
                             Stop Analysis
                        </button>
                    </div>

                    <div className="fm-visualization">
                        <h4>FM Signal Waveform</h4>
                        <svg width="800" height="300" viewBox="0 0 400 200" className="fm-wave-svg">
                            <line x1="0" y1="100" x2="400" y2="100" stroke="#e0e0e0" strokeWidth="1" />
                            <line x1="0" y1="50" x2="400" y2="50" stroke="#FF6B6B" strokeWidth="1" strokeDasharray="5,5" />
                            <line x1="0" y1="150" x2="400" y2="150" stroke="#FF6B6B" strokeWidth="1" strokeDasharray="5,5" />
                            
                            <text x="10" y="45" fill="#FF6B6B" fontSize="10">Signal Strength</text>
                            <text x="350" y="190" fill="#666" fontSize="10">Frequency Spectrum →</text>
                            
                            <path 
                                d={createFMSignalPath()} 
                                stroke="#9C27B0" 
                                strokeWidth="2" 
                                fill="none"
                            />
                            
                            {createFrequencyBars()}
                        </svg>

                        <div className="signal-info">
                            <div className="info-card">
                                <h4>FM Signal Properties</h4>
                                <p><strong>Status:</strong> 
                                    <span style={{color: isRadioActive ? '#4CAF50' : '#f44336', marginLeft: '10px'}}>
                                        {isRadioActive ? '📡 Signal Analysis' : '⏸️ Analysis Stopped'}
                                    </span>
                                </p>
                                <p><strong>Data Points:</strong> {audioData.length} samples</p>
                                <p><strong>Signal Type:</strong> Simulated FM Broadcast</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Analog