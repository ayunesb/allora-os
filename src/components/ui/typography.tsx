
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
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </div>
  );
};

// Add required Typography components
export const TypographyH1: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h1 className="text-3xl font-bold tracking-tight">{children}</h1>;
};

export const TypographyP: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="leading-7">{children}</p>;
};

export const TypographySmall: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <small className="text-sm font-medium leading-none">{children}</small>;
};
