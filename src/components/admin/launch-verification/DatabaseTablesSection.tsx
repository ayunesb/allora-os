
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { ValidationResultItem } from './ValidationResultItem';
import type { DatabaseTableStatus } from './types';

interface DatabaseTablesSectionProps {
  tables?: DatabaseTableStatus[];
}

export function DatabaseTablesSection({ tables = [] }: DatabaseTablesSectionProps) {
  if (!tables || tables.length === 0) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Database Tables</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tables.map((table) => (
            <ValidationResultItem
              key={table.name}
              name={table.name}
              status={table.status}
              message={table.message || `Table ${table.exists ? 'exists' : 'missing'}${table.hasRLS ? ' with RLS enabled' : ''}`}
              icon={table.status === 'success' 
                ? <CheckCircle2 className="h-4 w-4 text-green-500" />
                : table.status === 'warning'
                  ? <AlertCircle className="h-4 w-4 text-amber-500" />
                  : <XCircle className="h-4 w-4 text-red-500" />
              }
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
