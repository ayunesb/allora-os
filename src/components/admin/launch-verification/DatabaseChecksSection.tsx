
import React from 'react';
import { AlertCircle, CheckCircle, Shield, Database, Zap } from 'lucide-react';

interface DatabaseCheckItem {
  name?: string;
  table?: string;
  status: string;
  message: string;
}

interface DatabaseChecksSectionProps {
  title: string;
  items: DatabaseCheckItem[] | null | undefined;
}

export function DatabaseChecksSection({ title, items }: DatabaseChecksSectionProps) {
  // If items is null, undefined, or not an array, render nothing
  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }

  // Choose the appropriate icon based on the title
  const getIcon = () => {
    if (title.includes('RLS') || title.includes('Security')) {
      return <Shield className="h-3.5 w-3.5 text-blue-400" />;
    } else if (title.includes('Index') || title.includes('Performance')) {
      return <Zap className="h-3.5 w-3.5 text-amber-400" />;
    } else if (title.includes('Function')) {
      return <Database className="h-3.5 w-3.5 text-blue-400" />;
    }
    return null;
  };

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2 text-white">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="bg-[#1E293B]/80 rounded-md border border-white/10 p-3 text-sm">
            <div className="flex justify-between items-center">
              <div className="font-medium text-white flex items-center gap-1.5">
                {getIcon()}
                {item.name || item.table || `Item ${index + 1}`}
              </div>
              <div className="flex items-center gap-1">
                {item.status === 'verified' || item.status === 'ready' ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                )}
                <span className="text-xs capitalize text-gray-300">{item.status}</span>
              </div>
            </div>
            
            {item.message && (
              <div className="text-xs text-gray-400 mt-1">
                {item.message}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
