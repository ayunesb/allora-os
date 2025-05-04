import { PluginEvolutionPanel } from "@/components/plugins/PluginEvolutionPanel";

export default function PluginEvolutionPage({ params }: { params: { id: string } }) {
  return <PluginEvolutionPanel pluginId={params.id} />;
}
