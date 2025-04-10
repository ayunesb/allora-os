
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, CheckCircle, ChevronRight, Clock, Loader2 } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { executiveBots } from "@/backend/executiveBots";

// Define campaign form data type
export interface CampaignWizardData {
  name: string;
  platform: 'Google' | 'Facebook' | 'Instagram' | 'LinkedIn' | 'TikTok' | 'Email';
  budget: number;
  goal: 'leads' | 'awareness' | 'sales' | 'traffic' | 'engagement';
  audience: string;
  startDate: string;
  endDate: string;
  adCopy: string;
  executiveBot?: string;
}

interface CampaignWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultValues?: Partial<CampaignWizardData>;
  onSubmit: (data: CampaignWizardData) => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

export default function CampaignWizard({
  open,
  onOpenChange,
  defaultValues,
  onSubmit,
  isSubmitting,
  isEditing,
}: CampaignWizardProps) {
  const [step, setStep] = useState(1);
  const [isGeneratingRecommendation, setIsGeneratingRecommendation] = useState(false);
  const [adRecommendation, setAdRecommendation] = useState("");
  const [selectedExecutives, setSelectedExecutives] = useState<string[]>([]);
  
  // Create flat list of executives for selection
  const allExecutives = Object.values(executiveBots).flat();

  // Form setup
  const form = useForm<CampaignWizardData>({
    defaultValues: {
      name: defaultValues?.name || "",
      platform: defaultValues?.platform || "Google",
      budget: defaultValues?.budget || 1000,
      goal: defaultValues?.goal || "leads",
      audience: defaultValues?.audience || "",
      startDate: defaultValues?.startDate || new Date().toISOString().split('T')[0],
      endDate: defaultValues?.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      adCopy: defaultValues?.adCopy || "",
      executiveBot: defaultValues?.executiveBot,
    },
  });

  // Handle step navigation
  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Generate AI recommendation
  const generateRecommendation = () => {
    setIsGeneratingRecommendation(true);
    
    // Mock AI recommendation generation
    setTimeout(() => {
      const formData = form.getValues();
      const platform = formData.platform;
      const goal = formData.goal;
      
      let recommendation = "";
      
      if (goal === "leads") {
        recommendation = `Limited time offer: Sign up today and get 30% off your first month! Our solution helps businesses like yours increase efficiency by up to 45%. Click now for a free demo.`;
      } else if (goal === "awareness") {
        recommendation = `Introducing the future of business growth. Our platform has helped over 10,000 companies scale efficiently. Learn how we can transform your business too.`;
      } else if (goal === "sales") {
        recommendation = `Special offer ends Friday! Get our premium package at 40% off. Trusted by leading companies worldwide. Satisfaction guaranteed or your money back.`;
      } else {
        recommendation = `Discover how our solution can help your business grow. Join thousands of satisfied customers who've increased their revenue by an average of 32%.`;
      }
      
      setAdRecommendation(recommendation);
      form.setValue("adCopy", recommendation);
      setIsGeneratingRecommendation(false);
    }, 1500);
  };

  // Handle executive selection
  const toggleExecutive = (executive: string) => {
    if (selectedExecutives.includes(executive)) {
      setSelectedExecutives(selectedExecutives.filter(e => e !== executive));
    } else {
      setSelectedExecutives([...selectedExecutives, executive]);
      
      // Set the first selected executive as the primary one
      if (selectedExecutives.length === 0) {
        form.setValue("executiveBot", executive);
      }
    }
  };

  // Handle form submission
  const handleSubmit = (data: CampaignWizardData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Campaign" : "Create New Campaign"}</DialogTitle>
          <DialogDescription>
            {step === 1 && "Let's start with the basics for your campaign."}
            {step === 2 && "Define your target audience and timing."}
            {step === 3 && "Review AI-generated ad copy suggestions."}
            {step === 4 && "Select AI executives to manage this campaign."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s}
              className={`flex items-center ${s < step ? 'text-primary' : s === step ? 'text-primary' : 'text-muted-foreground'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 
                ${s < step ? 'bg-primary text-white' : s === step ? 'border-2 border-primary' : 'border-2 border-muted'}`}>
                {s < step ? <CheckCircle className="h-5 w-5" /> : s}
              </div>
              <span className={`text-sm hidden sm:inline ${s === step ? 'font-medium' : ''}`}>
                {s === 1 ? 'Basics' : s === 2 ? 'Audience' : s === 3 ? 'Content' : 'Team'}
              </span>
            </div>
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {/* Step 1: Campaign Basics */}
            {step === 1 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  rules={{ required: "Campaign name is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Summer Product Launch" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Google">Google Ads</SelectItem>
                          <SelectItem value="Facebook">Facebook Ads</SelectItem>
                          <SelectItem value="Instagram">Instagram Ads</SelectItem>
                          <SelectItem value="LinkedIn">LinkedIn Ads</SelectItem>
                          <SelectItem value="TikTok">TikTok Ads</SelectItem>
                          <SelectItem value="Email">Email Campaign</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  rules={{ required: "Budget is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget (USD)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="1000"
                          min={100}
                          {...field}
                          onChange={e => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormDescription>
                        Set your total campaign budget
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Goal</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="leads">Lead Generation</SelectItem>
                          <SelectItem value="awareness">Brand Awareness</SelectItem>
                          <SelectItem value="sales">Direct Sales</SelectItem>
                          <SelectItem value="traffic">Website Traffic</SelectItem>
                          <SelectItem value="engagement">Engagement</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 2: Audience & Timing */}
            {step === 2 && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your target audience (age, interests, location, etc.)" 
                          className="resize-none h-24"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        The more specific you are, the better the AI can target your ads
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="date" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                              type="date" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="pt-4">
                  <h3 className="text-sm font-medium mb-2">Campaign Duration</h3>
                  <div className="bg-muted p-3 rounded-md flex items-center">
                    <Clock className="h-5 w-5 text-muted-foreground mr-2" />
                    <div className="text-sm">
                      {form.watch("startDate") && form.watch("endDate") ? (
                        <>
                          {Math.ceil((new Date(form.watch("endDate")).getTime() - new Date(form.watch("startDate")).getTime()) / (1000 * 60 * 60 * 24))} days
                        </>
                      ) : (
                        "Please select start and end dates"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Ad Content */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">AI-Generated Ad Copy</h3>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm"
                    onClick={generateRecommendation}
                    disabled={isGeneratingRecommendation}
                  >
                    {isGeneratingRecommendation ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Suggestions'
                    )}
                  </Button>
                </div>
                
                {adRecommendation && (
                  <div className="bg-muted p-4 rounded-md mb-4">
                    <p className="mb-2 text-sm">{adRecommendation}</p>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mt-2">
                      AI Recommendation
                    </Badge>
                  </div>
                )}
                
                <FormField
                  control={form.control}
                  name="adCopy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad Copy</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your ad copy or use the AI suggestion" 
                          className="resize-none h-32"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        This will be the main text of your ad. Keep it concise and compelling.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Step 4: Executive Selection */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-sm font-medium mb-2">Select AI Executives to Manage This Campaign</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Each executive brings their unique expertise to your campaign optimization.
                </p>
                
                <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto p-1">
                  {allExecutives.map((executive) => (
                    <div 
                      key={executive}
                      className={`p-3 rounded-md cursor-pointer border transition-colors ${
                        selectedExecutives.includes(executive) 
                          ? 'border-primary bg-primary/5' 
                          : 'border-muted-foreground/20 hover:border-muted-foreground/40'
                      }`}
                      onClick={() => toggleExecutive(executive)}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={`/avatars/${executive.toLowerCase().replace(/\s+/g, '-')}.png`} />
                          <AvatarFallback>{executive.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{executive}</div>
                          <div className="text-xs text-muted-foreground">
                            {Object.entries(executiveBots).find(([_, execs]) => 
                              execs.includes(executive))?.[0].replace('_', ' ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {selectedExecutives.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Selected Executives</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExecutives.map(executive => (
                        <Badge 
                          key={executive} 
                          variant="outline"
                          className="flex items-center gap-1 py-1 px-2"
                        >
                          <Avatar className="h-4 w-4">
                            <AvatarImage src={`/avatars/${executive.toLowerCase().replace(/\s+/g, '-')}.png`} />
                            <AvatarFallback>{executive.substring(0, 1)}</AvatarFallback>
                          </Avatar>
                          {executive}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <DialogFooter className="mt-6 flex justify-between items-center">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Back
                </Button>
              )}
              
              <div className="ml-auto">
                {step < 4 ? (
                  <Button type="button" onClick={nextStep}>
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      isEditing ? 'Update Campaign' : 'Create Campaign'
                    )}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
