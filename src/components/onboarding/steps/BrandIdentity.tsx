
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
    <BrandIdentityForm
      companyDetails={companyDetails}
      updateCompanyDetails={updateCompanyDetails}
    />
  );
}
