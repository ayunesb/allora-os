import React from "react";
export const Metric = ({ children, className = "" }) => {
  return (
    <span
      className={`text-3xl font-bold tabular-nums tracking-tight ${className}`}
    >
      {children}
    </span>
  );
};
