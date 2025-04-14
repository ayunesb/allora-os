
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from 'react';
import { MessageSquare, Brain, Sparkles, Target, BarChart3 } from 'lucide-react';
import { executiveProfiles } from '@/agents/executiveAgent';
import { toast } from 'sonner';
import { ExecutiveMemory } from '@/components/executives/ExecutiveMemory';

export default function ExecutiveProfile() {
  const { name } = useParams<{ name: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Find the executive profile by name
  const executive = Object.values(executiveProfiles).find(
    exec => exec.name === name
  );
  
  if (!executive) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Executive Not Found</h1>
        <p>The executive profile you're looking for doesn't exist.</p>
      </div>
    );
  }
  
  const handleNewTask = () => {
    toast.info(`Creating a new task for ${executive.name}...`);
    // Implement task creation here
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">{executive.name}</h1>
          <p className="text-muted-foreground">{executive.role}</p>
        </div>
        <Button onClick={handleNewTask}>
          <MessageSquare className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Executive Profile</CardTitle>
              <CardDescription>Key information about {executive.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Role</h3>
                  <p className="text-muted-foreground">{executive.role}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Decision Style</h3>
                  <p className="text-muted-foreground">{executive.decisionStyle || 'Balanced'}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Areas of Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {executive.expertise.map((skill, idx) => (
                      <Badge key={idx} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {executive.personality && (
                  <div>
                    <h3 className="text-sm font-medium mb-1">Personality</h3>
                    <p className="text-muted-foreground">{executive.personality}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ExecutiveMemory executiveName={executive.name} />
          </div>
        </TabsContent>
        
        <TabsContent value="memory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                Memory System
              </CardTitle>
              <CardDescription>
                How {executive.name} remembers past decisions and interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                The executive memory system allows AI executives to recall past decisions,
                learn from experience, and maintain consistency across interactions.
              </p>
              
              <div className="rounded-md bg-secondary p-4">
                <h4 className="font-medium mb-2">How Executive Memory Works</h4>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Every decision is stored in the executive's memory</li>
                  <li>Past decisions influence future reasoning</li>
                  <li>Memory enables consistency and learning over time</li>
                  <li>Context-aware decisions improve with more interactions</li>
                </ol>
              </div>
            </CardContent>
          </Card>
          
          <ExecutiveMemory executiveName={executive.name} />
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="mr-2 h-5 w-5" />
                Performance Metrics
              </CardTitle>
              <CardDescription>
                Measuring the impact of {executive.name}'s decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Performance metrics coming soon. This feature will track decision outcomes,
                accuracy, and business impact over time.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Recent Tasks
              </CardTitle>
              <CardDescription>
                Tasks assigned to {executive.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No tasks have been assigned yet. Use the "New Task" button to create one.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
