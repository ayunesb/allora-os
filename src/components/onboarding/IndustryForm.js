import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
const industries = [
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "finance", label: "Finance" },
    { value: "retail", label: "Retail" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "real_estate", label: "Real Estate" },
    { value: "hospitality", label: "Hospitality" },
    { value: "other", label: "Other" },
];
export default function IndustryForm({ industry, setIndustry, error }) {
    return (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium", children: "Industry Information" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Select the industry that best describes your company." }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "industry-select", children: "Industry" }), _jsxs(Select, { value: industry, onValueChange: setIndustry, children: [_jsx(SelectTrigger, { id: "industry-select", className: error ? "border-destructive" : "", children: _jsx(SelectValue, { placeholder: "Select industry" }) }), _jsx(SelectContent, { children: industries.map((industryOption) => (_jsx(SelectItem, { value: industryOption.value, children: industryOption.label }, industryOption.value))) })] }), error && (_jsxs(Alert, { variant: "destructive", className: "py-2", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { className: "ml-2 text-xs", children: error })] }))] })] }));
}
