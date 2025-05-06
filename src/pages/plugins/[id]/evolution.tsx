import { PluginEvolutionPanel } from "@/components/plugins/PluginEvolutionPanel";
export default function PluginEvolutionPage({ params }) {
  return <PluginEvolutionPanel pluginId={params.id} />;
}
