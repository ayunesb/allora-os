
import React from 'react';
import { SocialMediaProvider } from '@/context/SocialMediaContext';
import { SocialMediaContent } from './calendar/SocialMediaContent';
import { ErrorBoundary } from 'react-error-boundary';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function SocialMediaCalendar() {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <Card className="w-full">
          <CardContent className="p-6 text-center space-y-4">
            <AlertTriangle className="h-12 w-12 mx-auto text-destructive" />
            <h3 className="text-lg font-medium text-destructive">Something went wrong</h3>
            <p className="text-sm text-muted-foreground">{error.message}</p>
            <Button onClick={resetErrorBoundary}>Try again</Button>
          </CardContent>
        </Card>
      )}
    >
      <SocialMediaProvider>
        <SocialMediaContent />
      </SocialMediaProvider>
    </ErrorBoundary>
  );
}
