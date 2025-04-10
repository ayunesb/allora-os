
import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

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
  // If items is null, undefined, or not an array, render nothing or placeholder
  if (!items || !Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2 text-white">{title}</h3>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="bg-[#1E293B]/80 rounded-md border border-white/10 p-3 text-sm">
            <div className="flex justify-between items-center">
              <div className="font-medium text-white">
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
