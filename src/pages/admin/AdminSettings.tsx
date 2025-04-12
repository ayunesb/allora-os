
import React from 'react';

export default function AdminSettings() {
  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">System Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure global system settings and preferences
        </p>
      </div>
      
      <div className="bg-primary-foreground border border-border/80 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">System Configuration</h2>
        <p className="text-muted-foreground mb-6">
          Configure the global settings for the Allora AI platform including authentication, security,
          and integration parameters.
        </p>
      </div>
    </div>
  );
}
