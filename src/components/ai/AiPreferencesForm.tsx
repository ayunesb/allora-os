import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

export function AiPreferencesForm() {
  const [usesIndustryData, setUsesIndustryData] = useState(true);
  const [includesCompetitorAnalysis, setIncludesCompetitorAnalysis] = useState(true);
  const [strategiesPerWeek, setStrategiesPerWeek] = useState<'1-2' | '3-5' | '5+'>('1-2');
  const [allowsAutonomy, setAllowsAutonomy] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSaving(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('AI preferences saved successfully');
    } catch (error) {
      toast.error('Failed to save AI preferences');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-base">Strategy Generation Frequency</Label>
              <RadioGroup value={strategiesPerWeek} onValueChange={(value) => setStrategiesPerWeek(value as '1-2' | '3-5' | '5+')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-2" id="weekly-1-2" />
                  <Label htmlFor="weekly-1-2" className="font-normal">1-2 strategies per week</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3-5" id="weekly-3-5" />
                  <Label htmlFor="weekly-3-5" className="font-normal">3-5 strategies per week</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5+" id="weekly-5-plus" />
                  <Label htmlFor="weekly-5-plus" className="font-normal">5+ strategies per week</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="industry-data" className="mb-1 block">Use Industry Data</Label>
                <p className="text-sm text-muted-foreground">Include market research in strategy creation</p>
              </div>
              <Switch 
                id="industry-data" 
                checked={usesIndustryData} 
                onCheckedChange={setUsesIndustryData}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="competitor-analysis" className="mb-1 block">Competitor Analysis</Label>
                <p className="text-sm text-muted-foreground">Include competitor benchmarking in strategies</p>
              </div>
              <Switch 
                id="competitor-analysis" 
                checked={includesCompetitorAnalysis} 
                onCheckedChange={setIncludesCompetitorAnalysis}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autonomy" className="mb-1 block">Allow Autonomous Implementation</Label>
                <p className="text-sm text-muted-foreground">Let AI execute approved strategies without confirmation</p>
              </div>
              <Switch 
                id="autonomy" 
                checked={allowsAutonomy} 
                onCheckedChange={setAllowsAutonomy}
              />
            </div>

            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Preferences'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

export function AIPreferencesForm() {
  return <div>AI Preferences Form coming soon.</div>;
}

export default AiPreferencesForm;
