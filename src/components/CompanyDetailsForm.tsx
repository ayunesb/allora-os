
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateCompanyDetails } from "@/utils/company";
import { PartialCompanyDetails } from "@/models/companyDetails";
import { CompanyDetailsSurvey } from "@/components/onboarding/company-details";
import { fetchUserCompany } from "@/utils/companyHelpers";

export default function CompanyDetailsForm() {
  const { user, profile, refreshProfile } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [companyDetails, setCompanyDetails] = useState<PartialCompanyDetails>({});
  const [errorMessage, setErrorMessage] = useState<string | undefined>(null); // Changed null to undefined

  // Load company details when profile changes
  useEffect(() => {
    async function loadCompanyData() {
      if (!profile?.company_id) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        console.log("Loading company details for company ID:", profile.company_id);
        const company = await fetchUserCompany(user?.id || '');
        
        if (company) {
          console.log("Company details loaded:", company);
          // If company has details property, use that for additional details
          const additionalDetails = company.details || {};
          setCompanyDetails(additionalDetails as PartialCompanyDetails);
        }
      } catch (error) {
        console.error("Error loading company details:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadCompanyData();
  }, [profile, user]);

  const updateCompanyDetailsState = (details: PartialCompanyDetails) => {
    setCompanyDetails({ ...companyDetails, ...details });
  };

  const handleSaveCompanyDetails = async () => {
    if (!user) {
      toast.error("You must be logged in to update company details");
      return;
    }

    setIsUpdating(true);
    setErrorMessage(undefined);

    try {
      // Extract basic info that's required by the API
      const companyName = profile?.company || "";
      const industryName = profile?.industry || "";
      
      console.log("Saving company details for user:", user.id);
      console.log("Company name:", companyName);
      console.log("Industry:", industryName);
      console.log("Company details:", companyDetails);
      
      // Provide the bare minimum required fields plus the additionalDetails
      const result = await updateCompanyDetails(user.id, {
        name: companyName,
        industry: industryName,
        description: companyDetails.description || "",
        mission: companyDetails.mission || "",
        vision: companyDetails.vision || "",
        headquarters: companyDetails.headquarters || "",
        phone: companyDetails.phone || "",
        additionalDetails: companyDetails
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to update company details");
      }

      // Refresh profile to get updated data
      await refreshProfile();

      toast.success("Company details updated successfully!");
    } catch (error: any) {
      console.error("Error updating company details:", error);
      const errorMsg = error.message || "An error occurred during update";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
          <CardDescription>Loading company information...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Details</CardTitle>
        <CardDescription>
          Provide comprehensive information about your company to help us better understand your business
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <CompanyDetailsSurvey 
            companyDetails={companyDetails}
            updateCompanyDetails={updateCompanyDetailsState}
            error={errorMessage}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" disabled={isUpdating}>
          Cancel
        </Button>
        <Button 
          onClick={handleSaveCompanyDetails}
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Save Company Details"}
        </Button>
      </CardFooter>
    </Card>
  );
}
