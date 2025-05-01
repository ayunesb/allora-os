
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export interface BotSettingsPanelProps {
  botId?: string;
  bot?: {
    name: string;
    title?: string;
  };
}

const BotSettingsPanel = ({ botId, bot }: BotSettingsPanelProps) => {
  const botName = bot?.name || 'Bot';
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          {botName} Settings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Response Settings</h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="creativity">Creativity</Label>
                <span className="text-sm text-muted-foreground">Balanced</span>
              </div>
              <Slider defaultValue={[50]} max={100} step={1} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="verbosity">Response Length</Label>
                <span className="text-sm text-muted-foreground">Detailed</span>
              </div>
              <Slider defaultValue={[75]} max={100} step={1} />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Memory & Context</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="memory">Remember Conversation</Label>
                <p className="text-xs text-muted-foreground">
                  Allows the bot to reference previous interactions
                </p>
              </div>
              <Switch id="memory" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="context">Use Company Context</Label>
                <p className="text-xs text-muted-foreground">
                  Incorporate company data in responses
                </p>
              </div>
              <Switch id="context" defaultChecked />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Visual & Audio</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="voice">Voice Responses</Label>
                <p className="text-xs text-muted-foreground">
                  Enable spoken replies (requires headphones/speakers)
                </p>
              </div>
              <Switch id="voice" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BotSettingsPanel;
