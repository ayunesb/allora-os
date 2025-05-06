import React, { useRef, useEffect, useState } from "react";
import ForceGraph2D, { ForceGraphMethods } from "react-force-graph-2d";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Node {
  id: string;
  name?: string;
  total_xp?: number;
  agent_type?: string;
  x?: number;
  y?: number;
  version?: string;
}

interface Link {
  source: string;
  target: string;
}

interface GalaxyGraphProps {
  pluginFilter?: string;
}

const GalaxyGraph: React.FC<GalaxyGraphProps> = ({ pluginFilter }) => {
  const fgRef = useRef<ForceGraphMethods | undefined>();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [selectedPluginName, setSelectedPluginName] = useState("");

  const logAgentXP = async (agentType: string, taskType: string, context: string, xp: number) => {
    const supabase = createClientComponentClient();
    try {
      await supabase.from("agent_logs").insert({
        agent_type: agentType,
        agent_version_id: "currentVersionId", // TODO: Replace with actual version ID dynamically
        task_type: taskType,
        context,
        xp,
      });
      await supabase.rpc("evolve_agent_if_ready", { agent: agentType });
    } catch (error) {
      console.error("Error logging agent XP:", error);
    }
  };

  const updateNodeXP = (name: string, delta: number) => {
    setNodes((prevNodes) => {
      const nodeExists = prevNodes.some((node) => node.id === name);
      if (!nodeExists) {
        console.warn(`Node with name ${name} not found.`);
        return prevNodes;
      }
      return prevNodes.map((node) =>
        node.id === name ? { ...node, total_xp: (node.total_xp || 0) + delta } : node
      );
    });
    const node = nodes.find((node) => node.id === name);
    if (node) {
      logAgentXP(node.agent_type || "unknown", "plugin_interaction", `Updated XP for ${name}`, delta);
    }
  };

  const updateAgentTypeXP = (agentType: string, delta: number) => {
    setNodes((prevNodes) => {
      const agentExists = prevNodes.some((node) => node.agent_type === agentType);
      if (!agentExists) {
        console.warn(`Agent type ${agentType} not found.`);
        return prevNodes;
      }
      return prevNodes.map((node) =>
        node.agent_type === agentType
          ? { ...node, total_xp: (node.total_xp || 0) + delta }
          : node
      );
    });
    logAgentXP(agentType, "agent_type_update", `Updated XP for agent type ${agentType}`, delta);
  };

  useEffect(() => {
    const supabase = createClientComponentClient();
    const fetchGraphData = async () => {
      try {
        const query = supabase.from("plugin_logs").select("plugin_name, total_xp, agent_type");
        if (pluginFilter) {
          query.filter("plugin_name", "eq", pluginFilter);
        }
        const { data: plugins, error } = await query;
        if (error) throw error;
        const nodes = plugins.map((plugin) => ({
          id: plugin.plugin_name,
          total_xp: plugin.total_xp || 0,
          agent_type: plugin.agent_type || "unknown",
        }));
        const links: Link[] = []; // TODO: Define your links here
        setNodes(nodes);
        setLinks(links);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };
    fetchGraphData();
    const sub = supabase
      .channel("plugin-logs")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "plugin_logs",
        },
        (payload) => {
          const pluginName = payload.new.plugin_name;
          const xp = payload.new.value || 0;
          const agentType = payload.new.agent_type || "unknown";
          updateNodeXP(pluginName, xp);
          updateAgentTypeXP(agentType, xp);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(sub);
    };
  }, [pluginFilter]);

  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={{ nodes, links }}
      nodeCanvasObject={(node: Node, ctx, globalScale) => {
        const label = node.name || node.id;
        const fontSize = 12 / globalScale;
        ctx.font = `${fontSize}px sans-serif`;
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, node.x || 0, node.y || 0);
        if (node.total_xp) {
          ctx.fillStyle = "#10b981";
          ctx.font = `${10 / globalScale}px sans-serif`;
          ctx.fillText(`+${node.total_xp} XP`, node.x || 0, (node.y || 0) + 14);
        }
        if (node.total_xp && node.total_xp >= 100) {
          ctx.strokeStyle = "rgba(255, 215, 0, 0.6)";
          ctx.lineWidth = 4 / globalScale;
          ctx.beginPath();
          ctx.arc(node.x || 0, node.y || 0, 12, 0, 2 * Math.PI);
          ctx.stroke();
        }
        if (node.total_xp && node.total_xp > 0) {
          const radius = 10;
          const percent = Math.min(node.total_xp / 100, 1);
          ctx.beginPath();
          ctx.arc(node.x || 0, node.y || 0, radius, -Math.PI / 2, 2 * Math.PI * percent - Math.PI / 2);
          ctx.strokeStyle = "#22d3ee";
          ctx.lineWidth = 3 / globalScale;
          ctx.stroke();
        }
      }}
      nodeLabel={(node: Node) => `
        ${node.name || node.id}
        XP: ${node.total_xp || 0}
        Last Version: ${node.version || "v1"}
      `}
      onNodeClick={(node: Node) => {
        if (node.total_xp && node.total_xp >= 100) {
          setShowAgentModal(true);
          setSelectedPluginName(node.name || node.id);
        }
      }}
    />
  );
};

export default GalaxyGraph;
