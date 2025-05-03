import React from 'react';
import GalaxyGraph from '@/components/galaxy/GalaxyGraph';
import InspectorSidebar from '@/components/galaxy/InspectorSidebar';

export default function GalaxyExplorer() {
  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="w-3/4">
        <GalaxyGraph />
      </div>
      <div className="w-1/4 border-l border-border">
        <InspectorSidebar />
      </div>
    </div>
  );
}
