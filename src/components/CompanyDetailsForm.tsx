
import { useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { updateCompanyDetails } from "@/utils/companySetup";
import { PartialCompanyDetails } from "@/models/companyDetails";
import { Accordion } from "@/components/ui/accordion";
import CompanyDetailsSurvey from "@/components/onboarding/CompanyDetailsSurvey";

export default function CompanyDetailsForm() {
  const { user, profile, refreshProfile } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<PartialCompanyDetails>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load company details when profile changes
  useState(() => {
    if (profile?.company_id) {
      // In a real app, you would fetch the company details from the database
      // For now, we'll just use an empty object
      setCompanyDetails({});
    }
  });

  const updateCompanyDetailsState = (details: PartialCompanyDetails) => {
    setCompanyDetails({ ...companyDetails, ...details });
  };

  const handleSaveCompanyDetails = async () => {
    if (!user) {
      toast.error("You must be logged in to update company details");
      return;
    }

    setIsUpdating(true);
    setErrorMessage(null);

    try {
      const result = await updateCompanyDetails(user.id, {
        name: profile?.company || "",
        industry: profile?.industry || "",
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
