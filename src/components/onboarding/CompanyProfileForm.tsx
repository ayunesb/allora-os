
import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useExecutiveWorkflow } from '@/context/ExecutiveWorkflowContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  industry: z.string().min(2, "Industry is required"),
  companySize: z.string().min(1, "Company size is required"),
  website: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  topGoals: z.array(z.string()).min(1, "Select at least one goal"),
  targetMarkets: z.array(z.string()).min(1, "Select at least one target market"),
  riskAppetite: z.string().min(1, "Risk appetite is required"),
  salesChannels: z.array(z.string()).min(1, "Select at least one sales channel"),
  crmSystem: z.string().optional(),
  leadVolume: z.string().optional(),
  marketingChannels: z.array(z.string()).min(1, "Select at least one marketing channel"),
  marketingBudget: z.string().optional(),
  aiVideoPreference: z.string().optional(),
  communicationMethods: z.array(z.string()).min(1, "Select at least one communication method"),
  leadershipStyle: z.string().min(1, "Leadership style is required"),
  messagingTone: z.string().min(1, "Messaging tone is required"),
});

type FormValues = z.infer<typeof formSchema>;

// Available options for form selections
const companySizes = ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"];
const goals = ["Increase Revenue", "Expand Market Share", "Improve Customer Retention", "Launch New Products", "Reduce Costs", "Improve Team Efficiency", "Enhance Brand Awareness", "Enter New Markets"];
const industries = ["Technology", "Finance", "Healthcare", "Retail", "Manufacturing", "Education", "Real Estate", "Media & Entertainment", "Transportation", "Hospitality", "Professional Services", "Other"];
const riskLevels = ["Low", "Medium", "High"];
const salesChannels = ["Direct Sales", "Distributors", "E-commerce", "Retail Stores", "Affiliates", "Partnerships", "Inside Sales", "Outside Sales"];
const crmSystems = ["Salesforce", "HubSpot", "Zoho", "Pipedrive", "Microsoft Dynamics", "SugarCRM", "None", "Other"];
const leadVolumes = ["< 50 per month", "50-100 per month", "100-500 per month", "500-1000 per month", "> 1000 per month"];
const marketingChannels = ["Social Media", "Email", "Content Marketing", "PPC", "SEO", "Events", "PR", "Influencer Marketing", "Direct Mail", "TV/Radio", "Print"];
const budgetRanges = ["< $1,000/month", "$1,000-$5,000/month", "$5,000-$10,000/month", "$10,000-$50,000/month", "> $50,000/month"];
const aiVideoPreferences = ["Yes, I want AI-generated videos", "No, I prefer traditional content"];
const communicationMethods = ["Email", "Phone", "SMS", "Video Calls", "In-Person Meetings", "Messaging Apps"];
const leadershipStyles = ["Autocratic", "Democratic", "Laissez-faire", "Transformational", "Servant", "Transactional"];
const messagingTones = ["Professional", "Casual", "Humorous", "Authoritative", "Empathetic", "Inspirational"];

export default function CompanyProfileForm() {
  const { generateWorkflow, isLoading } = useExecutiveWorkflow();
  const { profile, refreshProfile } = useAuth();
  const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: profile?.company || "",
      industry: profile?.industry || "",
      companySize: "",
      website: "",
      topGoals: [],
      targetMarkets: [],
      riskAppetite: "Medium",
      salesChannels: [],
      crmSystem: "",
      leadVolume: "",
      marketingChannels: [],
      marketingBudget: "",
      aiVideoPreference: "Yes, I want AI-generated videos",
      communicationMethods: [],
      leadershipStyle: "",
      messagingTone: "Professional",
    },
  });

  async function onSubmit(data: FormValues) {
    if (!profile?.id) {
      toast.error("User profile not found");
      return;
    }
    
    // Update company details in profile if changed
    if (profile.company !== data.companyName || profile.industry !== data.industry) {
      setIsSubmittingProfile(true);
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            company: data.companyName,
            industry: data.industry
          })
          .eq('id', profile.id);
          
        if (error) throw error;
        
        // Refresh profile data
        await refreshProfile();
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile information');
      } finally {
        setIsSubmittingProfile(false);
      }
    }
    
    // Generate AI executive workflow
    await generateWorkflow(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Industry */}
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Company Size */}
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
                    {companySizes.map((size) => (
                      <SelectItem key={size} value={size}>{size}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Website */}
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://yourwebsite.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Top Goals */}
          <FormField
            control={form.control}
            name="topGoals"
            render={() => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Top 3 Goals</FormLabel>
                <FormDescription>
                  Select up to 3 primary business goals
                </FormDescription>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {goals.map((goal) => (
                    <FormField
                      key={goal}
                      control={form.control}
                      name="topGoals"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={goal}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(goal)}
                                onCheckedChange={(checked) => {
                                  const currentGoals = field.value || [];
                                  const newGoals = checked
                                    ? [...currentGoals, goal].slice(0, 3)
                                    : currentGoals.filter((value) => value !== goal);
                                  field.onChange(newGoals);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {goal}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Target Markets */}
          <FormField
            control={form.control}
            name="targetMarkets"
            render={({ field }) => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Target Markets</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter your target markets (e.g., B2B SaaS companies in North America, Small businesses in Europe)"
                    {...field}
                    onChange={(e) => field.onChange(e.target.value.split(',').map(item => item.trim()))}
                    value={field.value?.join(', ') || ''}
                  />
                </FormControl>
                <FormDescription>
                  Enter your target markets separated by commas
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Risk Appetite */}
          <FormField
            control={form.control}
            name="riskAppetite"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk Appetite</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk appetite" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {riskLevels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  How much risk are you willing to take with new strategies?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Sales Channels */}
          <FormField
            control={form.control}
            name="salesChannels"
            render={() => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Sales Channels</FormLabel>
                <FormDescription>
                  Select all sales channels you currently use
                </FormDescription>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {salesChannels.map((channel) => (
                    <FormField
                      key={channel}
                      control={form.control}
                      name="salesChannels"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={channel}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(channel)}
                                onCheckedChange={(checked) => {
                                  const currentChannels = field.value || [];
                                  const newChannels = checked
                                    ? [...currentChannels, channel]
                                    : currentChannels.filter((value) => value !== channel);
                                  field.onChange(newChannels);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {channel}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* CRM System */}
          <FormField
            control={form.control}
            name="crmSystem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CRM System</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select CRM system" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {crmSystems.map((crm) => (
                      <SelectItem key={crm} value={crm}>{crm}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Lead Volume */}
          <FormField
            control={form.control}
            name="leadVolume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Lead Volume</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lead volume" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {leadVolumes.map((volume) => (
                      <SelectItem key={volume} value={volume}>{volume}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Marketing Channels */}
          <FormField
            control={form.control}
            name="marketingChannels"
            render={() => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Marketing Channels</FormLabel>
                <FormDescription>
                  Select all marketing channels you currently use
                </FormDescription>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {marketingChannels.map((channel) => (
                    <FormField
                      key={channel}
                      control={form.control}
                      name="marketingChannels"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={channel}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(channel)}
                                onCheckedChange={(checked) => {
                                  const currentChannels = field.value || [];
                                  const newChannels = checked
                                    ? [...currentChannels, channel]
                                    : currentChannels.filter((value) => value !== channel);
                                  field.onChange(newChannels);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {channel}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Marketing Budget */}
          <FormField
            control={form.control}
            name="marketingBudget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Marketing Budget</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {budgetRanges.map((budget) => (
                      <SelectItem key={budget} value={budget}>{budget}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* AI Video Preference */}
          <FormField
            control={form.control}
            name="aiVideoPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AI Videos Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select AI video preference" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {aiVideoPreferences.map((pref) => (
                      <SelectItem key={pref} value={pref}>{pref}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Communication Methods */}
          <FormField
            control={form.control}
            name="communicationMethods"
            render={() => (
              <FormItem className="col-span-1 md:col-span-2">
                <FormLabel>Communication Methods</FormLabel>
                <FormDescription>
                  Select all communication methods you prefer
                </FormDescription>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                  {communicationMethods.map((method) => (
                    <FormField
                      key={method}
                      control={form.control}
                      name="communicationMethods"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={method}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(method)}
                                onCheckedChange={(checked) => {
                                  const currentMethods = field.value || [];
                                  const newMethods = checked
                                    ? [...currentMethods, method]
                                    : currentMethods.filter((value) => value !== method);
                                  field.onChange(newMethods);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {method}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Leadership Style */}
          <FormField
            control={form.control}
            name="leadershipStyle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Leadership Style</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leadership style" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {leadershipStyles.map((style) => (
                      <SelectItem key={style} value={style}>{style}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Messaging Tone */}
          <FormField
            control={form.control}
            name="messagingTone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tone of Messaging</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select messaging tone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {messagingTones.map((tone) => (
                      <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isLoading || isSubmittingProfile} className="w-full">
          {(isLoading || isSubmittingProfile) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Generating AI Executive Workflow..." : "Generate AI Executive Workflow"}
        </Button>
      </form>
    </Form>
  );
}
