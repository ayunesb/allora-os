import React, { ReactNode } from "react";
interface CompanyAPIContextType {
  apiKeys: {
    stripe?: string;
    twilio?: string;
    zoom?: string;
    openai?: string;
  };
  setApiKey: (service: string, key: string) => void;
  clearApiKey: (service: string) => void;
  hasApiKey: (service: string) => boolean;
}
export declare const CompanyAPIProvider: React.FC<{
  children: ReactNode;
}>;
export declare const useCompanyAPI: () => CompanyAPIContextType;
export {};
