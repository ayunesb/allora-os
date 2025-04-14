
import React from 'react';
import { cn } from '@/lib/utils';

export interface PageTitleProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export function PageTitle({ 
  children, 
  title,
  className 
}: PageTitleProps) {
  // If title is provided, use it, otherwise use children
  const displayTitle = title || (typeof children === 'string' ? children : '');

  return (
    <h1 
      className={cn("text-2xl font-bold tracking-tight md:text-3xl", className)}
      title={displayTitle}
    >
      {children}
    </h1>
  );
}
