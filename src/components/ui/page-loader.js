import React from 'react';
export function PageLoader({ message = 'Loading...' }) {
    return (<div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="mt-4 text-muted-foreground">{message}</p>
    </div>);
}
