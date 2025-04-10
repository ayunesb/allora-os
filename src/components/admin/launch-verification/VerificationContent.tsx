
import React from 'react';
import { RefreshCw } from 'lucide-react';
import { ValidationResultItem } from './ValidationResultItem';
import { DatabaseTablesSection } from './DatabaseTablesSection';
import { DatabaseChecksSection } from './DatabaseChecksSection';
import { ValidationResultsUI } from './types';

interface VerificationContentProps {
  results: ValidationResultsUI | null;
  isChecking: boolean;
}

export function VerificationContent({ results, isChecking }: VerificationContentProps) {
  if (isChecking) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <RefreshCw className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Running verification checks...</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <p className="text-muted-foreground mb-4 text-center">
          Run a comprehensive check to verify all systems are ready for production
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {Object.entries(results).map(([key, result]: [string, any]) => {
        if (['databaseTables', 'databaseIndexes', 'rlsPolicies', 'databaseFunctions'].includes(key)) return null;
        
        return <ValidationResultItem key={key} name={key} result={result} />;
      })}
      
      <DatabaseTablesSection tables={results.databaseTables} />
      
      <DatabaseChecksSection 
        title="Database Indexes Check" 
        items={Array.isArray(results.databaseIndexes) ? results.databaseIndexes : null} 
      />
      
      <DatabaseChecksSection 
        title="RLS Policies Check" 
        items={Array.isArray(results.rlsPolicies) ? results.rlsPolicies : null} 
      />
      
      <DatabaseChecksSection 
        title="Database Functions Check" 
        items={Array.isArray(results.databaseFunctions) ? results.databaseFunctions : null} 
      />
    </div>
  );
}
