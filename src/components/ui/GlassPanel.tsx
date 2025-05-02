import React from "react";

export const GlassPanel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-card/60 backdrop-blur-md border border-border rounded-xl shadow-md p-6">
    {children}
  </div>
);
