import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { AgentQueryInterface } from "@/components/ai-agents/AgentQueryInterface";
import { useUser } from "@/hooks/useUser";
import { useCompanyId } from "@/hooks/useCompanyId";
export default function AIAgent() {
    var _a;
    const { user } = useUser();
    const companyId = useCompanyId();
    const initialContext = {
        userId: user === null || user === void 0 ? void 0 : user.id,
        companyId,
        date: new Date().toISOString(),
        userRole: ((_a = user === null || user === void 0 ? void 0 : user.user_metadata) === null || _a === void 0 ? void 0 : _a.role) || "user",
    };
    return (_jsxs("div", { className: "container mx-auto px-4 py-6 space-y-6", children: [_jsxs("div", { className: "flex flex-col gap-2", children: [_jsx(TypographyH1, { children: "AI Agent" }), _jsx(TypographyP, { children: "Ask questions or make requests to your AI-powered LangChain agent. This agent can access various tools and services to help you with your business needs." })] }), _jsx("div", { className: "mt-8", children: _jsx(AgentQueryInterface, { initialContext: initialContext, placeholder: "Ask about leads, campaigns, analyze data, or request business insights..." }) })] }));
}
