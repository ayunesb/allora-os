import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Brain, Database, Bot } from 'lucide-react';
export default function AIModelPreferences({ preferences, updatePreference }) {
    const handleModelChange = (value) => {
        updatePreference('modelPreference', value);
    };
    const toggleDebate = (enabled) => {
        updatePreference('enableDebate', enabled);
    };
    const toggleVectorSearch = (enabled) => {
        updatePreference('enableVectorSearch', enabled);
    };
    const toggleLearning = (enabled) => {
        updatePreference('enableLearning', enabled);
    };
    const handleParticipantChange = (value) => {
        updatePreference('maxDebateParticipants', value[0]);
    };
    return (<div className="space-y-4">
      <div>
        <Label htmlFor="defaultModel">AI Model Preference</Label>
        <Select value={preferences.modelPreference || 'auto'} onValueChange={handleModelChange}>
          <SelectTrigger id="defaultModel">
            <SelectValue placeholder="Select AI model"/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="auto">Auto (System Choice)</SelectItem>
            <SelectItem value="gpt-4o-mini">OpenAI GPT-4o Mini (Fast)</SelectItem>
            <SelectItem value="gpt-4o">OpenAI GPT-4o (Powerful)</SelectItem>
            <SelectItem value="claude-3-sonnet-20240229">Anthropic Claude 3 Sonnet</SelectItem>
            <SelectItem value="gemini-1.5-pro">Google Gemini 1.5 Pro</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground mt-1">
          Select your preferred AI model for generating responses
        </p>
      </div>
      
      <Card className="border-dashed">
        <CardContent className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="enableDebate" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500"/>
                Multi-Executive Debate
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable executives to debate and provide multiple perspectives
              </p>
            </div>
            <Switch id="enableDebate" checked={preferences.enableDebate || false} onCheckedChange={toggleDebate}/>
          </div>
          
          {preferences.enableDebate && (<div>
              <Label className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-violet-500"/>
                Maximum Debate Participants
              </Label>
              <div className="pt-4 pb-2">
                <Slider value={[preferences.maxDebateParticipants || 3]} min={2} max={5} step={1} onValueChange={handleParticipantChange}/>
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
            </div>)}
          
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5">
              <Label htmlFor="enableMemory" className="flex items-center gap-2">
                <Database className="h-4 w-4 text-green-500"/>
                AI Memory & Vector Search
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow AI to remember previous conversations and use them for context
              </p>
            </div>
            <Switch id="enableMemory" checked={preferences.enableVectorSearch || false} onCheckedChange={toggleVectorSearch}/>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5">
              <Label htmlFor="enableLearning" className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-amber-500"/>
                Learning from Feedback
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable AI to learn from your feedback to improve future responses
              </p>
            </div>
            <Switch id="enableLearning" checked={preferences.enableLearning || false} onCheckedChange={toggleLearning}/>
          </div>
        </CardContent>
      </Card>
    </div>);
}
