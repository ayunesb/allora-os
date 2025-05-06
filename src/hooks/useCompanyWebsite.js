var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState } from "react";
import { fetchCompanyDataFromWebsite, } from "@/services/companyDataService";
import { toast } from "sonner";
export function useCompanyWebsite() {
    const [companyWebsite, setCompanyWebsite] = useState("");
    const [isScrapingData, setIsScrapingData] = useState(false);
    const [scrapedData, setScrapedData] = useState(null);
    const handleWebsiteChange = (value) => {
        setCompanyWebsite(value);
    };
    const scrapeCompanyData = () => __awaiter(this, void 0, void 0, function* () {
        if (!companyWebsite.trim()) {
            return false;
        }
        setIsScrapingData(true);
        try {
            const data = yield fetchCompanyDataFromWebsite(companyWebsite);
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
    });
    const applyScrapedDataToCompanyDetails = (currentDetails, companyNameSetter, industrySetter) => {
        var _a;
        if (!scrapedData)
            return currentDetails;
        // Apply scraped data to company details
        const updatedDetails = Object.assign(Object.assign({}, currentDetails), { description: scrapedData.description || currentDetails.description, size: scrapedData.size || currentDetails.size, coreProducts: ((_a = scrapedData.products) === null || _a === void 0 ? void 0 : _a.length)
                ? scrapedData.products
                : currentDetails.coreProducts || [] });
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
