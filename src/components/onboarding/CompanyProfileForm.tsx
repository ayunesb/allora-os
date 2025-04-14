
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useExecutiveWorkflow } from "@/context/ExecutiveWorkflowContext";
import { toast } from "sonner";
import { CompanyProfile } from "@/services/executiveWorkflowService";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

// Define the form schema
const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  industry: z.string().min(1, "Industry is required"),
  companySize: z.string().min(1, "Company size is required"),
  targetMarkets: z.string().optional(),
  riskAppetite: z.string().min(1, "Risk appetite is required"),
  goals: z.string().optional(),
  marketingBudget: z.string().optional(),
  description: z.string().optional(),
});

export default function CompanyProfileForm() {
  const { generateWorkflow, isLoading, hasGeneratedContent } = useExecutiveWorkflow();
  const { profile } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: profile?.company || "",
      industry: profile?.industry || "",
      companySize: "",
      targetMarkets: "",
      riskAppetite: "medium",
      goals: "",
      marketingBudget: "",
      description: ""
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!profile?.company_id) {
      toast.error("Company profile not found. Please complete the initial onboarding first.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert form values to CompanyProfile format
      const companyProfile: CompanyProfile = {
        companyName: values.companyName,
        industry: values.industry,
        companySize: values.companySize,
        targetMarkets: values.targetMarkets ? values.targetMarkets.split(',').map(item => item.trim()) : [],
        riskAppetite: values.riskAppetite,
        topGoals: values.goals ? values.goals.split(',').map(item => item.trim()) : [],
        marketingBudget: values.marketingBudget,
      };

      // Call the AI workflow generation
      await generateWorkflow(companyProfile);
      
      // Navigate to dashboard after successful generation
      toast.success("AI executive workflow successfully generated!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error generating AI workflow:", error);
      toast.error("Failed to generate AI executive workflow");
    } finally {
      setIsSubmitting(false);
    }
  }

  // If content has already been generated, show a different UI
  if (hasGeneratedContent) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-medium">Your AI executive workflow has already been generated!</h3>
        <p className="text-muted-foreground mt-2 mb-4">
          You can view and manage your AI-generated content from the dashboard.
        </p>
        <Button onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="real_estate">Real Estate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
            name="targetMarkets"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Markets (comma separated)</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. North America, Europe, Asia" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="riskAppetite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Appetite</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low risk (conservative)</SelectItem>
                    <SelectItem value="medium">Medium risk (balanced)</SelectItem>
                    <SelectItem value="high">High risk (aggressive)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="marketingBudget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marketing Budget</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="under $5,000">Under $5,000</SelectItem>
                    <SelectItem value="$5,000-$10,000">$5,000-$10,000</SelectItem>
                    <SelectItem value="$10,000-$50,000">$10,000-$50,000</SelectItem>
                    <SelectItem value="$50,000-$100,000">$50,000-$100,000</SelectItem>
                    <SelectItem value="$100,000+">$100,000+</SelectItem>
                  </SelectContent>
                </Select>
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
              <FormLabel>Business Goals (comma separated)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Increase sales, Expand market reach, Improve customer retention" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Description</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Briefly describe your company, products/services, and target audience"
                  className="resize-none h-20"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
          {(isSubmitting || isLoading) ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating AI Executive Workflow...
            </>
          ) : "Generate AI Executive Workflow"}
        </Button>
      </form>
    </Form>
  );
}
