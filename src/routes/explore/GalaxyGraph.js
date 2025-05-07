import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { AgentPerformanceModal } from "@/components/agents/AgentPerformanceModal";
// ...existing code...
const [showAgentModal, setShowAgentModal] = useState(false);
const [selectedPluginName, setSelectedPluginName] = useState(null);
const onNodeClick = (node) => {
    // Added explicit type for 'node'
    if (node.type === "plugin") {
        setSelectedPluginName(node.name);
        setShowAgentModal(true);
    }
};
// ...existing code...
_jsx(AgentPerformanceModal, { open: showAgentModal, onClose: () => setShowAgentModal(false), pluginName: selectedPluginName });
