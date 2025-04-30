
import { useEffect, useState } from 'react';
import { DashboardBreadcrumb } from '@/components/ui/dashboard-breadcrumb';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, AlertCircle, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import AdminOnly from '@/components/AdminOnly';

interface AgentWin {
  id: string;
  agent_id: string;
  description: string;
  xp: number;
  created_at: string;
  is_published: boolean;
}

export default function PublishingDashboard() {
  const [wins, setWins] = useState<AgentWin[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchUnpublishedWins();
  }, []);

  const fetchUnpublishedWins = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('admin-unpublished-wins');
      
      if (error) {
        console.error('Error loading unpublished wins:', error);
        toast.error('Failed to load unpublished wins');
        setWins([]);
      } else {
        setWins(data || []);
      }
    } catch (err) {
      console.error('Failed to fetch unpublished wins:', err);
      toast.error('An error occurred while loading the data');
      setWins([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async (id: string) => {
    setIsPublishing(prev => ({ ...prev, [id]: true }));
    
    try {
      const { error } = await supabase.functions.invoke('admin-unpublished-wins', {
        method: 'POST',
        body: { id }
      });
      
      if (error) {
        toast.error('Failed to publish win');
        console.error('Error publishing win:', error);
      } else {
        toast.success('Win published successfully');
        // Remove the published win from the list
        setWins(wins.filter(win => win.id !== id));
      }
    } catch (err) {
      console.error('Error in publish process:', err);
      toast.error('An unexpected error occurred');
    } finally {
      setIsPublishing(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <AdminOnly>
      <div className="container py-8">
        <DashboardBreadcrumb />
        
        <div className="flex items-center gap-2 mb-6">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <h1 className="text-3xl font-bold">Publish Agent Wins</h1>
        </div>
        
        <p className="text-muted-foreground mb-8">
          Review and publish notable agent achievements to be displayed in the Academy.
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
                key={win.id}
                className="border border-border hover:border-primary/30 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <p className="text-lg font-semibold">{win.agent_id.replace(/_/g, ' ')}</p>
                      <p className="text-muted-foreground">{win.description}</p>
                      <p className="text-xs mt-3 text-green-400 font-semibold flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        +{win.xp} XP
                      </p>
                    </div>
                    <Button 
                      onClick={() => handlePublish(win.id)}
                      disabled={isPublishing[win.id]}
                      className="ml-4"
                    >
                      {isPublishing[win.id] ? (
                        <span className="flex items-center gap-1">
                          <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                          Publishing...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Check className="h-4 w-4" />
                          Publish
                        </span>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ul>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <AlertCircle className="h-12 w-12 text-muted-foreground" />
                <p className="text-muted-foreground">No unpublished agent wins to review.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminOnly>
  );
}
