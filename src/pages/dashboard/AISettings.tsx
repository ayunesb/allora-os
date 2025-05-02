
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Helmet } from 'react-helmet-async';
import { AIPreferencesForm } from '@/components/ai/AiPreferencesForm';
import { AiBehaviorSettings } from '@/components/ai/AiBehaviorSettings';
import { ModelPreferences } from '@/components/ai-settings/ModelPreferences';
import { LearningSettings } from '@/components/ai-settings/LearningSettings';
import { Settings, BookOpen } from 'lucide-react';
import { PageTitle } from '@/components/PageTitle';

export default function AISettings() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <Helmet>
        <title>AI Settings | Allora AI</title>
      </Helmet>
      
      <PageTitle 
        title="AI Settings & Preferences"
        description="Customize how the AI executive team behaves and makes decisions"
      >
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-primary" />
          <span>AI Control Center</span>
        </div>
      </PageTitle>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>AI Executive Settings</CardTitle>
          <CardDescription>
            Configure how your AI executives analyze and generate business strategies
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="behavior" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="behavior">Behavior</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="models">AI Models</TabsTrigger>
              <TabsTrigger value="learning">Learning</TabsTrigger>
            </TabsList>
            <TabsContent value="behavior" className="py-4">
              <AiBehaviorSettings />
            </TabsContent>
            <TabsContent value="preferences" className="py-4">
              <AIPreferencesForm />
            </TabsContent>
            <TabsContent value="models" className="py-4">
              <ModelPreferences />
            </TabsContent>
            <TabsContent value="learning" className="py-4">
              <LearningSettings />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            AI Learning Documentation
          </CardTitle>
          <CardDescription>
            Learn more about how the AI executives learn and adapt to your business needs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose">
            <p>
              Our AI executives continually learn from your feedback and interactions. The more you engage with them,
              the better they'll understand your business needs and goals.
            </p>
            <h4>Key learning mechanisms:</h4>
            <ul>
              <li>Direct feedback on recommendations</li>
              <li>Strategy implementation tracking</li>
              <li>Business outcome correlation</li>
              <li>Industry pattern recognition</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
