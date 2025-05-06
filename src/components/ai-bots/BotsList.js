import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, PlusCircle, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getExecutiveImage } from "@/utils/ai-executives";
export const BotsList = ({ filteredBots, onSelectBot }) => {
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("");
    };
    return (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: filteredBots.length === 0 ? (_jsx("div", { className: "col-span-3 text-center py-10", children: _jsx("p", { className: "text-muted-foreground", children: "No executives found matching your criteria." }) })) : (filteredBots.map((bot, index) => (_jsxs(Card, { className: "overflow-hidden border border-muted", children: [_jsxs(CardContent, { className: "p-6", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsxs(Avatar, { className: "h-16 w-16 border", children: [_jsx(AvatarImage, { src: getExecutiveImage(bot.name), alt: bot.name }), _jsx(AvatarFallback, { children: getInitials(bot.name) })] }), _jsxs("div", { className: "space-y-1 flex-1", children: [_jsx("h3", { className: "font-semibold text-base", children: bot.name }), _jsx("div", { className: "flex items-center text-sm text-muted-foreground", children: _jsx("span", { children: bot.title }) }), _jsx(Badge, { variant: "outline", className: "mt-1", children: bot.role })] })] }), _jsxs("div", { className: "mt-4 space-y-2", children: [_jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "font-medium", children: "Expertise:" }), " ", bot.specialty] }), bot.exampleAction && (_jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "font-medium", children: "Example Action:" }), " ", bot.exampleAction] })), bot.outputLocation && (_jsxs("div", { className: "text-sm flex items-center", children: [_jsx(Activity, { className: "h-3.5 w-3.5 mr-1 text-muted-foreground" }), _jsx("span", { className: "text-muted-foreground", children: bot.outputLocation })] }))] })] }), _jsxs(CardFooter, { className: "p-4 pt-0 flex justify-between gap-4", children: [_jsxs(Button, { variant: "secondary", size: "sm", className: "w-full", onClick: () => onSelectBot(bot), children: [_jsx(MessageSquare, { className: "h-4 w-4 mr-2" }), "Chat"] }), _jsxs(Button, { variant: "outline", size: "sm", className: "w-full", onClick: () => onSelectBot(bot), children: [_jsx(PlusCircle, { className: "h-4 w-4 mr-2" }), "Consult"] })] })] }, `${bot.role}-${bot.name}-${index}`)))) }));
};
