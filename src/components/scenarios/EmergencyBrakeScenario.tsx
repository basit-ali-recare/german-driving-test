import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Pause } from 'lucide-react';
import { ScenarioBase } from './ScenarioBase';

export function EmergencyBrakeScenario() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [carPosition, setCarPosition] = useState(85);
  const [speed, setSpeed] = useState(50);
  const [pedestrianX, setPedestrianX] = useState(55);
  const [showDanger, setShowDanger] = useState(false);
  const [braking, setBraking] = useState(false);
  const [absActive, setAbsActive] = useState(false);
  const [stopped, setStopped] = useState(false);

  const steps = [
    "Driving at normal speed on city street",
    "Pedestrian suddenly steps onto road!",
    "EMERGENCY BRAKE - Press brake pedal hard and fast",
    "Keep steering wheel straight - ABS prevents lock-up",
    "Vehicle stops safely - check surroundings"
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timeline = [
      // Normal driving
      { delay: 0, action: () => { 
        setCurrentStep(0); 
        setCarPosition(85);
        setSpeed(50);
      }},
      { delay: 400, action: () => { setCarPosition(75); } },
      { delay: 800, action: () => { setCarPosition(65); } },
      { delay: 1200, action: () => { setCarPosition(55); } },
      // Pedestrian appears!
      { delay: 1600, action: () => { 
        setCurrentStep(1);
        setPedestrianX(45);
        setShowDanger(true);
      }},
      // Emergency brake
      { delay: 2000, action: () => { 
        setCurrentStep(2);
        setBraking(true);
        setAbsActive(true);
        setSpeed(40);
        setCarPosition(50);
      }},
      { delay: 2300, action: () => { setSpeed(30); setCarPosition(47); } },
      { delay: 2600, action: () => { 
        setCurrentStep(3);
        setSpeed(20); 
        setCarPosition(44);
      }},
      { delay: 2900, action: () => { setSpeed(10); setCarPosition(42); } },
      // Stopped
      { delay: 3200, action: () => { 
        setCurrentStep(4);
        setSpeed(0); 
        setCarPosition(40);
        setStopped(true);
        setAbsActive(false);
        setShowDanger(false);
      }},
      // Pedestrian crosses safely
      { delay: 4000, action: () => { setPedestrianX(35); } },
      { delay: 4500, action: () => { setPedestrianX(25); } },
      { delay: 5000, action: () => { setPedestrianX(15); setBraking(false); } },
      { delay: 6000, action: () => { setIsPlaying(false); } },
    ];

    const timeouts = timeline.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [isPlaying]);

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCarPosition(85);
    setSpeed(50);
    setPedestrianX(55);
    setShowDanger(false);
    setBraking(false);
    setAbsActive(false);
    setStopped(false);
  };

  return (
    <ScenarioBase
      title="Emergency Braking"
      germanTitle="Gefahrbremsung"
      description="In the exam, the examiner may suddenly say 'Gefahrbremsung!' - brake hard and fast, keep steering straight!"
      importance="critical"
      steps={steps}
      currentStep={currentStep}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Sky */}
        <defs>
          <linearGradient id="emergencySky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100" height="55" fill="url(#emergencySky)" />
        
        {/* Buildings in background */}
        <rect x="5" y="30" width="10" height="25" fill="#1f2937" />
        <rect x="17" y="35" width="8" height="20" fill="#1f2937" />
        <rect x="80" y="32" width="12" height="23" fill="#1f2937" />
        
        {/* Windows */}
        {[0,1,2,3].map(i => (
          <rect key={i} x="7" y={32 + i * 5} width="2" height="2" fill="#fbbf24" opacity="0.5" />
        ))}
        
        {/* Ground/Road */}
        <rect x="0" y="55" width="100" height="45" fill="#374151" />
        
        {/* Sidewalk */}
        <rect x="0" y="55" width="100" height="8" fill="#6b7280" />
        <rect x="0" y="90" width="100" height="10" fill="#6b7280" />
        
        {/* Road markings */}
        {[0, 15, 30, 45, 60, 75, 90].map(x => (
          <rect key={x} x={x} y="74" width="8" height="1" fill="#fbbf24" />
        ))}
        
        {/* Pedestrian */}
        <g 
          style={{ 
            transform: `translateX(${pedestrianX}%)`,
            transition: 'transform 0.5s ease-out'
          }}
        >
          {/* Body */}
          <rect x="-1.5" y="58" width="3" height="8" fill="#3b82f6" />
          {/* Head */}
          <circle cx="0" cy="56" r="2" fill="#fcd34d" />
          {/* Legs */}
          <rect x="-1.5" y="66" width="1" height="4" fill="#1e3a5f" />
          <rect x="0.5" y="66" width="1" height="4" fill="#1e3a5f" />
          {/* Walking indicator */}
          <text x="0" y="53" fill="#fbbf24" fontSize="3" textAnchor="middle">🚶</text>
        </g>
        
        {/* Car */}
        <g 
          style={{ 
            transform: `translateX(${carPosition}%)`,
            transition: braking ? 'transform 0.3s ease-out' : 'transform 0.4s linear'
          }}
        >
          {/* Car body */}
          <rect x="-8" y="65" width="12" height="20" rx="2" fill="#ef4444" />
          {/* Windows */}
          <rect x="-6" y="67" width="8" height="5" rx="1" fill="#1e293b" />
          {/* Headlights */}
          <rect x="-7" y="64" width="2" height="1.5" rx="0.5" fill="#fef3c7" />
          <rect x="1" y="64" width="2" height="1.5" rx="0.5" fill="#fef3c7" />
          {/* Brake lights */}
          <rect 
            x="-7" 
            y="83" 
            width="2" 
            height="1.5" 
            rx="0.5" 
            fill={braking ? "#ef4444" : "#7f1d1d"}
            className={braking ? "animate-pulse" : ""}
          />
          <rect 
            x="1" 
            y="83" 
            width="2" 
            height="1.5" 
            rx="0.5" 
            fill={braking ? "#ef4444" : "#7f1d1d"}
            className={braking ? "animate-pulse" : ""}
          />
          
          {/* Brake dust/smoke effect when braking */}
          {braking && (
            <g opacity="0.5">
              <circle cx="3" cy="88" r="2" fill="#9ca3af" className="animate-ping" />
              <circle cx="-3" cy="88" r="2" fill="#9ca3af" className="animate-ping" style={{ animationDelay: '0.1s' }} />
            </g>
          )}
        </g>
        
        {/* DANGER warning */}
        {showDanger && (
          <g className="animate-pulse">
            <rect x="30" y="10" width="40" height="20" rx="3" fill="#ef4444" />
            <text x="50" y="20" fill="white" fontSize="4" textAnchor="middle" fontWeight="bold">⚠️ DANGER!</text>
            <text x="50" y="26" fill="white" fontSize="2.5" textAnchor="middle">BRAKE NOW!</text>
          </g>
        )}
        
        {/* Speed indicator */}
        <g transform="translate(5, 5)">
          <rect x="0" y="0" width="18" height="14" rx="2" fill="#1f2937" stroke={braking ? "#ef4444" : "#374151"} strokeWidth="0.5" />
          <text x="9" y="8" fill={speed === 0 ? "#22c55e" : "white"} fontSize="5" textAnchor="middle" fontWeight="bold">
            {speed}
          </text>
          <text x="9" y="12" fill="#9ca3af" fontSize="2" textAnchor="middle">km/h</text>
        </g>
        
        {/* ABS indicator */}
        {absActive && (
          <g transform="translate(75, 5)" className="animate-pulse">
            <rect x="0" y="0" width="20" height="10" rx="2" fill="#fbbf24" />
            <text x="10" y="7" fill="#1f2937" fontSize="3" textAnchor="middle" fontWeight="bold">ABS</text>
          </g>
        )}
        
        {/* Success indicator */}
        {stopped && speed === 0 && (
          <g>
            <rect x="35" y="35" width="30" height="15" rx="2" fill="#22c55e" opacity="0.9" />
            <text x="50" y="43" fill="white" fontSize="3" textAnchor="middle" fontWeight="bold">✓ STOPPED</text>
            <text x="50" y="48" fill="white" fontSize="2" textAnchor="middle">Safe distance</text>
          </g>
        )}
        
        {/* Distance marker */}
        <line x1="38" y1="85" x2="38" y2="88" stroke="#fbbf24" strokeWidth="0.5" />
        <text x="38" y="92" fill="#fbbf24" fontSize="2" textAnchor="middle">Safe stop</text>
        
        {/* Instruction box */}
        <g transform="translate(70, 35)">
          <rect x="0" y="0" width="28" height="18" rx="2" fill="#1f2937" opacity="0.9" />
          <text x="14" y="6" fill="#9ca3af" fontSize="2" textAnchor="middle">Remember:</text>
          <text x="14" y="10" fill="white" fontSize="1.8" textAnchor="middle">• Brake HARD & FAST</text>
          <text x="14" y="13" fill="white" fontSize="1.8" textAnchor="middle">• Keep wheel STRAIGHT</text>
          <text x="14" y="16" fill="white" fontSize="1.8" textAnchor="middle">• ABS prevents lock-up</text>
        </g>
      </svg>
      
      {/* Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
        <Button
          size="sm"
          onClick={() => setIsPlaying(!isPlaying)}
          className="gap-2"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={reset}
          className="gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </ScenarioBase>
  );
}

