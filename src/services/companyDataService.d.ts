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
export declare function fetchCompanyDataFromWebsite(
  website: string,
): Promise<CompanyScrapedData | null>;
