var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useExecutiveAgent } from "@/hooks/useExecutiveAgent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutputStream } from "./OutputStream";
export const ExecutiveActionPanel = () => {
    const [prompt, setPrompt] = useState("Should we increase ad budget based on this month's revenue?");
    const [selectedExecutive, setSelectedExecutive] = useState("CMO");
    const [saveToNotion, setSaveToNotion] = useState(true);
    const [addToAuditLog, setAddToAuditLog] = useState(true);
    const { executeQuery, isLoading, response, reset } = useExecutiveAgent();
    const handleRun = () => __awaiter(void 0, void 0, void 0, function* () {
        yield executeQuery(prompt, selectedExecutive, {
            saveToNotion,
            addToAuditLog,
            userContext: {
                timestamp: new Date().toISOString(),
            },
        });
    });
    return (_jsxs(Card, { className: "w-full", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Zap, { className: "h-5 w-5 text-amber-500" }), "Executive Action Panel"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "executive", className: "text-sm font-medium", children: "Executive Role" }), _jsxs("select", { id: "executive", className: "w-full p-2 border rounded-md", value: selectedExecutive, onChange: (e) => setSelectedExecutive(e.target.value), children: [_jsx("option", { value: "CEO", children: "CEO" }), _jsx("option", { value: "CMO", children: "CMO" }), _jsx("option", { value: "CTO", children: "CTO" }), _jsx("option", { value: "CFO", children: "CFO" }), _jsx("option", { value: "COO", children: "COO" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "prompt", className: "text-sm font-medium", children: "Your Question" }), _jsx("textarea", { id: "prompt", rows: 3, className: "w-full p-2 border rounded-md", value: prompt, onChange: (e) => setPrompt(e.target.value) })] }), _jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("label", { className: "flex items-center space-x-2 text-sm", children: [_jsx("input", { type: "checkbox", checked: saveToNotion, onChange: () => setSaveToNotion(!saveToNotion) }), _jsx("span", { children: "Save to Notion" })] }), _jsxs("label", { className: "flex items-center space-x-2 text-sm", children: [_jsx("input", { type: "checkbox", checked: addToAuditLog, onChange: () => setAddToAuditLog(!addToAuditLog) }), _jsx("span", { children: "Add to Audit Log" })] })] }), _jsx(Button, { onClick: handleRun, className: "w-full", disabled: isLoading, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Processing..."] })) : (`Ask ${selectedExecutive}`) }), response && (_jsxs(Tabs, { defaultValue: "response", className: "mt-6", children: [_jsxs(TabsList, { className: "grid grid-cols-3 mb-4", children: [_jsx(TabsTrigger, { value: "response", children: "Response" }), _jsx(TabsTrigger, { value: "tool-execution", children: "Tool Execution" }), _jsx(TabsTrigger, { value: "raw", children: "Raw Output" })] }), _jsx(TabsContent, { value: "response", children: _jsx(OutputStream, { text: response.aiResponse, executive: selectedExecutive }) }), _jsx(TabsContent, { value: "tool-execution", children: response.toolResponses && response.toolResponses.length > 0 ? (_jsx("div", { className: "space-y-4", children: response.toolResponses.map((toolResponse, index) => (_jsxs(Card, { className: "overflow-hidden", children: [_jsx(CardHeader, { className: "bg-muted py-2", children: _jsxs(CardTitle, { className: "text-sm font-medium capitalize", children: [toolResponse.tool, " Tool"] }) }), _jsxs(CardContent, { className: "p-4", children: [_jsx("p", { className: "mb-2 font-medium", children: toolResponse.result }), toolResponse.data && (_jsx("pre", { className: "bg-muted p-2 rounded text-xs overflow-auto", children: JSON.stringify(toolResponse.data, null, 2) }))] })] }, index))) })) : (_jsx("div", { className: "p-4 text-center text-muted-foreground", children: "No tools were executed for this query" })) }), _jsx(TabsContent, { value: "raw", children: _jsx("pre", { className: "bg-muted p-4 rounded text-xs overflow-auto max-h-[300px]", children: JSON.stringify(response, null, 2) }) })] }))] })] }));
};
export default ExecutiveActionPanel;
