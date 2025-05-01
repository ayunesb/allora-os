
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DatabaseChecksSectionProps {
  isVerifying: boolean;
  isConnected?: boolean;
  onVerify: () => void;
  message?: string;
}

export function DatabaseChecksSection({ 
  isVerifying, 
  isConnected,
  onVerify,
  message = 'Verify database connection and schema'
}: DatabaseChecksSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-primary/80" />
            <CardTitle className="text-lg">Database Connection</CardTitle>
          </div>
          <Button 
            variant="outline"
            size="sm" 
            onClick={onVerify}
            disabled={isVerifying}
          >
            {isVerifying ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify Connection'
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3 p-3 rounded-md border">
          {isConnected === undefined ? (
            <div className="text-muted-foreground flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span>Database connection not verified yet</span>
            </div>
          ) : isConnected ? (
            <div className="text-green-600 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>Database connection successful</span>
            </div>
          ) : (
            <div className="text-red-600 flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              <span>Database connection failed</span>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {message}
        </p>
      </CardContent>
    </Card>
  );
}
