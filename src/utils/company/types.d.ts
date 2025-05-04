import { PartialCompanyDetails } from "@/models/companyDetails";
export type CompanyCreationResult = {
    success: boolean;
    companyId?: string;
    error?: string;
};
export type CompanyUpdateOptions = {
    name: string;
    industry: string;
    description: string;
    mission: string;
    vision: string;
    headquarters: string;
    phone: string;
    website?: string;
    email?: string;
    stage?: string;
    businessModel?: {
        freemium?: string;
        premium?: string;
        enterprise?: string;
        upsells?: string[];
    };
    marketInfo?: {
        size?: string;
        growthRate?: string;
        targetCustomers?: string[];
    };
    products?: {
        name: string;
        description: string;
    }[];
    team?: {
        role: string;
        name: string;
    }[];
    financials?: {
        fundingRound?: string;
        fundingAmount?: string;
        valuation?: string;
        useOfFunds?: string;
        cac?: string;
        ltv?: string;
        runway?: string;
    };
    techStack?: string[];
    legalEntity?: {
        name: string;
        country: string;
    };
    additionalDetails?: PartialCompanyDetails;
};
