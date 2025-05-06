import { jsx as _jsx } from "react/jsx-runtime";
import { PluginEvolutionPanel } from "@/components/plugins/PluginEvolutionPanel";
export default function PluginEvolutionPage({ params }) {
    return _jsx(PluginEvolutionPanel, { pluginId: params.id });
}
