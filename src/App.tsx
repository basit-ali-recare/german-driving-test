import { useState, useEffect } from 'react';
import { Car, BookOpen, Wrench, Target, MapPin, GraduationCap, Volume2, Play } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { CommandCard } from '@/components/CommandCard';
import { TechnicalCard } from '@/components/TechnicalCard';
import { PracticeMode } from '@/components/PracticeMode';
import { BerlinTips } from '@/components/BerlinTips';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ScenariosPage } from '@/components/scenarios';
import { 
  examCommands, 
  technicalQuestions, 
  type CommandCategory,
} from '@/data/examCommands';

function App() {
  const [selectedCategories, setSelectedCategories] = useState<CommandCategory[]>([]);
  const [learnedCommands, setLearnedCommands] = useState<Set<string>>(new Set());
  const [selectedTechCategory, setSelectedTechCategory] = useState<string>('all');

  // Load learned commands from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('learnedCommands');
    if (saved) {
      setLearnedCommands(new Set(JSON.parse(saved)));
    }
  }, []);

  // Save learned commands to localStorage
  useEffect(() => {
    localStorage.setItem('learnedCommands', JSON.stringify([...learnedCommands]));
  }, [learnedCommands]);

  const toggleCategory = (category: CommandCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleLearned = (id: string) => {
    setLearnedCommands((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredCommands = examCommands.filter(
    (cmd) => selectedCategories.length === 0 || selectedCategories.includes(cmd.category)
  );

  const filteredTechQuestions = technicalQuestions.filter(
    (q) => selectedTechCategory === 'all' || q.category === selectedTechCategory
  );

  const overallProgress = Math.round((learnedCommands.size / examCommands.length) * 100);

  const techCategories = [
    { value: 'all', label: 'All Questions' },
    { value: 'lights', label: '💡 Lights' },
    { value: 'fluids', label: '💧 Fluids' },
    { value: 'tires', label: '🛞 Tires' },
    { value: 'dashboard', label: '📊 Dashboard' },
    { value: 'safety', label: '🛡️ Safety' },
    { value: 'documents', label: '📄 Documents' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/50 shadow-lg shadow-primary/20">
                <Car className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Fahrprüfung Berlin</h1>
                <p className="text-xs text-muted-foreground">German Driving Exam Prep</p>
              </div>
            </div>

            {/* Progress Indicator */}
            <div className="hidden sm:flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{learnedCommands.size} / {examCommands.length}</p>
                <p className="text-xs text-muted-foreground">Commands Learned</p>
              </div>
              <div className="w-24">
                <Progress value={overallProgress} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="commands" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-auto p-1 gap-1">
            <TabsTrigger value="commands" className="gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Commands</span>
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Play className="h-4 w-4" />
              <span className="hidden sm:inline">Scenarios</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Practice</span>
            </TabsTrigger>
            <TabsTrigger value="technical" className="gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Wrench className="h-4 w-4" />
              <span className="hidden sm:inline">Technical</span>
            </TabsTrigger>
            <TabsTrigger value="berlin" className="gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Berlin</span>
            </TabsTrigger>
          </TabsList>

          {/* Commands Tab */}
          <TabsContent value="commands" className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Exam Commands</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Learn all the commands your examiner might say during the practical exam. 
              Click the <Volume2 className="h-4 w-4 inline mx-1" /> button to hear them in German!
            </p>

            <CategoryFilter
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              onClearAll={() => setSelectedCategories([])}
            />

            <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
              <span>Showing {filteredCommands.length} commands</span>
              <span>{learnedCommands.size} learned</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredCommands.map((command) => (
                <CommandCard
                  key={command.id}
                  command={command}
                  isLearned={learnedCommands.has(command.id)}
                  onToggleLearned={toggleLearned}
                />
              ))}
            </div>
          </TabsContent>

          {/* Scenarios Tab */}
          <TabsContent value="scenarios" className="space-y-6">
            <ScenariosPage />
          </TabsContent>

          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Practice Mode</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Test your understanding! Listen to German commands and see if you know what they mean.
            </p>

            <CategoryFilter
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
              onClearAll={() => setSelectedCategories([])}
            />

            <PracticeMode selectedCategories={selectedCategories} />
          </TabsContent>

          {/* Technical Tab */}
          <TabsContent value="technical" className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <Wrench className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Technical Questions</h2>
            </div>
            <p className="text-muted-foreground mb-6">
              Before you start driving, the examiner will ask you technical questions about the vehicle.
              Learn these to start your exam confidently!
            </p>

            {/* Tech Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {techCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedTechCategory(cat.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTechCategory === cat.value
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                  }`}
                >
                  {cat.label}
        </button>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {filteredTechQuestions.map((question) => (
                <TechnicalCard key={question.id} question={question} />
              ))}
            </div>
          </TabsContent>

          {/* Berlin Tab */}
          <TabsContent value="berlin">
            <BerlinTips />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              🚗 Good luck with your <span className="text-primary font-medium">Fahrprüfung</span>!
            </p>
            <p className="flex items-center gap-2">
              <span>Viel Erfolg!</span>
              <span className="text-primary">🍀</span>
        </p>
      </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
