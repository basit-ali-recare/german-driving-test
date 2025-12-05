import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Pause } from 'lucide-react';
import { ScenarioBase } from './ScenarioBase';

type LightState = 'green' | 'yellow' | 'red' | 'red-yellow';

export function TrafficLightScenario() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [carPosition, setCarPosition] = useState(85);
  const [lightState, setLightState] = useState<LightState>('green');
  const [speed, setSpeed] = useState(50);
  const [showDecision, setShowDecision] = useState(false);
  const [braking, setBraking] = useState(false);

  const steps = [
    "Approaching intersection at 50 km/h - light is green",
    "Yellow light! Assess: Can you stop safely?",
    "Decision: You're too close - proceed through safely",
    "Light turns red as you clear the intersection",
    "Safe passage completed"
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timeline = [
      // Approach
      { delay: 0, action: () => { setCurrentStep(0); setCarPosition(85); setSpeed(50); } },
      { delay: 500, action: () => { setCarPosition(75); } },
      { delay: 1000, action: () => { setCarPosition(65); } },
      // Yellow light
      { delay: 1500, action: () => { 
        setLightState('yellow'); 
        setCurrentStep(1);
        setShowDecision(true);
      }},
      { delay: 2000, action: () => { setCarPosition(55); } },
      // Decision made - proceed
      { delay: 2500, action: () => { 
        setCurrentStep(2);
        setShowDecision(false);
        setCarPosition(45);
      }},
      { delay: 3000, action: () => { setCarPosition(35); } },
      // Through intersection
      { delay: 3500, action: () => { 
        setLightState('red');
        setCurrentStep(3);
        setCarPosition(25);
      }},
      { delay: 4000, action: () => { setCarPosition(15); } },
      { delay: 4500, action: () => { setCarPosition(5); setCurrentStep(4); } },
      { delay: 5500, action: () => { setIsPlaying(false); } },
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
    setLightState('green');
    setSpeed(50);
    setShowDecision(false);
    setBraking(false);
  };

  const lightColors = {
    red: lightState === 'red' || lightState === 'red-yellow' ? '#ef4444' : '#4b1c1c',
    yellow: lightState === 'yellow' || lightState === 'red-yellow' ? '#fbbf24' : '#4b3f1c',
    green: lightState === 'green' ? '#22c55e' : '#1c4b2a',
  };

  return (
    <ScenarioBase
      title="Yellow Light Decision"
      germanTitle="Gelbe Ampel Entscheidung"
      description="When the light turns yellow, you must decide: stop safely or proceed through. Never slam the brakes!"
      importance="high"
      steps={steps}
      currentStep={currentStep}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background - sky gradient */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100" height="60" fill="url(#skyGradient)" />
        
        {/* Ground/Road */}
        <rect x="0" y="60" width="100" height="40" fill="#374151" />
        
        {/* Road markings - side lines */}
        <rect x="0" y="62" width="100" height="1" fill="white" />
        <rect x="0" y="97" width="100" height="1" fill="white" />
        
        {/* Center line */}
        {[0, 15, 30, 45, 60, 75, 90].map(x => (
          <rect key={x} x={x} y="79" width="8" height="1" fill="#fbbf24" />
        ))}
        
        {/* Stop line */}
        <rect x="30" y="63" width="1" height="33" fill="white" opacity="0.8" />
        
        {/* Crosswalk */}
        {[0,1,2,3,4,5,6,7].map(i => (
          <rect key={i} x="25" y={64 + i * 4} width="3" height="2" fill="white" />
        ))}
        
        {/* Traffic Light Post */}
        <rect x="28" y="30" width="2" height="30" fill="#6b7280" />
        
        {/* Traffic Light Box */}
        <rect x="24" y="10" width="10" height="25" rx="2" fill="#1f2937" stroke="#374151" strokeWidth="0.5" />
        
        {/* Lights */}
        <circle cx="29" cy="16" r="3" fill={lightColors.red}>
          {lightState === 'red' && (
            <animate attributeName="opacity" values="1;0.7;1" dur="0.5s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="29" cy="23" r="3" fill={lightColors.yellow}>
          {lightState === 'yellow' && (
            <animate attributeName="opacity" values="1;0.7;1" dur="0.3s" repeatCount="indefinite" />
          )}
        </circle>
        <circle cx="29" cy="30" r="3" fill={lightColors.green}>
          {lightState === 'green' && (
            <animate attributeName="opacity" values="1;0.8;1" dur="1s" repeatCount="indefinite" />
          )}
        </circle>
        
        {/* Light glow effect */}
        {lightState === 'green' && (
          <circle cx="29" cy="30" r="6" fill="#22c55e" opacity="0.2" />
        )}
        {lightState === 'yellow' && (
          <circle cx="29" cy="23" r="6" fill="#fbbf24" opacity="0.3" />
        )}
        {lightState === 'red' && (
          <circle cx="29" cy="16" r="6" fill="#ef4444" opacity="0.2" />
        )}
        
        {/* Car (top-down view) */}
        <g 
          style={{ 
            transform: `translateX(${carPosition}%)`,
            transition: 'transform 0.5s linear'
          }}
        >
          {/* Car body */}
          <rect x="-8" y="70" width="12" height="18" rx="2" fill="#ef4444" />
          {/* Windows */}
          <rect x="-6" y="72" width="8" height="5" rx="1" fill="#1e293b" />
          {/* Headlights */}
          <rect x="-7" y="69" width="2" height="1.5" rx="0.5" fill="#fef3c7" />
          <rect x="1" y="69" width="2" height="1.5" rx="0.5" fill="#fef3c7" />
          {/* Taillights */}
          <rect x="-7" y="86" width="2" height="1.5" rx="0.5" fill={braking ? "#ef4444" : "#7f1d1d"} />
          <rect x="1" y="86" width="2" height="1.5" rx="0.5" fill={braking ? "#ef4444" : "#7f1d1d"} />
        </g>
        
        {/* Speed indicator */}
        <g transform="translate(85, 10)">
          <rect x="0" y="0" width="12" height="8" rx="1" fill="#1f2937" stroke="#374151" strokeWidth="0.3" />
          <text x="6" y="5.5" fill="white" fontSize="3" textAnchor="middle" fontWeight="bold">{speed}</text>
          <text x="6" y="9" fill="#9ca3af" fontSize="1.5" textAnchor="middle">km/h</text>
        </g>
        
        {/* Decision popup */}
        {showDecision && (
          <g className="animate-pulse">
            <rect x="50" y="15" width="35" height="20" rx="2" fill="#fbbf24" opacity="0.9" />
            <text x="67.5" y="23" fill="#1f2937" fontSize="2.5" textAnchor="middle" fontWeight="bold">YELLOW LIGHT!</text>
            <text x="67.5" y="28" fill="#1f2937" fontSize="2" textAnchor="middle">Can you stop safely?</text>
            <text x="67.5" y="33" fill="#1f2937" fontSize="1.8" textAnchor="middle">Too close → Proceed</text>
          </g>
        )}
        
        {/* Distance markers */}
        <text x="35" y="98" fill="#9ca3af" fontSize="2">Stop line</text>
        <text x="80" y="98" fill="#9ca3af" fontSize="2">Approach</text>
        
        {/* Legend */}
        <g transform="translate(5, 5)">
          <rect x="0" y="0" width="20" height="10" rx="1" fill="#1f2937" opacity="0.8" />
          <circle cx="3" cy="3" r="1.5" fill="#22c55e" />
          <text x="6" y="4" fill="#9ca3af" fontSize="1.8">Go</text>
          <circle cx="3" cy="7" r="1.5" fill="#fbbf24" />
          <text x="6" y="8" fill="#9ca3af" fontSize="1.8">Caution</text>
          <circle cx="13" cy="3" r="1.5" fill="#ef4444" />
          <text x="16" y="4" fill="#9ca3af" fontSize="1.8">Stop</text>
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

