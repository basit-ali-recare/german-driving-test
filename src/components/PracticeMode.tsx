import { useState, useCallback, useEffect } from 'react';
import { Play, RotateCcw, Eye, EyeOff, Volume2, ArrowRight, Trophy, Target } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useSpeech } from '@/hooks/useSpeech';
import { examCommands, type ExamCommand, type CommandCategory, categoryInfo } from '@/data/examCommands';
import { cn } from '@/lib/utils';

type PracticeState = 'idle' | 'listening' | 'revealed';

interface PracticeModeProps {
  selectedCategories: CommandCategory[];
}

export function PracticeMode({ selectedCategories }: PracticeModeProps) {
  const { speak, isSpeaking } = useSpeech();
  const [practiceState, setPracticeState] = useState<PracticeState>('idle');
  const [currentCommand, setCurrentCommand] = useState<ExamCommand | null>(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [usedCommands, setUsedCommands] = useState<Set<string>>(new Set());

  const filteredCommands = examCommands.filter(
    (cmd) => selectedCategories.length === 0 || selectedCategories.includes(cmd.category)
  );

  const getRandomCommand = useCallback(() => {
    const availableCommands = filteredCommands.filter(
      (cmd) => !usedCommands.has(cmd.id)
    );

    if (availableCommands.length === 0) {
      // Reset if all commands have been used
      setUsedCommands(new Set());
      return filteredCommands[Math.floor(Math.random() * filteredCommands.length)];
    }

    return availableCommands[Math.floor(Math.random() * availableCommands.length)];
  }, [filteredCommands, usedCommands]);

  const startPractice = useCallback(() => {
    const command = getRandomCommand();
    setCurrentCommand(command);
    setPracticeState('listening');
    setUsedCommands((prev) => new Set([...prev, command.id]));
    
    // Auto-speak the command
    setTimeout(() => {
      speak(command.german);
    }, 500);
  }, [getRandomCommand, speak]);

  const handleKnewIt = () => {
    setScore((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
    startPractice();
  };

  const handleDidntKnow = () => {
    setScore((prev) => ({ ...prev, total: prev.total + 1 }));
    startPractice();
  };

  const revealAnswer = () => {
    setPracticeState('revealed');
  };

  const resetPractice = () => {
    setPracticeState('idle');
    setCurrentCommand(null);
    setScore({ correct: 0, total: 0 });
    setUsedCommands(new Set());
  };

  const progressPercentage = score.total > 0 
    ? Math.round((score.correct / score.total) * 100) 
    : 0;

  const practiceProgress = filteredCommands.length > 0
    ? Math.round((usedCommands.size / filteredCommands.length) * 100)
    : 0;

  // Reset when categories change
  useEffect(() => {
    resetPractice();
  }, [selectedCategories]);

  if (practiceState === 'idle') {
    return (
      <Card className="border-dashed border-2 border-primary/30 bg-primary/5">
        <CardContent className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
            <Target className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Practice Mode</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Test your knowledge! You'll hear German commands and need to understand what they mean.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {selectedCategories.length === 0 ? (
              <Badge variant="secondary">All categories</Badge>
            ) : (
              selectedCategories.map((cat) => (
                <Badge key={cat} variant="secondary">
                  {categoryInfo[cat].icon} {categoryInfo[cat].name}
                </Badge>
              ))
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            {filteredCommands.length} commands available
          </p>

          <Button 
            size="lg" 
            onClick={startPractice} 
            className="gap-2"
            disabled={filteredCommands.length === 0}
          >
            <Play className="h-5 w-5" />
            {filteredCommands.length === 0 ? 'No Commands Available' : 'Start Practice'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {score.correct} / {score.total} correct
                </span>
              </div>
              <Badge variant={progressPercentage >= 70 ? 'success' : 'secondary'}>
                {progressPercentage}%
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={resetPractice}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
          <Progress value={practiceProgress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            Progress: {usedCommands.size} / {filteredCommands.length} commands practiced
          </p>
        </CardContent>
      </Card>

      {/* Main Practice Card */}
      {currentCommand && (
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/20 to-primary/5 border-b border-primary/20">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {categoryInfo[currentCommand.category].icon} {categoryInfo[currentCommand.category].name}
              </Badge>
              <Badge 
                variant="outline"
                className={cn(
                  currentCommand.importance === 'critical' && 'border-red-500/50 text-red-400',
                  currentCommand.importance === 'high' && 'border-orange-500/50 text-orange-400',
                  currentCommand.importance === 'medium' && 'border-blue-500/50 text-blue-400'
                )}
              >
                {currentCommand.importance === 'critical' ? '⚠️ Critical' : 
                 currentCommand.importance === 'high' ? '❗ Important' : 'ℹ️ Good to know'}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Audio Section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-4">
                <Volume2 className={cn(
                  "h-10 w-10 text-primary transition-transform",
                  isSpeaking && "scale-110"
                )} />
              </div>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => speak(currentCommand.german)}
                className="gap-2"
                disabled={isSpeaking}
              >
                {isSpeaking ? (
                  <>
                    <div className="sound-wave flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="w-1 h-4 bg-primary rounded-full" />
                      ))}
                    </div>
                    Playing...
                  </>
                ) : (
                  <>
                    <Volume2 className="h-5 w-5" />
                    Play Again
                  </>
                )}
              </Button>
              
              <p className="text-sm text-muted-foreground mt-4">
                Listen to the command and try to understand what it means
              </p>
            </div>

            {/* Answer Section */}
            {practiceState === 'listening' && (
              <div className="flex justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={revealAnswer}
                  className="gap-2"
                >
                  <Eye className="h-5 w-5" />
                  Show Answer
                </Button>
              </div>
            )}

            {practiceState === 'revealed' && (
              <div className="space-y-6">
                {/* German Text */}
                <div className="p-4 rounded-lg bg-secondary/50 text-center">
                  <p className="text-2xl font-semibold text-foreground">
                    "{currentCommand.german}"
                  </p>
                </div>

                {/* English Translation */}
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-center">
                  <p className="text-lg text-primary">
                    {currentCommand.english}
                  </p>
                </div>

                {/* Tip */}
                {currentCommand.tip && (
                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <p className="text-sm text-yellow-200">
                      💡 <strong>Tip:</strong> {currentCommand.tip}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={handleDidntKnow}
                    className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
                  >
                    <EyeOff className="h-5 w-5 mr-2" />
                    Didn't Know
                  </Button>
                  <Button
                    size="lg"
                    variant="success"
                    onClick={handleKnewIt}
                    className="flex-1"
                  >
                    Knew It!
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}