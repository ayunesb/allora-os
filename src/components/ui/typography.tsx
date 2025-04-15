
import React from 'react';

export interface PageTitleProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({ 
  title, 
  description,
  children 
}) => {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-1">{description}</p>
      {children}
    </div>
  );
};
