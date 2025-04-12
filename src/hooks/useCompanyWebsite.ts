
import { useState } from "react";
import { fetchCompanyDataFromWebsite, CompanyScrapedData } from "@/services/companyDataService";
import { PartialCompanyDetails } from "@/models/companyDetails";
import { toast } from "sonner";

export function useCompanyWebsite() {
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [isScrapingData, setIsScrapingData] = useState(false);
  const [scrapedData, setScrapedData] = useState<CompanyScrapedData | null>(null);

  const handleWebsiteChange = (value: string) => {
    setCompanyWebsite(value);
  };

  const scrapeCompanyData = async (): Promise<boolean> => {
    if (!companyWebsite.trim()) {
      return false;
    }

    setIsScrapingData(true);
    try {
      const data = await fetchCompanyDataFromWebsite(companyWebsite);
      if (data) {
        setScrapedData(data);
        toast.success("Company data fetched successfully!");
        return true;
      } else {
        toast.error("Couldn't fetch company data. Please enter information manually.");
        return false;
      }
    } catch (error) {
      console.error("Error scraping company data:", error);
      toast.error("Error fetching company data. Please try again or enter manually.");
      return false;
    } finally {
      setIsScrapingData(false);
    }
  };

  const applyScrapedDataToCompanyDetails = (
    currentDetails: PartialCompanyDetails,
    companyNameSetter: (name: string) => void,
    industrySetter: (industry: string) => void
  ): PartialCompanyDetails => {
    if (!scrapedData) return currentDetails;

    // Apply scraped data to company details
    const updatedDetails: PartialCompanyDetails = {
      ...currentDetails,
      description: scrapedData.description || currentDetails.description,
      size: scrapedData.size || currentDetails.size,
      coreProducts: scrapedData.products?.length 
        ? scrapedData.products 
        : (currentDetails.coreProducts || []),
    };

    // Update company name if available
    if (scrapedData.name) {
      companyNameSetter(scrapedData.name);
    }

    // Update industry if available
    if (scrapedData.industry) {
      industrySetter(scrapedData.industry);
    }

    return updatedDetails;
  };

  return {
    companyWebsite,
    setCompanyWebsite: handleWebsiteChange,
    isScrapingData,
    scrapedData,
    scrapeCompanyData,
    applyScrapedDataToCompanyDetails,
  };
}
