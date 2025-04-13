
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

  // Extract core validation keys (excluding table/db-specific checks)
  const coreValidationKeys = Object.keys(results).filter(key => 
    !['databaseTables', 'databaseIndexes', 'rlsPolicies', 'databaseFunctions', 'overallStatus'].includes(key)
  );

  return (
    <div className="space-y-3">
      {coreValidationKeys.map(key => {
        const result = results[key as keyof ValidationResultsUI];
        // Check if the result has the specific structure expected by ValidationResultItem
        if (typeof result === 'object' && result !== null && 'valid' in result && 'message' in result) {
          return <ValidationResultItem key={key} name={key} result={result} />;
        }
        return null;
      })}
      
      {results.databaseTables && <DatabaseTablesSection tables={results.databaseTables} />}
      
      {results.databaseIndexes && Array.isArray(results.databaseIndexes) && (
        <DatabaseChecksSection 
          title="Database Indexes Check" 
          items={results.databaseIndexes} 
        />
      )}
      
      {results.rlsPolicies && Array.isArray(results.rlsPolicies) && (
        <DatabaseChecksSection 
          title="RLS Policies Check" 
          items={results.rlsPolicies} 
        />
      )}
      
      {results.databaseFunctions && Array.isArray(results.databaseFunctions) && (
        <DatabaseChecksSection 
          title="Database Functions Check" 
          items={results.databaseFunctions} 
        />
      )}
    </div>
  );
}
