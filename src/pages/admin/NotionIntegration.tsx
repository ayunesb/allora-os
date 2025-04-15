
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { TypographyH1, TypographyP } from '@/components/ui/typography';
import { AlertTriangle, Check, Link } from 'lucide-react';

const notionConfigSchema = z.object({
  apiKey: z.string().min(1, "API Key is required"),
  databaseId: z.string().min(1, "Database ID is required"),
});

export default function NotionIntegration() {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<{success: boolean; message: string} | null>(null);
  
  const form = useForm<z.infer<typeof notionConfigSchema>>({
    resolver: zodResolver(notionConfigSchema),
    defaultValues: {
      apiKey: '',
      databaseId: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof notionConfigSchema>) => {
    setIsLoading(true);
    try {
      // Update Supabase Edge Function Secrets
      const { error: setApiKeyError } = await supabase.functions.setSecret('notion-tool', 'NOTION_API_KEY', values.apiKey);
      if (setApiKeyError) throw new Error(`Failed to set NOTION_API_KEY: ${setApiKeyError.message}`);
      
      const { error: setDbIdError } = await supabase.functions.setSecret('notion-tool', 'NOTION_DB_ID', values.databaseId);
      if (setDbIdError) throw new Error(`Failed to set NOTION_DB_ID: ${setDbIdError.message}`);
      
      // Also set for langchain-agent function
      await supabase.functions.setSecret('langchain-agent', 'NOTION_API_KEY', values.apiKey);
      await supabase.functions.setSecret('langchain-agent', 'NOTION_DB_ID', values.databaseId);
      
      toast.success("Notion configuration updated successfully");
    } catch (error) {
      console.error("Error saving Notion config:", error);
      toast.error("Failed to save Notion configuration", { 
        description: error instanceof Error ? error.message : "Unknown error" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const values = form.getValues();
      
      if (!values.apiKey || !values.databaseId) {
        throw new Error("API Key and Database ID are required");
      }
      
      // Test the connection by calling the notion-tool function
      const { data, error } = await supabase.functions.invoke('notion-tool', {
        body: { 
          title: "Test Connection", 
          content: "This is a test connection from Allora AI." 
        }
      });
      
      if (error) throw new Error(error.message);
      
      setTestResult({
        success: true,
        message: "Successfully connected to Notion!"
      });
      
      toast.success("Notion connection test successful");
    } catch (error) {
      console.error("Error testing Notion connection:", error);
      setTestResult({
        success: false,
        message: error instanceof Error ? error.message : "Failed to connect to Notion"
      });
      
      toast.error("Notion connection test failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div>
          <TypographyH1>Notion Integration</TypographyH1>
          <TypographyP>
            Connect your Notion database to Allora AI for saving strategies, decisions, and more.
          </TypographyP>
        </div>
        
        <Tabs defaultValue="settings">
          <TabsList>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Notion Configuration</CardTitle>
                <CardDescription>
                  Enter your Notion API key and database ID to enable integration.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notion API Key</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="secret_..." 
                              type="password" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Your Notion Integration Secret. Keep this secure.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="databaseId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notion Database ID</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="xxxxxxxxxxxxxxxxxxxxxxxx" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            The ID of your Notion database.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex flex-col space-y-2">
                      <Button 
                        type="submit" 
                        disabled={isLoading}
                      >
                        {isLoading ? "Saving..." : "Save Configuration"}
                      </Button>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={testConnection}
                        disabled={isLoading}
                      >
                        Test Connection
                      </Button>
                    </div>
                  </form>
                </Form>
                
                {testResult && (
                  <div className={`mt-4 p-4 rounded-md ${testResult.success ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex items-center">
                      {testResult.success ? (
                        <Check className="w-5 h-5 text-green-500 mr-2" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                      )}
                      <p className={testResult.success ? 'text-green-700' : 'text-red-700'}>
                        {testResult.message}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="instructions">
            <Card>
              <CardHeader>
                <CardTitle>Setup Instructions</CardTitle>
                <CardDescription>
                  Follow these steps to set up your Notion integration.
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">1. Create a Notion Integration</h3>
                  <p className="text-muted-foreground">
                    Go to <a href="https://www.notion.so/my-integrations" className="text-primary underline" target="_blank" rel="noopener noreferrer">Notion Integrations</a> and create a new integration.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Give it a name like "Allora AI"</li>
                    <li>Select the capabilities: Read content, Update content, Insert content</li>
                    <li>Copy the "Internal Integration Secret" (API Key)</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">2. Create a Database in Notion</h3>
                  <p className="text-muted-foreground">
                    Create a new database in Notion where strategies and decisions will be stored.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Create a new page or use an existing one</li>
                    <li>Add a database with at least a "Name" property (title)</li>
                    <li>Share the database with your integration (click "Share" and select your integration)</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">3. Get Database ID</h3>
                  <p className="text-muted-foreground">
                    Get the Database ID from the URL of your Notion database.
                  </p>
                  <ul className="list-disc pl-6 text-muted-foreground">
                    <li>Open your database in Notion</li>
                    <li>The URL will look like: <code>https://www.notion.so/workspace/xxxxxxxxxxxxxxxxxxxxxxxx</code></li>
                    <li>Copy the ID after the workspace name and before any query parameters</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">4. Enter Details in Allora AI</h3>
                  <p className="text-muted-foreground">
                    Enter your API Key and Database ID in the Settings tab and save your configuration.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">5. Test the Connection</h3>
                  <p className="text-muted-foreground">
                    Use the "Test Connection" button to ensure everything is working correctly.
                  </p>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Link className="w-4 h-4 mr-2" />
                  <a href="https://developers.notion.com/docs" target="_blank" rel="noopener noreferrer">
                    Notion API Documentation
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
