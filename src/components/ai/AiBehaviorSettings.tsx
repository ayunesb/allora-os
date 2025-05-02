
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';

export function AiBehaviorSettings() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">Decision Making</h3>
            <RadioGroup defaultValue="balanced">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cautious" id="cautious" />
                <Label htmlFor="cautious">Cautious</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="balanced" id="balanced" />
                <Label htmlFor="balanced">Balanced</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="aggressive" id="aggressive" />
                <Label htmlFor="aggressive">Aggressive</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Communication Style</h3>
            <RadioGroup defaultValue="direct">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="formal" id="formal" />
                <Label htmlFor="formal">Formal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="direct" id="direct" />
                <Label htmlFor="direct">Direct</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="casual" id="casual" />
                <Label htmlFor="casual">Casual</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Market Response</h3>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">How should AI executives respond to market changes?</p>
              <Slider 
                defaultValue={[50]} 
                max={100} 
                step={10}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Conservative</span>
                <span>Balanced</span>
                <span>Reactive</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default AiBehaviorSettings;
