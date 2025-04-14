
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Switch, 
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/switch';
import { 
  Eye, 
  PanelRight, 
  Type, 
  ZoomIn, 
  MoonStar, 
  MousePointer, 
  HandMetal,
  ScreenShare
} from 'lucide-react';
import { useAccessibility } from '@/context/AccessibilityContext';

export function AccessibilityButton() {
  return (
    <AccessibilityPanel>
      <Button variant="ghost" size="icon" className="fixed right-4 bottom-4 z-50 rounded-full w-12 h-12 shadow-md bg-primary text-primary-foreground">
        <HandMetal className="h-6 w-6" />
        <span className="sr-only">Accessibility Settings</span>
      </Button>
    </AccessibilityPanel>
  );
}

export function AccessibilityPanel({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const {
    highContrast,
    toggleHighContrast,
    fontSize,
    setFontSize,
    reducedMotion,
    toggleReducedMotion,
    screenReaderFriendly,
    toggleScreenReaderFriendly,
    largeText,
    toggleLargeText,
    enhancedFocus,
    toggleEnhancedFocus,
    improvedTextSpacing,
    toggleImprovedTextSpacing
  } = useAccessibility();

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle className="text-center text-xl">Accessibility Settings</DrawerTitle>
          <DrawerDescription className="text-center">
            Customize your experience to meet your accessibility needs
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4 pb-4">
          <Tabs defaultValue="visual">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="visual">
                <Eye className="h-4 w-4 mr-2" />
                <span>Visual</span>
              </TabsTrigger>
              <TabsTrigger value="text">
                <Type className="h-4 w-4 mr-2" />
                <span>Text</span>
              </TabsTrigger>
              <TabsTrigger value="interaction">
                <MousePointer className="h-4 w-4 mr-2" />
                <span>Interaction</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="visual" className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="high-contrast">High Contrast</Label>
                    <p className="text-sm text-muted-foreground">
                      Increases color contrast for better visibility
                    </p>
                  </div>
                  <Switch
                    id="high-contrast"
                    checked={highContrast}
                    onCheckedChange={toggleHighContrast}
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reduced-motion">Reduced Motion</Label>
                    <p className="text-sm text-muted-foreground">
                      Minimizes animations throughout the interface
                    </p>
                  </div>
                  <Switch
                    id="reduced-motion"
                    checked={reducedMotion}
                    onCheckedChange={toggleReducedMotion}
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="theme-toggle">Color Theme</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Choose the theme that works best for you
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="justify-start" onClick={() => document.documentElement.classList.remove('dark')}>
                    <ScreenShare className="h-4 w-4 mr-2" />
                    Light Theme
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start" onClick={() => document.documentElement.classList.add('dark')}>
                    <MoonStar className="h-4 w-4 mr-2" />
                    Dark Theme
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="text" className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="font-size">Font Size</Label>
                <p className="text-sm text-muted-foreground mb-2">
                  Adjust the size of text throughout the application
                </p>
                <RadioGroup 
                  value={fontSize} 
                  onValueChange={(val) => setFontSize(val as 'small' | 'medium' | 'large')}
                  className="grid grid-cols-3 gap-2"
                >
                  <div>
                    <RadioGroupItem 
                      value="small" 
                      id="font-small" 
                      className="sr-only" 
                    />
                    <Label
                      htmlFor="font-small"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground [&:has(:checked)]:border-primary"
                    >
                      <Type className="h-4 w-4 mb-2" />
                      <span className="text-xs">Small</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem 
                      value="medium" 
                      id="font-medium" 
                      className="sr-only" 
                    />
                    <Label
                      htmlFor="font-medium"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground [&:has(:checked)]:border-primary"
                    >
                      <Type className="h-5 w-5 mb-2" />
                      <span className="text-sm">Medium</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem 
                      value="large" 
                      id="font-large" 
                      className="sr-only" 
                    />
                    <Label
                      htmlFor="font-large"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground [&:has(:checked)]:border-primary"
                    >
                      <Type className="h-6 w-6 mb-2" />
                      <span className="text-base">Large</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="improved-spacing">Improved Text Spacing</Label>
                    <p className="text-sm text-muted-foreground">
                      Increases letter and line spacing for better readability
                    </p>
                  </div>
                  <Switch
                    id="improved-spacing"
                    checked={improvedTextSpacing}
                    onCheckedChange={toggleImprovedTextSpacing}
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="large-text">Large Text Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Enlarges all text throughout the application
                    </p>
                  </div>
                  <Switch
                    id="large-text"
                    checked={largeText}
                    onCheckedChange={toggleLargeText}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="interaction" className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="screen-reader">Screen Reader Optimizations</Label>
                    <p className="text-sm text-muted-foreground">
                      Enhances compatibility with screen readers
                    </p>
                  </div>
                  <Switch
                    id="screen-reader"
                    checked={screenReaderFriendly}
                    onCheckedChange={toggleScreenReaderFriendly}
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="focus-indicators">Enhanced Focus Indicators</Label>
                    <p className="text-sm text-muted-foreground">
                      Makes keyboard focus outlines more visible
                    </p>
                  </div>
                  <Switch
                    id="focus-indicators"
                    checked={enhancedFocus}
                    onCheckedChange={toggleEnhancedFocus}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DrawerFooter>
          <DrawerClose asChild>
            <Button className="w-full">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AccessibilityPanel;
