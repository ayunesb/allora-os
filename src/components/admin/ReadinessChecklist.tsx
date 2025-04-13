import React, { useState, useEffect } from 'react';
import { 
  LaunchExecutionPlan, 
  LaunchPlanPhase, 
  LaunchPlanItem,
  generateLaunchPlan,
  executeLaunchPlan
} from '@/utils/launchPlanner';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, CheckCircle2, XCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { LaunchButton } from './launch-verification/LaunchButton';

export default function ReadinessChecklist() {
  const [plan, setPlan] = useState<LaunchExecutionPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [executing, setExecuting] = useState(false);
  const [validationResults, setValidationResults] = useState<any>(null);
  
  useEffect(() => {
    const loadPlan = async () => {
      try {
        const launchPlan = await generateLaunchPlan();
        setPlan(launchPlan);
      } catch (error) {
        console.error("Error generating launch plan:", error);
        toast.error("Failed to generate launch plan");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPlan();
  }, []);
  
  const handleExecutePlan = async () => {
    if (!plan) return;
    
    setExecuting(true);
    
    try {
      const results = await executeLaunchPlan(plan);
      setValidationResults(results.validationResults);
      
      if (results.success) {
        toast.success("Launch validation successful!");
      } else {
        toast.error("Launch validation found issues", {
          description: results.message
        });
      }
    } catch (error) {
      console.error("Error executing launch plan:", error);
      toast.error("Failed to execute launch plan");
    } finally {
      setExecuting(false);
    }
  };
  
  const calculatePhaseProgress = (phase: LaunchPlanPhase): number => {
    const completedItems = phase.items.filter(item => item.status === 'completed').length;
    const totalItems = phase.items.length;
    return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  };
  
  const calculateOverallProgress = (): number => {
    if (!plan) return 0;
    
    const allItems = plan.phases.flatMap(phase => phase.items);
    const completedItems = allItems.filter(item => item.status === 'completed').length;
    return allItems.length > 0 ? Math.round((completedItems / allItems.length) * 100) : 0;
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in_progress': return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'blocked': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Generating launch readiness plan...</p>
      </div>
    );
  }
  
  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <XCircle className="w-8 h-8 text-red-500 mb-4" />
        <p className="text-red-500 font-medium">Failed to generate launch plan</p>
        <Button 
          onClick={() => window.location.reload()} 
          variant="outline" 
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Launch Readiness</h2>
          <p className="text-muted-foreground">Track implementation progress for Allora AI launch</p>
        </div>
        
        <Button 
          onClick={handleExecutePlan}
          disabled={executing}
        >
          {executing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Executing...
            </>
          ) : (
            'Run Validation'
          )}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Launch Allora AI</CardTitle>
          <CardDescription>
            Initialize the platform with your company as the first customer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            This will set up Allora AI as its own first customer, generate initial strategies, 
            campaigns, and marketing materials to showcase the platform's capabilities.
          </p>
          <LaunchButton className="mt-4" />
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        {plan.phases.map((phase) => (
          <Card key={phase.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle>{phase.name}</CardTitle>
              <CardDescription>
                {phase.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-1">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span>{calculatePhaseProgress(phase)}% Complete</span>
                  <span>{phase.items.filter(i => i.status === 'completed').length}/{phase.items.length} Tasks</span>
                </div>
                <Progress value={calculatePhaseProgress(phase)} className="h-2" />
              </div>
              
              <Accordion type="single" collapsible className="w-full">
                {phase.items.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="hover:no-underline py-3">
                      <div className="flex items-center space-x-3 text-left">
                        <div className="flex-shrink-0">
                          {getStatusIcon(item.status)}
                        </div>
                        <div className="flex-grow">
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Badge className={`ml-auto ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-9 space-y-4 pb-2">
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-secondary/50">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="space-y-2">
                          <p className="text-sm font-medium">Completion Criteria</p>
                          <div className="space-y-2">
                            {item.completionCriteria.map((criteria, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <Checkbox 
                                  id={`criteria-${item.id}-${index}`} 
                                  checked={item.status === 'completed'}
                                  className="mt-0.5"
                                  disabled
                                />
                                <label 
                                  htmlFor={`criteria-${item.id}-${index}`}
                                  className="text-sm leading-tight"
                                >
                                  {criteria}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {item.dependencies && item.dependencies.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Dependencies</p>
                            <div className="space-y-1">
                              {item.dependencies.map((depId) => {
                                const dep = findDependency(plan, depId);
                                return (
                                  <div key={depId} className="flex items-center text-sm">
                                    <ChevronRight className="w-3 h-3 mr-1 text-muted-foreground" />
                                    <span>
                                      {dep ? dep.title : depId}
                                      {dep && dep.status === 'completed' && (
                                        <span className="ml-2 text-green-500">(Completed)</span>
                                      )}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {validationResults && (
        <Card>
          <CardHeader>
            <CardTitle>
              {validationResults.valid ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Launch Validation Successful
                </div>
              ) : (
                <div className="flex items-center text-red-600">
                  <XCircle className="w-5 h-5 mr-2" />
                  Launch Validation Failed
                </div>
              )}
            </CardTitle>
            <CardDescription>
              {validationResults.valid 
                ? "All systems are ready for launch."
                : "Some issues need to be resolved before launch."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {!validationResults.valid && (
                <div className="space-y-2">
                  <h3 className="font-medium">Issues Found:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {Object.entries(validationResults.results)
                      .filter(([_, result]: [string, any]) => !result.valid)
                      .map(([key, result]: [string, any]) => (
                        <li key={key} className="text-red-600">
                          {key}: {result.message}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
              
              <div className="space-y-2">
                <h3 className="font-medium">Validation Results:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  {Object.entries(validationResults.results).map(([key, result]: [string, any]) => (
                    <div key={key} className="flex items-center">
                      {result.valid ? (
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-500 mr-2" />
                      )}
                      <span>{formatValidationKey(key)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function findDependency(plan: LaunchExecutionPlan, depId: string): LaunchPlanItem | undefined {
  for (const phase of plan.phases) {
    const item = phase.items.find(item => item.id === depId);
    if (item) return item;
  }
  return undefined;
}

function formatValidationKey(key: string): string {
  return key
    .split(/(?=[A-Z])/)
    .join(' ')
    .split('_')
    .join(' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}
