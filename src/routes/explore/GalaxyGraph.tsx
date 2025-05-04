import { useState } from "react";
import { AgentPerformanceModal } from "@/components/agents/AgentPerformanceModal";

// ...existing code...

const [showAgentModal, setShowAgentModal] = useState(false);
const [selectedPluginName, setSelectedPluginName] = useState<string | null>(null);

const onNodeClick = (node) => {
  if (node.type === "plugin") {
    setSelectedPluginName(node.name);
    setShowAgentModal(true);
  }
};

// ...existing code...

<AgentPerformanceModal
  open={showAgentModal}
  onClose={() => setShowAgentModal(false)}
  pluginName={selectedPluginName}
/>