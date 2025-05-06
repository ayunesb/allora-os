import React from "react";
export function PageTitle({ children, title, description }) {
  return (
    <div className="space-y-1.5 mb-6">
      <h1
        className="text-2xl font-bold tracking-tight md:text-3xl"
        title={title}
      >
        {children}
      </h1>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}
