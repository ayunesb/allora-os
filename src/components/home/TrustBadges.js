import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Shield, ShieldCheck, Lock, CheckCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
const TrustBadges = () => {
    const badges = [
        {
            icon: ShieldCheck,
            label: "GDPR Compliant",
            description: "Our platform adheres to all GDPR requirements for data protection",
        },
        {
            icon: Shield,
            label: "SOC 2 Certified",
            description: "Validated security controls and procedures to protect your data",
        },
        {
            icon: Lock,
            label: "Bank-Level Security",
            description: "Enterprise-grade encryption for all your business data",
        },
        {
            icon: CheckCircle,
            label: "ISO 27001",
            description: "Internationally recognized information security standard",
        },
    ];
    return (_jsx("div", { className: "w-full bg-gradient-to-r from-[#0A0F24] to-[#1B1B3A] py-8 md:py-10", children: _jsx("div", { className: "container mx-auto", children: _jsx("div", { className: "flex flex-wrap justify-center gap-4 md:gap-8", children: _jsx(TooltipProvider, { children: badges.map((badge, index) => (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsxs("div", { className: "flex items-center gap-2 border border-white/20 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 hover:border-white/30 transition-all duration-300", children: [_jsx(badge.icon, { className: "h-5 w-5 text-primary" }), _jsx("span", { className: "text-white/90 font-medium", children: badge.label })] }) }), _jsx(TooltipContent, { children: _jsx("p", { className: "text-xs max-w-[200px]", children: badge.description }) })] }, index))) }) }) }) }));
};
export default TrustBadges;
