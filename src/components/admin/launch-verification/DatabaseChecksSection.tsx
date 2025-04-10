
import React from 'react';
import { DatabaseCheckItem } from './types';

interface DatabaseChecksSectionProps {
  title: string;
  items: DatabaseCheckItem[];
}

export function DatabaseChecksSection({ title, items }: DatabaseChecksSectionProps) {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="p-3 rounded-md bg-secondary/10 border border-border">
      <h3 className="font-medium mb-2">{title}</h3>
      <div className="space-y-1.5">
        {items.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <span className="font-medium">{item.tableName || item.name}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              item.exists === false ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
