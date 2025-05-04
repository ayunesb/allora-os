import React, { createContext, useContext, useState } from 'react';
const AuthRedirectContext = createContext(undefined);
export const AuthRedirectProvider = ({ children }) => {
    const [redirectUrl, setRedirectUrl] = useState(null);
    const clearRedirectUrl = () => {
        setRedirectUrl(null);
    };
    return (<AuthRedirectContext.Provider value={{
            redirectUrl,
            setRedirectUrl,
            clearRedirectUrl
        }}>
      {children}
    </AuthRedirectContext.Provider>);
};
export const useAuthRedirect = () => {
    const context = useContext(AuthRedirectContext);
    if (context === undefined) {
        throw new Error('useAuthRedirect must be used within an AuthRedirectProvider');
    }
    return context;
};
