
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageTitle } from "@/components/ui/page-title";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PreferencesForm } from "@/components/user-preferences/PreferencesForm";
import { Settings, Brain, Wand2, BookOpen } from "lucide-react";

export default function AISettings() {
  return (
    <div className="container mx-auto py-6">
      <PageTitle 
        title="AI Executive Settings" 
        description="Customize how your AI executives think and communicate with you"
      />

      <Tabs defaultValue="preferences" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Learning
          </TabsTrigger>
          <TabsTrigger value="personalization" className="flex items-center gap-2">
            <Wand2 className="h-4 w-4" />
            Advanced
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="preferences" className="space-y-6">
          <PreferencesForm />
          
          <Card>
            <CardHeader>
              <CardTitle>Executive Preferences</CardTitle>
              <CardDescription>
                Set preferences for individual AI executives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Select specific executives to customize their individual settings.
                This overrides the general preferences set above.
              </p>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* This will be implemented in a future update */}
                <Card className="p-4 border border-dashed">
                  <p className="text-center text-sm text-muted-foreground">
                    Individual executive preferences coming soon
                  </p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="learning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Executive Learning</CardTitle>
              <CardDescription>
                Customize how AI executives learn from your interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Configure learning settings and see what your executives have learned.
              </p>
              
              <div className="mt-4">
                {/* This will be implemented in a future update */}
                <p className="text-center text-sm text-muted-foreground">
                  Executive learning features coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="personalization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Personalization</CardTitle>
              <CardDescription>
                Fine-tune your AI executive team with advanced settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Upload examples of your communication style, preferred decision formats,
                and more to make your AI executives align perfectly with your needs.
              </p>
              
              <div className="mt-4">
                {/* This will be implemented in a future update */}
                <p className="text-center text-sm text-muted-foreground">
                  Advanced personalization features coming soon
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <Card className="bg-muted/40">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="font-medium">About AI Personalization</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Your preferences are used to dynamically adjust how AI executives think and communicate,
              without requiring full model retraining. This provides a personalized experience while
              maintaining efficiency and performance.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
