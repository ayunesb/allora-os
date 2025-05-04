import { useEffect, useState } from 'react';
import GalaxyGraph from '@/components/galaxy/GalaxyGraph';
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
export default function GalaxyPage() {
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    useEffect(() => {
        const fetchGraphData = async () => {
            const { data: plugins } = await supabase.from('plugins').select('*');
            const { data: strategies } = await supabase.from('strategies').select('*');
            const { data: agentLinks } = await supabase.from('plugin_logs').select('plugin_id, agent_id');
            const pluginNodes = plugins?.map((p) => ({ id: p.name, group: 'plugin' })) || [];
            const strategyNodes = strategies?.map((s) => ({ id: s.title, group: 'strategy' })) || [];
            const pluginToStrategyLinks = strategies?.flatMap((s) => s.plugin_ids?.map((pluginId) => {
                const plugin = plugins.find((p) => p.id === pluginId);
                return plugin ? { source: plugin.name, target: s.title } : null;
            }).filter(Boolean)) || [];
            const agentToPluginLinks = agentLinks?.map((log) => ({
                source: `agent:${log.agent_id}`,
                target: plugins.find((p) => p.id === log.plugin_id)?.name,
            })).filter((l) => l.target) || [];
            const agentNodes = [...new Set(agentLinks?.map((l) => `agent:${l.agent_id}`))].map((id) => ({
                id,
                group: 'agent',
            }));
            setNodes([...pluginNodes, ...strategyNodes, ...agentNodes]);
            setLinks([...pluginToStrategyLinks, ...agentToPluginLinks]);
        };
        fetchGraphData();
    }, []);
    return (<div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Galaxy Explorer</h1>
      <GalaxyGraph nodes={nodes} links={links}/>
    </div>);
}
