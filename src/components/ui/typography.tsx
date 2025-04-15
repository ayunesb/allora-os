
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
