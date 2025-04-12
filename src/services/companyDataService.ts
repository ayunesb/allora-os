
import { supabase } from "@/integrations/supabase/client";

export type CompanyScrapedData = {
  name: string;
  description: string;
  industry: string;
  size: string;
  products: string[];
  services: string[];
};

export async function fetchCompanyDataFromWebsite(
  website: string
): Promise<CompanyScrapedData | null> {
  try {
    console.log("Fetching company data for:", website);
    
    const { data, error } = await supabase.functions.invoke("get-company-data", {
      body: { website },
    });

    if (error) {
      console.error("Error fetching company data:", error);
      return null;
    }

    console.log("Company data fetched successfully:", data);
    return data.data;
  } catch (error) {
    console.error("Error in fetchCompanyDataFromWebsite:", error);
    return null;
  }
}
