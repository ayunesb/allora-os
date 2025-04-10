
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useAiModelPreferences, AiModelType } from '@/hooks/useAiModelPreferences';
import { Sparkles, LayoutGrid, Cable, HardDriveDownload, Bot, Brain } from 'lucide-react';

export default function ModelPreferences() {
  const { preferences, updatePreferences, isLoading } = useAiModelPreferences();
  
  const handleModelChange = (value: string) => {
    updatePreferences({ defaultModel: value as AiModelType });
  };
  
  const handleParticipantChange = (value: number[]) => {
    updatePreferences({ maxDebateParticipants: value[0] });
  };
  
  const toggleDebate = (enabled: boolean) => {
    updatePreferences({ enableDebate: enabled });
  };
  
  const toggleVectorSearch = (enabled: boolean) => {
    updatePreferences({ enableVectorSearch: enabled });
  };
  
  const toggleLearning = (enabled: boolean) => {
    updatePreferences({ enableLearning: enabled });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Model Preferences
        </CardTitle>
        <CardDescription>
          Configure your AI assistant behavior and model preferences
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="defaultModel">Default AI Model</Label>
            <Select 
              value={preferences.defaultModel} 
              onValueChange={handleModelChange}
              disabled={isLoading}
            >
              <SelectTrigger id="defaultModel" className="w-full">
                <SelectValue placeholder="Select AI model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gpt-4o-mini">OpenAI GPT-4o Mini (Fast)</SelectItem>
                <SelectItem value="gpt-4o">OpenAI GPT-4o (Powerful)</SelectItem>
                <SelectItem value="claude-3-sonnet-20240229">Anthropic Claude 3 Sonnet</SelectItem>
                <SelectItem value="claude-3-opus-20240229">Anthropic Claude 3 Opus (Premium)</SelectItem>
                <SelectItem value="gemini-1.5-pro">Google Gemini 1.5 Pro</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              Select your preferred AI model for generating responses
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label htmlFor="enableDebate" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Multi-Executive Debate
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable executives to debate and provide multiple perspectives
              </p>
            </div>
            <Switch 
              id="enableDebate" 
              checked={preferences.enableDebate}
              onCheckedChange={toggleDebate}
              disabled={isLoading}
            />
          </div>
          
          {preferences.enableDebate && (
            <div>
              <Label className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                Maximum Debate Participants
              </Label>
              <div className="pt-4 pb-2">
                <Slider
                  defaultValue={[preferences.maxDebateParticipants]}
                  min={2}
                  max={5}
                  step={1}
                  onValueChange={handleParticipantChange}
                  disabled={isLoading}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Number of executives that can participate in a debate
              </p>
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="enableMemory" className="flex items-center gap-2">
                <HardDriveDownload className="h-4 w-4" />
                AI Memory & Vector Search
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow AI to remember previous conversations and use them for context
              </p>
            </div>
            <Switch 
              id="enableMemory" 
              checked={preferences.enableVectorSearch}
              onCheckedChange={toggleVectorSearch}
              disabled={isLoading}
            />
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col gap-1">
              <Label htmlFor="enableLearning" className="flex items-center gap-2">
                <Cable className="h-4 w-4" />
                Learning from Feedback
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable AI to learn from your feedback to improve future responses
              </p>
            </div>
            <Switch 
              id="enableLearning" 
              checked={preferences.enableLearning}
              onCheckedChange={toggleLearning}
              disabled={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
