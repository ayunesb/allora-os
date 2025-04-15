
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { CalendarClock, CheckCircle2, Link } from 'lucide-react';
import APIKeyInput from '@/components/admin/APIKeyInput';
import { useCalendlyTool } from '@/utils/langchain/hooks/useCalendlyTool';

interface CalendlySettings {
  apiKey: string;
  userUri: string;
}

export default function CalendlyIntegration() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isConfigured, setIsConfigured] = useState(false);
  const { checkAvailability, getMeetingTypes, isLoading: isToolLoading, error: toolError } = useCalendlyTool();
  
  const { register, handleSubmit, formState: { errors } } = useForm<CalendlySettings>({
    defaultValues: {
      apiKey: '',
      userUri: ''
    }
  });

  const onSubmit = async (data: CalendlySettings) => {
    setIsLoading(true);
    try {
      // Save API key to Supabase
      const { error } = await supabase.functions.invoke('admin-settings', {
        body: {
          action: 'set_secret',
          key: 'CALENDLY_API_KEY', 
          value: data.apiKey
        }
      });
      
      if (error) throw new Error(error.message);
      
      // Save User URI to Supabase
      const { error: uriError } = await supabase.functions.invoke('admin-settings', {
        body: {
          action: 'set_secret',
          key: 'CALENDLY_USER_URI',
          value: data.userUri
        }
      });
      
      if (uriError) throw new Error(uriError.message);
      
      toast({
        title: "Calendly integration updated",
        description: "Your Calendly API key and User URI have been saved.",
      });
      
      setIsConfigured(true);
    } catch (error) {
      console.error('Error saving Calendly settings:', error);
      toast({
        variant: "destructive",
        title: "Error saving settings",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyIntegration = async () => {
    setIsVerifying(true);
    try {
      const availabilityResult = await checkAvailability();
      const meetingTypesResult = await getMeetingTypes();
      
      if (availabilityResult && meetingTypesResult) {
        toast({
          title: "Calendly integration verified",
          description: "Successfully connected to Calendly API.",
        });
        setIsConfigured(true);
      } else {
        throw new Error(toolError || "Failed to verify Calendly integration.");
      }
    } catch (error) {
      console.error('Error verifying Calendly integration:', error);
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
      setIsConfigured(false);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center gap-4">
        <CalendarClock className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendly Integration</h1>
          <p className="text-muted-foreground">
            Connect your Calendly account to allow AI executives to check availability and share meeting links.
          </p>
        </div>
      </div>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="test">Test Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendly API Configuration</CardTitle>
              <CardDescription>
                Enter your Calendly API key and User URI to connect the integration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form id="calendly-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <APIKeyInput
                    id="calendly-api-key"
                    label="Calendly API Key"
                    placeholder="Enter your Calendly API key"
                    {...register("apiKey", { required: "API key is required" })}
                    error={errors.apiKey?.message}
                  />
                  
                  <div className="space-y-2">
                    <Label htmlFor="userUri">Calendly User URI</Label>
                    <Input
                      id="userUri"
                      placeholder="https://api.calendly.com/users/YOUR_UUID"
                      {...register("userUri", { required: "User URI is required" })}
                    />
                    {errors.userUri && (
                      <p className="text-sm text-destructive">{errors.userUri.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Find your User URI by calling GET https://api.calendly.com/users/me with your API token.
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center">
                {isConfigured && (
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Integration configured
                  </div>
                )}
              </div>
              <Button type="submit" form="calendly-form" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Settings"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="test">
          <Card>
            <CardHeader>
              <CardTitle>Test Calendly Connection</CardTitle>
              <CardDescription>
                Verify that your Calendly integration is working correctly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Click the button below to test your Calendly API connection. This will:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Check for available scheduling links</li>
                <li>Retrieve available meeting types</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" disabled={isVerifying || isToolLoading}>
                <Link className="h-4 w-4 mr-2" />
                View in Calendly
              </Button>
              <Button 
                onClick={verifyIntegration} 
                disabled={isVerifying || isToolLoading}
              >
                {isVerifying || isToolLoading ? "Verifying..." : "Test Connection"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
