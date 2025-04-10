
import React from 'react';
import { DatabaseTableStatus } from './types';

interface DatabaseTablesSectionProps {
  tables: Record<string, DatabaseTableStatus>;
}

export function DatabaseTablesSection({ tables }: DatabaseTablesSectionProps) {
  if (!tables) return null;
  
  return (
    <div className="p-3 rounded-md bg-[#1E293B]/80 border border-white/10">
      <h3 className="font-medium mb-2 text-white">Database Tables Check</h3>
      <div className="space-y-1.5">
        {Object.entries(tables).map(([table, result]) => (
          <div key={table} className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-300">{table}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              result.exists ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
            }`}>
              {result.exists ? 'Exists' : 'Missing'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
