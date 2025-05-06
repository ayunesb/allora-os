import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useBreakpoint } from "@/hooks/use-mobile";
const FAQSection = ({ title, items }) => {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    return (_jsxs("div", { className: "mt-12 md:mt-20 text-center max-w-3xl mx-auto", children: [_jsx("h2", { className: `${isMobileView ? "text-xl" : "text-2xl"} font-bold mb-4`, children: title }), _jsx("div", { className: "space-y-6 text-left", children: items.map((item, index) => (_jsxs("div", { children: [_jsx("h3", { className: "font-medium mb-2", children: item.question }), _jsx("p", { className: `text-muted-foreground ${isMobileView ? "text-sm" : ""}`, children: item.answer })] }, index))) })] }));
};
export default FAQSection;
