import React, { useState } from 'react';
import { Platform } from '@/types/unified-types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// This is a simplified version just to fix the type error
type ExtendedPlatform = Platform | "Google";

const campaignSchema = z.object({
  name: z.string().min(3, "Campaign name must be at least 3 characters"),
  description: z.string().optional(),
  platform: z.enum(["meta", "tiktok", "email", "whatsapp", "Google"] as const),
  budget: z.coerce.number().min(1, "Budget must be greater than 0"),
  goal: z.string().optional(),
  audience: z.string().optional(),
  adCopy: z.string().optional(),
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

interface CampaignWizardProps {
  onSubmit: (campaign: any) => void;
  initialValues?: Partial<CampaignFormValues>;
}

export function CampaignWizard({ onSubmit, initialValues }: CampaignWizardProps) {
  const [activeTab, setActiveTab] = useState("details");
  const { toast } = useToast();
  
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      platform: (initialValues?.platform as Platform) || "meta",
      budget: initialValues?.budget || 1000,
      goal: initialValues?.goal || "",
      audience: initialValues?.audience || "",
      adCopy: initialValues?.adCopy || "",
    },
  });
  
  const handleSubmit = (values: CampaignFormValues) => {
    try {
      onSubmit({
        ...values,
        status: "draft",
        createdAt: new Date().toISOString(),
      });
      
      toast({
        title: "Campaign created",
        description: "Your campaign has been created successfully.",
      });
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast({
        title: "Error",
        description: "There was an error creating your campaign.",
        variant: "destructive",
      });
    }
  };
  
  const handlePlatformChange = (newPlatform: Platform) => {
    form.setValue("platform", newPlatform);
  };
  
  const goToNextTab = () => {
    if (activeTab === "details") {
      setActiveTab("audience");
    } else if (activeTab === "audience") {
      setActiveTab("creative");
    }
  };
  
  const goToPreviousTab = () => {
    if (activeTab === "creative") {
      setActiveTab("audience");
    } else if (activeTab === "audience") {
      setActiveTab("details");
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Create New Campaign</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Campaign Details</TabsTrigger>
              <TabsTrigger value="audience">Target Audience</TabsTrigger>
              <TabsTrigger value="creative">Creative</TabsTrigger>
            </TabsList>
            
            <CardContent className="pt-6">
              <TabsContent value="details" className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Campaign Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Summer Sale 2023" {...field} />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief description of your campaign"
                          {...field}
                        />
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
                        onValueChange={(value) => handlePlatformChange(value as Platform)} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="meta">Meta (Facebook/Instagram)</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Budget ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="1" 
                          step="1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="audience" className="space-y-4">
                <FormField
                  control={form.control}
                  name="audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Audience</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your target audience"
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
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
                      <FormControl>
                        <Textarea 
                          placeholder="What do you want to achieve with this campaign?"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
              
              <TabsContent value="creative" className="space-y-4">
                <FormField
                  control={form.control}
                  name="adCopy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad Copy</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your ad copy here"
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              {activeTab !== "details" ? (
                <Button type="button" variant="outline" onClick={goToPreviousTab}>
                  Previous
                </Button>
              ) : (
                <div></div>
              )}
              
              {activeTab !== "creative" ? (
                <Button type="button" onClick={goToNextTab}>
                  Next
                </Button>
              ) : (
                <Button type="submit">
                  Create Campaign
                </Button>
              )}
            </CardFooter>
          </Tabs>
        </form>
      </Form>
    </Card>
  );
}

export default CampaignWizard;
