import { useRef, useEffect } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import * as THREE from 'three';

type Node = {
  id: string;
  group: string;
};

type Link = {
  source: string;
  target: string;
};

type GraphProps = {
  nodes: Node[];
  links: Link[];
  onNodeClick?: (node: Node) => void; // Added onNodeClick prop
};

const GalaxyGraph = ({ nodes, links, onNodeClick }: GraphProps) => {
  const fgRef = useRef<any>();

  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force('charge').strength(-150);
    }
  }, []);

  return (
    <div className="h-[600px] w-full">
      <ForceGraph3D
        ref={fgRef}
        graphData={{ nodes, links }}
        backgroundColor="#0A0A23"
        nodeLabel="id"
        nodeAutoColorBy="group"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={(d) => d.value * 0.001 || 0.01}
        onNodeClick={onNodeClick} // Pass onNodeClick to ForceGraph3D
      />
    </div>
  );
};

export default GalaxyGraph;
