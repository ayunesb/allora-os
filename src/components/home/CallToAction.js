import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
const CallToAction = () => {
    return (_jsx("div", { className: "bg-accent text-white py-16 md:py-20", children: _jsxs("div", { className: "container mx-auto px-4 text-center", children: [_jsx("h2", { className: "text-3xl md:text-4xl font-bold mb-6", children: "Accelerate Your Business Growth Today" }), _jsx("p", { className: "text-xl text-white/80 mb-8 max-w-2xl mx-auto", children: "Join thousands of forward-thinking businesses using Allora AI to create winning strategies and drive exceptional results." }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [_jsx(Button, { size: "lg", className: "bg-white text-accent hover:bg-white/90 px-8 group", asChild: true, children: _jsxs(Link, { to: "/signup", className: "flex items-center gap-2", children: [_jsx(Sparkles, { className: "h-4 w-4" }), "Start Your Free Trial", _jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })] }) }), _jsx(Button, { size: "lg", variant: "outline", className: "border-white text-white hover:bg-white/10 px-8", asChild: true, children: _jsx(Link, { to: "/pricing", children: "View Enterprise Plans" }) })] }), _jsx("p", { className: "mt-6 text-sm text-white/70", children: "No credit card required. 14-day free trial with full platform access." })] }) }));
};
export default CallToAction;
