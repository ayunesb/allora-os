
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { executiveProfiles, getExecutiveDecisions, runExecutiveAgent } from '@/agents/executiveAgent';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Brain, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useToast } from "@/components/ui/use-toast";
import { ExecutiveDecision } from '@/types/agents';
import { BrainCircuit } from 'lucide-react';

export default function ExecutiveAgents() {
  const [selectedExecutive, setSelectedExecutive] = useState(executiveProfiles.ceo);
  const [task, setTask] = useState("");
  const [running, setRunning] = useState(false);
  const { toast } = useToast();

  // Fetch executive decisions from the database
  const { data: decisions, isLoading, error, refetch } = useQuery({
    queryKey: ['executiveDecisions'],
    queryFn: getExecutiveDecisions,
  });

  const handleRunAgent = async () => {
    if (!task.trim()) {
      toast({
        title: "Task Required",
        description: "Please enter a task for the executive to analyze.",
        variant: "destructive",
      });
      return;
    }

    setRunning(true);
    try {
      await runExecutiveAgent(selectedExecutive, task, { saveToDatabase: true });
      toast({
        title: "Decision Made",
        description: `${selectedExecutive.name} has analyzed your task and made a decision.`,
        variant: "default",
      });
      setTask("");
      refetch();
    } catch (error) {
      console.error('Error running executive agent:', error);
      toast({
        title: "Process Failed",
        description: "The executive was unable to complete the analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setRunning(false);
    }
  };

  return (
    <PageErrorBoundary pageName="Executive Agents">
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Executive Agents</h1>
            <p className="text-muted-foreground">Autonomous decision-making executives for your business challenges</p>
          </div>
          <Button variant="default" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Daily Tasks
          </Button>
        </div>

        <Tabs defaultValue="run-agent" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="run-agent">Run Agent</TabsTrigger>
            <TabsTrigger value="decisions">
              Past Decisions
              {decisions?.length ? (
                <Badge variant="secondary" className="ml-2">{decisions.length}</Badge>
              ) : null}
            </TabsTrigger>
            <TabsTrigger value="executives">Executives</TabsTrigger>
          </TabsList>

          <TabsContent value="run-agent">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Executive Task</CardTitle>
                  <CardDescription>
                    Submit a business challenge for {selectedExecutive.name} to analyze
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 mb-6">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={`/executives/${selectedExecutive.role.toLowerCase().replace(/\s+/g, '-')}.png`} alt={selectedExecutive.name} />
                      <AvatarFallback>{selectedExecutive.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{selectedExecutive.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedExecutive.role}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="task" className="block text-sm font-medium mb-1">
                        Business Challenge
                      </label>
                      <textarea
                        id="task"
                        className="w-full min-h-[120px] p-3 border rounded-md"
                        placeholder="Describe the business challenge or task for analysis..."
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setTask("")} disabled={running || !task}>
                    Clear
                  </Button>
                  <Button onClick={handleRunAgent} disabled={running || !task} className="gap-2">
                    {running ? (
                      <>
                        <span className="animate-spin">
                          <Brain className="h-4 w-4" />
                        </span>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <BrainCircuit className="h-4 w-4" />
                        Run Analysis
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Executive Team</CardTitle>
                  <CardDescription>
                    Select an executive to analyze your task
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.values(executiveProfiles).map((executive) => (
                    <div
                      key={executive.name}
                      className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
                        selectedExecutive.name === executive.name
                          ? 'bg-primary/10 border border-primary/20'
                          : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedExecutive(executive)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/executives/${executive.role.toLowerCase().replace(/\s+/g, '-')}.png`} alt={executive.name} />
                        <AvatarFallback>{executive.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{executive.name}</p>
                        <p className="text-xs text-muted-foreground">{executive.role}</p>
                      </div>
                      <Badge variant={
                        executive.decisionStyle === 'conservative' ? 'outline' :
                        executive.decisionStyle === 'aggressive' ? 'destructive' : 'secondary'
                      }>
                        {executive.decisionStyle}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="decisions">
            <div className="space-y-6">
              {isLoading ? (
                <div className="flex justify-center items-center p-12">
                  <div className="animate-spin mr-2">
                    <Clock className="h-6 w-6" />
                  </div>
                  <p>Loading decisions...</p>
                </div>
              ) : error ? (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Failed to load executive decisions.</AlertDescription>
                </Alert>
              ) : decisions?.length === 0 ? (
                <div className="text-center p-12 bg-muted/50 rounded-lg">
                  <BrainCircuit className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No decisions yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Your executive team hasn't made any decisions yet. Try submitting a task for analysis.
                  </p>
                  <Button onClick={() => document.querySelector('[data-value="run-agent"]')?.dispatchEvent(new Event('click'))}>
                    Create Your First Task
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {decisions?.map((decision: ExecutiveDecision) => (
                    <DecisionCard key={decision.id} decision={decision} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="executives">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.values(executiveProfiles).map((executive) => (
                <Card key={executive.name}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/executives/${executive.role.toLowerCase().replace(/\s+/g, '-')}.png`} alt={executive.name} />
                        <AvatarFallback>{executive.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <Badge variant={
                        executive.decisionStyle === 'conservative' ? 'outline' :
                        executive.decisionStyle === 'aggressive' ? 'destructive' : 'secondary'
                      }>
                        {executive.decisionStyle}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4">{executive.name}</CardTitle>
                    <CardDescription>{executive.role}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Areas of Expertise:</h4>
                      <div className="flex flex-wrap gap-2">
                        {executive.expertise.map((skill) => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={() => {
                        setSelectedExecutive(executive);
                        document.querySelector('[data-value="run-agent"]')?.dispatchEvent(new Event('click'));
                      }}
                    >
                      Select Executive
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageErrorBoundary>
  );
}

function DecisionCard({ decision }: { decision: ExecutiveDecision }) {
  const [expanded, setExpanded] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={`/executives/${decision.executiveRole.toLowerCase().replace(/\s+/g, '-')}.png`} alt={decision.executiveName} />
              <AvatarFallback>{decision.executiveName.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{decision.executiveName}</CardTitle>
              <CardDescription>{decision.executiveRole}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={
              decision.priority === 'high' ? 'destructive' :
              decision.priority === 'low' ? 'outline' : 'secondary'
            }>
              {decision.priority || 'medium'} priority
            </Badge>
            <div className="text-xs text-muted-foreground">
              {formatDate(decision.timestamp)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">Task:</h3>
            <p className="text-sm">{decision.task}</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Options Considered:</h3>
            <ul className="list-disc pl-5 space-y-1">
              {decision.options.map((option, i) => (
                <li key={i} className="text-sm">
                  {option === decision.selectedOption ? (
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-1 inline-block" />
                      <span className="font-medium">{option}</span>
                    </div>
                  ) : option}
                </li>
              ))}
            </ul>
          </div>
          
          {expanded && (
            <>
              <div>
                <h3 className="font-medium mb-1">Selected Option:</h3>
                <p className="text-sm font-medium">{decision.selectedOption}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Reasoning:</h3>
                <p className="text-sm">{decision.reasoning}</p>
              </div>
              
              {decision.riskAssessment && (
                <div>
                  <h3 className="font-medium mb-1">Risk Assessment:</h3>
                  <p className="text-sm">{decision.riskAssessment}</p>
                </div>
              )}
            </>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-muted-foreground"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "Show Full Analysis"}
        </Button>
      </CardFooter>
    </Card>
  );
}
