import { useState, useEffect } from "react";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
export function useCompanyDetails(companyId) {
    const [isLoading, setIsLoading] = useState(true);
    const [riskAppetite, setRiskAppetite] = useState('medium');
    const [companyDetails, setCompanyDetails] = useState({});
    const [error, setError] = useState(null);
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
                    .from('companies')
                    .select('details')
                    .eq('id', companyId)
                    .maybeSingle();
                if (companyError)
                    throw companyError;
                // Create a simplified company details object
                const extractedDetails = {};
                // Safely extract data from details
                if (companyData?.details && typeof companyData.details === 'object' && !Array.isArray(companyData.details)) {
                    const details = companyData.details;
                    // Extract specific properties we care about
                    if ('riskAppetite' in details &&
                        typeof details.riskAppetite === 'string' &&
                        ['low', 'medium', 'high'].includes(details.riskAppetite)) {
                        const appetite = details.riskAppetite;
                        setRiskAppetite(appetite);
                        extractedDetails.riskAppetite = appetite;
                    }
                    if ('companySize' in details && typeof details.companySize === 'string') {
                        extractedDetails.companySize = details.companySize;
                    }
                    if ('industry' in details && typeof details.industry === 'string') {
                        extractedDetails.industry = details.industry;
                    }
                    // Copy any other properties
                    Object.entries(details).forEach(([key, value]) => {
                        if (!['riskAppetite', 'companySize', 'industry'].includes(key)) {
                            extractedDetails[key] = value;
                        }
                    });
                }
                setCompanyDetails(extractedDetails);
            }
            catch (error) {
                console.error("Error fetching company details:", error);
                setError(new Error(error.message || "Failed to load company information"));
                toast.error("Failed to load company information");
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchCompanyDetails();
    }, [companyId]);
    return {
        isLoading,
        riskAppetite,
        companyDetails,
        error
    };
}
