
import React from 'react';
import { TableCheckResult } from './types';

interface DatabaseTablesSectionProps {
  tables: Record<string, TableCheckResult>;
}

export function DatabaseTablesSection({ tables }: DatabaseTablesSectionProps) {
  if (!tables) return null;
  
  return (
    <div className="p-3 rounded-md bg-secondary/10 border border-border">
      <h3 className="font-medium mb-2">Database Tables Check</h3>
      <div className="space-y-1.5">
        {Object.entries(tables).map(([table, result]) => (
          <div key={table} className="flex items-center justify-between text-sm">
            <span className="font-medium">{table}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              result.exists ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {result.exists ? 'Exists' : 'Missing'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
