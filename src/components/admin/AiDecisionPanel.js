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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
export const AiDecisionPanel = () => {
    const supabase = createClientComponentClient();
    const [versions, setVersions] = useState([]);
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        const fetch = () => __awaiter(void 0, void 0, void 0, function* () {
            const { data } = yield supabase
                .from("agent_versions")
                .select("*")
                .eq("agent_type", "plugin_assistant")
                .order("created_at", { ascending: true });
            setVersions(data || []);
            if (data === null || data === void 0 ? void 0 : data.length)
                setSelected(data[data.length - 1].id);
        });
        fetch();
    }, []);
    const current = versions.find((v) => v.id === selected);
    const prev = versions[versions.findIndex((v) => v.id === selected) - 1];
    return (_jsxs("div", { className: "p-6 space-y-4", children: [_jsx("h1", { className: "text-2xl font-bold", children: "\uD83E\uDDE0 AI Agent Version Tracker" }), _jsxs(Tabs, { defaultValue: selected || "", onValueChange: setSelected, children: [_jsx(TabsList, { children: versions.map((v) => (_jsx(TabsTrigger, { value: v.id, children: v.version }, v.id))) }), _jsxs(TabsContent, { value: selected || "", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4 mt-4", children: [_jsxs(Card, { className: "p-4", children: [_jsx("h2", { className: "text-sm font-semibold mb-2 text-muted-foreground", children: "Previous Prompt" }), _jsx("pre", { className: "text-xs whitespace-pre-wrap", children: (prev === null || prev === void 0 ? void 0 : prev.prompt) || "N/A" })] }), _jsxs(Card, { className: "p-4", children: [_jsx("h2", { className: "text-sm font-semibold mb-2 text-muted-foreground", children: "Current Prompt" }), _jsx("pre", { className: "text-xs whitespace-pre-wrap", children: current === null || current === void 0 ? void 0 : current.prompt })] })] }), _jsxs("div", { className: "mt-4 text-sm text-muted-foreground", children: [_jsx("strong", { children: "Changelog:" }), " ", (current === null || current === void 0 ? void 0 : current.changelog) || "N/A", _jsx("br", {}), _jsxs("span", { className: "text-xs", children: ["Created at: ", new Date((current === null || current === void 0 ? void 0 : current.created_at) || "").toLocaleString()] })] })] })] })] }));
};
