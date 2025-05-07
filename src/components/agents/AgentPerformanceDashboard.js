var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, } from "recharts";
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
        const fetchPluginXP = () => __awaiter(void 0, void 0, void 0, function* () {
            const { data } = yield supabase
                .from("plugin_logs")
                .select("plugin_name, value")
                .eq("event", "chat_response")
                .filter("plugin_name", pluginFilter ? "eq" : "is", pluginFilter || null); // Fixed filter logic
            const totals = {};
            (data || []).forEach((entry) => {
                if (!totals[entry.plugin_name])
                    totals[entry.plugin_name] = 0;
                totals[entry.plugin_name] += entry.value || 0;
            });
            // Trigger confetti if any plugin evolves
            Object.values(totals).forEach((total_xp, index) => __awaiter(void 0, void 0, void 0, function* () {
                var _a;
                if (total_xp >= 100) {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                    });
                    const pluginName = Object.keys(totals)[index];
                    const { data: last } = yield supabase
                        .from("agent_versions")
                        .select("version")
                        .eq("agent_type", "plugin_assistant")
                        .order("created_at", { descending: true })
                        .limit(1)
                        .single();
                    const newVersion = "v" + (parseInt(((_a = last === null || last === void 0 ? void 0 : last.version) === null || _a === void 0 ? void 0 : _a.replace("v", "")) || "1") + 1 || 2);
                    // Insert new version
                    yield supabase.from("agent_versions").insert({
                        agent_type: "plugin_assistant",
                        version: newVersion,
                        prompt: "Auto-evolution triggered by XP threshold",
                        changelog: `Auto-evolution triggered by plugin: ${pluginName}`,
                    });
                    // Log evolution
                    yield supabase.from("agent_evolution_logs").insert({
                        agent_type: "plugin_assistant",
                        from_version: last.version,
                        to_version: newVersion,
                        triggered_by: "xp_threshold",
                        triggered_by_plugin: pluginName,
                    });
                }
            }));
            setPluginXpData(Object.entries(totals).map(([plugin_name, total_xp]) => ({
                plugin_name,
                total_xp,
            })));
        });
        const fetchUsageStreaks = () => __awaiter(void 0, void 0, void 0, function* () {
            const { data } = yield supabase
                .from("plugin_logs")
                .select("plugin_name, created_at")
                .eq("event", "chat_response")
                .filter("plugin_name", pluginFilter ? "eq" : "is", pluginFilter || null); // Fixed filter logic
            const calculateStreaks = (logs) => {
                const streaks = {};
                logs.forEach((log) => {
                    const date = new Date(log.created_at).toISOString().slice(0, 10);
                    if (!streaks[log.plugin_name])
                        streaks[log.plugin_name] = new Set();
                    streaks[log.plugin_name].add(date);
                });
                return Object.entries(streaks).map(([plugin_name, dateSet]) => ({
                    plugin_name,
                    days_used: dateSet.size,
                }));
            };
            setUsageStreaks(calculateStreaks(data || []));
        });
        const fetchLogs = () => __awaiter(void 0, void 0, void 0, function* () {
            const { data: logs } = yield supabase
                .from("agent_evolution_logs")
                .select("*")
                .eq("agent_type", "plugin_assistant")
                .order("created_at", { descending: true });
            const grouped = (logs === null || logs === void 0 ? void 0 : logs.reduce((acc, log) => {
                const key = log.triggered_by || "unknown";
                if (!acc[key])
                    acc[key] = [];
                acc[key].push(log);
                return acc;
            }, {})) || {};
            setGroupedLogs(grouped);
        });
        const fetchAgentXP = () => __awaiter(void 0, void 0, void 0, function* () {
            const { data } = yield supabase
                .from("agent_logs")
                .select("agent_type, xp");
            const totals = {};
            data === null || data === void 0 ? void 0 : data.forEach((log) => {
                totals[log.agent_type] = (totals[log.agent_type] || 0) + (log.xp || 0);
            });
            setAgentXpLogs(totals);
        });
        fetchPluginXP();
        fetchUsageStreaks();
        fetchLogs();
        fetchAgentXP();
    }, [pluginFilter]);
    const handleRollback = (pluginName, rollbackVersion) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch("/api/rollback-agent", {
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
        }
        catch (error) {
            console.error(error);
            alert("An error occurred during rollback.");
        }
    });
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-2", children: "Plugin XP Chart" }), _jsx(ResponsiveContainer, { width: "100%", height: 250, children: _jsxs(BarChart, { data: pluginXpData, children: [_jsx(XAxis, { dataKey: "plugin_name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "total_xp", fill: "#10b981", radius: [4, 4, 0, 0] })] }) }), _jsxs("div", { className: "mt-4", children: [_jsx("h2", { className: "text-lg font-semibold mb-2", children: "Plugin Usage Streaks" }), _jsx("ul", { className: "grid grid-cols-2 gap-3", children: usageStreaks.map((item) => (_jsxs("li", { className: "bg-muted rounded p-3", children: [_jsx("div", { className: "font-bold", children: item.plugin_name }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [item.days_used, " active days"] })] }, item.plugin_name))) })] }), _jsxs("div", { className: "mt-4", children: [_jsx("h2", { className: "text-lg font-semibold mb-2", children: "Evolution Thresholds" }), _jsx("ul", { className: "space-y-3", children: pluginXpData.map((plugin) => (_jsxs("li", { className: "border rounded-lg p-3 bg-muted", children: [_jsx("div", { className: "font-bold", children: plugin.plugin_name }), _jsx("div", { className: "w-full h-2 bg-muted rounded-full overflow-hidden mt-1", children: _jsx("div", { className: "h-full bg-indigo-500 transition-all duration-500", style: {
                                            width: `${Math.min((plugin.total_xp / 100) * 100, 100)}%`,
                                        } }) }), _jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [plugin.total_xp, " / 100 XP to evolve"] }), plugin.total_xp >= 100 && (_jsxs("div", { children: [_jsx(Alert, { variant: "success", className: "mt-4", children: "\uD83E\uDDEC Plugin Assistant ready to evolve! Next version unlocked." }), _jsx("button", { onClick: () => handleRollback(plugin.plugin_name, "previous_version"), className: "mt-2 bg-red-500 text-white px-3 py-1 rounded", children: "Rollback" })] }))] }, plugin.plugin_name))) })] }), _jsxs("div", { className: "mt-4", children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Changelog Notes" }), _jsx(Textarea, { value: changelog, onChange: (e) => setChangelog(e.target.value), rows: 3, placeholder: "Describe what changed in this version..." })] }), _jsx("div", { className: "mt-4", children: _jsx(Button, { variant: "default", onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                        var _a;
                        const { data: last } = yield supabase
                            .from("agent_versions")
                            .select("version")
                            .eq("agent_type", "plugin_assistant")
                            .order("created_at", { descending: true })
                            .limit(1)
                            .single();
                        const newVersion = "v" + (parseInt(((_a = last === null || last === void 0 ? void 0 : last.version) === null || _a === void 0 ? void 0 : _a.replace("v", "")) || "1") + 1 || 2);
                        // Insert new version
                        yield supabase.from("agent_versions").insert({
                            agent_type: "plugin_assistant",
                            version: newVersion,
                            prompt,
                            changelog: changelog || `Manual version bump from ${last.version}`,
                        });
                        // Log evolution
                        yield supabase.from("agent_evolution_logs").insert({
                            agent_type: "plugin_assistant",
                            from_version: last.version,
                            to_version: newVersion,
                            triggered_by: "manual",
                        });
                        toast.success(`New version ${newVersion} created`);
                        setTimeout(() => {
                            router.push("/admin/ai-decisions");
                        }, 1200);
                    }), children: "\uD83D\uDE80 Bump Version" }) }), _jsxs("div", { className: "mt-6", children: [_jsx("h2", { className: "text-lg font-semibold mb-2", children: "\uD83D\uDD01 Evolution History" }), Object.entries(groupedLogs).map(([trigger, logs]) => (_jsxs("div", { className: "mb-6", children: [_jsx("h3", { className: "text-md font-bold capitalize mb-2", children: trigger.replace(/_/g, " ") }), _jsx("ul", { className: "space-y-2", children: logs.map((log) => (_jsxs("li", { className: "border rounded p-3 text-sm bg-muted", children: [log.from_version, " \u2192 ", log.to_version, _jsx("div", { className: "text-xs text-muted-foreground mt-1", children: new Date(log.created_at).toLocaleString() })] }, log.id))) })] }, trigger)))] }), _jsx("ul", { className: "grid grid-cols-2 gap-4 mt-6", children: Object.entries(agentXpLogs).map(([type, xp]) => (_jsxs("li", { className: "bg-muted p-4 rounded", children: [_jsx("div", { className: "font-bold", children: type.replace("_", " ").toUpperCase() }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [xp, " XP total"] }), _jsx("div", { className: "w-full h-2 bg-border rounded mt-2 overflow-hidden", children: _jsx("div", { className: "h-full bg-indigo-500", style: { width: `${Math.min(xp / 100, 1) * 100}%` } }) })] }, type))) })] }));
};
