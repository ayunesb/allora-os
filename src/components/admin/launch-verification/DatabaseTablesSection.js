import React from 'react';
import { CheckCircle, XCircle, Database, Lock } from 'lucide-react';
export function DatabaseTablesSection({ tables }) {
    if (!tables)
        return null;
    return (<div className="p-3 rounded-md bg-[#1E293B]/80 border border-white/10">
      <h3 className="font-medium mb-2 text-white flex items-center gap-1.5">
        <Database className="h-4 w-4 text-blue-400"/>
        Database Tables Check
      </h3>
      <div className="space-y-1.5">
        {Object.entries(tables).map(([table, result]) => (<div key={table} className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-300 flex items-center gap-1">
              {table}
              {/* Show a lock icon for tables with RLS enabled */}
              {result.exists && result.rls && <Lock className="h-3 w-3 text-green-400"/>}
            </span>
            <div className="flex items-center gap-1">
              {result.exists ? (<CheckCircle className="h-3.5 w-3.5 text-green-500"/>) : (<XCircle className="h-3.5 w-3.5 text-red-500"/>)}
              <span className={`px-2 py-0.5 rounded-full text-xs ${result.exists ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
                {result.exists ? 'Exists' : 'Missing'}
              </span>
            </div>
          </div>))}
      </div>
    </div>);
}
