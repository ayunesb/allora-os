import { supabase } from "@/integrations/supabase/client";
import { fetchApi } from "@/utils/api/fetchApi";

export type CompanyScrapedData = {
  name: string;
  description: string;
  industry: string;
  size: string;
  products: string[];
  services: string[];
  website?: string;
  headquarters?: string;
  founded?: string;
};

interface CompanyData {
  id: string;
  name: string;
  industry: string;
}

export async function fetchCompanyDataFromWebsite(
  website: string,
): Promise<CompanyScrapedData | null> {
  try {
    console.log("Fetching company data for:", website);

    const { data, error } = await supabase.functions.invoke(
      "get-company-data",
      {
        body: { website },
      },
    );

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

export async function getCompanyData(companyId: string): Promise<CompanyData | null> {
  try {
    const data = await fetchApi<CompanyData>(`/api/companies/${companyId}`, {
      method: "GET",
    });
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching company data:", error.message);
    }
    return null;
  }
}
