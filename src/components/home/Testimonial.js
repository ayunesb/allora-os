import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { QuoteIcon } from "lucide-react";
const Testimonial = ({ quote, author, role, avatar, delay = 0 }) => {
    return (_jsxs("div", { className: "bg-card p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300", style: { animationDelay: `${delay}s` }, children: [_jsx("div", { className: "flex justify-between items-start mb-4", children: _jsx(QuoteIcon, { className: "h-8 w-8 text-primary/30" }) }), _jsxs("p", { className: "text-lg mb-6 italic", children: ["\"", quote, "\""] }), _jsxs("div", { className: "flex items-center", children: [_jsx("img", { src: avatar, alt: author, className: "h-12 w-12 rounded-full mr-4 border-2 border-primary/20" }), _jsxs("div", { children: [_jsx("p", { className: "font-medium", children: author }), _jsx("p", { className: "text-sm text-muted-foreground", children: role })] })] })] }));
};
export default Testimonial;
