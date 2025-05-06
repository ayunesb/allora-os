import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AlertMessage from "@/components/ui/AlertMessage";
import { Wand2 } from "lucide-react";

type StrategyFormProps = {
  children: React.ReactNode;
  variant?: "default" | "advanced";
  size?: "small" | "large";
};

const formSchema = z.object({
  industry: z.string().min(1, { message: "Industry is required" }),
  companySize: z.number().min(1, { message: "Company size is required" }),
  revenue: z.number().min(0, { message: "Revenue must be a positive number" }),
  goals: z
    .string()
    .min(10, { message: "Business goals must be at least 10 characters" }),
  riskTolerance: z.number().min(1).max(10),
  timeHorizon: z.string().min(1, { message: "Time horizon is required" }),
  challenges: z.string().optional(),
});

const StrategyForm: React.FC<StrategyFormProps> = ({
  children,
  variant = "default",
  size = "large",
}) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [strategies, setStrategies] = useState([]);
  const [error, setError] = useState(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      industry: user?.industry || "",
      companySize: 5,
      revenue: 0,
      goals: "",
      riskTolerance: 5,
      timeHorizon: "medium",
      challenges: "",
    },
  });
  const onSubmit = async (data) => {
    if (!user) {
      toast.error("You must be logged in to generate strategies");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const { data: strategies, error } = await generateStrategies({
        ...data,
        userId: user.id,
        companyId: user.company_id,
        companyName: user.company,
      });
      if (error) throw new Error(error);
      setStrategies(strategies || []);
      toast.success("Strategies generated successfully!");
    } catch (err) {
      setError(err.message || "Failed to generate strategies");
      toast.error("Failed to generate strategies");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Executive Strategy Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="manufacturing">
                            Manufacturing
                          </SelectItem>
                          <SelectItem value="services">Services</SelectItem>
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
                          <SelectItem value="short">
                            Short-term (3-6 months)
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium-term (6-12 months)
                          </SelectItem>
                          <SelectItem value="long">
                            Long-term (1-3 years)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="companySize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Size (Employees)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="revenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Annual Revenue ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
                          }
                        />
                      </FormControl>
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
                        placeholder="Describe your primary business goals and targets..."
                        className="min-h-[100px]"
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
                        placeholder="Describe any current challenges or obstacles..."
                        className="min-h-[100px]"
                        {...field}
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
                    <FormControl>
                      <div className="flex items-center space-x-4">
                        <span>Conservative (1)</span>
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(values) => field.onChange(values[0])}
                          className="w-full"
                        />
                        <span>Aggressive (10)</span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && <AlertMessage description={error} />}

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Generating..." : "Generate Strategies"}
                {!isLoading && <Wand2 className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {strategies.length > 0 && <StrategyResults strategies={strategies} />}
    </div>
  );
};
function StrategyResults({ strategies }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategic Options</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={`strategy-0`}>
          <TabsList className="mb-4">
            {strategies.map((strategy, index) => (
              <TabsTrigger key={index} value={`strategy-${index}`}>
                Option {index + 1}
              </TabsTrigger>
            ))}
          </TabsList>

          {strategies.map((strategy, index) => (
            <TabsContent
              key={index}
              value={`strategy-${index}`}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-semibold">{strategy.title}</h3>
                <p className="text-muted-foreground mt-2">
                  {strategy.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold">Pros</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {strategy.pros.map((pro, i) => (
                      <li key={i}>{pro}</li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Cons</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {strategy.cons.map((con, i) => (
                      <li key={i}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold">Estimated ROI</h4>
                  <p className="mt-1">{strategy.estimatedRoi}</p>
                </div>

                <div>
                  <h4 className="font-semibold">Risk Level</h4>
                  <p className="mt-1">{strategy.riskLevel}</p>
                </div>

                <div>
                  <h4 className="font-semibold">Timeline</h4>
                  <p className="mt-1">{strategy.timelineMonths} months</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold">Implementation Steps</h4>
                <ol className="list-decimal pl-5 space-y-1 mt-2">
                  {strategy.implementationSteps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
// Fix the supabase client reference
import { supabase } from "@/integrations/supabase/client";
// Function to call the Supabase Edge Function
async function generateStrategies(params) {
  try {
    const { data, error } = await supabase.functions.invoke(
      "generate-strategies",
      {
        body: params,
      },
    );
    if (error) {
      throw new Error(error.message);
    }
    return { data, error: null };
  } catch (err) {
    console.error("Error generating strategies:", err);
    return {
      data: null,
      error: err.message || "Failed to generate strategies",
    };
  }
}
