import { MapPin, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { berlinSpecificTips } from '@/data/examCommands';

export function BerlinTips() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/20">
          <MapPin className="h-6 w-6 text-red-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold gradient-text">Berlin-Specific Tips</h2>
          <p className="text-muted-foreground">Important things to know for driving in Berlin</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {berlinSpecificTips.map((tip, index) => (
          <Card key={index} className="card-hover overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <AlertTriangle className="h-5 w-5 text-primary" />
                {tip.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground italic">{tip.german}</p>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/90">{tip.tip}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Berlin Exam Info */}
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🏛️</span>
            About the Berlin Practical Exam
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-semibold text-primary">Duration</h4>
              <p className="text-sm text-muted-foreground">
                Approximately 45-55 minutes of driving
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-primary">Technical Questions</h4>
              <p className="text-sm text-muted-foreground">
                Asked before driving begins (3-5 questions)
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-primary">Required Documents</h4>
              <p className="text-sm text-muted-foreground">
                Valid ID/Passport, Theory test certificate, Eye test certificate
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-primary">Examiner Language</h4>
              <p className="text-sm text-muted-foreground">
                German only (interpreter allowed with prior approval)
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <h4 className="font-semibold text-red-400 mb-2">⚠️ Common Reasons for Failing in Berlin</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Not checking blind spots (Schulterblick) before turning</li>
              <li>• Ignoring cyclists in bike lanes when turning right</li>
              <li>• Not yielding to trams</li>
              <li>• Driving too fast in 30 km/h zones</li>
              <li>• Incorrect behavior at roundabouts</li>
              <li>• Not stopping fully at stop signs</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

