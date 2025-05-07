import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RocketIcon, Sparkles, Brain } from "lucide-react";
// Executive bots data
const executiveBots = {
    ceo: ["Elon Musk", "Jeff Bezos", "Satya Nadella", "Tim Cook"],
    cfo: ["Warren Buffett", "Ruth Porat"],
    cio: ["Steve Jobs", "Bob Lord"],
    cmo: ["Antonio Lucio", "Keith Weed"],
    chro: ["Pat Wadors", "Laszlo Bock"],
    strategy: ["Clayton Christensen", "Reed Hastings"],
};
export default function ExecutiveCards() {
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: Object.entries(executiveBots).map(([role, names]) => (_jsxs(Card, { className: "border-primary/10 shadow-md", children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center gap-2", children: [role === "ceo" && (_jsx(RocketIcon, { className: "h-5 w-5 text-primary" })), role === "strategy" && (_jsx(Sparkles, { className: "h-5 w-5 text-primary" })), role !== "ceo" && role !== "strategy" && (_jsx(Brain, { className: "h-5 w-5 text-primary" })), _jsx(CardTitle, { className: "text-lg capitalize", children: role })] }) }), _jsx(CardContent, { children: _jsx("ul", { className: "space-y-1", children: names.map((name) => (_jsx("li", { className: "text-muted-foreground", children: name }, name))) }) })] }, role))) }));
}
