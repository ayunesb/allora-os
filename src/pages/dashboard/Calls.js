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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { PageTitle } from "@/components/ui/typography";
import { useCallScripts } from "@/hooks/callScripts/useCallScripts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
const Calls = () => {
    const [scriptType, setScriptType] = useState("sales");
    const { scripts, isLoading, error, generateScript } = useCallScripts();
    const [isFetching, setIsFetching] = useState(false);
    const onGenerateScript = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsFetching(true);
        try {
            const result = yield generateScript({ scriptType });
            if (result) {
                toast.success("Script generated successfully");
            }
            else {
                toast.error("Failed to generate script");
            }
        }
        catch (err) {
            console.error("Error generating script:", err);
            toast.error("Error generating script");
        }
        finally {
            setIsFetching(false);
        }
    });
    return (_jsxs("div", { className: "container mx-auto p-4", children: [_jsx(PageTitle, { title: "Communication Scripts", description: "AI-generated scripts for your sales calls, follow-ups, and customer engagement" }), _jsxs("div", { className: "grid gap-6 mt-6", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Generate New Script" }), _jsx(CardDescription, { children: "Choose the type of communication script you need" })] }), _jsx(CardContent, { className: "space-y-4", children: _jsxs("div", { className: "grid gap-4 md:grid-cols-4", children: [_jsx("div", { className: "col-span-3", children: _jsxs(Select, { value: scriptType, onValueChange: setScriptType, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select script type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "sales", children: "Sales Call" }), _jsx(SelectItem, { value: "followup", children: "Follow-up Email" }), _jsx(SelectItem, { value: "introduction", children: "Introduction Message" }), _jsx(SelectItem, { value: "meeting", children: "Meeting Agenda" })] })] }) }), _jsx(Button, { onClick: onGenerateScript, disabled: isFetching, className: "col-span-1", children: isFetching ? "Generating..." : "Generate" })] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Your Scripts" }), _jsx(CardDescription, { children: "Previously generated communication scripts" })] }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: "all", children: [_jsxs(TabsList, { className: "mb-4", children: [_jsx(TabsTrigger, { value: "all", children: "All Scripts" }), _jsx(TabsTrigger, { value: "sales", children: "Sales" }), _jsx(TabsTrigger, { value: "followup", children: "Follow-ups" })] }), _jsx(TabsContent, { value: "all", className: "space-y-4", children: isLoading ? (_jsxs("div", { className: "space-y-4", children: [_jsx(Skeleton, { className: "h-24 w-full" }), _jsx(Skeleton, { className: "h-24 w-full" })] })) : scripts.length > 0 ? (scripts.map((script) => (_jsxs("div", { className: "p-4 border rounded-md", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("h3", { className: "font-medium", children: script.title || script.script_type }), _jsx("span", { className: "text-xs bg-primary/10 text-primary px-2 py-1 rounded-full", children: script.script_type })] }), _jsx("p", { className: "text-sm whitespace-pre-line", children: script.content }), _jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: ["Created:", " ", new Date(script.created_at).toLocaleDateString()] })] }, script.id)))) : (_jsx("div", { className: "text-center py-12 text-muted-foreground", children: "No scripts generated yet. Create your first script!" })) }), _jsx(TabsContent, { value: "sales", className: "space-y-4", children: isLoading ? (_jsx(Skeleton, { className: "h-24 w-full" })) : scripts.filter((s) => s.script_type === "sales").length >
                                                0 ? (scripts
                                                .filter((s) => s.script_type === "sales")
                                                .map((script) => (_jsxs("div", { className: "p-4 border rounded-md", children: [_jsx("div", { className: "flex justify-between items-start mb-2", children: _jsx("h3", { className: "font-medium", children: script.title || "Sales Script" }) }), _jsx("p", { className: "text-sm whitespace-pre-line", children: script.content }), _jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: ["Created:", " ", new Date(script.created_at).toLocaleDateString()] })] }, script.id)))) : (_jsx("div", { className: "text-center py-12 text-muted-foreground", children: "No sales scripts yet. Generate one now!" })) }), _jsx(TabsContent, { value: "followup", className: "space-y-4", children: isLoading ? (_jsx(Skeleton, { className: "h-24 w-full" })) : scripts.filter((s) => s.script_type === "followup").length >
                                                0 ? (scripts
                                                .filter((s) => s.script_type === "followup")
                                                .map((script) => (_jsxs("div", { className: "p-4 border rounded-md", children: [_jsx("div", { className: "flex justify-between items-start mb-2", children: _jsx("h3", { className: "font-medium", children: script.title || "Follow-up Script" }) }), _jsx("p", { className: "text-sm whitespace-pre-line", children: script.content }), _jsxs("div", { className: "mt-2 text-xs text-muted-foreground", children: ["Created:", " ", new Date(script.created_at).toLocaleDateString()] })] }, script.id)))) : (_jsx("div", { className: "text-center py-12 text-muted-foreground", children: "No follow-up scripts yet. Generate one now!" })) })] }) })] })] })] }));
};
export default Calls;
