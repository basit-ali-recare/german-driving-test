import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Pause } from 'lucide-react';
import { ScenarioBase } from './ScenarioBase';

export function RoundaboutScenario() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [carAngle, setCarAngle] = useState(180); // Start from bottom
  const [carDistance, setCarDistance] = useState(45); // Distance from center
  const [signalLeft, setSignalLeft] = useState(false);
  const [signalRight, setSignalRight] = useState(false);
  const [otherCarAngle, setOtherCarAngle] = useState(90);
  const [showYield, setShowYield] = useState(false);
  const [inRoundabout, setInRoundabout] = useState(false);

  const steps = [
    "Approach the roundabout - yield to traffic inside",
    "Check for vehicles already in the roundabout",
    "Wait if necessary - they have right of way",
    "Enter when clear - no signal needed to enter",
    "Drive counter-clockwise around",
    "Signal RIGHT before your exit",
    "Exit the roundabout safely"
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timeline = [
      // Approach
      { delay: 0, action: () => { 
        setCurrentStep(0); 
        setCarAngle(180);
        setCarDistance(45);
      }},
      { delay: 500, action: () => { setCarDistance(38); } },
      { delay: 1000, action: () => { setCurrentStep(1); setCarDistance(32); setShowYield(true); } },
      // Other car in roundabout
      { delay: 1500, action: () => { setOtherCarAngle(120); } },
      { delay: 2000, action: () => { setCurrentStep(2); setOtherCarAngle(150); } },
      { delay: 2500, action: () => { setOtherCarAngle(180); } },
      { delay: 3000, action: () => { setOtherCarAngle(210); } },
      { delay: 3500, action: () => { setOtherCarAngle(240); setShowYield(false); } },
      // Enter roundabout
      { delay: 4000, action: () => { 
        setCurrentStep(3); 
        setInRoundabout(true);
        setCarDistance(22);
      }},
      { delay: 4500, action: () => { setCurrentStep(4); setCarAngle(210); } },
      { delay: 5000, action: () => { setCarAngle(240); } },
      { delay: 5500, action: () => { setCarAngle(270); setOtherCarAngle(300); } },
      // Signal for exit
      { delay: 6000, action: () => { 
        setCurrentStep(5); 
        setSignalRight(true);
        setCarAngle(290);
      }},
      { delay: 6500, action: () => { setCarAngle(310); } },
      // Exit
      { delay: 7000, action: () => { 
        setCurrentStep(6);
        setCarAngle(330);
        setCarDistance(28);
      }},
      { delay: 7500, action: () => { setCarDistance(35); setCarAngle(350); } },
      { delay: 8000, action: () => { setCarDistance(42); setSignalRight(false); } },
      { delay: 9000, action: () => { setIsPlaying(false); } },
    ];

    const timeouts = timeline.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [isPlaying]);

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCarAngle(180);
    setCarDistance(45);
    setSignalLeft(false);
    setSignalRight(false);
    setOtherCarAngle(90);
    setShowYield(false);
    setInRoundabout(false);
  };

  // Convert polar to cartesian coordinates
  const getPosition = (angle: number, distance: number) => {
    const rad = (angle - 90) * (Math.PI / 180);
    return {
      x: 50 + Math.cos(rad) * distance,
      y: 50 + Math.sin(rad) * distance
    };
  };

  const carPos = getPosition(carAngle, carDistance);
  const otherCarPos = getPosition(otherCarAngle, 22);

  return (
    <ScenarioBase
      title="Roundabout Navigation"
      germanTitle="Kreisverkehr fahren"
      description="Yield to traffic already in the roundabout. Signal RIGHT when exiting!"
      importance="critical"
      steps={steps}
      currentStep={currentStep}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background */}
        <rect x="0" y="0" width="100" height="100" fill="#1a1a2e" />
        
        {/* Roads leading to roundabout */}
        {/* Bottom road */}
        <rect x="42" y="70" width="16" height="30" fill="#374151" />
        <line x1="50" y1="70" x2="50" y2="100" stroke="#fbbf24" strokeWidth="0.3" strokeDasharray="2,2" />
        
        {/* Top road */}
        <rect x="42" y="0" width="16" height="30" fill="#374151" />
        <line x1="50" y1="0" x2="50" y2="30" stroke="#fbbf24" strokeWidth="0.3" strokeDasharray="2,2" />
        
        {/* Left road */}
        <rect x="0" y="42" width="30" height="16" fill="#374151" />
        <line x1="0" y1="50" x2="30" y2="50" stroke="#fbbf24" strokeWidth="0.3" strokeDasharray="2,2" />
        
        {/* Right road */}
        <rect x="70" y="42" width="30" height="16" fill="#374151" />
        <line x1="70" y1="50" x2="100" y2="50" stroke="#fbbf24" strokeWidth="0.3" strokeDasharray="2,2" />
        
        {/* Roundabout outer circle */}
        <circle cx="50" cy="50" r="25" fill="#374151" />
        
        {/* Roundabout inner island */}
        <circle cx="50" cy="50" r="12" fill="#22c55e" opacity="0.3" />
        <circle cx="50" cy="50" r="12" fill="none" stroke="white" strokeWidth="0.5" />
        
        {/* Roundabout lane marking */}
        <circle cx="50" cy="50" r="18" fill="none" stroke="#fbbf24" strokeWidth="0.3" strokeDasharray="2,2" />
        
        {/* Direction arrows in roundabout */}
        <g transform="translate(50,50)">
          <path d="M -8,-17 A 18,18 0 0,1 8,-17" fill="none" stroke="white" strokeWidth="0.8" markerEnd="url(#arrowhead)" opacity="0.5" />
          <path d="M 17,-8 A 18,18 0 0,1 17,8" fill="none" stroke="white" strokeWidth="0.8" opacity="0.5" />
          <path d="M 8,17 A 18,18 0 0,1 -8,17" fill="none" stroke="white" strokeWidth="0.8" opacity="0.5" />
          <path d="M -17,8 A 18,18 0 0,1 -17,-8" fill="none" stroke="white" strokeWidth="0.8" opacity="0.5" />
        </g>
        
        {/* Center decoration */}
        <circle cx="50" cy="50" r="6" fill="#166534" />
        <text x="50" y="52" fill="white" fontSize="5" textAnchor="middle">🌳</text>
        
        {/* Yield signs at entries */}
        <polygon points="50,68 47,74 53,74" fill="none" stroke="white" strokeWidth="0.5" />
        <text x="50" y="77" fill="#ef4444" fontSize="2" textAnchor="middle">YIELD</text>
        
        {/* Other car (blue) */}
        <g 
          style={{ 
            transform: `translate(${otherCarPos.x}px, ${otherCarPos.y}px) rotate(${otherCarAngle + 90}deg)`,
            transition: 'transform 0.5s ease-in-out',
            transformOrigin: 'center'
          }}
        >
          <rect x="-2.5" y="-4" width="5" height="8" rx="1" fill="#3b82f6" />
          <rect x="-1.5" y="-2" width="3" height="2.5" rx="0.3" fill="#1e293b" />
        </g>
        
        {/* Your car (red) */}
        <g 
          style={{ 
            transform: `translate(${carPos.x}px, ${carPos.y}px) rotate(${carAngle + 90}deg)`,
            transition: 'transform 0.5s ease-in-out',
            transformOrigin: 'center'
          }}
        >
          <rect x="-2.5" y="-4" width="5" height="8" rx="1" fill="#ef4444" />
          <rect x="-1.5" y="-2" width="3" height="2.5" rx="0.3" fill="#1e293b" />
          
          {/* Right signal */}
          {signalRight && (
            <rect 
              x="2" 
              y="2" 
              width="1" 
              height="1" 
              fill="#fbbf24"
              className="animate-pulse"
            />
          )}
        </g>
        
        {/* Yield warning */}
        {showYield && (
          <g className="animate-pulse">
            <rect x="60" y="60" width="25" height="12" rx="2" fill="#ef4444" opacity="0.9" />
            <text x="72.5" y="67" fill="white" fontSize="2.5" textAnchor="middle" fontWeight="bold">⚠️ YIELD!</text>
            <text x="72.5" y="70" fill="white" fontSize="1.8" textAnchor="middle">Car in roundabout</text>
          </g>
        )}
        
        {/* Exit indicator */}
        {currentStep >= 5 && (
          <g>
            <circle cx="50" cy="20" r="5" fill="#22c55e" opacity="0.3" className="animate-pulse" />
            <text x="50" y="14" fill="#22c55e" fontSize="2" textAnchor="middle">EXIT</text>
            <text x="50" y="22" fill="#22c55e" fontSize="4" textAnchor="middle">↑</text>
          </g>
        )}
        
        {/* Legend */}
        <g transform="translate(3, 3)">
          <rect x="0" y="0" width="18" height="10" rx="1" fill="#1f2937" opacity="0.9" />
          <rect x="2" y="2" width="4" height="3" rx="0.5" fill="#ef4444" />
          <text x="8" y="4.5" fill="#9ca3af" fontSize="2">You</text>
          <rect x="2" y="6" width="4" height="3" rx="0.5" fill="#3b82f6" />
          <text x="8" y="8.5" fill="#9ca3af" fontSize="2">Other</text>
        </g>
        
        {/* Counter-clockwise indicator */}
        <text x="50" y="40" fill="#9ca3af" fontSize="2" textAnchor="middle">↺ Counter-clockwise</text>
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

