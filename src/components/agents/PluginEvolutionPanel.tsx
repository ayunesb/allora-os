import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const PluginEvolutionPanel = ({ pluginId }) => {
    const [logs, setLogs] = useState([]);
    const [evolutions, setEvolutions] = useState([]);
    useEffect(() => {
        const supabase = createClientComponentClient();
        const xpSub = supabase
            .channel('plugin-xp-sub')
            .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'plugin_logs',
            filter: `plugin_name=eq.${pluginId}`,
        }, (payload) => {
            setLogs((prev) => [payload.new, ...prev]);
        })
            .subscribe();
        const evoSub = supabase
            .channel('plugin-evo-sub')
            .on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'agent_evolution_logs',
            filter: `triggered_by_plugin=eq.${pluginId}`,
        }, (payload) => {
            setEvolutions((prev) => [payload.new, ...prev]);
        })
            .subscribe();
        return () => {
            supabase.removeChannel(xpSub);
            supabase.removeChannel(evoSub);
        };
    }, [pluginId]);
    return (<div>
      {/* ...existing code to render logs and evolutions... */}
    </div>);
};
export default PluginEvolutionPanel;
