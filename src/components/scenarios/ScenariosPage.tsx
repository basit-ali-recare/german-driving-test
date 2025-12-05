import { useState } from 'react';
import { Play, Car, AlertTriangle, RotateCw, Train, Eye, Bike } from 'lucide-react';
import { CyclistScenario } from './CyclistScenario';
import { TrafficLightScenario } from './TrafficLightScenario';
import { RoundaboutScenario } from './RoundaboutScenario';
import { EmergencyBrakeScenario } from './EmergencyBrakeScenario';
import { TramScenario } from './TramScenario';
import { ShoulderCheckScenario } from './ShoulderCheckScenario';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ScenarioType = 'cyclist' | 'traffic-light' | 'roundabout' | 'emergency' | 'tram' | 'shoulder-check';

const scenarios = [
  { 
    id: 'cyclist' as ScenarioType, 
    name: 'Cyclist Right Turn', 
    german: 'Rechts abbiegen mit Radfahrer',
    icon: Bike,
    importance: 'critical' as const,
    description: 'Most common fail reason!'
  },
  { 
    id: 'shoulder-check' as ScenarioType, 
    name: 'Shoulder Check', 
    german: 'Schulterblick',
    icon: Eye,
    importance: 'critical' as const,
    description: 'Missing = instant fail!'
  },
  { 
    id: 'tram' as ScenarioType, 
    name: 'Tram Stop', 
    german: 'Straßenbahnhaltestelle',
    icon: Train,
    importance: 'critical' as const,
    description: 'Berlin specific!'
  },
  { 
    id: 'roundabout' as ScenarioType, 
    name: 'Roundabout', 
    german: 'Kreisverkehr',
    icon: RotateCw,
    importance: 'critical' as const,
    description: 'Yield + signal right!'
  },
  { 
    id: 'traffic-light' as ScenarioType, 
    name: 'Yellow Light', 
    german: 'Gelbe Ampel',
    icon: AlertTriangle,
    importance: 'high' as const,
    description: 'Stop or go decision'
  },
  { 
    id: 'emergency' as ScenarioType, 
    name: 'Emergency Brake', 
    german: 'Gefahrbremsung',
    icon: Car,
    importance: 'critical' as const,
    description: 'Exam requirement!'
  },
];

export function ScenariosPage() {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('cyclist');

  const renderScenario = () => {
    switch (activeScenario) {
      case 'cyclist':
        return <CyclistScenario />;
      case 'traffic-light':
        return <TrafficLightScenario />;
      case 'roundabout':
        return <RoundaboutScenario />;
      case 'emergency':
        return <EmergencyBrakeScenario />;
      case 'tram':
        return <TramScenario />;
      case 'shoulder-check':
        return <ShoulderCheckScenario />;
      default:
        return <CyclistScenario />;
    }
  };

  const importanceColors = {
    critical: 'border-red-500/50 bg-red-500/10',
    high: 'border-orange-500/50 bg-orange-500/10',
    medium: 'border-blue-500/50 bg-blue-500/10',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Play className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Interactive Scenarios</h2>
      </div>
      <p className="text-muted-foreground mb-6">
        Watch animated driving scenarios to understand proper behavior. 
        Click <strong>Play</strong> to see step-by-step instructions!
      </p>

      {/* Scenario Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          const isActive = activeScenario === scenario.id;
          
          return (
            <Button
              key={scenario.id}
              variant="outline"
              onClick={() => setActiveScenario(scenario.id)}
              className={cn(
                "h-auto py-3 px-3 flex flex-col items-center gap-2 transition-all",
                isActive 
                  ? "bg-primary/20 border-primary text-primary ring-2 ring-primary/30" 
                  : importanceColors[scenario.importance]
              )}
            >
              <Icon className="h-5 w-5" />
              <div className="text-center">
                <div className="text-xs font-medium leading-tight">{scenario.name}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{scenario.german}</div>
              </div>
              {scenario.importance === 'critical' && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/20 text-red-400">
                  {scenario.description}
                </span>
              )}
            </Button>
          );
        })}
      </div>

      {/* Active Scenario */}
      <div className="animate-in fade-in duration-300">
        {renderScenario()}
      </div>

      {/* Tips Section */}
      <div className="grid gap-4 md:grid-cols-2 mt-8">
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
          <h4 className="font-semibold text-red-400 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Instant Fail Actions
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Running a red light</li>
            <li>• Missing shoulder check before turning</li>
            <li>• Not stopping for pedestrians on zebra crossing</li>
            <li>• Not yielding to trams when doors open</li>
            <li>• Dangerous lane change</li>
          </ul>
        </div>
        
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
          <h4 className="font-semibold text-green-400 mb-2 flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Key Observations to Show
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• <strong>Schulterblick</strong> - Make it obvious!</li>
            <li>• Check mirrors before any maneuver</li>
            <li>• Look left-right-left at intersections</li>
            <li>• Watch for cyclists when turning right</li>
            <li>• Scan pedestrian crossings early</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

