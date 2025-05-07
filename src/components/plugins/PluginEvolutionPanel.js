"use client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export const PluginEvolutionPanel = ({ pluginId }) => {
    const supabase = createClientComponentClient();
    const [logs, setLogs] = useState([]);
    const [evolutions, setEvolutions] = useState([]);
    useEffect(() => {
        const fetchLogs = () => __awaiter(void 0, void 0, void 0, function* () {
            const { data: xpLogs } = yield supabase
                .from("plugin_logs")
                .select("*")
                .eq("plugin_name", pluginId)
                .order("created_at", { descending: true });
            const { data: evolutionLogs } = yield supabase
                .from("agent_evolution_logs")
                .select("*")
                .eq("triggered_by_plugin", pluginId)
                .order("created_at", { descending: true });
            setLogs(xpLogs || []);
            setEvolutions(evolutionLogs || []);
        });
        fetchLogs();
    }, [pluginId]);
    return (_jsxs("div", { className: "p-6 space-y-6 max-w-4xl mx-auto", children: [_jsxs("h1", { className: "text-2xl font-bold", children: ["\uD83E\uDDEC Plugin Evolution: ", pluginId] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold", children: "Evolution Chain" }), _jsxs("ul", { className: "space-y-2 mt-2", children: [evolutions.map((e) => (_jsxs("li", { className: "p-3 bg-muted rounded", children: [e.from_version, " \u2192 ", e.to_version, _jsxs("div", { className: "text-xs text-muted-foreground", children: [new Date(e.created_at).toLocaleString(), " \u2022 ", e.triggered_by] })] }, e.id))), evolutions.length === 0 && (_jsx("p", { className: "text-sm text-muted-foreground", children: "No evolutions triggered by this plugin yet." }))] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold", children: "XP Logs" }), _jsx("ul", { className: "space-y-2 mt-2", children: logs.map((log) => (_jsxs("li", { className: "p-3 border rounded text-sm", children: [log.event, " \u2022 +", log.value, " XP", _jsx("div", { className: "text-xs text-muted-foreground", children: new Date(log.created_at).toLocaleString() })] }, log.id))) })] })] }));
};
