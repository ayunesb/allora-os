import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { AgentQueryInterface } from "@/components/ai-agents/AgentQueryInterface";
import { useUser } from "@/hooks/useUser";
import { useCompanyId } from "@/hooks/useCompanyId";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function LangChainAgentAPI() {
    var _a;
    const { user } = useUser();
    const companyId = useCompanyId();
    const [apiEndpoint, setApiEndpoint] = useState(localStorage.getItem("langchain_api_endpoint") || "");
    const initialContext = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        companyId,
        date: new Date().toISOString(),
        userRole: ((_a = user === null || user === void 0 ? void 0 : user.user_metadata) === null || _a === void 0 ? void 0 : _a.role) || "user",
    };
    return (_jsxs("div", { className: "container mx-auto px-4 py-6 space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(TypographyH1, { children: "LangChain Agent API" }), _jsx(TypographyP, { children: "Connect to your external LangChain Agent API to leverage AI-powered agents with access to various tools and services." })] }), _jsxs(Alert, { variant: "info", className: "mb-6", children: [_jsx(InfoIcon, { className: "h-4 w-4" }), _jsx(AlertTitle, { children: "API Configuration" }), _jsx(AlertDescription, { children: "You can deploy your LangChain Agent API separately and connect it to Allora AI using the endpoint URL. This allows you to run resource-intensive AI agents outside your main application." })] }), _jsxs(Card, { className: "mb-8", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "API Configuration" }) }), _jsx(CardContent, { children: _jsx("form", { className: "space-y-4", children: _jsxs("div", { className: "space-y-2", children: [_jsx("label", { htmlFor: "apiEndpoint", className: "font-medium", children: "LangChain Agent API Endpoint" }), _jsx("input", { id: "apiEndpoint", type: "text", className: "w-full p-2 border rounded-md", placeholder: "https://your-langchain-api.example.com/api/langchain-agent", value: apiEndpoint, onChange: (e) => {
                                            setApiEndpoint(e.target.value);
                                            localStorage.setItem("langchain_api_endpoint", e.target.value);
                                        } }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Enter the full URL to your deployed LangChain Agent API endpoint." })] }) }) })] }), _jsx("div", { className: "mt-8", children: _jsx(AgentQueryInterface, { initialContext: initialContext, placeholder: "Ask about leads, campaigns, analyze data, or request business insights..." }) })] }));
}
