
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, Clock } from 'lucide-react';
import { useCompliance } from '@/hooks/useCompliance';
import { formatRelativeTime } from '@/utils/dateUtils';
import { Skeleton } from '@/components/ui/skeleton';

interface DocumentLegalContentProps {
  title: string;
  description: string;
  content: string;
}

export default function DocumentLegalContent({
  title,
  description,
  content,
}: DocumentLegalContentProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const compliance = useCompliance();
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await compliance.checkForUpdates();
    } catch (error) {
      console.error('Error checking for updates:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="prose dark:prose-invert max-w-none">
          {content ? (
            <p>{content}</p>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">
                No content available for this document.
              </p>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            Last updated {compliance.lastChecked ? formatRelativeTime(compliance.lastChecked) : 'Never'}
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                Checking...
              </>
            ) : (
              'Check for Updates'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
