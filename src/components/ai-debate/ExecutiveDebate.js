import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Card } from "@/components/ui/card";
export const ExecutiveDebate = ({ topic = "Growth Strategy", participants = ["CEO", "CMO", "CTO"], }) => {
    return (_jsxs(Card, { className: "p-6", children: [_jsxs("h2", { className: "text-2xl font-bold mb-4", children: ["Executive Debate: ", topic] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("p", { className: "text-muted-foreground", children: ["The AI executives are debating the best approach to", " ", topic.toLowerCase(), "."] }), _jsx("div", { className: "flex flex-wrap gap-2 mt-2", children: participants.map((participant) => (_jsx("span", { className: "px-3 py-1 bg-primary/10 text-primary rounded-full text-sm", children: participant }, participant))) }), _jsx("div", { className: "mt-6 space-y-4 border-t pt-4", children: _jsx("p", { className: "italic", children: "Debate visualization is loading..." }) })] })] }));
};
export default ExecutiveDebate;
