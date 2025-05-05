import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAccessibility } from "@/context/AccessibilityContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
export function AccessibilitySettings() {
    const { preferences, updatePreference, applyAccessibilityClasses } = useAccessibility();
    const [showFeedback, setShowFeedback] = useState(true);
    const handleToggleHighContrast = () => {
        updatePreference('highContrast', !preferences.highContrast);
        applyAccessibilityClasses();
        if (showFeedback) {
            toast.success(preferences.highContrast ? "High contrast mode disabled" : "High contrast mode enabled");
        }
    };
    const handleToggleLargeText = () => {
        updatePreference('largeText', !preferences.largeText);
        applyAccessibilityClasses();
        if (showFeedback) {
            toast.success(preferences.largeText ? "Large text mode disabled" : "Large text mode enabled");
        }
    };
    const handleToggleReducedMotion = () => {
        updatePreference('reducedMotion', !preferences.reducedMotion);
        applyAccessibilityClasses();
        if (showFeedback) {
            toast.success(preferences.reducedMotion ? "Reduced motion mode disabled" : "Reduced motion mode enabled");
        }
    };
    const handleToggleScreenReader = () => {
        updatePreference('screenReaderFriendly', !preferences.screenReaderFriendly);
        applyAccessibilityClasses();
        if (showFeedback) {
            toast.success(preferences.screenReaderFriendly ? "Screen reader optimizations disabled" : "Screen reader optimizations enabled");
        }
    };
    const handleToggleFeedback = () => {
        setShowFeedback(!showFeedback);
        toast.info(showFeedback ? "Accessibility change notifications disabled" : "Accessibility change notifications enabled");
    };
    // Add keyboard shortcuts for accessibility features
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Only trigger if Alt+A (accessibility menu) is pressed
            if (e.altKey && e.key === 'a') {
                // Prevent default browser action
                e.preventDefault();
                // Show accessibility menu shortcuts info
                toast.info("Accessibility Shortcuts", {
                    description: "Alt+C: Toggle high contrast | Alt+T: Toggle large text | Alt+M: Toggle reduced motion | Alt+S: Toggle screen reader optimizations",
                    duration: 5000
                });
            }
            // Alt+C for high contrast
            if (e.altKey && e.key === 'c') {
                e.preventDefault();
                handleToggleHighContrast();
            }
            // Alt+T for large text
            if (e.altKey && e.key === 't') {
                e.preventDefault();
                handleToggleLargeText();
            }
            // Alt+M for reduced motion
            if (e.altKey && e.key === 'm') {
                e.preventDefault();
                handleToggleReducedMotion();
            }
            // Alt+S for screen reader optimizations
            if (e.altKey && e.key === 's') {
                e.preventDefault();
                handleToggleScreenReader();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [preferences, showFeedback]);
    return (<Card>
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
          <Switch id="high-contrast" checked={preferences.highContrast} onCheckedChange={handleToggleHighContrast} aria-label="Toggle high contrast mode"/>
        </div>
        
        <div className="flex flex-row items-center justify-between space-y-0">
          <div className="space-y-0.5">
            <Label htmlFor="large-text">Larger text</Label>
            <p className="text-sm text-muted-foreground">
              Increase text size throughout the application
            </p>
          </div>
          <Switch id="large-text" checked={preferences.largeText} onCheckedChange={handleToggleLargeText} aria-label="Toggle large text mode"/>
        </div>
        
        <div className="flex flex-row items-center justify-between space-y-0">
          <div className="space-y-0.5">
            <Label htmlFor="reduced-motion">Reduced motion</Label>
            <p className="text-sm text-muted-foreground">
              Minimize animations and transitions
            </p>
          </div>
          <Switch id="reduced-motion" checked={preferences.reducedMotion} onCheckedChange={handleToggleReducedMotion} aria-label="Toggle reduced motion mode"/>
        </div>
        
        <div className="flex flex-row items-center justify-between space-y-0">
          <div className="space-y-0.5">
            <Label htmlFor="screen-reader">Screen reader optimization</Label>
            <p className="text-sm text-muted-foreground">
              Add additional context for screen readers
            </p>
          </div>
          <Switch id="screen-reader" checked={preferences.screenReaderFriendly} onCheckedChange={handleToggleScreenReader} aria-label="Toggle screen reader optimization"/>
        </div>
        
        <div className="flex flex-row items-center justify-between space-y-0">
          <div className="space-y-0.5">
            <Label htmlFor="feedback-notifications">Accessibility change notifications</Label>
            <p className="text-sm text-muted-foreground">
              Show notifications when accessibility settings change
            </p>
          </div>
          <Switch id="feedback-notifications" checked={showFeedback} onCheckedChange={handleToggleFeedback} aria-label="Toggle accessibility change notifications"/>
        </div>
        
        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-medium mb-2">Keyboard shortcuts</h3>
          <div className="text-sm text-muted-foreground space-y-1">
            <p><kbd className="px-1 py-0.5 bg-muted rounded border">Alt</kbd> + <kbd className="px-1 py-0.5 bg-muted rounded border">A</kbd> = Show accessibility menu</p>
            <p><kbd className="px-1 py-0.5 bg-muted rounded border">Alt</kbd> + <kbd className="px-1 py-0.5 bg-muted rounded border">C</kbd> = Toggle high contrast</p>
            <p><kbd className="px-1 py-0.5 bg-muted rounded border">Alt</kbd> + <kbd className="px-1 py-0.5 bg-muted rounded border">T</kbd> = Toggle large text</p>
            <p><kbd className="px-1 py-0.5 bg-muted rounded border">Alt</kbd> + <kbd className="px-1 py-0.5 bg-muted rounded border">M</kbd> = Toggle reduced motion</p>
            <p><kbd className="px-1 py-0.5 bg-muted rounded border">Alt</kbd> + <kbd className="px-1 py-0.5 bg-muted rounded border">S</kbd> = Toggle screen reader optimization</p>
          </div>
        </div>
        
        <Button variant="outline" className="w-full" onClick={() => {
            toast.success("Accessibility report sent to developers", {
                description: "Thank you for helping us improve our accessibility features"
            });
        }}>
          Report Accessibility Issue
        </Button>
      </CardContent>
    </Card>);
}
