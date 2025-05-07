import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";
export function SpecialInfo({ companyDetails, handleTextChange }) {
    return (_jsxs(AccordionItem, { value: "special", children: [_jsx(AccordionTrigger, { className: "text-base font-medium", children: "Special Info (Optional)" }), _jsxs(AccordionContent, { className: "space-y-4 pt-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Social Impact Goals" }), _jsx(Textarea, { placeholder: "Any sustainability, diversity, social initiatives?", value: companyDetails.socialImpact || "", onChange: (e) => handleTextChange("socialImpact", e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-sm font-medium", children: "Exit Strategy" }), _jsx(Textarea, { placeholder: "IPO? Acquisition? Long-term private?", value: companyDetails.exitStrategy || "", onChange: (e) => handleTextChange("exitStrategy", e.target.value) })] })] })] }));
}
