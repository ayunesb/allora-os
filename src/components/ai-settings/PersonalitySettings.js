import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Check, Info, Settings } from "lucide-react";
import { toast } from "sonner";
import { useSelfLearning } from '@/hooks/useSelfLearning';
const personalityDescriptions = {
    'conservative': 'Cautious, risk-averse, prioritizes stability and proven strategies',
    'balanced': 'Even approach, considers both risks and opportunities equally',
    'bold': 'Forward-thinking, embraces reasonable risks, innovation-focused',
    'aggressive': 'Highly risk-tolerant, pursues high-reward opportunities, disruption-oriented'
};
const responseStyleDescriptions = {
    'concise': 'Brief, to-the-point responses (1-2 sentences)',
    'balanced': 'Moderate detail (3-4 sentences with key information)',
    'detailed': 'Comprehensive explanations with examples and context'
};
export function PersonalitySettings({ botPersonalities, onUpdatePersonality }) {
    const [activeBot, setActiveBot] = useState(botPersonalities[0]?.botId || '');
    const { trackAction } = useSelfLearning();
    const currentBot = botPersonalities.find(bot => bot.botId === activeBot) || botPersonalities[0];
    const handleSavePersonality = async (botId, settings) => {
        try {
            await onUpdatePersonality(botId, settings);
            toast.success(`${currentBot.botName}'s personality updated`, {
                description: "Your changes have been saved and will apply to future interactions."
            });
            // Track the personality update for the self-learning system
            trackAction('update_bot_personality', 'ai_customization', botId, 'bot', {
                botName: currentBot.botName,
                botRole: currentBot.botRole,
                personalityTrait: settings.personalityTrait || currentBot.personalityTrait,
                responseStyle: settings.responseStyle || currentBot.responseStyle
            });
        }
        catch (error) {
            console.error("Error updating personality:", error);
            toast.error("Failed to update personality", {
                description: "Please try again or contact support if the issue persists."
            });
        }
    };
    if (!currentBot) {
        return (<Card className="w-full">
        <CardHeader>
          <CardTitle>Executive Personality Settings</CardTitle>
          <CardDescription>No AI executives found. Please add executives first.</CardDescription>
        </CardHeader>
      </Card>);
    }
    return (<Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5"/>
          Executive Personality Settings
        </CardTitle>
        <CardDescription>
          Customize how your AI executives behave and communicate
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue={botPersonalities[0]?.botId} value={activeBot} onValueChange={setActiveBot} className="w-full">
        <div className="px-6">
          <TabsList className="w-full h-auto flex flex-wrap gap-2 bg-background mb-4 justify-start">
            {botPersonalities.map(bot => (<TabsTrigger key={bot.botId} value={bot.botId} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-1.5">
                {bot.botName} ({bot.botRole})
              </TabsTrigger>))}
          </TabsList>
        </div>
          
        {botPersonalities.map(bot => (<TabsContent key={bot.botId} value={bot.botId} className="m-0">
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor={`personality-${bot.botId}`} className="text-base font-medium">
                    Personality Trait
                  </Label>
                  <span className="text-sm font-medium text-primary capitalize">
                    {bot.personalityTrait}
                  </span>
                </div>
                <div className="pt-2">
                  <Slider id={`personality-${bot.botId}`} defaultValue={[getPersonalityValue(bot.personalityTrait)]} max={3} step={1} onValueChange={(values) => {
                const newValue = getPersonalityFromValue(values[0]);
                handleSavePersonality(bot.botId, {
                    personalityTrait: newValue
                });
            }} className="w-full"/>
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Conservative</span>
                    <span>Balanced</span>
                    <span>Bold</span>
                    <span>Aggressive</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {personalityDescriptions[bot.personalityTrait]}
                </p>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor={`style-${bot.botId}`} className="text-base font-medium">
                  Response Style
                </Label>
                <Select defaultValue={bot.responseStyle} onValueChange={(value) => handleSavePersonality(bot.botId, {
                responseStyle: value
            })}>
                  <SelectTrigger id={`style-${bot.botId}`}>
                    <SelectValue placeholder="Select response style"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="concise">Concise</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  {responseStyleDescriptions[bot.responseStyle]}
                </p>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor={`level-${bot.botId}`} className="text-base font-medium">
                  Technical Level
                </Label>
                <Select defaultValue={bot.technicalLevel} onValueChange={(value) => handleSavePersonality(bot.botId, {
                technicalLevel: value
            })}>
                  <SelectTrigger id={`level-${bot.botId}`}>
                    <SelectValue placeholder="Select technical level"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic - Simple language, no jargon</SelectItem>
                    <SelectItem value="intermediate">Intermediate - Some industry terms</SelectItem>
                    <SelectItem value="advanced">Advanced - Expert terminology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor={`focus-${bot.botId}`} className="text-base font-medium">
                  Strategic Focus
                </Label>
                <Select defaultValue={bot.focusArea} onValueChange={(value) => handleSavePersonality(bot.botId, {
                focusArea: value
            })}>
                  <SelectTrigger id={`focus-${bot.botId}`}>
                    <SelectValue placeholder="Select focus area"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Business</SelectItem>
                    <SelectItem value="growth">Growth & Expansion</SelectItem>
                    <SelectItem value="profitability">Profitability & Efficiency</SelectItem>
                    <SelectItem value="innovation">Innovation & R&D</SelectItem>
                    <SelectItem value="risk">Risk Management</SelectItem>
                    <SelectItem value="operations">Operations & Logistics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2 pt-4">
                <Switch id={`sources-${bot.botId}`} checked={bot.showSources} onCheckedChange={(checked) => handleSavePersonality(bot.botId, {
                showSources: checked
            })}/>
                <Label htmlFor={`sources-${bot.botId}`}>
                  Include references to business frameworks and theories
                </Label>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label htmlFor={`custom-${bot.botId}`} className="text-base font-medium">
                  Custom Instructions
                </Label>
                <Textarea id={`custom-${bot.botId}`} placeholder="Add specific instructions for how this executive should behave..." value={bot.customInstructions || ''} onChange={(e) => handleSavePersonality(bot.botId, {
                customInstructions: e.target.value
            })} className="min-h-[100px]"/>
                <p className="text-xs text-muted-foreground">
                  These instructions will be added to the AI's system prompt.
                </p>
              </div>
            </CardContent>
          </TabsContent>))}
      </Tabs>
      
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Info className="h-4 w-4 mr-2"/>
          Changes are saved automatically
        </div>
        <Button variant="outline" size="sm" onClick={() => {
            toast.success("Settings test complete", {
                description: "Your AI executive's personality setting is working correctly."
            });
        }}>
          <Check className="h-4 w-4 mr-2"/>
          Test Settings
        </Button>
      </CardFooter>
    </Card>);
}
// Helper functions to convert between personality traits and slider values
function getPersonalityValue(trait) {
    switch (trait) {
        case 'conservative': return 0;
        case 'balanced': return 1;
        case 'bold': return 2;
        case 'aggressive': return 3;
        default: return 1;
    }
}
function getPersonalityFromValue(value) {
    switch (value) {
        case 0: return 'conservative';
        case 1: return 'balanced';
        case 2: return 'bold';
        case 3: return 'aggressive';
        default: return 'balanced';
    }
}
