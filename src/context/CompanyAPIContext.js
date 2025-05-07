import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const CompanyAPIContext = createContext(undefined);
export const CompanyAPIProvider = ({ children }) => {
    const [apiKeys, setApiKeys] = useState(() => {
        const savedKeys = localStorage.getItem("company_api_keys");
        return savedKeys ? JSON.parse(savedKeys) : {};
    });
    const setApiKey = (service, key) => {
        const newKeys = Object.assign(Object.assign({}, apiKeys), { [service]: key });
        setApiKeys(newKeys);
        localStorage.setItem("company_api_keys", JSON.stringify(newKeys));
    };
    const clearApiKey = (service) => {
        const newKeys = Object.assign({}, apiKeys);
        delete newKeys[service];
        setApiKeys(newKeys);
        localStorage.setItem("company_api_keys", JSON.stringify(newKeys));
    };
    const hasApiKey = (service) => {
        return !!apiKeys[service];
    };
    return (_jsx(CompanyAPIContext.Provider, { value: {
            apiKeys,
            setApiKey,
            clearApiKey,
            hasApiKey,
        }, children: children }));
};
export const useCompanyAPI = () => {
    const context = useContext(CompanyAPIContext);
    if (context === undefined) {
        throw new Error("useCompanyAPI must be used within a CompanyAPIProvider");
    }
    return context;
};
