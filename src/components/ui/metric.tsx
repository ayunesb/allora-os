
import React from 'react';

interface MetricProps {
  children: React.ReactNode;
  className?: string;
}

export const Metric: React.FC<MetricProps> = ({ children, className = "" }) => {
  return (
    <span className={`text-3xl font-bold tabular-nums tracking-tight ${className}`}>
      {children}
    </span>
  );
};
