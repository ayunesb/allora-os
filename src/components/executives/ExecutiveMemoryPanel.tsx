import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchRecentMemories } from "@/services/memoryService";
import { useAuth } from "@/context/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { Brain } from "lucide-react";
export function ExecutiveMemoryPanel() {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    async function loadMemories() {
      if (!user?.id) return;
      setLoading(true);
      try {
        const recentMemories = await fetchRecentMemories(user.id, undefined, 5);
        setMemories(recentMemories);
      } catch (error) {
        console.error("Failed to load executive memories:", error);
      } finally {
        setLoading(false);
      }
    }
    loadMemories();
    // Refresh memories every minute
    const interval = setInterval(loadMemories, 60000);
    return () => clearInterval(interval);
  }, [user?.id]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="mr-2 h-5 w-5" />
          Executive Memory
        </CardTitle>
        <CardDescription>
          Recent decisions across all executives
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-4 text-center text-muted-foreground">
            Loading memories...
          </div>
        ) : memories.length === 0 ? (
          <div className="py-4 text-center text-muted-foreground">
            No executive memories yet. Memories will appear here as your
            executives make decisions.
          </div>
        ) : (
          <div className="space-y-4">
            {memories.map((memory) => (
              <div key={memory.id} className="border-b pb-3 last:border-0">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{memory.executive_name}</span>
                  <span className="text-xs text-muted-foreground">
                    {memory.timestamp &&
                      formatDistanceToNow(new Date(memory.timestamp), {
                        addSuffix: true,
                      })}
                  </span>
                </div>
                <p className="text-sm mb-1">
                  <span className="text-muted-foreground">Task:</span>{" "}
                  {memory.task}
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Decision:</span>{" "}
                  {memory.decision}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
