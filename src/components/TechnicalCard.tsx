import { useState } from 'react';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSpeech } from '@/hooks/useSpeech';
import type { TechnicalQuestion } from '@/data/examCommands';
import { cn } from '@/lib/utils';

interface TechnicalCardProps {
  question: TechnicalQuestion;
}

const categoryColors: Record<string, string> = {
  lights: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  fluids: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  tires: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  dashboard: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  safety: 'bg-red-500/20 text-red-400 border-red-500/30',
  documents: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const categoryLabels: Record<string, string> = {
  lights: '💡 Lights',
  fluids: '💧 Fluids',
  tires: '🛞 Tires',
  dashboard: '📊 Dashboard',
  safety: '🛡️ Safety',
  documents: '📄 Documents',
};

export function TechnicalCard({ question }: TechnicalCardProps) {
  const { speak, stop, isSpeaking } = useSpeech();
  const [showAnswer, setShowAnswer] = useState(false);

  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(question.german);
    }
  };

  return (
    <Card className="card-hover overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <Badge 
            variant="outline" 
            className={cn("text-xs font-medium", categoryColors[question.category])}
          >
            {categoryLabels[question.category]}
          </Badge>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={handleSpeak}
          >
            {isSpeaking ? (
              <VolumeX className="h-4 w-4 text-primary" />
            ) : (
              <Volume2 className="h-4 w-4 text-muted-foreground hover:text-primary" />
            )}
          </Button>
        </div>

        {/* German Question */}
        <div className="mb-3">
          <p className="text-lg font-semibold text-foreground leading-relaxed">
            "{question.german}"
          </p>
        </div>

        {/* English Translation */}
        <div className="mb-4 pl-3 border-l-2 border-primary/30">
          <p className="text-sm text-muted-foreground">
            {question.english}
          </p>
        </div>

        {/* Answer Section */}
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setShowAnswer(!showAnswer)}
        >
          <span>{showAnswer ? 'Hide Answer' : 'Show Answer'}</span>
          <ChevronDown 
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              showAnswer && "rotate-180"
            )} 
          />
        </Button>

        {showAnswer && (
          <div className="mt-4 p-4 rounded-lg bg-success/10 border border-success/20">
            <p className="text-sm text-success-foreground leading-relaxed">
              {question.answer}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
