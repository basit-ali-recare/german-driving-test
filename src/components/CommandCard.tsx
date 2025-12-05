import { useState } from 'react';
import { Volume2, VolumeX, Lightbulb, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSpeech } from '@/hooks/useSpeech';
import type { ExamCommand } from '@/data/examCommands';
import { cn } from '@/lib/utils';

interface CommandCardProps {
  command: ExamCommand;
  isLearned?: boolean;
  onToggleLearned?: (id: string) => void;
}

export function CommandCard({ command, isLearned, onToggleLearned }: CommandCardProps) {
  const { speak, stop, isSpeaking } = useSpeech();
  const [showTip, setShowTip] = useState(false);

  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(command.german);
    }
  };

  const importanceColors = {
    critical: 'bg-red-500/20 text-red-400 border-red-500/30',
    high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    medium: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  const importanceLabels = {
    critical: 'Critical',
    high: 'Important',
    medium: 'Good to know',
  };

  return (
    <Card 
      className={cn(
        "card-hover overflow-hidden transition-all duration-300",
        isLearned && "ring-2 ring-success/50 bg-success/5"
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <Badge 
            variant="outline" 
            className={cn("text-xs font-medium", importanceColors[command.importance])}
          >
            {importanceLabels[command.importance]}
          </Badge>
          
          <div className="flex items-center gap-2">
            {command.tip && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={() => setShowTip(!showTip)}
              >
                <Lightbulb className={cn("h-4 w-4", showTip && "text-primary fill-primary/20")} />
              </Button>
            )}
            {onToggleLearned && (
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8",
                  isLearned ? "text-success" : "text-muted-foreground hover:text-success"
                )}
                onClick={() => onToggleLearned(command.id)}
              >
                <CheckCircle className={cn("h-4 w-4", isLearned && "fill-success/20")} />
              </Button>
            )}
          </div>
        </div>

        {/* German Text */}
        <div className="mb-4">
          <p className="text-xl font-semibold text-foreground leading-relaxed">
            "{command.german}"
          </p>
        </div>

        {/* English Translation */}
        <div className="mb-4 pl-3 border-l-2 border-primary/30">
          <p className="text-base text-muted-foreground">
            {command.english}
          </p>
        </div>

        {/* Tip Section */}
        {command.tip && showTip && (
          <div className="mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-start gap-2">
              <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-primary/90">{command.tip}</p>
            </div>
          </div>
        )}

        {/* Audio Button */}
        <Button
          onClick={handleSpeak}
          className="w-full gap-2"
          variant={isSpeaking ? "secondary" : "default"}
        >
          {isSpeaking ? (
            <>
              <VolumeX className="h-4 w-4" />
              Stop Audio
              <div className="sound-wave flex gap-0.5 ml-2">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="w-0.5 h-3 bg-current rounded-full" />
                ))}
              </div>
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4" />
              Play in German
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
