
import React from 'react';
import { ValidationResultProps } from './types';

export function ValidationResultItem({ name, status, message, icon }: ValidationResultProps) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="mt-0.5">
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-medium">{name}</div>
        {message && (
          <div className="text-sm text-muted-foreground mt-0.5">{message}</div>
        )}
      </div>
    </div>
  );
}
