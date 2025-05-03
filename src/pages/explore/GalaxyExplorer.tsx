import React, { useEffect, useRef, useState } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

interface Node {
  id: string;
  name: string;
  group: number;
}

interface Link {
  source: string;
  target: string;
}

const GalaxyExplorer: React.FC = () => {
  const graphRef = useRef<any>();
  const [data, setData] = useState<{ nodes: Node[]; links: Link[] }>({
    nodes: [],
    links: [],
  });

  useEffect(() => {
    // Mock graph data
    const nodes: Node[] = [
      { id: 'Allora', name: 'Allora OS', group: 1 },
      { id: 'AI', name: 'AI Agents', group: 2 },
      { id: 'KPI', name: 'KPI Engine', group: 3 },
      { id: 'Plugins', name: 'Plugin Hub', group: 4 },
    ];

    const links: Link[] = [
      { source: 'Allora', target: 'AI' },
      { source: 'Allora', target: 'KPI' },
      { source: 'Allora', target: 'Plugins' },
    ];

    setData({ nodes, links });
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#0A0A23] to-[#1A1A40]">
      <h1 className="text-2xl text-white font-bold px-4 pt-6">🌌 Galaxy Explorer</h1>
      <ForceGraph2D
        ref={graphRef}
        graphData={data}
        nodeAutoColorBy="group"
        nodeLabel="name"
        width={window.innerWidth}
        height={window.innerHeight - 80}
      />
    </div>
  );
};

export default GalaxyExplorer;
