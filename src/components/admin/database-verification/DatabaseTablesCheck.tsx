
import React from 'react';
import { DatabaseTableStatus } from './types';
import { CheckCircle2, XCircle } from 'lucide-react';

interface DatabaseTablesCheckProps {
  tables: DatabaseTableStatus[];
}

export function DatabaseTablesCheck({ tables }: DatabaseTablesCheckProps) {
  if (!tables || tables.length === 0) return null;
  
  return (
    <div className="rounded-md border border-border/60 overflow-hidden">
      <div className="bg-muted/30 px-4 py-3 font-medium border-b border-border/60">
        Database Tables
      </div>
      <div className="divide-y divide-border/60">
        {tables.map((table) => (
          <div key={table.name} className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {table.exists ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">{table.name}</span>
            </div>
            <span className={`text-sm ${table.exists ? 'text-green-600' : 'text-red-600'}`}>
              {table.exists ? 'Exists' : 'Missing'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
