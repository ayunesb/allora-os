
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUser } from "@/hooks/useUser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, BarChart3, ChevronRight, Clock, Coins, LineChart, ListChecks, Zap } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import AlertMessage from "@/components/ui/AlertMessage";

// Form schema
const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  companySize: z.string().min(1, "Company size is required"),
  revenue: z.string().min(1, "Revenue is required"),
  goals: z.string().min(10, "Please provide more details about your goals"),
  riskTolerance: z.string().min(1, "Risk tolerance is required"),
  timeHorizon: z.string().min(1, "Time horizon is required"),
  challenges: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface Strategy {
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  estimatedROI: string;
  riskLevel: "Low" | "Medium" | "High";
  timeline: string;
  implementationSteps: string[];
}

export function StrategyGenerator() {
  const { user } = useUser();
  const [strategies, setStrategies] = useState<Strategy[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with defaults based on user profile
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: user?.company || "",
      industry: user?.industry || "",
      companySize: "",
      revenue: "",
      goals: "",
      riskTolerance: "5",
      timeHorizon: "Medium-term (6-12 months)",
      challenges: "",
    },
  });

  async function onSubmit(data: FormValues) {
    setIsGenerating(true);
    setError(null);
    setStrategies(null);
    
    try {
      const { data: generatedStrategies, error: apiError } = await supabase.functions.invoke("generate-strategies", {
        body: {
          ...data,
          userId: user?.id,
          companyId: user?.company_id,
        },
      });

      if (apiError) {
        throw new Error(apiError.message || "Failed to generate strategies");
      }

      if (!generatedStrategies || !Array.isArray(generatedStrategies)) {
        throw new Error("Invalid response format from the strategy generator");
      }

      setStrategies(generatedStrategies);
      toast.success("Strategy options generated successfully");
    } catch (err: any) {
      console.error("Strategy generation error:", err);
      setError(err.message || "Failed to generate strategies. Please try again.");
      toast.error("Failed to generate strategies");
    } finally {
      setIsGenerating(false);
    }
  }

  function getRiskColor(risk: "Low" | "Medium" | "High") {
    switch (risk) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Executive Strategy Generator</h2>
        <p className="text-muted-foreground">Generate AI-powered strategic initiatives for your business</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
            <CardDescription>Provide information about your business to generate tailored strategies</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Acme Inc." />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Hospitality">Hospitality</SelectItem>
                          <SelectItem value="Real Estate">Real Estate</SelectItem>
                          <SelectItem value="Entertainment">Entertainment</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select company size" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="51-200">51-200 employees</SelectItem>
                          <SelectItem value="201-500">201-500 employees</SelectItem>
                          <SelectItem value="501-1000">501-1000 employees</SelectItem>
                          <SelectItem value="1000+">1000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="revenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Revenue</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select annual revenue" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="< $100K">Less than $100K</SelectItem>
                          <SelectItem value="$100K-$500K">$100K-$500K</SelectItem>
                          <SelectItem value="$500K-$1M">$500K-$1M</SelectItem>
                          <SelectItem value="$1M-$5M">$1M-$5M</SelectItem>
                          <SelectItem value="$5M-$10M">$5M-$10M</SelectItem>
                          <SelectItem value="$10M-$50M">$10M-$50M</SelectItem>
                          <SelectItem value="$50M+">$50M+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Goals</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Describe your primary business goals and objectives" 
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="riskTolerance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Risk Tolerance (1-10)</FormLabel>
                      <div className="pt-2">
                        <FormControl>
                          <div className="space-y-1">
                            <Slider
                              min={1}
                              max={10}
                              step={1}
                              defaultValue={[parseInt(field.value) || 5]}
                              onValueChange={(vals) => field.onChange(vals[0].toString())}
                            />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Conservative (1)</span>
                              <span>Balanced (5)</span>
                              <span>Aggressive (10)</span>
                            </div>
                          </div>
                        </FormControl>
                      </div>
                      <FormDescription>
                        Current value: {field.value}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeHorizon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Horizon</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select time horizon" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Short-term (3-6 months)">Short-term (3-6 months)</SelectItem>
                          <SelectItem value="Medium-term (6-12 months)">Medium-term (6-12 months)</SelectItem>
                          <SelectItem value="Long-term (1-3 years)">Long-term (1-3 years)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="challenges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Challenges (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Describe any specific challenges your business is facing" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isGenerating} className="w-full">
                  {isGenerating ? "Generating Strategies..." : "Generate Strategic Options"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="lg:col-span-2">
          {isGenerating && (
            <div className="space-y-6">
              <h3 className="text-xl font-medium">Generating strategies...</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-8 w-3/4" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {error && <AlertMessage title="Error" description={error} />}

          {!isGenerating && !error && strategies && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Strategic Options</h3>
              <Tabs defaultValue="strategy-0" className="space-y-6">
                <TabsList className="grid grid-cols-3">
                  {strategies.map((_, i) => (
                    <TabsTrigger key={i} value={`strategy-${i}`}>
                      Strategy {i + 1}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {strategies.map((strategy, i) => (
                  <TabsContent key={i} value={`strategy-${i}`} className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xl">{strategy.title}</CardTitle>
                          <Badge className={getRiskColor(strategy.riskLevel)}>
                            {strategy.riskLevel} Risk
                          </Badge>
                        </div>
                        <CardDescription className="pt-2">{strategy.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <h4 className="font-medium flex items-center gap-2">
                                <Coins className="h-4 w-4" /> 
                                Estimated ROI
                              </h4>
                              <p className="text-muted-foreground">{strategy.estimatedROI}</p>
                            </div>
                            <div className="space-y-3">
                              <h4 className="font-medium flex items-center gap-2">
                                <Clock className="h-4 w-4" /> 
                                Timeline
                              </h4>
                              <p className="text-muted-foreground">{strategy.timeline}</p>
                            </div>
                          </div>

                          <Separator />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <h4 className="font-medium flex items-center gap-2">
                                <Zap className="h-4 w-4" /> 
                                Pros
                              </h4>
                              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                {strategy.pros.map((pro, i) => (
                                  <li key={i}>{pro}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="space-y-3">
                              <h4 className="font-medium flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" /> 
                                Cons
                              </h4>
                              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                {strategy.cons.map((con, i) => (
                                  <li key={i}>{con}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div className="space-y-3">
                            <h4 className="font-medium flex items-center gap-2">
                              <ListChecks className="h-4 w-4" /> 
                              Implementation Steps
                            </h4>
                            <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
                              {strategy.implementationSteps.map((step, i) => (
                                <li key={i}>{step}</li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button variant="outline">
                          Save to Strategy Board
                        </Button>
                        <Button className="ml-2">
                          Implement Strategy <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}

          {!isGenerating && !error && !strategies && (
            <div className="flex h-full flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <div className="mx-auto flex flex-col items-center justify-center text-center">
                <BarChart3 className="h-10 w-10 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No strategies yet</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                  Fill out the form to generate AI-powered strategic options for your business
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
