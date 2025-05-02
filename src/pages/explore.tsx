import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const ForceGraph2D = dynamic(() => import('react-force-graph').then(mod => mod.ForceGraph2D), {
  ssr: false
});

export default function ExploreGalaxy() {
  const data = useMemo(() => ({
    nodes: [
      { id: 'CEO_Agent', group: 'agent', name: 'AI CEO' },
      { id: 'Growth_Agent', group: 'agent', name: 'Growth' },
      { id: 'Tenant_X', group: 'workspace', name: 'Startup A' },
      { id: 'Strategy_1', group: 'strategy', name: 'Launch Campaign' },
    ],
    links: [
      { source: 'Tenant_X', target: 'CEO_Agent' },
      { source: 'CEO_Agent', target: 'Strategy_1' },
      { source: 'Strategy_1', target: 'Growth_Agent' },
    ]
  }), []);

  return (
    <div className="h-screen bg-black text-white">
      <ForceGraph2D
        graphData={data}
        nodeLabel="name"
        nodeAutoColorBy="group"
        linkDirectionalParticles={2}
        linkDirectionalArrowLength={4}
        onNodeClick={(node) => {
          if (node.id?.toString().includes('Tenant')) {
            window.location.href = `/startup/${node.id}`;
          }
        }}
      />
    </div>
  );
}
