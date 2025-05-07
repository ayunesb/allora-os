var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, Suspense, useEffect } from "react";
import GalaxyGraph from "@/components/galaxy/GalaxyGraph";
import InspectorSidebar from "@/components/galaxy/InspectorSidebar";
import PluginInspector from "@/components/galaxy/PluginInspector";
import PluginSkeleton from "@/components/galaxy/PluginSkeleton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import { useRouter } from "next/router";
export default function GalaxyExplorer() {
    const router = useRouter();
    const [selectedPlugin, setSelectedPlugin] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const [showXpBoost, setShowXpBoost] = useState(false);
    const chatEndRef = React.useRef(null);
    const handleNodeClick = (pluginNode) => {
        if (pluginNode.type === "plugin") {
            router.push(`/agents/performance?plugin=${pluginNode.name}`);
        }
        setSelectedPlugin(pluginNode);
        handleXpThreshold(pluginNode); // Check XP threshold on node click
    };
    const handleXpThreshold = (pluginNode) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const supabase = createClientComponentClient();
        try {
            const { data: pluginData, error: fetchError } = yield supabase
                .from("plugin_card_with_xp")
                .select("total_xp, agent_version_id")
                .eq("id", pluginNode.id)
                .single();
            if (fetchError) {
                console.error("Error fetching plugin data:", fetchError);
                return;
            }
            if (pluginData.total_xp >= 100) {
                const newVersion = `v${parseInt(((_a = pluginData.agent_version_id) === null || _a === void 0 ? void 0 : _a.slice(1)) || "1") + 1}`;
                const { error: logError } = yield supabase
                    .from("agent_evolution_logs")
                    .insert({
                    agent_type: "plugin_assistant",
                    from_version: pluginData.agent_version_id || "v1",
                    to_version: newVersion,
                });
                if (logError) {
                    console.error("Error logging evolution:", logError);
                    return;
                }
                const { error: updateError } = yield supabase
                    .from("plugin_card_with_xp")
                    .update({ agent_version_id: newVersion, total_xp: 0 }) // Reset XP
                    .eq("id", pluginNode.id);
                if (updateError) {
                    console.error("Error updating plugin version:", updateError);
                }
                else {
                    console.log(`Plugin ${pluginNode.id} evolved to ${newVersion}`);
                    confetti(); // Trigger confetti animation
                    toast.success("🎉 Plugin assistant evolved to a new version!");
                }
            }
        }
        catch (err) {
            console.error("Error handling XP threshold:", err);
        }
    });
    useEffect(() => {
        const supabase = createClientComponentClient();
        const fetchChatLogs = () => __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield supabase
                .from("plugin_card_with_xp")
                .select("*");
            if (error) {
                console.error("Error fetching chat logs:", error);
            }
            else {
                setMessages(data);
            }
        });
        fetchChatLogs();
    }, []);
    const sendMessage = () => {
        // Implement send message logic
    };
    return (_jsxs("div", { className: "flex h-screen bg-background text-foreground", children: [_jsx("div", { className: "w-3/4", children: _jsx(GalaxyGraph, { onNodeClick: handleNodeClick }) }), _jsx("div", { className: "w-1/4 border-l border-border", children: selectedPlugin ? (_jsxs(_Fragment, { children: [_jsx("button", { onClick: () => setSelectedPlugin(null), className: "mb-2 px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-lg", children: "Reset Selection" }), _jsx(Suspense, { fallback: _jsx(PluginSkeleton, {}), children: _jsx(PluginInspector, { plugin: selectedPlugin }) })] })) : (_jsx(InspectorSidebar, {})) }), _jsxs("div", { className: "flex flex-col h-full border border-muted rounded-xl p-3 overflow-hidden", children: [_jsxs("div", { className: "flex-1 overflow-y-auto space-y-2 pr-2", children: [messages.map((msg) => (_jsxs("div", { className: "flex items-start gap-2", children: [msg.sender === "agent" && (_jsx("div", { className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold", children: "\uD83E\uDD16" })), _jsxs("div", { className: `max-w-[85%] px-4 py-2 rounded-lg text-sm ${msg.sender === "user"
                                            ? "ml-auto bg-primary text-primary-foreground"
                                            : "mr-auto bg-muted"}`, children: [_jsx("div", { children: msg.message }), _jsxs("div", { className: "text-[10px] text-muted-foreground mt-1", children: [new Date(msg.created_at).toLocaleTimeString(), " ", msg.agent_version_id ? `• v${msg.agent_version_id}` : ""] })] }), msg.sender === "user" && (_jsx("div", { className: "w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-bold", children: "\uD83E\uDDD1" }))] }, msg.id))), loading && (_jsx("div", { className: "mr-auto text-xs text-muted-foreground animate-pulse", children: "AI is thinking..." })), _jsx("div", { ref: chatEndRef })] }), showXpBoost && (_jsx("div", { className: "absolute top-4 right-4 animate-bounce text-green-500 text-sm font-semibold", children: "+5 XP \uD83D\uDCA1" })), _jsxs("form", { className: "mt-3 flex items-center gap-2", onSubmit: (e) => {
                            e.preventDefault();
                            sendMessage();
                        }, children: [_jsx("input", { value: input, onChange: (e) => setInput(e.target.value), placeholder: "Ask the plugin something...", className: "flex-1 border border-input rounded-lg px-3 py-2 text-sm bg-background" }), _jsx("button", { type: "submit", disabled: loading, className: "px-3 py-2 text-sm bg-primary text-primary-foreground rounded-lg", children: "Send" })] })] })] }));
}
