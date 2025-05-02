import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AIModelPreference } from '@/types/aiSettings';

interface ModelPreferencesProps {
  modelPreferences: AIModelPreference;
  onUpdateModelPreferences: (preferences: Partial<AIModelPreference>) => void;
}

export function ModelPreferences({ modelPreferences, onUpdateModelPreferences }: ModelPreferencesProps) {
  const handleSave = async () => {
    try {
      toast.success("AI model preferences updated", {
        description: "Changes will apply to all future AI interactions."
      });
    } catch (error) {
      console.error("Error updating model preferences:", error);
      toast.error("Failed to update model preferences");
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          AI Model Preferences
        </CardTitle>
        <CardDescription>
          Configure which AI models power your executive team
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="provider" className="text-base font-medium">
            AI Provider
          </Label>
          <Select 
            value={modelPreferences.provider}
            onValueChange={(value) => onUpdateModelPreferences({ 
              provider: value as AIModelPreference['provider'] 
            })}
          >
            <SelectTrigger id="provider">
              <SelectValue placeholder="Select AI provider" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="openai">OpenAI</SelectItem>
              <SelectItem value="anthropic">Anthropic (Claude)</SelectItem>
              <SelectItem value="google">Google (Gemini)</SelectItem>
              <SelectItem value="mistral">Mistral AI</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 pt-4">
          <Label htmlFor="model" className="text-base font-medium">
            Model
          </Label>
          <Select 
            value={modelPreferences.model}
            onValueChange={(value) => onUpdateModelPreferences({ model: value })}
          >
            <SelectTrigger id="model">
              <SelectValue placeholder="Select AI model" />
            </SelectTrigger>
            <SelectContent>
              {modelPreferences.provider === 'openai' && (
                <>
                  <SelectItem value="gpt-4o-mini">GPT-4o Mini (Fastest)</SelectItem>
                  <SelectItem value="gpt-4o">GPT-4o (Most Capable)</SelectItem>
                </>
              )}
              {modelPreferences.provider === 'anthropic' && (
                <>
                  <SelectItem value="claude-3-sonnet-20240229">Claude 3 Sonnet</SelectItem>
                  <SelectItem value="claude-3-opus-20240229">Claude 3 Opus (Most Capable)</SelectItem>
                </>
              )}
              {modelPreferences.provider === 'google' && (
                <>
                  <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro</SelectItem>
                </>
              )}
              {modelPreferences.provider === 'mistral' && (
                <>
                  <SelectItem value="mistral-large">Mistral Large</SelectItem>
                  <SelectItem value="mistral-small">Mistral Small</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 pt-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="temperature" className="text-base font-medium">
              Temperature
            </Label>
            <span className="text-sm font-medium">
              {modelPreferences.temperature.toFixed(1)}
            </span>
          </div>
          <Slider
            id="temperature"
            defaultValue={[modelPreferences.temperature]}
            min={0}
            max={1}
            step={0.1}
            onValueChange={(values) => onUpdateModelPreferences({ temperature: values[0] })}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Predictable</span>
            <span>Balanced</span>
            <span>Creative</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <Button 
          variant="outline" 
          onClick={() => onUpdateModelPreferences({
            provider: 'openai',
            model: 'gpt-4o-mini',
            temperature: 0.7
          })}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
        <Button onClick={handleSave}>
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  );
}
