import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Pause } from 'lucide-react';
import { ScenarioBase } from './ScenarioBase';

export function ShoulderCheckScenario() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [carLane, setCarLane] = useState<'right' | 'changing' | 'left'>('right');
  const [signalOn, setSignalOn] = useState(false);
  const [mirrorCheck, setMirrorCheck] = useState(false);
  const [shoulderCheck, setShoulderCheck] = useState(false);
  const [blindSpotCar, setBlindSpotCar] = useState(true);
  const [showBlindSpot, setShowBlindSpot] = useState(false);
  const [carX, setCarX] = useState(50);

  const steps = [
    "You want to change lanes to the left",
    "First: Check rearview mirror",
    "Then: Check left side mirror",
    "CRITICAL: Do shoulder check (Schulterblick)!",
    "There's a car in your blind spot! Wait!",
    "Car passes - now it's safe to change lanes"
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timeline = [
      // Want to change lanes
      { delay: 0, action: () => { 
        setCurrentStep(0);
        setCarLane('right');
        setBlindSpotCar(true);
      }},
      // Signal
      { delay: 1000, action: () => { setSignalOn(true); } },
      // Rearview mirror
      { delay: 1500, action: () => { 
        setCurrentStep(1);
        setMirrorCheck(true);
      }},
      { delay: 2500, action: () => { setMirrorCheck(false); } },
      // Side mirror
      { delay: 3000, action: () => { 
        setCurrentStep(2);
        setMirrorCheck(true);
      }},
      { delay: 4000, action: () => { setMirrorCheck(false); } },
      // Shoulder check
      { delay: 4500, action: () => { 
        setCurrentStep(3);
        setShoulderCheck(true);
        setShowBlindSpot(true);
      }},
      // Spot the car!
      { delay: 5500, action: () => { 
        setCurrentStep(4);
      }},
      // Wait for car to pass
      { delay: 6500, action: () => { 
        setBlindSpotCar(false);
        setShoulderCheck(false);
      }},
      { delay: 7500, action: () => { 
        setCurrentStep(5);
        setShowBlindSpot(false);
      }},
      // Safe to change
      { delay: 8500, action: () => { 
        setCarLane('changing');
        setCarX(42);
      }},
      { delay: 9000, action: () => { 
        setCarLane('left');
        setCarX(35);
        setSignalOn(false);
      }},
      { delay: 10000, action: () => { setIsPlaying(false); } },
    ];

    const timeouts = timeline.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [isPlaying]);

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCarLane('right');
    setSignalOn(false);
    setMirrorCheck(false);
    setShoulderCheck(false);
    setBlindSpotCar(true);
    setShowBlindSpot(false);
    setCarX(50);
  };

  return (
    <ScenarioBase
      title="Shoulder Check (Schulterblick)"
      germanTitle="Der Schulterblick"
      description="The shoulder check is CRITICAL in the German driving exam. Always check your blind spot before lane changes!"
      importance="critical"
      steps={steps}
      currentStep={currentStep}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background */}
        <rect x="0" y="0" width="100" height="100" fill="#1a1a2e" />
        
        {/* Road - 3 lanes */}
        <rect x="0" y="30" width="100" height="55" fill="#374151" />
        
        {/* Lane markings */}
        <line x1="0" y1="32" x2="100" y2="32" stroke="white" strokeWidth="0.5" />
        <line x1="0" y1="83" x2="100" y2="83" stroke="white" strokeWidth="0.5" />
        
        {/* Lane dividers */}
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map(x => (
          <g key={x}>
            <rect x={x} y="48" width="5" height="0.8" fill="white" />
            <rect x={x} y="65" width="5" height="0.8" fill="white" />
          </g>
        ))}
        
        {/* Lane labels */}
        <text x="5" y="42" fill="#9ca3af" fontSize="2">Fast lane</text>
        <text x="5" y="58" fill="#9ca3af" fontSize="2">Middle lane</text>
        <text x="5" y="76" fill="#9ca3af" fontSize="2">Right lane</text>
        
        {/* Blind spot visualization */}
        {showBlindSpot && (
          <g>
            {/* Blind spot area */}
            <path 
              d="M 45 65 L 25 50 L 25 75 Z" 
              fill="#ef4444" 
              opacity="0.2"
              className="animate-pulse"
            />
            <text x="30" y="63" fill="#ef4444" fontSize="2.5" fontWeight="bold" className="animate-pulse">
              BLIND SPOT
            </text>
          </g>
        )}
        
        {/* Car in blind spot */}
        {blindSpotCar && (
          <g 
            style={{ 
              transform: 'translate(32%, 50%)',
              opacity: blindSpotCar ? 1 : 0,
              transition: 'opacity 0.5s'
            }}
          >
            <rect x="-4" y="-6" width="8" height="12" rx="1" fill="#3b82f6" />
            <rect x="-2.5" y="-4" width="5" height="4" rx="0.5" fill="#1e293b" />
          </g>
        )}
        
        {/* Your car */}
        <g 
          style={{ 
            transform: `translate(${carX}%, 70%)`,
            transition: 'transform 0.5s ease-out'
          }}
        >
          {/* Car body */}
          <rect x="-4" y="-6" width="8" height="12" rx="1" fill="#ef4444" />
          {/* Windows */}
          <rect x="-2.5" y="-4" width="5" height="4" rx="0.5" fill="#1e293b" />
          
          {/* Left signal */}
          {signalOn && (
            <rect 
              x="-4.5" 
              y="4" 
              width="1" 
              height="1" 
              fill="#fbbf24"
              className="animate-pulse"
            />
          )}
          
          {/* Mirror check visualization */}
          {mirrorCheck && currentStep === 1 && (
            <g className="animate-pulse">
              <line x1="0" y1="-2" x2="0" y2="-15" stroke="#22c55e" strokeWidth="0.5" />
              <circle cx="0" cy="-17" r="2" fill="#22c55e" opacity="0.5" />
              <text x="0" y="-16" fill="white" fontSize="2" textAnchor="middle">👀</text>
              <text x="6" y="-15" fill="#22c55e" fontSize="2">Rearview</text>
            </g>
          )}
          
          {/* Side mirror check */}
          {mirrorCheck && currentStep === 2 && (
            <g className="animate-pulse">
              <line x1="-3" y1="0" x2="-10" y2="-5" stroke="#22c55e" strokeWidth="0.5" />
              <circle cx="-12" cy="-6" r="2" fill="#22c55e" opacity="0.5" />
              <text x="-12" y="-5" fill="white" fontSize="2" textAnchor="middle">👀</text>
              <text x="-18" y="-3" fill="#22c55e" fontSize="2">Side mirror</text>
            </g>
          )}
          
          {/* Shoulder check */}
          {shoulderCheck && (
            <g className="animate-pulse">
              <line x1="-3" y1="2" x2="-15" y2="0" stroke="#fbbf24" strokeWidth="0.8" />
              <circle cx="-18" cy="-1" r="3" fill="#fbbf24" opacity="0.5" />
              <text x="-18" y="0" fill="#1f2937" fontSize="3" textAnchor="middle">👀</text>
              <text x="-18" y="-6" fill="#fbbf24" fontSize="2.5" fontWeight="bold">SCHULTERBLICK!</text>
            </g>
          )}
        </g>
        
        {/* Warning when car spotted */}
        {currentStep === 4 && (
          <g className="animate-pulse">
            <rect x="55" y="10" width="40" height="18" rx="2" fill="#ef4444" />
            <text x="75" y="18" fill="white" fontSize="3" textAnchor="middle" fontWeight="bold">⚠️ CAR SPOTTED!</text>
            <text x="75" y="24" fill="white" fontSize="2" textAnchor="middle">Wait before changing</text>
          </g>
        )}
        
        {/* Safe to proceed */}
        {currentStep === 5 && (
          <g>
            <rect x="55" y="10" width="40" height="15" rx="2" fill="#22c55e" />
            <text x="75" y="18" fill="white" fontSize="3" textAnchor="middle" fontWeight="bold">✓ SAFE NOW!</text>
            <text x="75" y="23" fill="white" fontSize="2" textAnchor="middle">Change lanes</text>
          </g>
        )}
        
        {/* Step indicator */}
        <g transform="translate(5, 5)">
          <rect x="0" y="0" width="40" height="20" rx="2" fill="#1f2937" opacity="0.9" />
          <text x="20" y="7" fill="#fbbf24" fontSize="2.5" textAnchor="middle" fontWeight="bold">Lane Change Steps:</text>
          <text x="20" y="11" fill={currentStep >= 1 ? "#22c55e" : "#9ca3af"} fontSize="2" textAnchor="middle">
            {currentStep >= 1 ? "✓" : "○"} 1. Signal
          </text>
          <text x="20" y="14" fill={currentStep >= 2 ? "#22c55e" : "#9ca3af"} fontSize="2" textAnchor="middle">
            {currentStep >= 2 ? "✓" : "○"} 2. Mirrors
          </text>
          <text x="20" y="17" fill={currentStep >= 3 ? "#22c55e" : "#9ca3af"} fontSize="2" textAnchor="middle">
            {currentStep >= 3 ? "✓" : "○"} 3. Schulterblick!
          </text>
        </g>
        
        {/* Exam tip */}
        <g transform="translate(55, 75)">
          <rect x="0" y="0" width="42" height="15" rx="1" fill="#fbbf24" opacity="0.9" />
          <text x="21" y="5" fill="#1f2937" fontSize="2" textAnchor="middle" fontWeight="bold">💡 EXAM TIP:</text>
          <text x="21" y="9" fill="#1f2937" fontSize="1.8" textAnchor="middle">Missing shoulder check =</text>
          <text x="21" y="12" fill="#1f2937" fontSize="1.8" textAnchor="middle">INSTANT FAIL!</text>
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

