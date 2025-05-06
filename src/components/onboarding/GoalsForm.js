import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
// Business goals options
const businessGoals = [
    { id: "increase_revenue", label: "Increase Revenue" },
    { id: "expand_markets", label: "Expand to New Markets" },
    { id: "launch_products", label: "Launch New Products" },
    { id: "improve_retention", label: "Improve Customer Retention" },
    { id: "automate_operations", label: "Automate Operations" },
    { id: "raise_funding", label: "Raise Funding" },
    { id: "improve_efficiency", label: "Improve Operational Efficiency" },
    { id: "scale_team", label: "Scale Team & Talent" },
];
// Time horizon options
const timeHorizons = [
    { value: "6_months", label: "6 months" },
    { value: "12_months", label: "12 months" },
    { value: "18_months", label: "18 months" },
    { value: "24_months", label: "24 months" },
];
export default function GoalsForm({ goals, toggleGoal, companyName, industry, error, companyDetails = {}, updateCompanyDetails = () => { }, }) {
    // Company name display for the form
    const displayCompanyName = companyName || "Your company";
    // Handle updating company time horizon
    const handleTimeHorizonChange = (value) => {
        if (updateCompanyDetails) {
            updateCompanyDetails({ timeHorizon: value });
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium", children: "Business Goals" }), _jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: ["Select the primary goals for ", displayCompanyName, " in the ", industry, " ", "industry."] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("p", { className: "text-sm font-medium mb-3", children: ["Primary Business Goals ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: businessGoals.map((item) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: item.id, checked: goals.includes(item.id), onCheckedChange: () => toggleGoal(item.id) }), _jsx("label", { htmlFor: item.id, className: "text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: item.label })] }, item.id))) }), error && (_jsxs(Alert, { variant: "destructive", className: "mt-4 py-2", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { className: "ml-2 text-xs", children: error })] }))] }), _jsxs("div", { className: "space-y-2 pt-2", children: [_jsx(Label, { htmlFor: "time-horizon", children: "Time Horizon for Achieving Goals" }), _jsxs(Select, { value: (companyDetails === null || companyDetails === void 0 ? void 0 : companyDetails.timeHorizon) || "", onValueChange: handleTimeHorizonChange, children: [_jsx(SelectTrigger, { id: "time-horizon", children: _jsx(SelectValue, { placeholder: "Select time horizon" }) }), _jsx(SelectContent, { children: timeHorizons.map((horizon) => (_jsx(SelectItem, { value: horizon.value, children: horizon.label }, horizon.value))) })] })] })] })] }));
}
