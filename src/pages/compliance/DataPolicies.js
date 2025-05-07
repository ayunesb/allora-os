import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PolicyDocuments from "@/components/compliance/data-policies/PolicyDocuments";
import PolicyToggles from "@/components/compliance/data-policies/PolicyToggles";
import RegulatoryFrameworks from "@/components/compliance/data-policies/RegulatoryFrameworks";
import ComplianceContact from "@/components/compliance/data-policies/ComplianceContact";
export default function DataPolicies() {
    return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-xl", children: "Data Policies" }), _jsx(CardDescription, { children: "Manage your organization's data handling policies and compliance documents" })] }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: "documents", className: "w-full", children: [_jsxs(TabsList, { className: "mb-4", children: [_jsx(TabsTrigger, { value: "documents", children: "Policy Documents" }), _jsx(TabsTrigger, { value: "settings", children: "Policy Settings" }), _jsx(TabsTrigger, { value: "frameworks", children: "Regulatory Frameworks" }), _jsx(TabsTrigger, { value: "contact", children: "Compliance Contact" })] }), _jsx(TabsContent, { value: "documents", children: _jsx(PolicyDocuments, {}) }), _jsx(TabsContent, { value: "settings", children: _jsx(PolicyToggles, {}) }), _jsx(TabsContent, { value: "frameworks", children: _jsx(RegulatoryFrameworks, {}) }), _jsx(TabsContent, { value: "contact", children: _jsx(ComplianceContact, {}) })] }) })] }) }));
}
