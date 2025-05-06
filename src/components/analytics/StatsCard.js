import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent } from "@/components/ui/card";
const StatsCard = ({ title, value, description, icon: Icon }) => {
    return (_jsx(Card, { children: _jsx(CardContent, { className: "p-6", children: _jsxs("div", { className: "flex items-center justify-between space-x-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h3", { className: "text-sm font-medium text-muted-foreground", children: title }), _jsx("div", { className: "mt-1", children: _jsx("p", { className: "text-2xl font-bold", children: value }) }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: description })] }), _jsx("div", { className: "h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center", children: _jsx(Icon, { className: "h-6 w-6 text-primary" }) })] }) }) }));
};
export default StatsCard;
