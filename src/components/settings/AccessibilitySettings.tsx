
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAccessibility } from "@/context/AccessibilityContext";

export function AccessibilitySettings() {
  const {
    highContrast,
    toggleHighContrast,
    largeText,
    toggleLargeText,
    reducedMotion,
    toggleReducedMotion,
    screenReaderFriendly,
    toggleScreenReaderFriendly
  } = useAccessibility();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accessibility Settings</CardTitle>
        <CardDescription>
          Customize your experience to make the application more accessible
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-row items-center justify-between space-y-0">
          <div className="space-y-0.5">
            <Label htmlFor="high-contrast">High contrast</Label>
            <p className="text-sm text-muted-foreground">
              Increase the contrast for better readability
            </p>
          </div>
          <Switch
            id="high-contrast"
            checked={highContrast}
            onCheckedChange={toggleHighContrast}
            aria-label="Toggle high contrast mode"
          />
        </div>
        
        <div className="flex flex-row items-center justify-between space-y-0">
          <div className="space-y-0.5">
            <Label htmlFor="large-text">Larger text</Label>
            <p className="text-sm text-muted-foreground">
              Increase text size throughout the application
            </p>
          </div>
          <Switch
            id="large-text"
            checked={largeText}
            onCheckedChange={toggleLargeText}
            aria-label="Toggle large text mode"
          />
        </div>
        
        <div className="flex flex-row items-center justify-between space-y-0">
          <div className="space-y-0.5">
            <Label htmlFor="reduced-motion">Reduced motion</Label>
            <p className="text-sm text-muted-foreground">
              Minimize animations and transitions
            </p>
          </div>
          <Switch
            id="reduced-motion"
            checked={reducedMotion}
            onCheckedChange={toggleReducedMotion}
            aria-label="Toggle reduced motion mode"
          />
        </div>
        
        <div className="flex flex-row items-center justify-between space-y-0">
          <div className="space-y-0.5">
            <Label htmlFor="screen-reader">Screen reader optimization</Label>
            <p className="text-sm text-muted-foreground">
              Add additional context for screen readers
            </p>
          </div>
          <Switch
            id="screen-reader"
            checked={screenReaderFriendly}
            onCheckedChange={toggleScreenReaderFriendly}
            aria-label="Toggle screen reader optimization"
          />
        </div>
      </CardContent>
    </Card>
  );
}
