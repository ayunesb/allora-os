
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalitySettings } from '@/components/ai-settings/PersonalitySettings';
import { ModelPreferences } from '@/components/ai-settings/ModelPreferences';
import { LearningSettings } from '@/components/ai-settings/LearningSettings';
import { AIModelPreference, AISettingsState, BotPersonalitySettings } from '@/types/aiSettings';
import { useSelfLearning } from '@/hooks/useSelfLearning';
import { toast } from 'sonner';

// Mock data - in a real app this would come from an API or context
const initialSettings: AISettingsState = {
  defaultSettings: {
    responseStyle: 'balanced',
    technicalLevel: 'intermediate',
    focusArea: 'general',
    showSources: true
  },
  modelPreferences: {
    provider: 'openai',
    model: 'gpt-4o-mini',
    temperature: 0.7
  },
  botPersonalities: [
    {
      botId: 'ceo-1',
      botName: 'Sarah',
      botRole: 'CEO',
      personalityTrait: 'bold',
      responseStyle: 'balanced',
      technicalLevel: 'advanced',
      focusArea: 'growth',
      showSources: true
    },
    {
      botId: 'cfo-1',
      botName: 'Michael',
      botRole: 'CFO',
      personalityTrait: 'conservative',
      responseStyle: 'detailed',
      technicalLevel: 'advanced',
      focusArea: 'profitability',
      showSources: true
    },
    {
      botId: 'cmo-1',
      botName: 'Jessica',
      botRole: 'CMO',
      personalityTrait: 'balanced',
      responseStyle: 'concise',
      technicalLevel: 'intermediate',
      focusArea: 'growth',
      showSources: false
    },
    {
      botId: 'cto-1',
      botName: 'David',
      botRole: 'CTO',
      personalityTrait: 'bold',
      responseStyle: 'detailed',
      technicalLevel: 'advanced',
      focusArea: 'innovation',
      showSources: true
    }
  ],
  learningEnabled: true
};

/**
 * AI Settings page component
 * Allows users to customize AI executive personalities, model preferences, and learning settings
 */
export default function AISettingsPage() {
  const [settings, setSettings] = useState<AISettingsState>(initialSettings);
  const { trackAction } = useSelfLearning();
  
  const handleUpdatePersonality = async (botId: string, updatedSettings: Partial<BotPersonalitySettings>) => {
    setSettings(prev => ({
      ...prev,
      botPersonalities: prev.botPersonalities.map(bot => 
        bot.botId === botId ? { ...bot, ...updatedSettings } : bot
      )
    }));
    
    // In a real app, you would save these settings to your backend
    // For now, we'll just track the action in the self-learning system
    trackAction(
      'update_bot_personality',
      'ai_settings',
      botId,
      'bot',
      updatedSettings
    );
    
    return true;
  };
  
  const handleUpdateModelPreferences = (preferences: Partial<AIModelPreference>) => {
    setSettings(prev => ({
      ...prev,
      modelPreferences: {
        ...prev.modelPreferences,
        ...preferences
      }
    }));
    
    // Track the model preference update
    trackAction(
      'update_model_preferences',
      'ai_settings',
      preferences.model || settings.modelPreferences.model,
      'ai_model',
      preferences
    );
  };
  
  const handleToggleLearning = (enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      learningEnabled: enabled
    }));
    
    toast.success(enabled ? "Self-learning enabled" : "Self-learning disabled", {
      description: enabled 
        ? "Your AI executives will now adapt based on your interactions" 
        : "Your AI executives will maintain consistent behavior"
    });
    
    // Track the learning toggle
    trackAction(
      'toggle_learning',
      'ai_settings',
      'learning_system',
      'system',
      { enabled }
    );
  };
  
  return (
    <>
      <Helmet>
        <title>AI Settings - Allora AI</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold tracking-tight">AI Settings</h1>
          <p className="text-muted-foreground">
            Customize your AI executives' behavior, communication style, and learning capabilities
          </p>
          
          <Tabs defaultValue="personality" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="personality">Personality</TabsTrigger>
              <TabsTrigger value="models">AI Models</TabsTrigger>
              <TabsTrigger value="learning">Self-Learning</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personality" className="space-y-4">
              <PersonalitySettings 
                botPersonalities={settings.botPersonalities}
                onUpdatePersonality={handleUpdatePersonality}
              />
            </TabsContent>
            
            <TabsContent value="models" className="space-y-4">
              <ModelPreferences 
                modelPreferences={settings.modelPreferences}
                onUpdateModelPreferences={handleUpdateModelPreferences}
              />
            </TabsContent>
            
            <TabsContent value="learning" className="space-y-4">
              <LearningSettings 
                learningEnabled={settings.learningEnabled}
                onToggleLearning={handleToggleLearning}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
