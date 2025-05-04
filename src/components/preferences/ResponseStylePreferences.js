import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Book, ListChecks, Target } from "lucide-react";
export default function ResponseStylePreferences({ preferences, updatePreference }) {
    return (<div className="space-y-6">
      <div>
        <Label className="flex items-center gap-2 mb-3">
          <MessageSquare className="h-4 w-4 text-blue-500"/>
          Response Style
        </Label>
        <RadioGroup value={preferences.responseStyle || 'balanced'} onValueChange={(value) => updatePreference('responseStyle', value)} className="space-y-3">
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="concise" id="concise" className="mt-1"/>
            <div className="grid gap-1.5">
              <Label htmlFor="concise" className="font-medium">Concise</Label>
              <p className="text-sm text-muted-foreground">
                Brief, to-the-point responses focusing on key information only
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="balanced" id="balanced" className="mt-1"/>
            <div className="grid gap-1.5">
              <Label htmlFor="balanced" className="font-medium">Balanced</Label>
              <p className="text-sm text-muted-foreground">
                Moderate level of detail with a good mix of information and brevity
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="detailed" id="detailed" className="mt-1"/>
            <div className="grid gap-1.5">
              <Label htmlFor="detailed" className="font-medium">Detailed</Label>
              <p className="text-sm text-muted-foreground">
                Comprehensive responses with thorough explanations and examples
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>
      
      <Card className="border-dashed">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label htmlFor="technicalLevel" className="flex items-center gap-2 mb-2">
              <Book className="h-4 w-4 text-purple-500"/>
              Technical Level
            </Label>
            <Select value={preferences.technicalLevel || 'intermediate'} onValueChange={(value) => updatePreference('technicalLevel', value)}>
              <SelectTrigger id="technicalLevel">
                <SelectValue placeholder="Select technical level"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic (Simplified Explanations)</SelectItem>
                <SelectItem value="intermediate">Intermediate (Balanced)</SelectItem>
                <SelectItem value="advanced">Advanced (Technical Details)</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              Choose how technical you want the AI to be in its responses
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="space-y-0.5">
              <Label htmlFor="showSources" className="flex items-center gap-2">
                <ListChecks className="h-4 w-4 text-green-500"/>
                Show Sources & References
              </Label>
              <p className="text-sm text-muted-foreground">
                Include citations and reference information in responses
              </p>
            </div>
            <Switch id="showSources" checked={preferences.showSources || false} onCheckedChange={(checked) => updatePreference('showSources', checked)}/>
          </div>
          
          <div>
            <Label htmlFor="focusArea" className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-red-500"/>
              Focus Area
            </Label>
            <Select value={preferences.focusArea || 'general'} onValueChange={(value) => updatePreference('focusArea', value)}>
              <SelectTrigger id="focusArea">
                <SelectValue placeholder="Select focus area"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Business</SelectItem>
                <SelectItem value="strategy">Strategy & Planning</SelectItem>
                <SelectItem value="marketing">Marketing & Sales</SelectItem>
                <SelectItem value="operations">Operations & Execution</SelectItem>
                <SelectItem value="technology">Technology & Innovation</SelectItem>
                <SelectItem value="finance">Finance & Investment</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              Prioritize which area executives should focus their expertise on
            </p>
          </div>
        </CardContent>
      </Card>
    </div>);
}
