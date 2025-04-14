
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Calendar, Clock, ListChecks, Sparkles, Target, RefreshCw } from "lucide-react";
import { executiveProfiles, getExecutiveDecisions } from "@/agents/executiveAgent";
import { ExecutiveDecision } from "@/types/agents";
import { format } from "date-fns";
import { runDailyExecutiveTasks } from "@/utils/daily-tasks/agentScheduler";
import { toast } from "sonner";

export default function ExecutiveAgents() {
  const [decisions, setDecisions] = useState<ExecutiveDecision[]>([]);
  const [loading, setLoading] = useState(true);
  const [runningTasks, setRunningTasks] = useState(false);
  const [activeTab, setActiveTab] = useState("recent");

  useEffect(() => {
    loadDecisions();
  }, []);

  const loadDecisions = async () => {
    setLoading(true);
    try {
      const fetchedDecisions = await getExecutiveDecisions();
      setDecisions(fetchedDecisions);
    } catch (error) {
      console.error("Failed to load executive decisions:", error);
      toast.error("Failed to load executive decisions");
    } finally {
      setLoading(false);
    }
  };

  const triggerAgentTasks = async () => {
    setRunningTasks(true);
    try {
      toast.info("Running executive tasks...");
      const result = await runDailyExecutiveTasks();
      
      toast.success(`Executive tasks completed: ${result.successCount} succeeded, ${result.failCount} failed`);
      // Reload decisions after running tasks
      await loadDecisions();
    } catch (error) {
      console.error("Failed to run executive tasks:", error);
      toast.error("Failed to run executive tasks");
    } finally {
      setRunningTasks(false);
    }
  };

  // Get unique executives that have made decisions
  const uniqueExecutives = Array.from(
    new Set(decisions.map(d => d.executiveName))
  );

  // Filter decisions based on the active tab
  const filteredDecisions = activeTab === "recent" 
    ? decisions 
    : decisions.filter(d => d.executiveName === activeTab);

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-100';
      case 'medium': return 'text-amber-500 bg-amber-100';
      case 'low': return 'text-green-500 bg-green-100';
      default: return 'text-blue-500 bg-blue-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">AI Executive Agents</h1>
          <p className="text-muted-foreground">
            Autonomous AI executives that make strategic decisions for your business
          </p>
        </div>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={loadDecisions}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h3 className="text-lg font-medium">Autonomous Decision Making</h3>
              <p className="text-sm text-muted-foreground">
                Your AI executives can autonomously analyze tasks and make strategic decisions
              </p>
            </div>
            <Button 
              onClick={triggerAgentTasks} 
              disabled={runningTasks}
              className="min-w-[180px]"
            >
              {runningTasks ? (
                <>
                  <BrainCircuit className="mr-2 h-4 w-4 animate-pulse" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Run Executive Tasks
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="recent" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="recent">Recent Decisions</TabsTrigger>
          {uniqueExecutives.map(exec => (
            <TabsTrigger key={exec} value={exec}>
              {exec}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {loading ? (
            <div className="flex justify-center p-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : filteredDecisions.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <BrainCircuit className="mx-auto h-12 w-12 text-muted-foreground/70" />
                <h3 className="mt-4 text-lg font-medium">No executive decisions yet</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                  Your AI executives will make autonomous decisions based on your business needs. Click "Run Executive Tasks" to trigger decision making.
                </p>
                <Button onClick={triggerAgentTasks} className="mt-4">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Run Executive Tasks
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredDecisions.map((decision) => (
              <Card key={decision.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-lg">{decision.task}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Badge variant="outline" className="mr-2">
                          {decision.executiveRole}
                        </Badge>
                        <span className="text-sm">{decision.executiveName}</span>
                      </CardDescription>
                    </div>
                    <Badge className={getPriorityColor(decision.priority)}>
                      {decision.priority || 'normal'} priority
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-1 flex items-center">
                      <Target className="mr-2 h-4 w-4 text-primary" /> Selected Strategy
                    </h4>
                    <p className="text-sm bg-primary/5 p-3 rounded">{decision.selectedOption}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1 flex items-center">
                      <ListChecks className="mr-2 h-4 w-4 text-primary" /> Other Options Considered
                    </h4>
                    <ul className="text-sm space-y-1">
                      {decision.options.filter(opt => opt !== decision.selectedOption).map((option, i) => (
                        <li key={i} className="text-muted-foreground">{option}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {decision.reasoning && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Reasoning</h4>
                      <p className="text-sm text-muted-foreground">{decision.reasoning}</p>
                    </div>
                  )}
                  
                  {decision.riskAssessment && (
                    <div>
                      <h4 className="text-sm font-medium mb-1">Risk Assessment</h4>
                      <p className="text-sm text-muted-foreground">{decision.riskAssessment}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t bg-muted/30 px-6 py-3">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    <span>
                      Generated on {format(new Date(decision.timestamp), 'MMM d, yyyy')} at {format(new Date(decision.timestamp), 'h:mm a')}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your AI Executive Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(executiveProfiles).map(([key, executive]) => (
            <Card key={key}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{executive.name}</CardTitle>
                <CardDescription>{executive.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {executive.expertise.map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Decision style: {executive.decisionStyle || 'balanced'}
                </p>
              </CardContent>
              <CardFooter className="border-t bg-muted/30 px-6 py-3">
                <Button size="sm" variant="outline" className="w-full" onClick={() => {
                  toast.info(`Assigned new task to ${executive.name}`);
                }}>
                  Assign Task
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
