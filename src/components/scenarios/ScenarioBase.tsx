import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ScenarioBaseProps {
  title: string;
  germanTitle: string;
  description: string;
  importance: 'critical' | 'high' | 'medium';
  children: ReactNode;
  steps?: string[];
  currentStep?: number;
}

export function ScenarioBase({ 
  title, 
  germanTitle, 
  description, 
  importance,
  children,
  steps,
  currentStep = 0
}: ScenarioBaseProps) {
  const importanceColors = {
    critical: 'bg-red-500/20 text-red-400 border-red-500/30',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    medium: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/20 to-transparent border-b border-primary/20">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl mb-1">{title}</CardTitle>
            <p className="text-sm text-muted-foreground italic">{germanTitle}</p>
          </div>
          <Badge variant="outline" className={importanceColors[importance]}>
            {importance === 'critical' ? '⚠️ Critical' : 
             importance === 'high' ? '❗ Important' : 'ℹ️ Good to know'}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Animation Container */}
        <div className="relative bg-slate-900 aspect-video overflow-hidden">
          {children}
        </div>
        
        {/* Steps */}
        {steps && steps.length > 0 && (
          <div className="p-4 border-t border-border">
            <h4 className="text-sm font-medium mb-3">Steps to follow:</h4>
            <div className="space-y-2">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-3 p-2 rounded-lg transition-all ${
                    index === currentStep 
                      ? 'bg-primary/20 border border-primary/30' 
                      : index < currentStep 
                        ? 'opacity-50' 
                        : ''
                  }`}
                >
                  <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 ${
                    index === currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : index < currentStep
                        ? 'bg-success text-success-foreground'
                        : 'bg-secondary text-secondary-foreground'
                  }`}>
                    {index < currentStep ? '✓' : index + 1}
                  </span>
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

