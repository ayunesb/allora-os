import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrandIdentityForm } from "../BrandIdentityForm";
export function BrandIdentity({ companyDetails, updateCompanyDetails }) {
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium", children: "Brand Identity" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Help us understand your brand style and visual identity." })] }), _jsx(BrandIdentityForm, { companyDetails: companyDetails, updateCompanyDetails: updateCompanyDetails })] }));
}
