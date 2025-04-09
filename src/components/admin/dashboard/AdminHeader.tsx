
import React from 'react';
import { useBreakpoint } from '@/hooks/use-mobile';

export function AdminHeader() {
  const breakpoint = useBreakpoint();
  
  return (
    <div className="mb-6 sm:mb-8">
      <h1 className={`${['xs', 'mobile'].includes(breakpoint) ? 'text-2xl' : 'text-3xl'} font-bold`}>
        Admin Dashboard
      </h1>
      <p className="text-muted-foreground mt-2 max-w-full overflow-hidden text-ellipsis">
        Overview of platform metrics and management tools
      </p>
    </div>
  );
}
