import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Pause } from 'lucide-react';
import { ScenarioBase } from './ScenarioBase';

export function CyclistScenario() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [carPosition, setCarPosition] = useState({ x: 50, y: 70 });
  const [cyclistPosition, setCyclistPosition] = useState({ x: 75, y: 95 });
  const [showWarning, setShowWarning] = useState(false);
  const [carRotation, setCarRotation] = useState(0);
  const [signalOn, setSignalOn] = useState(false);
  const [shoulderCheck, setShoulderCheck] = useState(false);

  const steps = [
    "Approach the intersection, signal right early",
    "Check rearview mirror for traffic behind",
    "Check right side mirror for cyclists",
    "Do shoulder check (Schulterblick) - CRITICAL!",
    "Wait for cyclist to pass if present",
    "Complete the turn safely"
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timeline = [
      // Step 0: Approach and signal
      { delay: 0, action: () => { setCurrentStep(0); setSignalOn(true); } },
      // Step 1: Check rearview
      { delay: 1500, action: () => { setCurrentStep(1); } },
      // Step 2: Check side mirror
      { delay: 3000, action: () => { setCurrentStep(2); } },
      // Step 3: Shoulder check
      { delay: 4500, action: () => { setCurrentStep(3); setShoulderCheck(true); } },
      { delay: 5500, action: () => { setShoulderCheck(false); setShowWarning(true); } },
      // Step 4: Wait for cyclist
      { delay: 6000, action: () => { setCurrentStep(4); } },
      // Cyclist passes
      { delay: 6500, action: () => { setCyclistPosition({ x: 75, y: 50 }); } },
      { delay: 7500, action: () => { setCyclistPosition({ x: 75, y: 20 }); setShowWarning(false); } },
      { delay: 8500, action: () => { setCyclistPosition({ x: 75, y: -10 }); } },
      // Step 5: Complete turn
      { delay: 9000, action: () => { setCurrentStep(5); } },
      { delay: 9500, action: () => { setCarRotation(45); setCarPosition({ x: 60, y: 60 }); } },
      { delay: 10000, action: () => { setCarRotation(90); setCarPosition({ x: 75, y: 50 }); } },
      { delay: 10500, action: () => { setCarPosition({ x: 75, y: 35 }); setSignalOn(false); } },
      { delay: 11500, action: () => { setIsPlaying(false); } },
    ];

    const timeouts = timeline.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [isPlaying]);

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCarPosition({ x: 50, y: 70 });
    setCyclistPosition({ x: 75, y: 95 });
    setShowWarning(false);
    setCarRotation(0);
    setSignalOn(false);
    setShoulderCheck(false);
  };

  return (
    <ScenarioBase
      title="Right Turn with Cyclist"
      germanTitle="Rechts abbiegen mit Radfahrer"
      description="One of the most common reasons for failing in Berlin! Always check for cyclists before turning right."
      importance="critical"
      steps={steps}
      currentStep={currentStep}
    >
      {/* Road Scene */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background */}
        <rect x="0" y="0" width="100" height="100" fill="#1a1a2e" />
        
        {/* Main Road (vertical) */}
        <rect x="40" y="0" width="20" height="100" fill="#374151" />
        <line x1="50" y1="0" x2="50" y2="40" stroke="#fbbf24" strokeWidth="0.3" strokeDasharray="2,2" />
        <line x1="50" y1="60" x2="50" y2="100" stroke="#fbbf24" strokeWidth="0.3" strokeDasharray="2,2" />
        
        {/* Side Road (horizontal) */}
        <rect x="60" y="40" width="40" height="20" fill="#374151" />
        <line x1="70" y1="50" x2="100" y2="50" stroke="#fbbf24" strokeWidth="0.3" strokeDasharray="2,2" />
        
        {/* Intersection */}
        <rect x="40" y="40" width="20" height="20" fill="#4b5563" />
        
        {/* Bike Lane */}
        <rect x="58" y="0" width="5" height="40" fill="#3b82f6" opacity="0.3" />
        <rect x="58" y="60" width="5" height="40" fill="#3b82f6" opacity="0.3" />
        
        {/* Bike Lane marking */}
        <text x="60.5" y="25" fill="#3b82f6" fontSize="3" textAnchor="middle">🚲</text>
        <text x="60.5" y="80" fill="#3b82f6" fontSize="3" textAnchor="middle">🚲</text>
        
        {/* Crosswalk */}
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={41 + i * 4} y="38" width="2" height="0.5" fill="white" />
        ))}
        
        {/* Cyclist */}
        <g 
          style={{ 
            transform: `translate(${cyclistPosition.x}px, ${cyclistPosition.y}px)`,
            transition: 'transform 1s ease-in-out'
          }}
        >
          {/* Bike */}
          <circle cx="-2" cy="-3" r="1.5" fill="none" stroke="#60a5fa" strokeWidth="0.4" />
          <circle cx="2" cy="-3" r="1.5" fill="none" stroke="#60a5fa" strokeWidth="0.4" />
          <line x1="-2" y1="-3" x2="0" y2="-5" stroke="#60a5fa" strokeWidth="0.4" />
          <line x1="2" y1="-3" x2="0" y2="-5" stroke="#60a5fa" strokeWidth="0.4" />
          {/* Person */}
          <circle cx="0" cy="-7" r="1" fill="#fbbf24" />
          <line x1="0" y1="-6" x2="0" y2="-5" stroke="#fbbf24" strokeWidth="0.5" />
        </g>
        
        {/* Car */}
        <g 
          style={{ 
            transform: `translate(${carPosition.x}px, ${carPosition.y}px) rotate(${carRotation}deg)`,
            transition: 'transform 0.5s ease-in-out',
            transformOrigin: 'center'
          }}
        >
          {/* Car body */}
          <rect x="-3" y="-5" width="6" height="10" rx="1" fill="#ef4444" />
          {/* Windows */}
          <rect x="-2" y="-3" width="4" height="3" rx="0.5" fill="#1e293b" />
          {/* Headlights */}
          <rect x="-2.5" y="-5" width="1" height="0.5" fill="#fef3c7" />
          <rect x="1.5" y="-5" width="1" height="0.5" fill="#fef3c7" />
          
          {/* Right Turn Signal */}
          {signalOn && (
            <rect 
              x="2.5" 
              y="3" 
              width="1" 
              height="1" 
              fill="#fbbf24"
              className="animate-pulse"
            />
          )}
          
          {/* Shoulder Check Indicator */}
          {shoulderCheck && (
            <g>
              <line x1="3" y1="0" x2="8" y2="-3" stroke="#22c55e" strokeWidth="0.5" />
              <circle cx="8" cy="-3" r="1.5" fill="#22c55e" opacity="0.5" />
              <text x="8" y="-2.5" fill="white" fontSize="1.5" textAnchor="middle">👀</text>
            </g>
          )}
        </g>
        
        {/* Warning indicator */}
        {showWarning && (
          <g className="animate-pulse">
            <circle cx="70" cy="65" r="5" fill="#ef4444" opacity="0.3" />
            <text x="70" y="67" fill="#ef4444" fontSize="5" textAnchor="middle">⚠️</text>
            <text x="70" y="75" fill="#ef4444" fontSize="2.5" textAnchor="middle">CYCLIST!</text>
          </g>
        )}
        
        {/* Direction Arrow */}
        <path 
          d="M 50 85 L 50 55 Q 50 50 55 50 L 70 50" 
          fill="none" 
          stroke="#fbbf24" 
          strokeWidth="0.5" 
          strokeDasharray="1,1"
          opacity="0.5"
        />
        <polygon points="70,48 74,50 70,52" fill="#fbbf24" opacity="0.5" />
        
        {/* Labels */}
        <text x="5" y="95" fill="#9ca3af" fontSize="2.5">Your car (red)</text>
        <text x="5" y="5" fill="#3b82f6" fontSize="2.5">Bike lane</text>
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

