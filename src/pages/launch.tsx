
import { Button } from '@/components/ui/button';
import { Check, Sparkles, Rocket, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  'AI CEO + Strategy Generator',
  'One-click Campaign Deployment',
  'Public Vault + Strategy Remix',
  'Agent Wins + Auto-Tweeting',
  'Plugin ROI & Usage-Based Billing',
  'Visual Campaign Builder',
  'Conversational AI Shopping Assistant'
];

export default function LaunchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-black/60 to-background text-white px-6 py-12 flex flex-col items-center justify-center">
      <Rocket className="h-12 w-12 text-primary mb-4 animate-pulse" />
      <h1 className="text-4xl font-bold tracking-tight text-center mb-2">
        Allora OS Galaxy v2.5 is Live
      </h1>
      <p className="text-lg text-muted-foreground text-center max-w-xl mb-6">
        Build, scale, and automate your entire business using 90% AI — from strategy to execution, reporting to sales, and everything in between.
      </p>

      <div className="mb-8 text-left space-y-2">
        {features.map((f) => (
          <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="text-green-400 h-4 w-4" />
            {f}
          </div>
        ))}
      </div>

      <Link to="/onboarding">
        <Button size="lg" className="text-white text-lg px-6 py-4 font-semibold">
          Get Started
        </Button>
      </Link>

      <p className="mt-6 text-xs text-muted-foreground text-center">
        Powered by AI agents, Supabase, ShadCN, and you. Welcome to the future of company-building.
      </p>
    </div>
  );
}
