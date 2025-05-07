var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
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
        }
        else if (node.type === "strategy") {
            navigate(`/strategy/${node.id}`);
        }
    };
    const handleNodeHover = (node) => {
        setHoveredNodeId((node === null || node === void 0 ? void 0 : node.id) || null);
        setHoveredNodeData(node || null); // Update hovered node data
    };
    const handleVote = (vote) => __awaiter(this, void 0, void 0, function* () {
        if ((hoveredNodeData === null || hoveredNodeData === void 0 ? void 0 : hoveredNodeData.type) === "strategy") {
            yield applyAgentVote(hoveredNodeData.agentId, vote); // Apply vote
            // Optionally, refresh the hovered node data to reflect updated XP and version
        }
    });
    return (_jsxs("div", { className: "p-6 flex", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Galaxy Explorer" }), _jsx(GalaxyGraph, { onNodeClick: handleNodeClick, linkDirectionalParticles: 2, linkDirectionalParticleSpeed: (d) => d.value * 0.001, linkDirectionalArrowLength: 4, linkDirectionalArrowRelPos: 1, nodeColor: (node) => (node.type === "plugin" ? "#6366f1" : "#22d3ee"), nodeVal: (node) => node.xp || 1, nodeCanvasObject: (node, ctx, globalScale) => {
                            var _a;
                            const label = `${node.name} (${node.xp || 0} XP)`;
                            if (node.type === "strategy" && ((_a = node.versionHistory) === null || _a === void 0 ? void 0 : _a.length) > 1) {
                                ctx.shadowColor = "gold";
                                ctx.shadowBlur = 20;
                            }
                            else {
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
                        }, linkWidth: (link) => link.impact || 1, linkColor: (link) => link.type === "plugin-strategy" ? "#7dd3fc" : "#f472b6", onNodeHover: handleNodeHover })] }), _jsx(InspectorSidebar, { data: hoveredNodeData, onClose: () => setHoveredNodeId(null), onNodeHover: handleNodeHover, children: hoveredNodeData && hoveredNodeData.type === "strategy" && (_jsx(AgentVotePanel, { logId: hoveredNodeData.logId, agentId: hoveredNodeData.agentId, xp: hoveredNodeData.xp, version: hoveredNodeData.version, onVote: handleVote, renderVersionBadge: (version) => (_jsx("span", { className: "bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full", children: version })), renderXPBar: (xp) => (_jsx("div", { className: "w-full bg-gray-200 rounded-full h-2.5", children: _jsx("div", { className: "bg-gradient-to-r from-blue-400 to-purple-500 h-2.5 rounded-full transition-all duration-200", style: { width: `${Math.min(xp / 100, 1) * 100}%` } }) })) })) })] }));
}
