import React from 'react';
import { SocialMediaProvider } from '@/context/SocialMediaContext';
import { SocialMediaContent } from './calendar/SocialMediaContent';
import { ErrorBoundary } from 'react-error-boundary';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { Toaster } from 'sonner';
import { useAccessibility } from '@/context/AccessibilityContext';
export default function SocialMediaCalendar() {
    const { screenReaderFriendly } = useAccessibility();
    return (<>
      {/* Add Sonner toast container for better feedback */}
      <Toaster position="top-right" closeButton richColors/>
      
      <ErrorBoundary FallbackComponent={({ error, resetErrorBoundary }) => (<Card className="w-full">
            <CardContent className="p-6 text-center space-y-4">
              <AlertTriangle className="h-12 w-12 mx-auto text-destructive" aria-hidden="true"/>
              <h3 className="text-lg font-medium text-destructive">Something went wrong</h3>
              <p className="text-sm text-muted-foreground">{error.message}</p>
              <Button onClick={resetErrorBoundary} aria-label={screenReaderFriendly ? "Try again to load social media calendar" : undefined}>
                Try again
              </Button>
            </CardContent>
          </Card>)}>
        <SocialMediaProvider>
          <div role="region" aria-label={screenReaderFriendly ? "Social Media Calendar" : undefined} className="social-media-calendar">
            <SocialMediaContent />
          </div>
        </SocialMediaProvider>
      </ErrorBoundary>
    </>);
}
