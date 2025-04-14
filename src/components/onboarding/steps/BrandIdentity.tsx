
import { BrandIdentityForm } from "../BrandIdentityForm";
import { PartialCompanyDetails } from "@/models/companyDetails";

interface BrandIdentityProps {
  companyDetails: PartialCompanyDetails;
  updateCompanyDetails: (details: PartialCompanyDetails) => void;
}

export function BrandIdentity({ 
  companyDetails, 
  updateCompanyDetails 
}: BrandIdentityProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Brand Identity</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Help us understand your brand style and visual identity.
        </p>
      </div>

      <BrandIdentityForm
        companyDetails={companyDetails}
        updateCompanyDetails={updateCompanyDetails}
      />
    </div>
  );
}
