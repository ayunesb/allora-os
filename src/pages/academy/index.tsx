
import { useEffect, useState } from 'react';
import { DashboardBreadcrumb } from '@/components/ui/dashboard-breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface AgentWin {
  agent_id: string;
  description: string;
  xp: number;
  created_at: string;
}

export default function AcademyPage() {
  const [wins, setWins] = useState<AgentWin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    
    async function fetchWins() {
      try {
        const { data, error } = await supabase.functions.invoke('academy-wins');
        
        if (error) {
          console.error('Error loading agent wins:', error);
          setWins([]);
        } else {
          setWins(data || []);
        }
      } catch (err) {
        console.error('Failed to fetch agent wins:', err);
        setWins([]);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchWins();
  }, []);

  return (
    <div className="container py-8">
      <DashboardBreadcrumb />
      
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-6 w-6 text-yellow-500" />
        <h1 className="text-3xl font-bold">AI Academy</h1>
      </div>
      
      <p className="text-muted-foreground mb-8">
        Top agents and their most impactful decisions across all tenants.
      </p>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-6 w-1/3 bg-muted rounded mb-2"></div>
                <div className="h-4 w-full bg-muted rounded-sm mb-2"></div>
                <div className="h-4 w-2/3 bg-muted rounded-sm"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : wins.length > 0 ? (
        <ul className="space-y-4">
          {wins.map((win) => (
            <Card 
              key={win.agent_id + win.created_at}
              className="border border-border hover:border-primary/50 transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-lg font-semibold">{win.agent_id.replace(/_/g, ' ')}</p>
                  <span className="text-sm text-muted-foreground">{new Date(win.created_at).toLocaleDateString()}</span>
                </div>
                <p className="text-muted-foreground">{win.description}</p>
                <p className="text-xs mt-3 text-green-400 font-semibold flex items-center gap-1">
                  <Trophy className="h-3 w-3" />
                  +{win.xp} XP
                </p>
              </CardContent>
            </Card>
          ))}
        </ul>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No agent wins recorded yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
