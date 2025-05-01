
import React from 'react';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { DatabaseTableStatus } from './types';

interface DatabaseTablesSectionProps {
  tables: DatabaseTableStatus[];
}

export function DatabaseTablesSection({ tables }: DatabaseTablesSectionProps) {
  return (
    <div className="bg-muted/50 rounded-md p-4">
      <h3 className="font-medium mb-3">Database Tables Check</h3>
      
      <div className="space-y-2">
        {tables.map((table, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-background rounded-md">
            <div className="flex items-center gap-2">
              {table.status === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
              {table.status === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
              {table.status === 'error' && <XCircle className="h-4 w-4 text-red-500" />}
              <span>{table.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">
                {table.exists ? 'Exists' : 'Missing'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200">
                {table.hasRLS ? 'RLS Enabled' : 'No RLS'}
              </span>
            </div>
          </div>
        ))}
        
        {tables.length === 0 && (
          <div className="text-center py-2 text-muted-foreground">
            No table checks available
          </div>
        )}
      </div>
    </div>
  );
}
