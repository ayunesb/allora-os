import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
export function BotInfoPanel({ description, specialties, expertise }) {
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "About" }), _jsx("p", { className: "text-muted-foreground", children: description })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Expertise" }), _jsx(Badge, { variant: "outline", className: "bg-primary/10 text-primary", children: expertise })] }), specialties && specialties.length > 0 && (_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium mb-2", children: "Specialties" }), _jsx("div", { className: "flex flex-wrap gap-2", children: specialties.map((specialty, index) => (_jsx(Badge, { variant: "outline", className: "bg-secondary/10", children: specialty }, index))) })] }))] }));
}
export default BotInfoPanel;
