import { useQuery } from "@tanstack/react-query";
import { fetchAILogs } from "@/lib/api";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
export default function AgentPerformance() {
  const { data, isLoading } = useQuery(["ai_logs"], fetchAILogs);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="space-y-4">
      {data?.map((log) => (
        <Card key={log.id}>
          <CardHeader className="text-sm text-muted-foreground">
            {log.created_at}
          </CardHeader>
          <CardContent>
            <p>
              <strong>Agent:</strong> {log.agent_id}
            </p>
            <p>
              <strong>Action:</strong> {log.action}
            </p>
            <pre className="text-xs mt-2">
              {JSON.stringify(log.output, null, 2)}
            </pre>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
