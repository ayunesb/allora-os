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
export const AgentPerformanceDashboard = ({ pluginFilter }) => {
    const [pluginXpData, setPluginXpData] = useState([]);
    const [usageStreaks, setUsageStreaks] = useState([]);
    useEffect(() => {
        const supabase = createClientComponentClient();
        const fetchPluginXP = () => __awaiter(void 0, void 0, void 0, function* () {
            const { data } = yield supabase
                .from("plugin_logs")
                .select("plugin_name, value")
                .eq("event", "chat_response")
                .filter("plugin_name", pluginFilter ? "eq" : "not.is", pluginFilter || null); // Updated filter logic
            const totals = {};
            (data || []).forEach((entry) => {
                if (!totals[entry.plugin_name])
                    totals[entry.plugin_name] = 0;
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
                .filter("plugin_name", pluginFilter ? "eq" : "not.is", pluginFilter || null); // Updated filter logic
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
        fetchPluginXP();
        fetchUsageStreaks();
    }, [pluginFilter]);
    return (_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold mb-2", children: "Plugin XP Chart" }), _jsx(ResponsiveContainer, { width: "100%", height: 250, children: _jsxs(BarChart, { data: pluginXpData, children: [_jsx(XAxis, { dataKey: "plugin_name" }), _jsx(YAxis, {}), _jsx(Tooltip, {}), _jsx(Bar, { dataKey: "total_xp", fill: "#10b981", radius: [4, 4, 0, 0] })] }) }), _jsxs("div", { className: "mt-4", children: [_jsx("h2", { className: "text-lg font-semibold mb-2", children: "Plugin Usage Streaks" }), _jsx("ul", { className: "grid grid-cols-2 gap-3", children: usageStreaks.map((item) => (_jsxs("li", { className: "bg-muted rounded p-3", children: [_jsx("div", { className: "font-bold", children: item.plugin_name }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [item.days_used, " active days"] })] }, item.plugin_name))) })] }), _jsxs("div", { className: "mt-4", children: [_jsx("h2", { className: "text-lg font-semibold mb-2", children: "Evolution Thresholds" }), _jsx("ul", { className: "space-y-3", children: pluginXpData.map((plugin) => (_jsxs("li", { className: "border rounded-lg p-3 bg-muted", children: [_jsx("div", { className: "font-bold", children: plugin.plugin_name }), _jsx("div", { className: "w-full h-2 bg-muted rounded-full overflow-hidden mt-1", children: _jsx("div", { className: "h-full bg-indigo-500 transition-all duration-500", style: {
                                            width: `${Math.min((plugin.total_xp / 100) * 100, 100)}%`,
                                        } }) }), _jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [plugin.total_xp, " / 100 XP to evolve"] }), plugin.total_xp >= 100 && (_jsx(Alert, { variant: "success", className: "mt-4", children: "\uD83E\uDDEC Plugin Assistant ready to evolve! Next version unlocked." }))] }, plugin.plugin_name))) })] }), _jsxs("div", { className: "mt-4 flex gap-3", children: [_jsx("button", { onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                            if (!current || !prev)
                                return;
                            yield supabase
                                .from("agent_versions")
                                .update({
                                prompt: prev.prompt,
                                changelog: `Rolled back from ${current.version} to ${prev.version}`,
                            })
                                .eq("id", current.id);
                            window.location.reload(); // or toast and refresh state
                        }), className: "px-4 py-2 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600", children: "\uD83D\uDD01 Roll Back" }), _jsx("a", { href: `/PromptTuner.tsx?id=${current === null || current === void 0 ? void 0 : current.id}`, className: "px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700", children: "\uD83C\uDF9B\uFE0F Remix in Prompt Tuner" })] })] }));
};
