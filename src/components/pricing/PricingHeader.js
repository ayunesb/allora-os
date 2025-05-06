import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useBreakpoint } from "@/hooks/use-mobile";
const PricingHeader = ({ title, description }) => {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    return (_jsxs("div", { className: "text-center mb-8 md:mb-16", children: [_jsx("h1", { className: `${isMobileView ? "text-2xl" : "text-4xl"} font-bold mb-4`, children: title }), _jsx("p", { className: `${isMobileView ? "text-base" : "text-xl"} text-muted-foreground max-w-2xl mx-auto`, children: description })] }));
};
export default PricingHeader;
