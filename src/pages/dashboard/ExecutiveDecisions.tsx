
import React, { useState, useEffect } from 'react';
import { PageTitle } from "@/components/ui/page-title";
import { getExecutiveDecisions } from "@/agents/decisionService";
import { ExecutiveDecision } from "@/types/agents";
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ExecutiveDecisions() {
  const [decisions, setDecisions] = useState<ExecutiveDecision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDecisions() {
      try {
        setLoading(true);
        const decisionsData = await getExecutiveDecisions();
        setDecisions(decisionsData);
        setError(null);
      } catch (err) {
        console.error("Failed to load executive decisions:", err);
        setError("Could not load executive decisions. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadDecisions();
  }, []);

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="container mx-auto py-6">
      <PageTitle 
        title="Executive Decision Log" 
        description="Review decisions made by your AI executive team"
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <Card className="p-6 bg-red-50 border border-red-200 text-red-800">
          <p>{error}</p>
        </Card>
      ) : decisions.length === 0 ? (
        <Card className="p-8 text-center">
          <h3 className="text-xl font-medium mb-2">No decisions yet</h3>
          <p className="text-muted-foreground">
            Your AI executives haven't made any decisions yet. 
            They will automatically analyze business situations and record their decisions here.
          </p>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Executive</TableHead>
                <TableHead>Task</TableHead>
                <TableHead>Decision</TableHead>
                <TableHead>Risk Assessment</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {decisions.map((decision) => (
                <TableRow key={decision.id}>
                  <TableCell className="font-medium">
                    <div>{decision.executiveName}</div>
                    <div className="text-xs text-muted-foreground">{decision.executiveRole}</div>
                  </TableCell>
                  <TableCell>{decision.task}</TableCell>
                  <TableCell>
                    <div className="font-medium">{decision.selectedOption}</div>
                    <div className="text-sm text-muted-foreground mt-1">{decision.reasoning}</div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    {decision.riskAssessment || "No risk assessment"}
                  </TableCell>
                  <TableCell>
                    {decision.priority && (
                      <Badge className={getPriorityColor(decision.priority)}>
                        {decision.priority}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {new Date(decision.timestamp).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
