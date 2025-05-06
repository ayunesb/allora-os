import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateCompanyDetails } from "@/utils/company";
import { CompanyDetailsSurvey } from "@/components/onboarding/company-details";
import { fetchUserCompany } from "@/utils/companyHelpers";
import { createAuthCompatibilityLayer } from "@/utils/authCompatibility";
export default function CompanyDetailsForm() {
  const authContext = useAuth();
  const auth = createAuthCompatibilityLayer(authContext);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [companyDetails, setCompanyDetails] = useState({});
  const [errorMessage, setErrorMessage] = useState(undefined);
  // Load company details when profile changes
  useEffect(() => {
    async function loadCompanyData() {
      if (!auth.profile?.company_id) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        console.log(
          "Loading company details for company ID:",
          auth.profile.company_id,
        );
        const company = await fetchUserCompany(auth.user?.id || "");
        if (company) {
          console.log("Company details loaded:", company);
          // If company has details property, use that for additional details
          const additionalDetails = company.details || {};
          setCompanyDetails(additionalDetails);
        }
      } catch (error) {
        console.error("Error loading company details:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCompanyData();
  }, [auth.profile, auth.user]);
  const updateCompanyDetailsState = (details) => {
    setCompanyDetails({ ...companyDetails, ...details });
  };
  const handleSaveCompanyDetails = async () => {
    if (!auth.user) {
      toast.error("You must be logged in to update company details");
      return;
    }
    setIsUpdating(true);
    setErrorMessage(undefined);
    try {
      // Extract basic info that's required by the API
      const companyName = auth.profile?.company || "";
      const industryName = auth.profile?.industry || "";
      console.log("Saving company details for user:", auth.user.id);
      console.log("Company name:", companyName);
      console.log("Industry:", industryName);
      console.log("Company details:", companyDetails);
      // Provide the bare minimum required fields plus the additionalDetails
      const result = await updateCompanyDetails(auth.user.id, {
        name: companyName,
        industry: industryName,
        description: companyDetails.description || "",
        mission: companyDetails.mission || "",
        vision: companyDetails.vision || "",
        headquarters: companyDetails.headquarters || "",
        phone: companyDetails.phone || "",
        additionalDetails: companyDetails,
      });
      if (!result.success) {
        throw new Error(result.error || "Failed to update company details");
      }
      // Refresh profile to get updated data
      if (auth.refreshProfile) {
        await auth.refreshProfile();
      }
      toast.success("Company details updated successfully!");
    } catch (error) {
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
          Provide comprehensive information about your company to help us better
          understand your business
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
        <Button onClick={handleSaveCompanyDetails} disabled={isUpdating}>
          {isUpdating ? "Saving..." : "Save Company Details"}
        </Button>
      </CardFooter>
    </Card>
  );
}
