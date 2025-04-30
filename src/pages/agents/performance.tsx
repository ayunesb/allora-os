
import { useEffect, useState } from 'react';
import { fetchApi } from '@/utils/api/apiClient';
import { PageTitle } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';

interface AgentPerformance {
  id: string;
  name: string;
  xp: number;
  success_rate: number;
}

export default function AgentPerformancePage() {
  const [agents, setAgents] = useState<AgentPerformance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const res = await fetchApi<AgentPerformance[]>('/api/agent-performance');
        setAgents(res);
        setError(null);
      } catch (err) {
        console.error('Failed to load agent performance', err);
        setError('Failed to load agent performance data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <PageTitle title="Agent Leaderboard" description="Performance metrics for AI executive agents" />
      
      {isLoading && (
        <div className="flex justify-center my-12">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}
      
      {error && (
        <Card className="bg-red-50 border-red-200 my-4">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}
      
      {!isLoading && !error && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map(agent => (
            <Card key={agent.id} className={`overflow-hidden transition-all duration-300 ${
              agent.success_rate > 90 ? 'border-green-400' : 
              agent.success_rate > 70 ? 'border-yellow-400' : 'border-red-400'
            }`}>
              <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold mb-2">{agent.name}</h3>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">XP Points</span>
                  <span className="font-semibold">{agent.xp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Success Rate</span>
                  <span className={`font-semibold ${
                    agent.success_rate > 90 ? 'text-green-600' : 
                    agent.success_rate > 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {agent.success_rate}%
                  </span>
                </div>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      agent.success_rate > 90 ? 'bg-green-600' : 
                      agent.success_rate > 70 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} 
                    style={{ width: `${agent.success_rate}%` }}>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
