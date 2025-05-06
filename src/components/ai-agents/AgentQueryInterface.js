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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { useAgentQuery } from "@/utils/langchain/hooks/useAgentQuery";
import { useExternalLangChainAPI } from "@/utils/langchain/hooks/useExternalLangChainAPI";
import { PageLoader } from "@/components/ui/page-loader";
import { Badge } from "@/components/ui/badge";
import { AlignLeft, Clock, Settings, Wrench } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
export function AgentQueryInterface({ title = "Ask your AI Agent", placeholder = "Enter your question or request...", initialContext = {}, onResult, }) {
    const [inputValue, setInputValue] = useState("");
    const [showToolCalls, setShowToolCalls] = useState(false);
    const [useExternalAPI, setUseExternalAPI] = useState(() => {
        return localStorage.getItem("use_external_langchain_api") === "true";
    });
    const { executeQuery, result: internalResult, toolCalls, isLoading: isInternalLoading, error: internalError, setContext, } = useAgentQuery({
        onSuccess: (data) => {
            if (onResult && data.result && !useExternalAPI) {
                onResult(data.result);
            }
        },
        enabled: false,
    });
    const { executeQuery: executeExternalQuery, result: externalResult, isLoading: isExternalLoading, error: externalError, } = useExternalLangChainAPI();
    // Determine which result, loading state, and error to use based on the API choice
    const result = useExternalAPI ? externalResult : internalResult;
    const isLoading = useExternalAPI ? isExternalLoading : isInternalLoading;
    const error = useExternalAPI ? externalError : internalError;
    // Set initial context when component mounts
    useEffect(() => {
        if (Object.keys(initialContext).length > 0) {
            setContext(initialContext);
        }
    }, [initialContext, setContext]);
    // Handle API toggle change
    const handleApiToggle = (checked) => {
        setUseExternalAPI(checked);
        localStorage.setItem("use_external_langchain_api", checked ? "true" : "false");
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!inputValue.trim())
            return;
        try {
            if (useExternalAPI) {
                const result = yield executeExternalQuery({
                    query: inputValue,
                    context: initialContext,
                });
                if (onResult && result.result) {
                    onResult(result.result);
                }
            }
            else {
                yield executeQuery(inputValue);
            }
        }
        catch (err) {
            console.error("Error executing query:", err);
        }
    });
    return (_jsxs(Card, { className: "w-full max-w-3xl mx-auto", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs(CardTitle, { className: "flex items-center gap-2", children: [title, _jsx(Badge, { variant: "outline", className: "ml-2", children: useExternalAPI ? "External API" : "LangChain" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Label, { htmlFor: "api-toggle", className: "text-sm", children: useExternalAPI ? "Using External API" : "Using Built-in API" }), _jsx(Switch, { id: "api-toggle", checked: useExternalAPI, onCheckedChange: handleApiToggle })] })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("form", { onSubmit: handleSubmit, className: "space-y-2", children: [_jsx(Textarea, { placeholder: placeholder, value: inputValue, onChange: (e) => setInputValue(e.target.value), className: "min-h-[100px] resize-none", disabled: isLoading }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { type: "submit", disabled: isLoading || !inputValue.trim(), children: isLoading ? "Processing..." : "Submit" }) })] }), isLoading && _jsx(PageLoader, { message: "Processing your request..." }), error && (_jsx("div", { className: "p-4 bg-red-50 text-red-600 rounded-md", children: error instanceof Error ? error.message : String(error) })), result && !isLoading && (_jsxs("div", { className: "mt-4 space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h3", { className: "text-lg font-medium flex items-center gap-2", children: [_jsx(AlignLeft, { size: 18, className: "text-primary" }), " Response"] }), !useExternalAPI && toolCalls && toolCalls.length > 0 && (_jsxs(Button, { variant: "outline", size: "sm", onClick: () => setShowToolCalls(!showToolCalls), children: [_jsx(Wrench, { size: 16, className: "mr-2" }), showToolCalls ? "Hide Tools" : "Show Tools"] }))] }), _jsx("div", { className: "p-4 bg-muted/40 rounded-md whitespace-pre-wrap", children: result }), !useExternalAPI &&
                                showToolCalls &&
                                toolCalls &&
                                toolCalls.length > 0 && (_jsxs("div", { className: "mt-4 p-4 bg-muted/20 rounded-md", children: [_jsxs("h4", { className: "text-sm font-medium mb-2 flex items-center gap-2", children: [_jsx(Settings, { size: 16 }), " Tool Executions (", toolCalls.length, ")"] }), _jsx("div", { className: "space-y-2", children: toolCalls.map((call, idx) => (_jsxs("div", { className: "p-2 bg-background border rounded-sm text-xs", children: [_jsx("div", { className: "font-bold", children: call.tool }), _jsxs("div", { className: "text-muted-foreground", children: ["Input: ", JSON.stringify(call.input)] }), _jsxs("div", { className: "mt-1 text-muted-foreground", children: ["Output:", " ", typeof call.output === "object"
                                                            ? JSON.stringify(call.output)
                                                            : String(call.output)] })] }, idx))) })] }))] }))] }), _jsxs(CardFooter, { className: "flex items-center justify-between text-xs text-muted-foreground", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Clock, { size: 14 }), new Date().toLocaleString()] }), _jsx("div", { children: useExternalAPI
                            ? "Powered by External LangChain API"
                            : "Powered by LangChain.tsx" })] })] }));
}
