"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export const PluginEvolutionPanel = ({ pluginId }) => {
    const supabase = createClientComponentClient();
    const [logs, setLogs] = useState([]);
    const [evolutions, setEvolutions] = useState([]);
    useEffect(() => {
        const fetchLogs = async () => {
            const { data: xpLogs } = await supabase
                .from("plugin_logs")
                .select("*")
                .eq("plugin_name", pluginId)
                .order("created_at", { descending: true });
            const { data: evolutionLogs } = await supabase
                .from("agent_evolution_logs")
                .select("*")
                .eq("triggered_by_plugin", pluginId)
                .order("created_at", { descending: true });
            setLogs(xpLogs || []);
            setEvolutions(evolutionLogs || []);
        };
        fetchLogs();
    }, [pluginId]);
    return (<div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">🧬 Plugin Evolution: {pluginId}</h1>

      <div>
        <h2 className="text-lg font-semibold">Evolution Chain</h2>
        <ul className="space-y-2 mt-2">
          {evolutions.map((e) => (<li key={e.id} className="p-3 bg-muted rounded">
              {e.from_version} → {e.to_version}
              <div className="text-xs text-muted-foreground">
                {new Date(e.created_at).toLocaleString()} • {e.triggered_by}
              </div>
            </li>))}
          {evolutions.length === 0 && <p className="text-sm text-muted-foreground">No evolutions triggered by this plugin yet.</p>}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold">XP Logs</h2>
        <ul className="space-y-2 mt-2">
          {logs.map((log) => (<li key={log.id} className="p-3 border rounded text-sm">
              {log.event} • +{log.value} XP
              <div className="text-xs text-muted-foreground">{new Date(log.created_at).toLocaleString()}</div>
            </li>))}
        </ul>
      </div>
    </div>);
};
