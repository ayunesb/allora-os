import React, { createContext, useContext, useState } from "react";
const CompanyAPIContext = createContext(undefined);
export const CompanyAPIProvider = ({ children }) => {
  const [apiKeys, setApiKeys] = useState(() => {
    const savedKeys = localStorage.getItem("company_api_keys");
    return savedKeys ? JSON.parse(savedKeys) : {};
  });
  const setApiKey = (service, key) => {
    const newKeys = { ...apiKeys, [service]: key };
    setApiKeys(newKeys);
    localStorage.setItem("company_api_keys", JSON.stringify(newKeys));
  };
  const clearApiKey = (service) => {
    const newKeys = { ...apiKeys };
    delete newKeys[service];
    setApiKeys(newKeys);
    localStorage.setItem("company_api_keys", JSON.stringify(newKeys));
  };
  const hasApiKey = (service) => {
    return !!apiKeys[service];
  };
  return (
    <CompanyAPIContext.Provider
      value={{
        apiKeys,
        setApiKey,
        clearApiKey,
        hasApiKey,
      }}
    >
      {children}
    </CompanyAPIContext.Provider>
  );
};
export const useCompanyAPI = () => {
  const context = useContext(CompanyAPIContext);
  if (context === undefined) {
    throw new Error("useCompanyAPI must be used within a CompanyAPIProvider");
  }
  return context;
};
