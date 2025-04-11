
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PartialCompanyDetails } from "@/models/companyDetails";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface CrmIntegrationsFormProps {
  companyDetails: PartialCompanyDetails;
  updateCompanyDetails: (details: PartialCompanyDetails) => void;
}

// CRM system options
const crmSystems = [
  { value: "hubspot", label: "HubSpot" },
  { value: "salesforce", label: "Salesforce" },
  { value: "zoho", label: "Zoho" },
  { value: "pipedrive", label: "Pipedrive" },
  { value: "none", label: "None" },
];

// Marketing platform options
const marketingPlatforms = [
  { value: "mailchimp", label: "Mailchimp" },
  { value: "activecampaign", label: "ActiveCampaign" },
  { value: "apollo", label: "Apollo.io" },
  { value: "klaviyo", label: "Klaviyo" },
  { value: "none", label: "None" },
];

export function CrmIntegrationsForm({
  companyDetails,
  updateCompanyDetails,
}: CrmIntegrationsFormProps) {
  const [showShopName, setShowShopName] = useState(false);

  // Update shop name field visibility based on ecommerce toggle
  useEffect(() => {
    setShowShopName(!!companyDetails.usesEcommerce);
  }, [companyDetails.usesEcommerce]);

  // Handle field changes
  const handleChange = (field: keyof PartialCompanyDetails, value: any) => {
    updateCompanyDetails({
      ...companyDetails,
      [field]: value,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">CRM & Marketing Systems</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us about your marketing and sales technology stack.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="crm-system">Current CRM System</Label>
          <Select
            value={companyDetails.crmSystem || ""}
            onValueChange={(value) => handleChange("crmSystem", value)}
          >
            <SelectTrigger id="crm-system">
              <SelectValue placeholder="Select CRM system" />
            </SelectTrigger>
            <SelectContent>
              {crmSystems.map((system) => (
                <SelectItem key={system.value} value={system.value}>
                  {system.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="marketing-platform">Current Marketing Platform</Label>
          <Select
            value={companyDetails.marketingPlatform || ""}
            onValueChange={(value) => handleChange("marketingPlatform", value)}
          >
            <SelectTrigger id="marketing-platform">
              <SelectValue placeholder="Select marketing platform" />
            </SelectTrigger>
            <SelectContent>
              {marketingPlatforms.map((platform) => (
                <SelectItem key={platform.value} value={platform.value}>
                  {platform.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between space-y-0 pt-2">
          <Label htmlFor="ecommerce-switch">
            Do you use Shopify or another e-commerce platform?
          </Label>
          <Switch
            id="ecommerce-switch"
            checked={!!companyDetails.usesEcommerce}
            onCheckedChange={(checked) => handleChange("usesEcommerce", checked)}
          />
        </div>

        {showShopName && (
          <div className="space-y-2 pt-2 pl-4 border-l-2 border-muted">
            <Label htmlFor="shop-name">Shop Name</Label>
            <Input
              id="shop-name"
              placeholder="Your shop name"
              value={companyDetails.shopName || ""}
              onChange={(e) => handleChange("shopName", e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
