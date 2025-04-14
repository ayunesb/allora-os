
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/context/AuthContext';
import { type ExecutiveMemory, fetchRecentMemories } from '@/services/memoryService';
import { formatDistanceToNow } from 'date-fns';
import { Scroll, Brain } from 'lucide-react';

export function ExecutiveMemory({ executiveName }: { executiveName?: string }) {
  const [memories, setMemories] = useState<ExecutiveMemory[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function loadMemories() {
      if (!user?.id) return;
      
      setLoading(true);
      const recentMemories = await fetchRecentMemories(
        user.id,
        executiveName,
        10
      );
      setMemories(recentMemories);
      setLoading(false);
    }

    loadMemories();
  }, [user?.id, executiveName]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5" />
            Executive Memory
          </CardTitle>
          <CardDescription>
            Loading executive memories...
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!memories.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="mr-2 h-5 w-5" />
            Executive Memory
          </CardTitle>
          <CardDescription>
            No memories found for this executive
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm">
            As your AI executives make decisions, they will remember them for future reference.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="mr-2 h-5 w-5" />
          Executive Memory
        </CardTitle>
        <CardDescription>
          {executiveName ? `${executiveName}'s past decisions` : 'Recent decisions across executives'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {memories.map((memory) => (
            <div key={memory.id} className="border-b pb-3 last:border-0">
              <div className="flex justify-between mb-1">
                <span className="font-medium">{memory.executive_name}</span>
                <span className="text-xs text-muted-foreground">
                  {memory.timestamp && formatDistanceToNow(new Date(memory.timestamp), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm mb-1">
                <span className="text-muted-foreground">Task:</span> {memory.task}
              </p>
              <p className="text-sm">
                <span className="text-muted-foreground">Decision:</span> {memory.decision}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ExecutiveMemory;
