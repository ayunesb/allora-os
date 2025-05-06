import { useRef, useEffect } from "react";
import ForceGraph3D from "react-force-graph-3d";
const GalaxyGraph = ({ nodes, links, onNodeClick }) => {
  const fgRef = useRef();
  useEffect(() => {
    if (fgRef.current) {
      fgRef.current.d3Force("charge").strength(-150);
    }
  }, []);
  return (
    <div className="h-[600px] w-full">
      <ForceGraph3D
        ref={fgRef}
        graphData={{ nodes, links }}
        backgroundColor="#0A0A23"
        nodeLabel={(node) => `${node.id} (${node.total_xp} XP)`}
        nodeAutoColorBy="group"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={(d) => d.value * 0.001 || 0.01}
        onNodeClick={onNodeClick} // Pass onNodeClick to ForceGraph3D
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Inter`;
          ctx.fillStyle = node.color || "white";
          ctx.beginPath();
          ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
          ctx.fill();
          // Draw badge (XP or impact score)
          if (node.type === "plugin") {
            ctx.fillStyle = "#5A67D8"; // XP badge background
            ctx.fillRect(node.x + 8, node.y - 8, 24, 14);
            ctx.fillStyle = "white";
            ctx.font = `${10 / globalScale}px Inter`;
            ctx.fillText(`${node.xp || 0} XP`, node.x + 10, node.y + 2);
          }
          ctx.fillStyle = "white";
          ctx.fillText(label, node.x + 10, node.y);
        }}
        onNodeClick={(node) => {
          if (node.type === "plugin") {
            router.push(`/plugin/${node.id}`);
          } else if (node.type === "strategy") {
            router.push(`/strategy/${node.id}`);
          }
        }}
      />
    </div>
  );
};
export default GalaxyGraph;
