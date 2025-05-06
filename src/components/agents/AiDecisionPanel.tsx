import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import confetti from "canvas-confetti"; // Added for confetti effect
import { Alert } from "@/components/ui/alert"; // Assuming Alert component exists
export const AgentPerformanceDashboard = ({ pluginFilter }) => {
  const [pluginXpData, setPluginXpData] = useState([]);
  const [usageStreaks, setUsageStreaks] = useState([]);
  useEffect(() => {
    const supabase = createClientComponentClient();
    const fetchPluginXP = async () => {
      const { data } = await supabase
        .from("plugin_logs")
        .select("plugin_name, value")
        .eq("event", "chat_response")
        .filter(
          "plugin_name",
          pluginFilter ? "eq" : "not.is",
          pluginFilter || null,
        ); // Updated filter logic
      const totals = {};
      (data || []).forEach((entry) => {
        if (!totals[entry.plugin_name]) totals[entry.plugin_name] = 0;
        totals[entry.plugin_name] += entry.value || 0;
      });
      // Trigger confetti if any plugin evolves
      Object.values(totals).forEach((total_xp) => {
        if (total_xp >= 100) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      });
      setPluginXpData(
        Object.entries(totals).map(([plugin_name, total_xp]) => ({
          plugin_name,
          total_xp,
        })),
      );
    };
    const fetchUsageStreaks = async () => {
      const { data } = await supabase
        .from("plugin_logs")
        .select("plugin_name, created_at")
        .eq("event", "chat_response")
        .filter(
          "plugin_name",
          pluginFilter ? "eq" : "not.is",
          pluginFilter || null,
        ); // Updated filter logic
      const calculateStreaks = (logs) => {
        const streaks = {};
        logs.forEach((log) => {
          const date = new Date(log.created_at).toISOString().slice(0, 10);
          if (!streaks[log.plugin_name]) streaks[log.plugin_name] = new Set();
          streaks[log.plugin_name].add(date);
        });
        return Object.entries(streaks).map(([plugin_name, dateSet]) => ({
          plugin_name,
          days_used: dateSet.size,
        }));
      };
      setUsageStreaks(calculateStreaks(data || []));
    };
    fetchPluginXP();
    fetchUsageStreaks();
  }, [pluginFilter]);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Plugin XP Chart</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={pluginXpData}>
          <XAxis dataKey="plugin_name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total_xp" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Plugin Usage Streaks</h2>
        <ul className="grid grid-cols-2 gap-3">
          {usageStreaks.map((item) => (
            <li key={item.plugin_name} className="bg-muted rounded p-3">
              <div className="font-bold">{item.plugin_name}</div>
              <div className="text-sm text-muted-foreground">
                {item.days_used} active days
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Evolution Thresholds</h2>
        <ul className="space-y-3">
          {pluginXpData.map((plugin) => (
            <li
              key={plugin.plugin_name}
              className="border rounded-lg p-3 bg-muted"
            >
              <div className="font-bold">{plugin.plugin_name}</div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-indigo-500 transition-all duration-500"
                  style={{
                    width: `${Math.min((plugin.total_xp / 100) * 100, 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {plugin.total_xp} / 100 XP to evolve
              </p>
              {plugin.total_xp >= 100 && (
                <Alert variant="success" className="mt-4">
                  🧬 Plugin Assistant ready to evolve! Next version unlocked.
                </Alert>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={async () => {
            if (!current || !prev) return;
            await supabase
              .from("agent_versions")
              .update({
                prompt: prev.prompt,
                changelog: `Rolled back from ${current.version} to ${prev.version}`,
              })
              .eq("id", current.id);
            window.location.reload(); // or toast and refresh state
          }}
          className="px-4 py-2 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600"
        >
          🔁 Roll Back
        </button>

        <a
          href={`/PromptTuner.tsx?id=${current?.id}`}
          className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          🎛️ Remix in Prompt Tuner
        </a>
      </div>
    </div>
  );
};
