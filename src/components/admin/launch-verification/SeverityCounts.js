import { jsxs as _jsxs } from "react/jsx-runtime";
import { Badge } from "@/components/ui/badge";
export function SeverityCounts({ counts }) {
    return (_jsxs("div", { className: "flex flex-wrap gap-2 my-3", children: [_jsxs(Badge, { variant: "outline", className: "bg-red-100 text-red-800 border-red-200", children: ["Critical: ", counts.critical] }), _jsxs(Badge, { variant: "outline", className: "bg-orange-100 text-orange-800 border-orange-200", children: ["High: ", counts.high] }), _jsxs(Badge, { variant: "outline", className: "bg-blue-100 text-blue-800 border-blue-200", children: ["Medium: ", counts.medium] }), _jsxs(Badge, { variant: "outline", className: "bg-green-100 text-green-800 border-green-200", children: ["Low: ", counts.low] })] }));
}
