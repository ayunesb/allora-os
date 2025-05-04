export type Json = string | number | boolean | null | {
    [key: string]: Json;
} | Json[];
export type BasicCompanyData = {
    id: string;
    name: string;
    industry?: string;
    details?: Record<string, any> | Json;
    created_at?: string;
};
export type CompanyResponse = {
    success: boolean;
    message: string;
    companyId?: string;
    companyName?: string;
    data?: BasicCompanyData | null;
    error?: string;
    errorCode?: string;
};
