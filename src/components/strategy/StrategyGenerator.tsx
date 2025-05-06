import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  AlertCircle,
  BarChart2,
  CheckCircle,
  ChevronRight,
  Clock,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { supabase } from "@/integrations/supabase/client";
// Define the schema for the form
const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  companySize: z.string().min(1, "Company size is required"),
  revenue: z.string().min(1, "Annual revenue is required"),
  goals: z.string().min(10, "Business goals must be at least 10 characters"),
  riskTolerance: z.string().min(1, "Risk tolerance is required"),
  timeHorizon: z.string().min(1, "Time horizon is required"),
  challenges: z.string().optional(),
});
export function StrategyGenerator() {
  const { user } = useUser();
  const [strategies, setStrategies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState("strategy-1");
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: user?.company || "",
      industry: user?.industry || "",
      companySize: "",
      revenue: "",
      goals: "",
      riskTolerance: "5",
      timeHorizon: "Medium term (6-12 months)",
      challenges: "",
    },
  });
  const onSubmit = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: strategiesData, error: strategiesError } =
        await supabase.functions.invoke("generate-strategies", {
          body: {
            ...data,
            userId: user?.id,
            companyId: user?.company_id,
          },
        });
      if (strategiesError) {
        throw new Error(strategiesError.message);
      }
      setStrategies(strategiesData);
      toast.success("Strategies generated successfully!");
      setSelectedTab("strategy-1");
    } catch (err) {
      setError(err.message || "Failed to generate strategies");
      toast.error("Strategy generation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const getRiskColor = (risk) => {
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
  };
  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Executive Strategy Generator
        </h1>
        <p className="text-muted-foreground">
          Generate custom business strategies powered by AI based on your
          company profile and goals.
        </p>
      </div>

      {!strategies ? (
        <Card>
          <CardHeader>
            <CardTitle>Business Strategy Input</CardTitle>
            <CardDescription>
              Fill in the details below to generate tailored strategies for your
              business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Company" {...field} />
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Software & Technology">
                              Software & Technology
                            </SelectItem>
                            <SelectItem value="E-commerce & Retail">
                              E-commerce & Retail
                            </SelectItem>
                            <SelectItem value="Healthcare">
                              Healthcare
                            </SelectItem>
                            <SelectItem value="Finance & Insurance">
                              Finance & Insurance
                            </SelectItem>
                            <SelectItem value="Education & EdTech">
                              Education & EdTech
                            </SelectItem>
                            <SelectItem value="Manufacturing">
                              Manufacturing
                            </SelectItem>
                            <SelectItem value="Media & Entertainment">
                              Media & Entertainment
                            </SelectItem>
                            <SelectItem value="Food & Beverage">
                              Food & Beverage
                            </SelectItem>
                            <SelectItem value="Professional Services">
                              Professional Services
                            </SelectItem>
                            <SelectItem value="Real Estate">
                              Real Estate
                            </SelectItem>
                            <SelectItem value="Transportation & Logistics">
                              Transportation & Logistics
                            </SelectItem>
                            <SelectItem value="Energy & Utilities">
                              Energy & Utilities
                            </SelectItem>
                            <SelectItem value="Travel & Hospitality">
                              Travel & Hospitality
                            </SelectItem>
                            <SelectItem value="Agriculture">
                              Agriculture
                            </SelectItem>
                            <SelectItem value="Non-profit">
                              Non-profit
                            </SelectItem>
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Number of employees" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-10">1-10 employees</SelectItem>
                            <SelectItem value="11-50">
                              11-50 employees
                            </SelectItem>
                            <SelectItem value="51-200">
                              51-200 employees
                            </SelectItem>
                            <SelectItem value="201-500">
                              201-500 employees
                            </SelectItem>
                            <SelectItem value="501-1000">
                              501-1000 employees
                            </SelectItem>
                            <SelectItem value="1000+">
                              1000+ employees
                            </SelectItem>
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your annual revenue" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Pre-revenue">
                              Pre-revenue
                            </SelectItem>
                            <SelectItem value="Under $100K">
                              Under $100K
                            </SelectItem>
                            <SelectItem value="$100K - $500K">
                              $100K - $500K
                            </SelectItem>
                            <SelectItem value="$500K - $1M">
                              $500K - $1M
                            </SelectItem>
                            <SelectItem value="$1M - $5M">$1M - $5M</SelectItem>
                            <SelectItem value="$5M - $10M">
                              $5M - $10M
                            </SelectItem>
                            <SelectItem value="$10M - $50M">
                              $10M - $50M
                            </SelectItem>
                            <SelectItem value="$50M+">$50M+</SelectItem>
                          </SelectContent>
                        </Select>
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select time horizon" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Short term (3-6 months)">
                              Short term (3-6 months)
                            </SelectItem>
                            <SelectItem value="Medium term (6-12 months)">
                              Medium term (6-12 months)
                            </SelectItem>
                            <SelectItem value="Long term (1-3 years)">
                              Long term (1-3 years)
                            </SelectItem>
                          </SelectContent>
                        </Select>
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
                        <div className="flex items-center gap-4">
                          <span className="text-sm">Low</span>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select risk level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">
                                  1 - Very Conservative
                                </SelectItem>
                                <SelectItem value="2">2</SelectItem>
                                <SelectItem value="3">3</SelectItem>
                                <SelectItem value="4">4</SelectItem>
                                <SelectItem value="5">5 - Moderate</SelectItem>
                                <SelectItem value="6">6</SelectItem>
                                <SelectItem value="7">7</SelectItem>
                                <SelectItem value="8">8</SelectItem>
                                <SelectItem value="9">9</SelectItem>
                                <SelectItem value="10">
                                  10 - Very Aggressive
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <span className="text-sm">High</span>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="goals"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Goals</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your primary business goals and what you want to achieve..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
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
                          placeholder="Describe any obstacles or challenges you're facing..."
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Generating..." : "Generate Strategies"}
                  </Button>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-md flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Generated Strategies</h2>
            <Button variant="outline" onClick={() => setStrategies(null)}>
              Create New Strategies
            </Button>
          </div>

          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="strategy-1">Strategy 1</TabsTrigger>
              <TabsTrigger value="strategy-2">Strategy 2</TabsTrigger>
              <TabsTrigger value="strategy-3">Strategy 3</TabsTrigger>
            </TabsList>
            {strategies.map((strategy, index) => (
              <TabsContent
                key={index}
                value={`strategy-${index + 1}`}
                className="space-y-6"
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">
                        {strategy.title}
                      </CardTitle>
                      <Badge className={getRiskColor(strategy.riskLevel)}>
                        {strategy.riskLevel} Risk
                      </Badge>
                    </div>
                    <CardDescription className="text-md">
                      {strategy.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          Advantages
                        </h3>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {strategy.pros.map((pro, idx) => (
                            <li key={idx}>{pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2">
                          <AlertCircle className="h-5 w-5 text-amber-500" />
                          Challenges
                        </h3>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {strategy.cons.map((con, idx) => (
                            <li key={idx}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-500" />
                            Estimated ROI
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm">{strategy.estimatedROI}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-500" />
                            Timeline
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm">{strategy.timeline}</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <BarChart2 className="h-4 w-4 text-purple-500" />
                            Implementation Complexity
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-sm">
                            {strategy.riskLevel === "Low"
                              ? "Simple"
                              : strategy.riskLevel === "Medium"
                                ? "Moderate"
                                : "Complex"}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                        Implementation Plan
                      </h3>
                      <ol className="list-decimal list-inside text-sm space-y-2">
                        {strategy.implementationSteps.map((step, idx) => (
                          <li key={idx} className="pl-2">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex items-center justify-between w-full">
                      <Button variant="outline" size="sm">
                        Save Strategy
                      </Button>
                      <Button variant="default" size="sm">
                        Implement Now
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}

      {isLoading && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-36" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
