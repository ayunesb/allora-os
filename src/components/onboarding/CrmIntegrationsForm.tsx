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
export function CrmIntegrationsForm({ companyDetails, updateCompanyDetails, }) {
    const [showShopName, setShowShopName] = useState(false);
    const [showApiKeyField, setShowApiKeyField] = useState(false);
    const [selectedDocTypes, setSelectedDocTypes] = useState(companyDetails.documentGenerationTypes || []);
    // Update shop name field visibility based on ecommerce toggle
    useEffect(() => {
        setShowShopName(!!companyDetails.usesEcommerce);
    }, [companyDetails.usesEcommerce]);
    // Show API key field for selected CRM/Marketing platforms
    useEffect(() => {
        const platformsRequiringApi = ["salesforce", "hubspot", "google_ads", "meta_ads"];
        setShowApiKeyField(platformsRequiringApi.includes(companyDetails.crmSystem || "") ||
            platformsRequiringApi.includes(companyDetails.marketingPlatform || ""));
    }, [companyDetails.crmSystem, companyDetails.marketingPlatform]);
    // Handle field changes
    const handleChange = (field, value) => {
        updateCompanyDetails({
            ...companyDetails,
            [field]: value,
        });
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
    return (<div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Integration Systems</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Connect your CRM, marketing platforms, and enable document generation based on AI insights.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* CRM Integration Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h4 className="font-medium">CRM Systems</h4>
              <div className="space-y-2">
                <Label htmlFor="crm-system">Current CRM System</Label>
                <Select value={companyDetails.crmSystem || ""} onValueChange={(value) => handleChange("crmSystem", value)}>
                  <SelectTrigger id="crm-system">
                    <SelectValue placeholder="Select CRM system"/>
                  </SelectTrigger>
                  <SelectContent>
                    {crmSystems.map((system) => (<SelectItem key={system.value} value={system.value}>
                        {system.label}
                      </SelectItem>))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Allora AI will sync data with your CRM system.
                </p>
              </div>

              {companyDetails.crmSystem && companyDetails.crmSystem !== "none" && (<div className="mt-4">
                  <Button variant="outline" size="sm" className="text-xs">
                    <ExternalLink className="mr-2 h-3 w-3"/>
                    Authorize {crmSystems.find(c => c.value === companyDetails.crmSystem)?.label}
                  </Button>
                </div>)}
            </div>
          </CardContent>
        </Card>

        {/* Marketing Platform Integration */}
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <h4 className="font-medium">Marketing Platforms</h4>
              <div className="space-y-2">
                <Label htmlFor="marketing-platform">Current Marketing Platform</Label>
                <Select value={companyDetails.marketingPlatform || ""} onValueChange={(value) => handleChange("marketingPlatform", value)}>
                  <SelectTrigger id="marketing-platform">
                    <SelectValue placeholder="Select marketing platform"/>
                  </SelectTrigger>
                  <SelectContent>
                    {marketingPlatforms.map((platform) => (<SelectItem key={platform.value} value={platform.value}>
                        {platform.label}
                      </SelectItem>))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Connect your marketing accounts to optimize campaigns.
                </p>
              </div>

              {companyDetails.marketingPlatform && companyDetails.marketingPlatform !== "none" && (<div className="mt-4">
                  <Button variant="outline" size="sm" className="text-xs">
                    <ExternalLink className="mr-2 h-3 w-3"/>
                    Connect {marketingPlatforms.find(m => m.value === companyDetails.marketingPlatform)?.label}
                  </Button>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* API Key Section - Shows only if needed */}
      {showApiKeyField && (<div className="space-y-2 pt-2 pl-4 border-l-2 border-muted">
          <Label htmlFor="api-key">API Key</Label>
          <Input id="api-key" type="password" placeholder="Enter API key for integration" value={companyDetails.integrationApiKey || ""} onChange={(e) => handleChange("integrationApiKey", e.target.value)}/>
          <p className="text-xs text-muted-foreground mt-1">
            This key will be securely stored and used for integration purposes only.
          </p>
        </div>)}

      {/* Ecommerce Section */}
      <div className="flex items-center justify-between space-y-0 pt-2">
        <Label htmlFor="ecommerce-switch">
          Do you use Shopify or another e-commerce platform?
        </Label>
        <Switch id="ecommerce-switch" checked={!!companyDetails.usesEcommerce} onCheckedChange={(checked) => handleChange("usesEcommerce", checked)}/>
      </div>

      {showShopName && (<div className="space-y-2 pt-2 pl-4 border-l-2 border-muted">
          <Label htmlFor="shop-name">Shop Name</Label>
          <Input id="shop-name" placeholder="Your shop name" value={companyDetails.shopName || ""} onChange={(e) => handleChange("shopName", e.target.value)}/>
        </div>)}

      {/* Document Generation Section */}
      <div className="space-y-4">
        <h4 className="font-medium">Document Generation</h4>
        <p className="text-sm text-muted-foreground mt-1">
          Select which types of documents you'd like Allora AI to help you generate.
        </p>
        
        <div className="flex flex-wrap gap-2 pt-2">
          {documentTypes.map((docType) => (<Badge key={docType.value} variant={selectedDocTypes.includes(docType.value) ? "default" : "outline"} className="cursor-pointer" onClick={() => toggleDocType(docType.value)}>
              {selectedDocTypes.includes(docType.value) && (<Check className="mr-1 h-3 w-3"/>)}
              {docType.label}
            </Badge>))}
        </div>
      </div>
    </div>);
}
