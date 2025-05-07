import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Bot, Briefcase, GraduationCap } from "lucide-react";
const BotInfo = ({ bot }) => {
    return (_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0", "aria-hidden": "true", children: _jsx(Bot, { className: "h-6 w-6 text-primary" }) }), _jsxs("div", { className: "overflow-hidden", children: [_jsx(CardTitle, { id: `bot-${bot.name.replace(/\s+/g, "-").toLowerCase()}`, children: bot.name }), _jsxs(CardDescription, { className: "flex items-center gap-1 mt-1 truncate", "aria-labelledby": `bot-${bot.name.replace(/\s+/g, "-").toLowerCase()}`, children: [_jsx(Briefcase, { className: "h-3.5 w-3.5 flex-shrink-0", "aria-hidden": "true" }), _jsx("span", { className: "truncate", children: bot.title })] }), _jsxs("div", { className: "flex items-center gap-1 text-sm text-muted-foreground mt-1 truncate", "aria-label": `${bot.name}'s expertise: ${bot.expertise}`, children: [_jsx(GraduationCap, { className: "h-3.5 w-3.5 flex-shrink-0", "aria-hidden": "true" }), _jsx("span", { className: "truncate", children: bot.expertise })] })] })] }));
};
export default BotInfo;
