import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, MessageSquare, Brain, Sliders } from 'lucide-react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ModelPreferences from './ai-settings/ModelPreferences';

export default function UserPreferencesDialog() {
  const { preferences, updatePreferences, isLoading } = useUserPreferences();
  const [open, setOpen] = useState(false);

  const handleResponseStyleChange = (value: string) => {
    updatePreferences({ responseStyle: value });
  };

  const handleTechnicalLevelChange = (value: string) => {
    updatePreferences({ technicalLevel: value });
  };

  const handleFocusAreaChange = (value: string) => {
    updatePreferences({ focusArea: value });
  };

  const handleShowSourcesChange = (checked: boolean) => {
    updatePreferences({ showSources: checked });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Preferences</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Advisor Preferences</DialogTitle>
          <DialogDescription>
            Customize how AI advisors respond to your questions
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="response" className="mt-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="response" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Response Style</span>
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger value="models" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>AI Models</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="response" className="space-y-4 pt-4">
            <div>
              <h3 className="text-sm font-medium mb-3">Response Length</h3>
              <RadioGroup 
                value={preferences?.responseStyle || 'balanced'} 
                onValueChange={handleResponseStyleChange}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="concise" id="concise" />
                  <Label htmlFor="concise" className="font-normal">Concise (1-2 sentences)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="balanced" id="balanced" />
                  <Label htmlFor="balanced" className="font-normal">Balanced (3-4 sentences)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="detailed" id="detailed" />
                  <Label htmlFor="detailed" className="font-normal">Detailed (comprehensive explanations)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Technical Level</h3>
              <RadioGroup 
                value={preferences?.technicalLevel || 'intermediate'} 
                onValueChange={handleTechnicalLevelChange}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="basic" id="basic" />
                  <Label htmlFor="basic" className="font-normal">Basic (simple language, avoid jargon)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate" className="font-normal">Intermediate (moderate terminology)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="font-normal">Advanced (industry terminology)</Label>
                </div>
              </RadioGroup>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4 pt-4">
            <div>
              <h3 className="text-sm font-medium mb-3">Focus Area</h3>
              <Select 
                value={preferences?.focusArea || 'general'} 
                onValueChange={handleFocusAreaChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select focus area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Business Advice</SelectItem>
                  <SelectItem value="strategy">Strategy & Planning</SelectItem>
                  <SelectItem value="operations">Operations & Efficiency</SelectItem>
                  <SelectItem value="marketing">Marketing & Growth</SelectItem>
                  <SelectItem value="finance">Finance & Investment</SelectItem>
                  <SelectItem value="technology">Technology & Innovation</SelectItem>
                  <SelectItem value="leadership">Leadership & Management</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                Advisors will emphasize this area in their responses
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div>
                <Label htmlFor="show-sources" className="text-sm font-medium">
                  Include Sources & Frameworks
                </Label>
                <p className="text-sm text-muted-foreground">
                  Advisors will reference business theories and frameworks
                </p>
              </div>
              <Switch 
                id="show-sources" 
                checked={preferences?.showSources || false}
                onCheckedChange={handleShowSourcesChange}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="models">
            <ModelPreferences />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={() => setOpen(false)} disabled={isLoading}>
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
