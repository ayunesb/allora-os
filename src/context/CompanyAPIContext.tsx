
import React, { createContext, useContext, useState, ReactNode } from 'react';

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

const CompanyAPIContext = createContext<CompanyAPIContextType | undefined>(undefined);

export const CompanyAPIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKeys, setApiKeys] = useState<Record<string, string>>(() => {
    const savedKeys = localStorage.getItem('company_api_keys');
    return savedKeys ? JSON.parse(savedKeys) : {};
  });

  const setApiKey = (service: string, key: string) => {
    const newKeys = { ...apiKeys, [service]: key };
    setApiKeys(newKeys);
    localStorage.setItem('company_api_keys', JSON.stringify(newKeys));
  };

  const clearApiKey = (service: string) => {
    const newKeys = { ...apiKeys };
    delete newKeys[service];
    setApiKeys(newKeys);
    localStorage.setItem('company_api_keys', JSON.stringify(newKeys));
  };

  const hasApiKey = (service: string) => {
    return !!apiKeys[service];
  };

  return (
    <CompanyAPIContext.Provider value={{ 
      apiKeys, 
      setApiKey, 
      clearApiKey, 
      hasApiKey 
    }}>
      {children}
    </CompanyAPIContext.Provider>
  );
};

export const useCompanyAPI = () => {
  const context = useContext(CompanyAPIContext);
  if (context === undefined) {
    throw new Error('useCompanyAPI must be used within a CompanyAPIProvider');
  }
  return context;
};
