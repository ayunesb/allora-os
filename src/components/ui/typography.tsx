
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
export const TypographyH1: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  return <h1 className={`text-3xl font-bold tracking-tight ${className || ''}`}>{children}</h1>;
};

export const TypographyP: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  return <p className={`leading-7 ${className || ''}`}>{children}</p>;
};

export const TypographySmall: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
  return <small className={`text-sm font-medium leading-none ${className || ''}`}>{children}</small>;
};
