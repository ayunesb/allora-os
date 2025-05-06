import { CompanyScrapedData } from "@/services/companyDataService";
import { PartialCompanyDetails } from "@/models/companyDetails";
export declare function useCompanyWebsite(): {
  companyWebsite: string;
  setCompanyWebsite: (value: string) => void;
  isScrapingData: boolean;
  scrapedData: CompanyScrapedData;
  scrapeCompanyData: () => Promise<boolean>;
  applyScrapedDataToCompanyDetails: (
    currentDetails: PartialCompanyDetails,
    companyNameSetter: (name: string) => void,
    industrySetter: (industry: string) => void,
  ) => PartialCompanyDetails;
};
