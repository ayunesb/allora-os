
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Settings, Accessibility } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useAccessibility } from '@/hooks/useAccessibility';
import { ExtendedAccessibilityContextType } from '@/types/unified-types';

export function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  
  // Use our extended type to ensure all properties are available
  const {
    screenReaderFriendly, 
    highContrast, 
    reducedMotion, 
    largeText,
    invertColors,
    fontSize = 16,
    setFontSize = () => {},
    toggleScreenReaderFriendly = () => {}, // This was the issue - using toggleScreenReader
    toggleHighContrast = () => {},
    toggleReducedMotion = () => {},
    toggleLargeText = () => {},
    toggleInvertColors = () => {},
  } = useAccessibility();

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  const toggles = [
    {
      id: 'screen-reader',
      label: 'Screen Reader Mode',
      checked: screenReaderFriendly,
      onChange: toggleScreenReaderFriendly,
      description: 'Optimizes content for screen readers'
    },
    {
      id: 'high-contrast',
      label: 'High Contrast',
      checked: highContrast,
      onChange: toggleHighContrast,
      description: 'Increases contrast for better visibility'
    },
    {
      id: 'reduced-motion',
      label: 'Reduced Motion',
      checked: reducedMotion,
      onChange: toggleReducedMotion,
      description: 'Reduces animations throughout the application'
    },
    {
      id: 'large-text',
      label: 'Large Text',
      checked: largeText,
      onChange: toggleLargeText,
      description: 'Increases base text size throughout the app'
    },
    {
      id: 'invert-colors',
      label: 'Invert Colors',
      checked: invertColors,
      onChange: toggleInvertColors,
      description: 'Inverts colors for reduced eye strain'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            Accessibility Settings
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label>Font Size ({fontSize}px)</Label>
            <Slider 
              value={[Number(fontSize)]} 
              min={12} 
              max={24} 
              step={1} 
              onValueChange={handleFontSizeChange} 
              className="w-full" 
            />
          </div>
          
          <div className="space-y-4">
            {toggles.map((toggle) => (
              <div key={toggle.id} className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor={toggle.id} className="cursor-pointer">
                    {toggle.label}
                  </Label>
                  <Switch 
                    id={toggle.id} 
                    checked={toggle.checked} 
                    onCheckedChange={toggle.onChange} 
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {toggle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="fixed bottom-4 right-4 rounded-full z-50 bg-primary text-primary-foreground"
          aria-label="Accessibility Settings"
        >
          <Accessibility className="h-4 w-4" />
        </Button>
      </DialogTrigger>
    </Dialog>
  );
}

export function AccessibilityButton() {
  return (
    <AccessibilityPanel />
  );
}

export default AccessibilityPanel;
