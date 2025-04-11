
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useAiModelPreferences, AiModelType } from '@/hooks/useAiModelPreferences';
import { Sparkles, LayoutGrid, Cable, HardDriveDownload, Bot, Brain, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { debounce } from 'lodash';

export default function ModelPreferences() {
  const { preferences, updatePreference, isLoading } = useAiModelPreferences();
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [selectedModel, setSelectedModel] = useState<AiModelType>(preferences.modelPreference);
  
  // Update local state when preferences from the hook change
  useEffect(() => {
    setLocalPreferences(preferences);
    setSelectedModel(preferences.modelPreference);
  }, [preferences]);
  
  // Debounced update function for when user changes model
  const debouncedModelChange = debounce((value: string) => {
    updatePreference('modelPreference', value as AiModelType);
    toast.success('Model preference updated');
  }, 300);
  
  const handleModelChange = (value: string) => {
    // Optimistic UI update
    setSelectedModel(value as AiModelType);
    // Trigger debounced update
    debouncedModelChange(value);
  };
  
  const handleParticipantChange = (value: number[]) => {
    // Optimistic UI update
    setLocalPreferences(prev => ({ ...prev, maxDebateParticipants: value[0] }));
    // Update server
    updatePreference('maxDebateParticipants', value[0]);
  };
  
  const toggleDebate = (enabled: boolean) => {
    // Optimistic UI update
    setLocalPreferences(prev => ({ ...prev, enableDebate: enabled }));
    // Update server
    updatePreference('enableDebate', enabled);
    
    if (enabled) {
      toast.success('Multi-Executive Debate enabled');
    }
  };
  
  const toggleVectorSearch = (enabled: boolean) => {
    // Optimistic UI update
    setLocalPreferences(prev => ({ ...prev, enableVectorSearch: enabled }));
    // Update server
    updatePreference('enableVectorSearch', enabled);
    
    if (enabled) {
      toast.success('AI Memory enabled');
    }
  };
  
  const toggleLearning = (enabled: boolean) => {
    // Optimistic UI update
    setLocalPreferences(prev => ({ ...prev, enableLearning: enabled }));
    // Update server
    updatePreference('enableLearning', enabled);
    
    if (enabled) {
      toast.success('Learning from feedback enabled');
    }
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
            <Label htmlFor="modelPreference" className="mb-2 inline-block">Default AI Model</Label>
            <Select 
              value={selectedModel} 
              onValueChange={handleModelChange}
              disabled={isLoading}
            >
              <SelectTrigger 
                id="modelPreference" 
                className={cn(
                  "w-full transition-all duration-200 relative md:min-h-11",
                  isLoading && "opacity-80"
                )}
                aria-label="Select AI model"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedModel}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center"
                  >
                    <SelectValue placeholder="Select AI model" />
                    {isLoading && (
                      <Loader2 className="h-4 w-4 ml-2 animate-spin" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </SelectTrigger>
              <SelectContent className="max-h-80">
                <SelectItem 
                  value="gpt-4o-mini"
                  className="py-3 px-2 cursor-pointer focus:bg-accent transition-colors"
                >
                  OpenAI GPT-4o Mini (Fast)
                </SelectItem>
                <SelectItem 
                  value="gpt-4o"
                  className="py-3 px-2 cursor-pointer focus:bg-accent transition-colors"
                >
                  OpenAI GPT-4o (Powerful)
                </SelectItem>
                <SelectItem 
                  value="claude-3-sonnet-20240229"
                  className="py-3 px-2 cursor-pointer focus:bg-accent transition-colors"
                >
                  Anthropic Claude 3 Sonnet
                </SelectItem>
                <SelectItem 
                  value="gemini-1.5-pro"
                  className="py-3 px-2 cursor-pointer focus:bg-accent transition-colors"
                >
                  Google Gemini 1.5 Pro
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              Select your preferred AI model for generating responses
            </p>
          </div>
          
          <motion.div 
            className="flex items-center justify-between pt-4"
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            <div className="flex flex-col gap-1">
              <Label htmlFor="enableDebate" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Multi-Executive Debate
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable executives to debate and provide multiple perspectives
              </p>
            </div>
            <Switch 
              id="enableDebate" 
              checked={localPreferences.enableDebate}
              onCheckedChange={toggleDebate}
              disabled={isLoading}
              aria-label={localPreferences.enableDebate ? "Disable multi-executive debate" : "Enable multi-executive debate"}
              className="data-[state=checked]:animate-pulse-once"
            />
          </motion.div>
          
          {localPreferences.enableDebate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Label className="flex items-center gap-2 mb-2">
                <LayoutGrid className="h-4 w-4 text-violet-500" />
                Maximum Debate Participants
              </Label>
              <div className="pt-4 pb-2">
                <Slider
                  value={[localPreferences.maxDebateParticipants]}
                  min={2}
                  max={5}
                  step={1}
                  onValueChange={handleParticipantChange}
                  disabled={isLoading}
                  aria-label="Select number of debate participants"
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
            </motion.div>
          )}
          
          <motion.div 
            className="flex items-center justify-between pt-4"
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            <div className="flex flex-col gap-1">
              <Label htmlFor="enableMemory" className="flex items-center gap-2">
                <HardDriveDownload className="h-4 w-4 text-green-500" />
                AI Memory & Vector Search
              </Label>
              <p className="text-sm text-muted-foreground">
                Allow AI to remember previous conversations and use them for context
              </p>
            </div>
            <Switch 
              id="enableMemory" 
              checked={localPreferences.enableVectorSearch}
              onCheckedChange={toggleVectorSearch}
              disabled={isLoading}
              aria-label={localPreferences.enableVectorSearch ? "Disable AI memory" : "Enable AI memory"}
              className="data-[state=checked]:animate-pulse-once"
            />
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-between pt-4"
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            <div className="flex flex-col gap-1">
              <Label htmlFor="enableLearning" className="flex items-center gap-2">
                <Cable className="h-4 w-4 text-blue-500" />
                Learning from Feedback
              </Label>
              <p className="text-sm text-muted-foreground">
                Enable AI to learn from your feedback to improve future responses
              </p>
            </div>
            <Switch 
              id="enableLearning" 
              checked={localPreferences.enableLearning}
              onCheckedChange={toggleLearning}
              disabled={isLoading}
              aria-label={localPreferences.enableLearning ? "Disable learning from feedback" : "Enable learning from feedback"}
              className="data-[state=checked]:animate-pulse-once"
            />
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
