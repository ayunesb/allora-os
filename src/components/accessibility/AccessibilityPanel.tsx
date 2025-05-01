import React, { useState } from 'react';
import { useAccessibility } from '@/context/AccessibilityContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Eye, EyeOff, Zap } from 'lucide-react';

export function AccessibilityPanel() {
  const accessibility = useAccessibility();
  // Add default values if properties don't exist
  const fontSize = accessibility.fontSize || 16;
  const setFontSize = accessibility.setFontSize || ((size: number) => {
    console.log('setFontSize not implemented', size);
    document.documentElement.style.fontSize = `${size}px`;
  });
  
  const [tempSettings, setTempSettings] = useState({
    screenReaderFriendly: accessibility.screenReaderFriendly,
    highContrast: accessibility.highContrast,
    reducedMotion: accessibility.reducedMotion,
    largeText: accessibility.largeText,
    invertColors: accessibility.invertColors,
  });

  const handleSettingChange = (setting: string, value: boolean) => {
    setTempSettings(prev => ({ ...prev, [setting]: value }));
  };

  const applyChanges = () => {
    accessibility.toggleScreenReader(tempSettings.screenReaderFriendly);
    accessibility.toggleHighContrast(tempSettings.highContrast);
    accessibility.toggleReducedMotion(tempSettings.reducedMotion);
    accessibility.toggleLargeText(tempSettings.largeText);
    accessibility.toggleInvertColors(tempSettings.invertColors);
  };

  const resetAll = () => {
    setTempSettings({
      screenReaderFriendly: false,
      highContrast: false,
      reducedMotion: false,
      largeText: false,
      invertColors: false,
    });
    
    accessibility.toggleScreenReader(false);
    accessibility.toggleHighContrast(false);
    accessibility.toggleReducedMotion(false);
    accessibility.toggleLargeText(false);
    accessibility.toggleInvertColors(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accessibility Settings</CardTitle>
        <CardDescription>Customize your experience to suit your needs</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Font Size Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="font-size">Font Size ({fontSize}px)</Label>
          </div>
          <Slider
            id="font-size"
            min={12}
            max={24}
            step={1}
            value={[fontSize]}
            onValueChange={(value) => setFontSize(value[0])}
            className="py-4"
          />
        </div>
        
        {/* Screen Reader Mode */}
        <div className="flex items-center justify-between">
          <Label htmlFor="screen-reader-mode">Screen Reader Mode</Label>
          <Switch
            id="screen-reader-mode"
            checked={tempSettings.screenReaderFriendly}
            onCheckedChange={(checked) => handleSettingChange('screenReaderFriendly', checked)}
          />
        </div>

        {/* High Contrast Mode */}
        <div className="flex items-center justify-between">
          <Label htmlFor="high-contrast-mode">High Contrast Mode</Label>
          <Switch
            id="high-contrast-mode"
            checked={tempSettings.highContrast}
            onCheckedChange={(checked) => handleSettingChange('highContrast', checked)}
          />
        </div>

        {/* Reduced Motion */}
        <div className="flex items-center justify-between">
          <Label htmlFor="reduced-motion">Reduced Motion</Label>
          <Switch
            id="reduced-motion"
            checked={tempSettings.reducedMotion}
            onCheckedChange={(checked) => handleSettingChange('reducedMotion', checked)}
          />
        </div>

        {/* Large Text */}
        <div className="flex items-center justify-between">
          <Label htmlFor="large-text">Large Text</Label>
          <Switch
            id="large-text"
            checked={tempSettings.largeText}
            onCheckedChange={(checked) => handleSettingChange('largeText', checked)}
          />
        </div>

        {/* Invert Colors */}
        <div className="flex items-center justify-between">
          <Label htmlFor="invert-colors">Invert Colors</Label>
          <Switch
            id="invert-colors"
            checked={tempSettings.invertColors}
            onCheckedChange={(checked) => handleSettingChange('invertColors', checked)}
          />
        </div>
      </CardContent>
      <CardFooter className="justify-between border-t pt-4">
        <Button variant="outline" onClick={resetAll}>
          Reset
        </Button>
        <Button onClick={applyChanges}>
          <Zap className="h-4 w-4 mr-2" />
          Apply Settings
        </Button>
      </CardFooter>
    </Card>
  );
}
