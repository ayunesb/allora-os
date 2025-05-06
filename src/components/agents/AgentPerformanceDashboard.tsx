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
import { Textarea } from "@/components/ui/textarea"; // Assuming Textarea component exists
import { Button } from "@/components/ui/button"; // Assuming Button component exists
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export const AgentPerformanceDashboard = ({ pluginFilter }) => {
  const [pluginXpData, setPluginXpData] = useState([]);
  const [usageStreaks, setUsageStreaks] = useState([]);
  const [changelog, setChangelog] = useState(""); // Added changelog state
  const [groupedLogs, setGroupedLogs] = useState({});
  const [agentXpLogs, setAgentXpLogs] = useState({});
  const router = useRouter();
  useEffect(() => {
    const supabase = createClientComponentClient();
    const fetchPluginXP = async () => {
      const { data } = await supabase
        .from("plugin_logs")
        .select("plugin_name, value")
        .eq("event", "chat_response")
        .filter(
          "plugin_name",
          pluginFilter ? "eq" : "is",
          pluginFilter || null,
        ); // Fixed filter logic
      const totals = {};
      (data || []).forEach((entry) => {
        if (!totals[entry.plugin_name]) totals[entry.plugin_name] = 0;
        totals[entry.plugin_name] += entry.value || 0;
      });
      // Trigger confetti if any plugin evolves
      Object.values(totals).forEach(async (total_xp, index) => {
        if (total_xp >= 100) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
          const pluginName = Object.keys(totals)[index];
          const { data: last } = await supabase
            .from("agent_versions")
            .select("version")
            .eq("agent_type", "plugin_assistant")
            .order("created_at", { descending: true })
            .limit(1)
            .single();
          const newVersion =
            "v" + (parseInt(last?.version?.replace("v", "") || "1") + 1 || 2);
          // Insert new version
          await supabase.from("agent_versions").insert({
            agent_type: "plugin_assistant",
            version: newVersion,
            prompt: "Auto-evolution triggered by XP threshold",
            changelog: `Auto-evolution triggered by plugin: ${pluginName}`,
          });
          // Log evolution
          await supabase.from("agent_evolution_logs").insert({
            agent_type: "plugin_assistant",
            from_version: last.version,
            to_version: newVersion,
            triggered_by: "xp_threshold",
            triggered_by_plugin: pluginName,
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
          pluginFilter ? "eq" : "is",
          pluginFilter || null,
        ); // Fixed filter logic
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
    const fetchLogs = async () => {
      const { data: logs } = await supabase
        .from("agent_evolution_logs")
        .select("*")
        .eq("agent_type", "plugin_assistant")
        .order("created_at", { descending: true });
      const grouped =
        logs?.reduce((acc, log) => {
          const key = log.triggered_by || "unknown";
          if (!acc[key]) acc[key] = [];
          acc[key].push(log);
          return acc;
        }, {}) || {};
      setGroupedLogs(grouped);
    };
    const fetchAgentXP = async () => {
      const { data } = await supabase
        .from("agent_logs")
        .select("agent_type, xp");
      const totals = {};
      data?.forEach((log) => {
        totals[log.agent_type] = (totals[log.agent_type] || 0) + (log.xp || 0);
      });
      setAgentXpLogs(totals);
    };
    fetchPluginXP();
    fetchUsageStreaks();
    fetchLogs();
    fetchAgentXP();
  }, [pluginFilter]);
  const handleRollback = async (pluginName, rollbackVersion) => {
    try {
      const response = await fetch("/api/rollback-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pluginName, rollbackVersion }),
      });
      if (!response.ok) {
        throw new Error("Failed to rollback plugin version");
      }
      alert("Rollback successful!");
    } catch (error) {
      console.error(error);
      alert("An error occurred during rollback.");
    }
  };
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
                <div>
                  <Alert variant="success" className="mt-4">
                    🧬 Plugin Assistant ready to evolve! Next version unlocked.
                  </Alert>
                  <button
                    onClick={() =>
                      handleRollback(plugin.plugin_name, "previous_version")
                    }
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Rollback
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">
          Changelog Notes
        </label>
        <Textarea
          value={changelog}
          onChange={(e) => setChangelog(e.target.value)}
          rows={3}
          placeholder="Describe what changed in this version..."
        />
      </div>

      <div className="mt-4">
        <Button
          variant="default"
          onClick={async () => {
            const { data: last } = await supabase
              .from("agent_versions")
              .select("version")
              .eq("agent_type", "plugin_assistant")
              .order("created_at", { descending: true })
              .limit(1)
              .single();
            const newVersion =
              "v" + (parseInt(last?.version?.replace("v", "") || "1") + 1 || 2);
            // Insert new version
            await supabase.from("agent_versions").insert({
              agent_type: "plugin_assistant",
              version: newVersion,
              prompt,
              changelog:
                changelog || `Manual version bump from ${last.version}`,
            });
            // Log evolution
            await supabase.from("agent_evolution_logs").insert({
              agent_type: "plugin_assistant",
              from_version: last.version,
              to_version: newVersion,
              triggered_by: "manual",
            });
            toast.success(`New version ${newVersion} created`);
            setTimeout(() => {
              router.push("/admin/ai-decisions");
            }, 1200);
          }}
        >
          🚀 Bump Version
        </Button>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">🔁 Evolution History</h2>
        {Object.entries(groupedLogs).map(([trigger, logs]) => (
          <div key={trigger} className="mb-6">
            <h3 className="text-md font-bold capitalize mb-2">
              {trigger.replace(/_/g, " ")}
            </h3>
            <ul className="space-y-2">
              {logs.map((log) => (
                <li
                  key={log.id}
                  className="border rounded p-3 text-sm bg-muted"
                >
                  {log.from_version} → {log.to_version}
                  <div className="text-xs text-muted-foreground mt-1">
                    {new Date(log.created_at).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <ul className="grid grid-cols-2 gap-4 mt-6">
        {Object.entries(agentXpLogs).map(([type, xp]) => (
          <li key={type} className="bg-muted p-4 rounded">
            <div className="font-bold">
              {type.replace("_", " ").toUpperCase()}
            </div>
            <div className="text-sm text-muted-foreground">{xp} XP total</div>
            <div className="w-full h-2 bg-border rounded mt-2 overflow-hidden">
              <div
                className="h-full bg-indigo-500"
                style={{ width: `${Math.min(xp / 100, 1) * 100}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
