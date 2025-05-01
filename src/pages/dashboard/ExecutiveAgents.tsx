import React, { useState, useEffect } from "react";
import { PageTitle } from "@/components/ui/page-title";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Calendar, Clock, ListChecks, Sparkles, Target, RefreshCw } from "lucide-react";
import { executiveProfiles } from "@/agents/agentProfiles";
import { getExecutiveDecisions } from "@/agents/executiveMemory";
import { ExecutiveDecision } from "@/types/agents";
import { format } from "date-fns";
import { runExecutiveAgent } from "@/agents/executiveAgent";
import { useAuth } from "@/context/AuthContext";

export default function ExecutiveAgents() {
  const [decisions, setDecisions] = useState<ExecutiveDecision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [task, setTask] = useState("");
  const [selectedExecutive, setSelectedExecutive] = useState(executiveProfiles.cmo);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    async function loadDecisions() {
      try {
        setLoading(true);
        const decisionsData = await getExecutiveDecisions(user?.id || "");
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
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!task.trim()) {
      toast({
        title: "Please enter a task",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const newDecision = await runExecutiveAgent(task, selectedExecutive);
      setDecisions([newDecision, ...decisions]);
      setTask("");
      toast({
        title: "Decision generated successfully!",
        description: "Check the logs below.",
      });
    } catch (err) {
      console.error("Failed to run executive agent:", err);
      toast({
        title: "Failed to generate decision",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <PageTitle
        title="AI Executive Agents"
        description="Delegate tasks to AI executives for strategic decision-making"
      />

      <Card className="w-full">
        <CardHeader>
          <CardTitle>New Task</CardTitle>
          <CardDescription>
            Submit a task for an AI executive to analyze and decide.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <label htmlFor="task">Task Description</label>
              <input
                type="text"
                id="task"
                placeholder="e.g., Analyze Q3 marketing performance"
                className="border rounded px-3 py-2 w-full"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="executive">Select Executive</label>
              <select
                id="executive"
                className="border rounded px-3 py-2 w-full"
                value={selectedExecutive.name}
                onChange={(e) => {
                  const executiveName = e.target.value;
                  const executive = Object.values(executiveProfiles).find(
                    (profile) => profile.name === executiveName
                  );
                  if (executive) {
                    setSelectedExecutive(executive);
                  }
                }}
              >
                {Object.values(executiveProfiles).map((profile) => (
                  <option key={profile.name} value={profile.name}>
                    {profile.name} ({profile.role})
                  </option>
                ))}
              </select>
            </div>

            <Button disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Generate Decision"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Recent Decisions
        </h2>
        <p className="text-muted-foreground">
          Review decisions made by your AI executive team.
        </p>

        {loading && <p>Loading decisions...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="grid gap-4 mt-4">
          {decisions.map((decision) => (
            <Card key={decision.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {decision.executiveName} - {decision.task}
                </CardTitle>
                <Badge variant="secondary">
                  <Clock className="h-4 w-4 mr-2" />
                  {format(new Date(decision.timestamp), "MMM dd, yyyy HH:mm")}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <BrainCircuit className="h-4 w-4 text-gray-500" />
                    <span>
                      <strong>Executive:</strong> {decision.executiveName} (
                      {decision.executiveRole})
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ListChecks className="h-4 w-4 text-gray-500" />
                    <span>
                      <strong>Decision:</strong> {decision.selectedOption}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-gray-500" />
                    <span>
                      <strong>Reasoning:</strong> {decision.reasoning}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="h-4 w-4 text-gray-500" />
                    <span>
                      <strong>Risk Assessment:</strong> {decision.riskAssessment}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
