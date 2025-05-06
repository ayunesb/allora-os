import { useState, useEffect } from "react";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";

// Define a more specific type for risk appetite
export type RiskAppetiteType = "low" | "medium" | "high";

// Use a simplified company details interface
export interface CompanyDetails {
  riskAppetite?: RiskAppetiteType;
  companySize?: string;
  industry?: string;
  [key: string]: any;
}

export function useCompanyDetails(companyId?: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [riskAppetite, setRiskAppetite] = useState<RiskAppetiteType>("medium");
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({});
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (!companyId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        // Fetch company details including risk appetite
        const { data: companyData, error: companyError } = await supabase
          .from("companies")
          .select("details")
          .eq("id", companyId)
          .maybeSingle();

        if (companyError) throw companyError;

        // Create a simplified company details object
        const extractedDetails: CompanyDetails = {};

        // Safely extract data from details
        if (
          companyData?.details &&
          typeof companyData.details === "object" &&
          !Array.isArray(companyData.details)
        ) {
          const details = companyData.details as Record<string, any>;

          // Extract specific properties we care about
          if (
            "riskAppetite" in details &&
            typeof details.riskAppetite === "string" &&
            ["low", "medium", "high"].includes(details.riskAppetite)
          ) {
            const appetite = details.riskAppetite as RiskAppetiteType;
            setRiskAppetite(appetite);
            extractedDetails.riskAppetite = appetite;
          }

          if (
            "companySize" in details &&
            typeof details.companySize === "string"
          ) {
            extractedDetails.companySize = details.companySize;
          }

          if ("industry" in details && typeof details.industry === "string") {
            extractedDetails.industry = details.industry;
          }

          // Copy any other properties
          Object.entries(details).forEach(([key, value]) => {
            if (!["riskAppetite", "companySize", "industry"].includes(key)) {
              extractedDetails[key] = value;
            }
          });
        }

        setCompanyDetails(extractedDetails);
      } catch (error: any) {
        console.error("Error fetching company details:", error);
        setError(
          new Error(error.message || "Failed to load company information"),
        );
        toast.error("Failed to load company information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [companyId]);

  return {
    isLoading,
    riskAppetite,
    companyDetails,
    error,
  };
}
