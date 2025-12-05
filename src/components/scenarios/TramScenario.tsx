import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, Pause } from 'lucide-react';
import { ScenarioBase } from './ScenarioBase';

export function TramScenario() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [carPosition, setCarPosition] = useState(80);
  const [tramPosition, setTramPosition] = useState(-20);
  const [tramDoorsOpen, setTramDoorsOpen] = useState(false);
  const [passengersVisible, setPassengersVisible] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [stopped, setStopped] = useState(false);

  const steps = [
    "Approaching tram stop - tram is arriving",
    "Tram stops and opens doors",
    "STOP! Passengers may cross to reach the tram",
    "Wait until doors close and tram departs",
    "Check for remaining pedestrians, then proceed"
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timeline = [
      // Approach
      { delay: 0, action: () => { 
        setCurrentStep(0); 
        setCarPosition(80);
        setTramPosition(-20);
      }},
      { delay: 500, action: () => { setCarPosition(70); setTramPosition(-10); } },
      { delay: 1000, action: () => { setCarPosition(60); setTramPosition(0); } },
      { delay: 1500, action: () => { setTramPosition(10); } },
      // Tram arrives at stop
      { delay: 2000, action: () => { 
        setTramPosition(20);
        setCarPosition(50);
      }},
      { delay: 2500, action: () => { 
        setCurrentStep(1);
        setTramPosition(25); // Tram at stop
        setTramDoorsOpen(true);
        setShowWarning(true);
      }},
      // Must stop
      { delay: 3000, action: () => { 
        setCurrentStep(2);
        setCarPosition(45);
        setStopped(true);
        setPassengersVisible(true);
      }},
      { delay: 5000, action: () => { 
        setCurrentStep(3);
        setPassengersVisible(false);
      }},
      // Tram departs
      { delay: 6000, action: () => { 
        setTramDoorsOpen(false);
        setShowWarning(false);
      }},
      { delay: 6500, action: () => { setTramPosition(35); } },
      { delay: 7000, action: () => { setTramPosition(50); } },
      { delay: 7500, action: () => { 
        setCurrentStep(4);
        setTramPosition(70);
        setStopped(false);
      }},
      // Continue
      { delay: 8000, action: () => { setCarPosition(40); setTramPosition(90); } },
      { delay: 8500, action: () => { setCarPosition(30); setTramPosition(110); } },
      { delay: 9500, action: () => { setIsPlaying(false); } },
    ];

    const timeouts = timeline.map(({ delay, action }) => 
      setTimeout(action, delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, [isPlaying]);

  const reset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setCarPosition(80);
    setTramPosition(-20);
    setTramDoorsOpen(false);
    setPassengersVisible(false);
    setShowWarning(false);
    setStopped(false);
  };

  return (
    <ScenarioBase
      title="Tram Stop Behavior"
      germanTitle="Verhalten an Straßenbahnhaltestelle"
      description="In Berlin, you MUST stop when a tram opens its doors! Passengers have the right to cross the road."
      importance="critical"
      steps={steps}
      currentStep={currentStep}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Background */}
        <rect x="0" y="0" width="100" height="100" fill="#1a1a2e" />
        
        {/* Road */}
        <rect x="0" y="55" width="100" height="35" fill="#374151" />
        
        {/* Tram tracks */}
        <rect x="0" y="40" width="100" height="15" fill="#4b5563" />
        <line x1="0" y1="42" x2="100" y2="42" stroke="#6b7280" strokeWidth="1" />
        <line x1="0" y1="53" x2="100" y2="53" stroke="#6b7280" strokeWidth="1" />
        {/* Track ties */}
        {[...Array(25)].map((_, i) => (
          <rect key={i} x={i * 4} y="40" width="1" height="15" fill="#52525b" />
        ))}
        
        {/* Tram stop marker */}
        <rect x="22" y="30" width="2" height="25" fill="#fbbf24" />
        <rect x="18" y="28" width="10" height="6" rx="1" fill="#fbbf24" />
        <text x="23" y="32" fill="#1f2937" fontSize="2.5" textAnchor="middle" fontWeight="bold">H</text>
        
        {/* Sidewalk */}
        <rect x="0" y="90" width="100" height="10" fill="#6b7280" />
        
        {/* Center line */}
        {[0, 15, 30, 45, 60, 75, 90].map(x => (
          <rect key={x} x={x} y="72" width="8" height="1" fill="#fbbf24" />
        ))}
        
        {/* Tram */}
        <g 
          style={{ 
            transform: `translateX(${tramPosition}%)`,
            transition: 'transform 0.5s ease-out'
          }}
        >
          {/* Tram body */}
          <rect x="-15" y="38" width="30" height="17" rx="2" fill="#eab308" />
          {/* Windows */}
          <rect x="-13" y="40" width="5" height="8" rx="0.5" fill="#1e293b" />
          <rect x="-6" y="40" width="5" height="8" rx="0.5" fill="#1e293b" />
          <rect x="1" y="40" width="5" height="8" rx="0.5" fill="#1e293b" />
          <rect x="8" y="40" width="5" height="8" rx="0.5" fill="#1e293b" />
          {/* Wheels */}
          <circle cx="-10" cy="55" r="2" fill="#374151" />
          <circle cx="0" cy="55" r="2" fill="#374151" />
          <circle cx="10" cy="55" r="2" fill="#374151" />
          {/* Door */}
          <rect 
            x="-1" 
            y="40" 
            width="2" 
            height="12" 
            fill={tramDoorsOpen ? "#22c55e" : "#ca8a04"}
          />
          {/* Door indicator */}
          {tramDoorsOpen && (
            <g className="animate-pulse">
              <rect x="-3" y="36" width="6" height="3" rx="0.5" fill="#22c55e" />
              <text x="0" y="38" fill="white" fontSize="2" textAnchor="middle">OPEN</text>
            </g>
          )}
          {/* Tram label */}
          <text x="0" y="52" fill="#1f2937" fontSize="3" textAnchor="middle" fontWeight="bold">M5</text>
        </g>
        
        {/* Pedestrians crossing */}
        {passengersVisible && (
          <g className="animate-pulse">
            {/* Person 1 */}
            <g style={{ transform: 'translate(25%, 60%)' }}>
              <circle cx="0" cy="0" r="2" fill="#fcd34d" />
              <rect x="-1.5" y="2" width="3" height="6" fill="#3b82f6" />
            </g>
            {/* Person 2 */}
            <g style={{ transform: 'translate(30%, 65%)' }}>
              <circle cx="0" cy="0" r="2" fill="#fcd34d" />
              <rect x="-1.5" y="2" width="3" height="6" fill="#ef4444" />
            </g>
            {/* Crossing indicator */}
            <line x1="25" y1="55" x2="25" y2="85" stroke="#22c55e" strokeWidth="0.5" strokeDasharray="2,1" />
          </g>
        )}
        
        {/* Your car */}
        <g 
          style={{ 
            transform: `translateX(${carPosition}%)`,
            transition: stopped ? 'transform 0.3s ease-out' : 'transform 0.5s linear'
          }}
        >
          <rect x="-5" y="62" width="10" height="16" rx="1.5" fill="#ef4444" />
          <rect x="-3.5" y="64" width="7" height="4" rx="0.5" fill="#1e293b" />
          {/* Brake lights when stopped */}
          <rect 
            x="-4" 
            y="76" 
            width="2" 
            height="1.5" 
            rx="0.5" 
            fill={stopped ? "#ef4444" : "#7f1d1d"}
            className={stopped ? "animate-pulse" : ""}
          />
          <rect 
            x="2" 
            y="76" 
            width="2" 
            height="1.5" 
            rx="0.5" 
            fill={stopped ? "#ef4444" : "#7f1d1d"}
            className={stopped ? "animate-pulse" : ""}
          />
        </g>
        
        {/* Warning */}
        {showWarning && (
          <g className="animate-pulse">
            <rect x="55" y="10" width="40" height="18" rx="2" fill="#ef4444" />
            <text x="75" y="19" fill="white" fontSize="3" textAnchor="middle" fontWeight="bold">⚠️ TRAM STOP!</text>
            <text x="75" y="24" fill="white" fontSize="2" textAnchor="middle">Must stop for passengers</text>
          </g>
        )}
        
        {/* Stop indicator */}
        {stopped && (
          <g>
            <rect x="35" y="80" width="20" height="8" rx="1" fill="#22c55e" opacity="0.9" />
            <text x="45" y="85" fill="white" fontSize="2.5" textAnchor="middle" fontWeight="bold">✓ STOPPED</text>
          </g>
        )}
        
        {/* Berlin tram indicator */}
        <g transform="translate(5, 5)">
          <rect x="0" y="0" width="22" height="12" rx="1" fill="#1f2937" opacity="0.9" />
          <text x="11" y="5" fill="#eab308" fontSize="2.5" textAnchor="middle" fontWeight="bold">🚃 BVG Tram</text>
          <text x="11" y="9" fill="#9ca3af" fontSize="1.8" textAnchor="middle">Berlin specific!</text>
        </g>
        
        {/* Rule reminder */}
        <g transform="translate(5, 85)">
          <rect x="0" y="0" width="35" height="10" rx="1" fill="#1f2937" opacity="0.9" />
          <text x="17.5" y="4" fill="#fbbf24" fontSize="1.8" textAnchor="middle">§20 StVO:</text>
          <text x="17.5" y="7" fill="white" fontSize="1.6" textAnchor="middle">Trams have priority!</text>
          <text x="17.5" y="10" fill="white" fontSize="1.6" textAnchor="middle">Stop when doors open</text>
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

