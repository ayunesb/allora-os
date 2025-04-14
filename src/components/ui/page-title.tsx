
import React from 'react';
import { cn } from '@/lib/utils';

export interface PageTitleProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  description?: string; // Add support for description prop
}

export function PageTitle({ 
  children, 
  title,
  className,
  description
}: PageTitleProps) {
  // If title is provided, use it, otherwise use children
  const displayTitle = title || (typeof children === 'string' ? children : '');

  return (
    <div className="space-y-1.5 mb-6">
      <h1 
        className={cn("text-2xl font-bold tracking-tight md:text-3xl", className)}
        title={displayTitle}
      >
        {children}
      </h1>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
