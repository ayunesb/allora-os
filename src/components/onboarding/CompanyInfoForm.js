import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
// Company size options
const companySizes = [
    { value: "1-10", label: "1–10 employees" },
    { value: "11-50", label: "11–50 employees" },
    { value: "51-200", label: "51–200 employees" },
    { value: "201-500", label: "201–500 employees" },
    { value: "500+", label: "500+ employees" },
];
// Revenue options
const revenueRanges = [
    { value: "<10k", label: "Less than $10K" },
    { value: "10k-50k", label: "$10K–$50K" },
    { value: "50k-200k", label: "$50K–$200K" },
    { value: ">200k", label: "More than $200K" },
];
// Geographic market options
const markets = [
    { value: "north_america", label: "North America" },
    { value: "europe", label: "Europe" },
    { value: "latam", label: "LATAM" },
    { value: "asia", label: "Asia" },
    { value: "africa", label: "Africa" },
    { value: "global", label: "Global" },
];
export default function CompanyInfoForm({ companyName, setCompanyName, companyDetails = {}, updateCompanyDetails = () => { }, error, }) {
    // Handle updating company details
    const handleDetailsChange = (field, value) => {
        if (updateCompanyDetails) {
            updateCompanyDetails({ [field]: value });
        }
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium", children: "Company Information" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Tell us about your business so we can provide tailored strategies." })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "company-name", children: ["Company Name ", _jsx("span", { className: "text-destructive", children: "*" })] }), _jsx(Input, { id: "company-name", placeholder: "Acme Inc.", value: companyName, onChange: (e) => setCompanyName(e.target.value), className: error ? "border-destructive" : "" }), error && (_jsxs(Alert, { variant: "destructive", className: "py-2", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { className: "ml-2 text-xs", children: error })] }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "primary-offering", children: "Primary Offering (Products/Services)" }), _jsx(Input, { id: "primary-offering", placeholder: "What does your company provide?", value: (companyDetails === null || companyDetails === void 0 ? void 0 : companyDetails.primaryOffering) || "", onChange: (e) => handleDetailsChange("primaryOffering", e.target.value) })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "company-size", children: "Company Size" }), _jsxs(Select, { value: (companyDetails === null || companyDetails === void 0 ? void 0 : companyDetails.companySize) || "", onValueChange: (value) => handleDetailsChange("companySize", value), children: [_jsx(SelectTrigger, { id: "company-size", children: _jsx(SelectValue, { placeholder: "Select company size" }) }), _jsx(SelectContent, { children: companySizes.map((size) => (_jsx(SelectItem, { value: size.value, children: size.label }, size.value))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "monthly-revenue", children: "Current Monthly Revenue" }), _jsxs(Select, { value: (companyDetails === null || companyDetails === void 0 ? void 0 : companyDetails.monthlyRevenue) || "", onValueChange: (value) => handleDetailsChange("monthlyRevenue", value), children: [_jsx(SelectTrigger, { id: "monthly-revenue", children: _jsx(SelectValue, { placeholder: "Select revenue range" }) }), _jsx(SelectContent, { children: revenueRanges.map((range) => (_jsx(SelectItem, { value: range.value, children: range.label }, range.value))) })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "geographic-market", children: "Primary Geographic Market" }), _jsxs(Select, { value: (companyDetails === null || companyDetails === void 0 ? void 0 : companyDetails.geographicMarket) || "", onValueChange: (value) => handleDetailsChange("geographicMarket", value), children: [_jsx(SelectTrigger, { id: "geographic-market", children: _jsx(SelectValue, { placeholder: "Select primary market" }) }), _jsx(SelectContent, { children: markets.map((market) => (_jsx(SelectItem, { value: market.value, children: market.label }, market.value))) })] })] })] })] }));
}
