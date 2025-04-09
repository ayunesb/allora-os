
import { useState, useEffect } from "react";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";

// Define a more specific type for company details
export type RiskAppetiteType = 'low' | 'medium' | 'high';

// Use a simpler, flatter type structure
export interface CompanyDetails {
  riskAppetite?: RiskAppetiteType;
  companySize?: string;
  industry?: string;
  // Allow additional properties without causing deep instantiation
  [key: string]: any; 
}

export function useCompanyDetails(companyId?: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [riskAppetite, setRiskAppetite] = useState<RiskAppetiteType>('medium');
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({});

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      if (!companyId) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        
        // Fetch company details including risk appetite
        const { data: companyData, error: companyError } = await supabase
          .from('companies')
          .select('details')
          .eq('id', companyId)
          .maybeSingle();
          
        if (companyError) throw companyError;
        
        // Safely extract company details
        const details = companyData?.details || {};
        
        // Create a simplified company details object
        const companyDetailsObj: CompanyDetails = {};
        
        // Handle risk appetite specifically
        if (typeof details === 'object' && details !== null) {
          // Safe type assertion for risk appetite
          const detailsRiskAppetite = details.riskAppetite as string;
          if (detailsRiskAppetite && 
              ['low', 'medium', 'high'].includes(detailsRiskAppetite)) {
            setRiskAppetite(detailsRiskAppetite as RiskAppetiteType);
            companyDetailsObj.riskAppetite = detailsRiskAppetite as RiskAppetiteType;
          }
          
          // Extract other properties safely
          if ('companySize' in details) {
            companyDetailsObj.companySize = details.companySize as string;
          }
          
          if ('industry' in details) {
            companyDetailsObj.industry = details.industry as string;
          }
          
          // Add any other properties from details
          Object.entries(details).forEach(([key, value]) => {
            if (!['riskAppetite', 'companySize', 'industry'].includes(key)) {
              companyDetailsObj[key] = value;
            }
          });
        }
        
        setCompanyDetails(companyDetailsObj);
      } catch (error: any) {
        console.error("Error fetching company details:", error);
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
    companyDetails
  };
}
