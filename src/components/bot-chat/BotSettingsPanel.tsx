
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

export interface BotSettingsPanelProps {
  botId?: string;
  bot?: {
    name: string;
    title?: string;
    avatar?: string;
    settings?: {
      autoRespond?: boolean;
      proactiveInsights?: boolean;
      responseLength?: number;
      creativityLevel?: number;
    };
  };
  onSettingChange?: (setting: string, value: any) => void;
}

const BotSettingsPanel: React.FC<BotSettingsPanelProps> = ({ botId, bot, onSettingChange }) => {
  const settings = bot?.settings || {
    autoRespond: false,
    proactiveInsights: true,
    responseLength: 50,
    creativityLevel: 70
  };

  const handleToggleChange = (setting: string, checked: boolean) => {
    if (onSettingChange) {
      onSettingChange(setting, checked);
    }
  };

  const handleSliderChange = (setting: string, value: number[]) => {
    if (onSettingChange) {
      onSettingChange(setting, value[0]);
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <Label htmlFor="auto-respond">Automatic Responses</Label>
              <p className="text-sm text-muted-foreground">
                Allow this bot to respond proactively to relevant discussions
              </p>
            </div>
            <Switch
              id="auto-respond"
              checked={settings.autoRespond}
              onCheckedChange={(checked) => handleToggleChange('autoRespond', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <div className="space-y-0.5">
              <Label htmlFor="proactive-insights">Proactive Insights</Label>
              <p className="text-sm text-muted-foreground">
                Let the bot suggest ideas based on your company data
              </p>
            </div>
            <Switch
              id="proactive-insights"
              checked={settings.proactiveInsights}
              onCheckedChange={(checked) => handleToggleChange('proactiveInsights', checked)}
            />
          </div>
          
          <Separator />
          
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label>Response Length</Label>
              <p className="text-sm text-muted-foreground">
                Controls how detailed the responses will be
              </p>
              <div className="pt-2">
                <Slider
                  defaultValue={[settings.responseLength || 50]}
                  max={100}
                  step={10}
                  onValueChange={(value) => handleSliderChange('responseLength', value)}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Concise</span>
                  <span>Detailed</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-1.5 pt-2">
              <Label>Creativity Level</Label>
              <p className="text-sm text-muted-foreground">
                Controls how creative versus factual the responses will be
              </p>
              <div className="pt-2">
                <Slider
                  defaultValue={[settings.creativityLevel || 70]}
                  max={100}
                  step={10}
                  onValueChange={(value) => handleSliderChange('creativityLevel', value)}
                />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>Factual</span>
                  <span>Creative</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotSettingsPanel;
