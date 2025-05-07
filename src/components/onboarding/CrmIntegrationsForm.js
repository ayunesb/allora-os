import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ExternalLink } from "lucide-react";
// CRM system options - expanded list
const crmSystems = [
    { value: "salesforce", label: "Salesforce" },
    { value: "hubspot", label: "HubSpot" },
    { value: "zoho", label: "Zoho CRM" },
    { value: "pipedrive", label: "Pipedrive" },
    { value: "microsoft_dynamics", label: "Microsoft Dynamics 365" },
    { value: "sugarcrm", label: "SugarCRM" },
    { value: "freshsales", label: "Freshsales" },
    { value: "none", label: "None" },
];
// Marketing platform options - expanded list
const marketingPlatforms = [
    { value: "google_ads", label: "Google Ads" },
    { value: "meta_ads", label: "Meta Ads (Facebook/Instagram)" },
    { value: "mailchimp", label: "Mailchimp" },
    { value: "hubspot_marketing", label: "HubSpot Marketing" },
    { value: "marketo", label: "Marketo" },
    { value: "activecampaign", label: "ActiveCampaign" },
    { value: "linkedin_ads", label: "LinkedIn Ads" },
    { value: "tiktok_ads", label: "TikTok Ads" },
    { value: "klaviyo", label: "Klaviyo" },
    { value: "none", label: "None" },
];
// Document generation options
const documentTypes = [
    { value: "proposals", label: "Business Proposals" },
    { value: "reports", label: "Performance Reports" },
    { value: "presentations", label: "Presentations" },
    { value: "contracts", label: "Contracts" },
    { value: "marketing_materials", label: "Marketing Materials" },
];
export function CrmIntegrationsForm({ companyDetails, updateCompanyDetails }) {
    var _a, _b;
    const [showShopName, setShowShopName] = useState(false);
    const [showApiKeyField, setShowApiKeyField] = useState(false);
    const [selectedDocTypes, setSelectedDocTypes] = useState(companyDetails.documentGenerationTypes || []);
    // Update shop name field visibility based on ecommerce toggle
    useEffect(() => {
        setShowShopName(!!companyDetails.usesEcommerce);
    }, [companyDetails.usesEcommerce]);
    // Show API key field for selected CRM/Marketing platforms
    useEffect(() => {
        const platformsRequiringApi = [
            "salesforce",
            "hubspot",
            "google_ads",
            "meta_ads",
        ];
        setShowApiKeyField(platformsRequiringApi.includes(companyDetails.crmSystem || "") ||
            platformsRequiringApi.includes(companyDetails.marketingPlatform || ""));
    }, [companyDetails.crmSystem, companyDetails.marketingPlatform]);
    // Handle field changes
    const handleChange = (field, value) => {
        updateCompanyDetails(Object.assign(Object.assign({}, companyDetails), { [field]: value }));
    };
    // Handle document type selection
    const toggleDocType = (type) => {
        const currentSelection = [...selectedDocTypes];
        const index = currentSelection.indexOf(type);
        if (index >= 0) {
            currentSelection.splice(index, 1);
        }
        else {
            currentSelection.push(type);
        }
        setSelectedDocTypes(currentSelection);
        handleChange("documentGenerationTypes", currentSelection);
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium", children: "Integration Systems" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Connect your CRM, marketing platforms, and enable document generation based on AI insights." })] }), _jsxs("div", { className: "grid gap-6 md:grid-cols-2", children: [_jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium", children: "CRM Systems" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "crm-system", children: "Current CRM System" }), _jsxs(Select, { value: companyDetails.crmSystem || "", onValueChange: (value) => handleChange("crmSystem", value), children: [_jsx(SelectTrigger, { id: "crm-system", children: _jsx(SelectValue, { placeholder: "Select CRM system" }) }), _jsx(SelectContent, { children: crmSystems.map((system) => (_jsx(SelectItem, { value: system.value, children: system.label }, system.value))) })] }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Allora AI will sync data with your CRM system." })] }), companyDetails.crmSystem &&
                                        companyDetails.crmSystem !== "none" && (_jsx("div", { className: "mt-4", children: _jsxs(Button, { variant: "outline", size: "sm", className: "text-xs", children: [_jsx(ExternalLink, { className: "mr-2 h-3 w-3" }), "Authorize", " ", (_a = crmSystems.find((c) => c.value === companyDetails.crmSystem)) === null || _a === void 0 ? void 0 : _a.label] }) }))] }) }) }), _jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium", children: "Marketing Platforms" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "marketing-platform", children: "Current Marketing Platform" }), _jsxs(Select, { value: companyDetails.marketingPlatform || "", onValueChange: (value) => handleChange("marketingPlatform", value), children: [_jsx(SelectTrigger, { id: "marketing-platform", children: _jsx(SelectValue, { placeholder: "Select marketing platform" }) }), _jsx(SelectContent, { children: marketingPlatforms.map((platform) => (_jsx(SelectItem, { value: platform.value, children: platform.label }, platform.value))) })] }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Connect your marketing accounts to optimize campaigns." })] }), companyDetails.marketingPlatform &&
                                        companyDetails.marketingPlatform !== "none" && (_jsx("div", { className: "mt-4", children: _jsxs(Button, { variant: "outline", size: "sm", className: "text-xs", children: [_jsx(ExternalLink, { className: "mr-2 h-3 w-3" }), "Connect", " ", (_b = marketingPlatforms.find((m) => m.value === companyDetails.marketingPlatform)) === null || _b === void 0 ? void 0 : _b.label] }) }))] }) }) })] }), showApiKeyField && (_jsxs("div", { className: "space-y-2 pt-2 pl-4 border-l-2 border-muted", children: [_jsx(Label, { htmlFor: "api-key", children: "API Key" }), _jsx(Input, { id: "api-key", type: "password", placeholder: "Enter API key for integration", value: companyDetails.integrationApiKey || "", onChange: (e) => handleChange("integrationApiKey", e.target.value) }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "This key will be securely stored and used for integration purposes only." })] })), _jsxs("div", { className: "flex items-center justify-between space-y-0 pt-2", children: [_jsx(Label, { htmlFor: "ecommerce-switch", children: "Do you use Shopify or another e-commerce platform?" }), _jsx(Switch, { id: "ecommerce-switch", checked: !!companyDetails.usesEcommerce, onCheckedChange: (checked) => handleChange("usesEcommerce", checked) })] }), showShopName && (_jsxs("div", { className: "space-y-2 pt-2 pl-4 border-l-2 border-muted", children: [_jsx(Label, { htmlFor: "shop-name", children: "Shop Name" }), _jsx(Input, { id: "shop-name", placeholder: "Your shop name", value: companyDetails.shopName || "", onChange: (e) => handleChange("shopName", e.target.value) })] })), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium", children: "Document Generation" }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Select which types of documents you'd like Allora AI to help you generate." }), _jsx("div", { className: "flex flex-wrap gap-2 pt-2", children: documentTypes.map((docType) => (_jsxs(Badge, { variant: selectedDocTypes.includes(docType.value) ? "default" : "outline", className: "cursor-pointer", onClick: () => toggleDocType(docType.value), children: [selectedDocTypes.includes(docType.value) && (_jsx(Check, { className: "mr-1 h-3 w-3" })), docType.label] }, docType.value))) })] })] }));
}
