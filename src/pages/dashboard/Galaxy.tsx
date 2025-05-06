import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GalaxyGraph from "@/components/galaxy/GalaxyGraph";
import { InspectorSidebar } from "@/components/galaxy/InspectorSidebar";
import { AgentVotePanel } from "@/components/AgentVotePanel";
import { applyAgentVote } from "@/utils/agentUtils"; // Import the XP modifier function
export default function GalaxyPage() {
  const navigate = useNavigate();
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [hoveredNodeData, setHoveredNodeData] = useState(null); // Store hovered node data
  const handleNodeClick = (node) => {
    if (node.type === "plugin") {
      navigate(`/plugin/${node.id}`);
    } else if (node.type === "strategy") {
      navigate(`/strategy/${node.id}`);
    }
  };
  const handleNodeHover = (node) => {
    setHoveredNodeId(node?.id || null);
    setHoveredNodeData(node || null); // Update hovered node data
  };
  const handleVote = async (vote) => {
    if (hoveredNodeData?.type === "strategy") {
      await applyAgentVote(hoveredNodeData.agentId, vote); // Apply vote
      // Optionally, refresh the hovered node data to reflect updated XP and version
    }
  };
  return (
    <div className="p-6 flex">
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Galaxy Explorer</h1>
        <GalaxyGraph
          onNodeClick={handleNodeClick}
          linkDirectionalParticles={2}
          linkDirectionalParticleSpeed={(d) => d.value * 0.001}
          linkDirectionalArrowLength={4}
          linkDirectionalArrowRelPos={1}
          nodeColor={(node) => (node.type === "plugin" ? "#6366f1" : "#22d3ee")}
          nodeVal={(node) => node.xp || 1} // XP influences node size
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = `${node.name} (${node.xp || 0} XP)`;
            if (node.type === "strategy" && node.versionHistory?.length > 1) {
              ctx.shadowColor = "gold";
              ctx.shadowBlur = 20;
            } else {
              ctx.shadowBlur = 0;
            }
            ctx.fillStyle = node.id === hoveredNodeId ? "#5A67D8" : "#999";
            ctx.beginPath();
            ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadowBlur after drawing
            ctx.fillStyle = "#fff";
            ctx.font = `${12 / globalScale}px Inter`;
            ctx.fillText(label, node.x + 10, node.y + 5);
          }}
          linkWidth={(link) => link.impact || 1}
          linkColor={(link) =>
            link.type === "plugin-strategy" ? "#7dd3fc" : "#f472b6"
          }
          onNodeHover={handleNodeHover} // Update hovered node on hover
        />
      </div>
      <InspectorSidebar
        data={hoveredNodeData} // Pass hovered node data to sidebar
        onClose={() => setHoveredNodeId(null)}
        onNodeHover={handleNodeHover}
      >
        {hoveredNodeData && hoveredNodeData.type === "strategy" && (
          <AgentVotePanel
            logId={hoveredNodeData.logId} // Assuming logId is part of node data
            agentId={hoveredNodeData.agentId} // Assuming agentId is part of node data
            xp={hoveredNodeData.xp} // Display XP
            version={hoveredNodeData.version} // Display version
            onVote={handleVote} // Handle voting
            renderVersionBadge={(version) => (
              <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {version}
              </span>
            )}
            renderXPBar={(xp) => (
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full transition-all duration-200"
                  style={{ width: `${Math.min(xp / 100, 1) * 100}%` }}
                />
              </div>
            )}
          />
        )}
      </InspectorSidebar>
    </div>
  );
}
