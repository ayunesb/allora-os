import React, { useState, Suspense } from 'react';
import GalaxyGraph from '@/components/galaxy/GalaxyGraph';
import InspectorSidebar from '@/components/galaxy/InspectorSidebar';
import PluginInspector from '@/components/galaxy/PluginInspector';
import PluginSkeleton from '@/components/galaxy/PluginSkeleton';

export default function GalaxyExplorer() {
  const [selectedPlugin, setSelectedPlugin] = useState(null);

  const handleNodeClick = (pluginNode) => {
    setSelectedPlugin(pluginNode);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="w-3/4">
        <GalaxyGraph onNodeClick={handleNodeClick} />
      </div>
      <div className="w-1/4 border-l border-border">
        {selectedPlugin ? (
          <>
            <button
              onClick={() => setSelectedPlugin(null)}
              className="mb-2 px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-lg"
            >
              Reset Selection
            </button>
            <Suspense fallback={<PluginSkeleton />}>
              <PluginInspector plugin={selectedPlugin} />
            </Suspense>
          </>
        ) : (
          <InspectorSidebar />
        )}
      </div>
    </div>
  );
}
