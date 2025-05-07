var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useCompanyWebsite } from "@/hooks/useCompanyWebsite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Search, Globe, Loader2 } from "lucide-react";
export function CompanyWebsite({ onCompanyDataFetched }) {
    const { companyWebsite, setCompanyWebsite, isScrapingData, scrapeCompanyData, } = useCompanyWebsite();
    const [error, setError] = useState(null);
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        setError(null);
        if (!companyWebsite.trim()) {
            setError("Please enter your company website");
            return;
        }
        const success = yield scrapeCompanyData();
        onCompanyDataFetched(success);
    });
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium", children: "Company Website" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Enter your company website to automatically fetch company information or continue without it." })] }), _jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "company-website", className: "flex items-center gap-2", children: [_jsx(Globe, { className: "h-4 w-4" }), "Company Website (Optional)"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { id: "company-website", placeholder: "www.yourcompany.com", value: companyWebsite, onChange: (e) => setCompanyWebsite(e.target.value), className: error ? "border-destructive" : "", disabled: isScrapingData }), _jsxs(Button, { type: "submit", disabled: isScrapingData || !companyWebsite.trim(), children: [isScrapingData ? (_jsx(Loader2, { className: "h-4 w-4 animate-spin mr-2" })) : (_jsx(Search, { className: "h-4 w-4 mr-2" })), isScrapingData ? "Fetching..." : "Fetch"] })] }), error && (_jsxs(Alert, { variant: "destructive", className: "py-2 mt-2", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { className: "ml-2 text-xs", children: error })] }))] }), _jsxs("div", { className: "text-sm text-muted-foreground", children: [_jsx("p", { children: "This will attempt to fetch:" }), _jsxs("ul", { className: "list-disc pl-5 mt-1 space-y-1", children: [_jsx("li", { children: "Company name" }), _jsx("li", { children: "Industry" }), _jsx("li", { children: "Description" }), _jsx("li", { children: "Company size" }), _jsx("li", { children: "Products/Services" })] })] }), _jsx("div", { className: "flex justify-between pt-2", children: _jsx(Button, { type: "button", variant: "ghost", onClick: () => onCompanyDataFetched(false), disabled: isScrapingData, children: "Skip this step" }) })] }) }) })] }));
}
