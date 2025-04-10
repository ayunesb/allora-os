
import React from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, ThumbsUp, Scale, Zap, BrainCircuit } from "lucide-react";

interface LearningPreferencesProps {
  preferences: any;
  updatePreference: (key: string, value: any) => void;
}

export default function LearningPreferences({ preferences, updatePreference }: LearningPreferencesProps) {
  // Add an executive to preferred list
  const handleAddPreferredExecutive = (executive: string) => {
    if (!preferences.preferredExecutives) {
      updatePreference('preferredExecutives', [executive]);
      return;
    }
    
    if (!preferences.preferredExecutives.includes(executive)) {
      const updated = [...preferences.preferredExecutives, executive];
      updatePreference('preferredExecutives', updated);
    }
  };
  
  // Remove an executive from preferred list
  const handleRemovePreferredExecutive = (executive: string) => {
    if (!preferences.preferredExecutives) return;
    
    const updated = preferences.preferredExecutives.filter((e: string) => e !== executive);
    updatePreference('preferredExecutives', updated);
  };
  
  // Add a topic to favorites
  const handleAddFavoriteTopic = (topic: string) => {
    if (!preferences.favoriteTopics) {
      updatePreference('favoriteTopics', [topic]);
      return;
    }
    
    if (!preferences.favoriteTopics.includes(topic)) {
      const updated = [...preferences.favoriteTopics, topic];
      updatePreference('favoriteTopics', updated);
    }
  };
  
  // Remove a topic from favorites
  const handleRemoveFavoriteTopic = (topic: string) => {
    if (!preferences.favoriteTopics) return;
    
    const updated = preferences.favoriteTopics.filter((t: string) => t !== topic);
    updatePreference('favoriteTopics', updated);
  };
  
  // List of executives to choose from (simplified for demo)
  const availableExecutives = [
    "Sarah Johnson", "Michael Chen", "Olivia Williams", 
    "David Rodriguez", "Emma Thompson", "James Wilson"
  ];
  
  // List of business topics (simplified for demo)
  const availableTopics = [
    "Strategic Planning", "Market Analysis", "Financial Forecasting",
    "Team Leadership", "Digital Transformation", "Product Development",
    "Customer Experience", "Operational Efficiency", "Growth Strategy"
  ];
  
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="riskAppetite" className="flex items-center gap-2 mb-2">
          <Scale className="h-4 w-4 text-amber-500" />
          Risk Appetite
        </Label>
        <Select 
          value={preferences.riskAppetite || 'medium'} 
          onValueChange={(value) => updatePreference('riskAppetite', value)}
        >
          <SelectTrigger id="riskAppetite">
            <SelectValue placeholder="Select risk appetite" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Conservative (Low Risk)</SelectItem>
            <SelectItem value="medium">Balanced (Medium Risk)</SelectItem>
            <SelectItem value="high">Aggressive (High Risk)</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-sm text-muted-foreground mt-1">
          This affects how bold or cautious AI advice will be
        </p>
      </div>
      
      <Card className="border-dashed">
        <CardContent className="pt-6 space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <ThumbsUp className="h-4 w-4 text-green-500" />
                Preferred Executives
              </Label>
              <Select 
                value=""
                onValueChange={handleAddPreferredExecutive}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Add executive" />
                </SelectTrigger>
                <SelectContent>
                  {availableExecutives.map(exec => (
                    <SelectItem key={exec} value={exec}>{exec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="mt-3 space-y-2">
              {preferences.preferredExecutives && preferences.preferredExecutives.length > 0 ? (
                preferences.preferredExecutives.map((exec: string) => (
                  <div key={exec} className="flex items-center justify-between bg-secondary/50 px-3 py-2 rounded-md">
                    <span>{exec}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemovePreferredExecutive(exec)}
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No preferred executives selected</p>
              )}
            </div>
          </div>
          
          <div className="pt-4">
            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <BrainCircuit className="h-4 w-4 text-blue-500" />
                Favorite Topics
              </Label>
              <Select 
                value=""
                onValueChange={handleAddFavoriteTopic}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Add topic" />
                </SelectTrigger>
                <SelectContent>
                  {availableTopics.map(topic => (
                    <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="mt-3 space-y-2">
              {preferences.favoriteTopics && preferences.favoriteTopics.length > 0 ? (
                preferences.favoriteTopics.map((topic: string) => (
                  <div key={topic} className="flex items-center justify-between bg-secondary/50 px-3 py-2 rounded-md">
                    <span>{topic}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleRemoveFavoriteTopic(topic)}
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No favorite topics selected</p>
              )}
            </div>
          </div>
          
          <div className="pt-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enhancedLearning" className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Enhanced Learning
                </Label>
                <p className="text-sm text-muted-foreground">
                  Enable more advanced learning algorithms for better personalization
                </p>
              </div>
              <Switch 
                id="enhancedLearning" 
                checked={preferences.enhancedLearning || false}
                onCheckedChange={(checked) => updatePreference('enhancedLearning', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
