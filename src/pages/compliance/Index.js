import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import PolicyToggles from "@/components/compliance/data-policies/PolicyToggles";
import { useCompliance } from "@/hooks/useCompliance";
export default function ComplianceIndex() {
    const compliance = useCompliance();
    const handleToggle = (policy) => {
        var _a;
        if (compliance && compliance.updatePreference) {
            compliance.updatePreference(`policies.${policy}`, !((_a = compliance.policies) === null || _a === void 0 ? void 0 : _a[policy]));
        }
    };
    // Create a safe policies object that meets the DataPoliciesState requirements
    const defaultPolicies = {
        dataDeletion: false,
        dataMinimization: false,
        dataEncryption: false,
        dataRetention: false,
        ccpa: false,
        gdpr: false,
    };
    // Merge the compliance policies with our default structure
    const policies = Object.assign(Object.assign({}, defaultPolicies), ((compliance === null || compliance === void 0 ? void 0 : compliance.policies) || {}));
    return (_jsxs("div", { className: "container mx-auto px-4 py-6 space-y-6", children: [_jsx("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: _jsx(TypographyH1, { children: "Compliance Center" }) }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Data Policies" }), _jsx(CardDescription, { children: "Configure your organization's data handling policies" })] }), _jsxs(CardContent, { children: [_jsx(TypographyP, { children: "Enable or disable various data handling policies to align with regulatory requirements and internal standards." }), _jsx("div", { className: "mt-4", children: _jsx(PolicyToggles, { policies: policies, onPolicyToggle: handleToggle }) })] })] })] }));
}
