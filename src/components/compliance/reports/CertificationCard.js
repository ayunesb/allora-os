import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/components/ui/button";
export default function CertificationCard({ title, validUntil, iconUrl, alt }) {
    return (_jsxs("div", { className: "border rounded-md p-4 flex flex-col items-center text-center", children: [_jsx("div", { className: "w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-3", children: _jsx("img", { src: iconUrl, alt: alt, className: "w-12 h-12" }) }), _jsx("h3", { className: "font-medium", children: title }), _jsxs("p", { className: "text-sm text-muted-foreground mb-2", children: ["Valid until ", validUntil] }), _jsx(Button, { size: "sm", variant: "ghost", children: "View Certificate" })] }));
}
