
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

export interface BotSettingsProps {
  botId: string;
}

export function BotSettingsPanel({ botId }: BotSettingsProps) {
  const [settings, setSettings] = useState({
    creativity: 0.7,
    contextLength: 5,
    enableAudio: false,
    enablePersonalization: true,
    enableHistory: true,
  });

  const handleSaveSettings = () => {
    // In a real app, this would save to an API
    console.log('Saving settings for bot', botId, settings);
    toast.success('Settings saved successfully');
  };

  const handleReset = () => {
    setSettings({
      creativity: 0.7,
      contextLength: 5,
      enableAudio: false,
      enablePersonalization: true,
      enableHistory: true,
    });
    toast.info('Settings reset to defaults');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="creativity">Creativity</Label>
            <span className="text-sm text-muted-foreground">
              {Math.round(settings.creativity * 100)}%
            </span>
          </div>
          <Slider
            id="creativity"
            min={0}
            max={1}
            step={0.1}
            value={[settings.creativity]}
            onValueChange={(value) => setSettings({ ...settings, creativity: value[0] })}
          />
          <p className="text-xs text-muted-foreground">
            Higher values produce more creative and varied responses
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="context-length">Context Length</Label>
            <span className="text-sm text-muted-foreground">
              {settings.contextLength} messages
            </span>
          </div>
          <Slider
            id="context-length"
            min={1}
            max={10}
            step={1}
            value={[settings.contextLength]}
            onValueChange={(value) => setSettings({ ...settings, contextLength: value[0] })}
          />
          <p className="text-xs text-muted-foreground">
            Number of previous messages to include for context
          </p>
        </div>

        <div className="flex items-center justify-between space-y-0 pt-2">
          <Label htmlFor="enable-audio">Enable Audio Responses</Label>
          <Switch
            id="enable-audio"
            checked={settings.enableAudio}
            onCheckedChange={(checked) => setSettings({ ...settings, enableAudio: checked })}
          />
        </div>

        <div className="flex items-center justify-between space-y-0 pt-2">
          <Label htmlFor="enable-personalization">Personalized Responses</Label>
          <Switch
            id="enable-personalization"
            checked={settings.enablePersonalization}
            onCheckedChange={(checked) => setSettings({ ...settings, enablePersonalization: checked })}
          />
        </div>

        <div className="flex items-center justify-between space-y-0 pt-2">
          <Label htmlFor="enable-history">Save Chat History</Label>
          <Switch
            id="enable-history"
            checked={settings.enableHistory}
            onCheckedChange={(checked) => setSettings({ ...settings, enableHistory: checked })}
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={handleReset}>Reset to Default</Button>
        <Button onClick={handleSaveSettings}>Save Settings</Button>
      </div>
    </div>
  );
}

export default BotSettingsPanel;
