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
import { useEffect, useState } from "react";
import GalaxyGraph from "@/components/galaxy/GalaxyGraph";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);
export default function GalaxyPage() {
    const [nodes, setNodes] = useState([]);
    const [links, setLinks] = useState([]);
    useEffect(() => {
        const fetchGraphData = () => __awaiter(this, void 0, void 0, function* () {
            const { data: plugins } = yield supabase.from("plugins").select("*");
            const { data: strategies } = yield supabase
                .from("strategies")
                .select("*");
            const { data: agentLinks } = yield supabase
                .from("plugin_logs")
                .select("plugin_id, agent_id");
            const pluginNodes = (plugins === null || plugins === void 0 ? void 0 : plugins.map((p) => ({ id: p.name, group: "plugin" }))) || [];
            const strategyNodes = (strategies === null || strategies === void 0 ? void 0 : strategies.map((s) => ({ id: s.title, group: "strategy" }))) || [];
            const pluginToStrategyLinks = (strategies === null || strategies === void 0 ? void 0 : strategies.flatMap((s) => {
                var _a;
                return (_a = s.plugin_ids) === null || _a === void 0 ? void 0 : _a.map((pluginId) => {
                    const plugin = plugins.find((p) => p.id === pluginId);
                    return plugin ? { source: plugin.name, target: s.title } : null;
                }).filter(Boolean);
            })) || [];
            const agentToPluginLinks = (agentLinks === null || agentLinks === void 0 ? void 0 : agentLinks.map((log) => {
                var _a;
                return ({
                    source: `agent:${log.agent_id}`,
                    target: (_a = plugins.find((p) => p.id === log.plugin_id)) === null || _a === void 0 ? void 0 : _a.name,
                });
            }).filter((l) => l.target)) || [];
            const agentNodes = [
                ...new Set(agentLinks === null || agentLinks === void 0 ? void 0 : agentLinks.map((l) => `agent:${l.agent_id}`)),
            ].map((id) => ({
                id,
                group: "agent",
            }));
            setNodes([...pluginNodes, ...strategyNodes, ...agentNodes]);
            setLinks([...pluginToStrategyLinks, ...agentToPluginLinks]);
        });
        fetchGraphData();
    }, []);
    return (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Galaxy Explorer" }), _jsx(GalaxyGraph, { nodes: nodes, links: links })] }));
}
