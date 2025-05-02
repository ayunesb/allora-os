
import React from 'react';
import { cn } from '@/lib/utils';
import { PageTitleProps } from '@/types/unified-types';

export function PageTitle({ 
  children, 
  title,
  description
}: PageTitleProps) {
  return (
    <div className="space-y-1.5 mb-6">
      <h1 
        className="text-2xl font-bold tracking-tight md:text-3xl"
        title={title}
      >
        {children}
      </h1>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
