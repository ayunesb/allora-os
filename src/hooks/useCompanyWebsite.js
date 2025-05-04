import { useState } from "react";
import { fetchCompanyDataFromWebsite } from "@/services/companyDataService";
import { toast } from "sonner";
export function useCompanyWebsite() {
    const [companyWebsite, setCompanyWebsite] = useState("");
    const [isScrapingData, setIsScrapingData] = useState(false);
    const [scrapedData, setScrapedData] = useState(null);
    const handleWebsiteChange = (value) => {
        setCompanyWebsite(value);
    };
    const scrapeCompanyData = async () => {
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
            }
            else {
                toast.error("Couldn't fetch company data. Please enter information manually.");
                return false;
            }
        }
        catch (error) {
            console.error("Error scraping company data:", error);
            toast.error("Error fetching company data. Please try again or enter manually.");
            return false;
        }
        finally {
            setIsScrapingData(false);
        }
    };
    const applyScrapedDataToCompanyDetails = (currentDetails, companyNameSetter, industrySetter) => {
        if (!scrapedData)
            return currentDetails;
        // Apply scraped data to company details
        const updatedDetails = {
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
