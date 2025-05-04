import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
export function DatabaseTablesCheck({ tables }) {
    if (!tables || tables.length === 0)
        return null;
    // Count missing tables
    const missingTables = tables.filter(table => !table.exists).length;
    return (<div className="rounded-md border border-border/60 overflow-hidden">
      <div className="bg-muted/30 px-4 py-3 font-medium border-b border-border/60 flex justify-between items-center">
        <span>Database Tables</span>
        {missingTables > 0 ? (<span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
            {missingTables} missing
          </span>) : (<span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
            All present
          </span>)}
      </div>
      <div className="divide-y divide-border/60">
        {tables.map((table) => (<div key={table.name} className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {table.exists ? (<CheckCircle2 className="h-5 w-5 text-green-500"/>) : (<XCircle className="h-5 w-5 text-red-500"/>)}
              <span className="font-medium">{table.name}</span>
            </div>
            <span className={`text-sm ${table.exists ? 'text-green-600' : 'text-red-600'}`}>
              {table.exists ? 'Exists' : 'Missing'}
            </span>
          </div>))}
      </div>
    </div>);
}
