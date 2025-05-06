var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { supabase } from "@/backend/supabase";
import { Loader2 } from "lucide-react";
const AdminSettingsProvider = ({ children }) => {
    const [companyId, setCompanyId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [apiKeys, setApiKeys] = useState({
        stripe: "",
        twilio_sid: "",
        twilio_token: "",
        heygen: "",
    });
    const [securitySettings, setSecuritySettings] = useState({
        twoFactorEnabled: false,
        extendedSessionTimeout: false,
        strictContentSecurity: false,
        enhancedApiProtection: false,
    });
    // Fetch the settings data
    useEffect(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                setIsLoading(true);
                // Fetch the current user's company ID for API keys
                const { data: { session }, } = yield supabase.auth.getSession();
                if (session) {
                    const { data: profileData } = yield supabase
                        .from("profiles")
                        .select("company_id")
                        .eq("id", session.user.id)
                        .single();
                    const currentCompanyId = profileData === null || profileData === void 0 ? void 0 : profileData.company_id;
                    setCompanyId(currentCompanyId);
                    // Fetch API keys if company ID is available
                    if (currentCompanyId) {
                        const { data: companyData } = yield supabase
                            .from("companies")
                            .select("details")
                            .eq("id", currentCompanyId)
                            .single();
                        if (companyData === null || companyData === void 0 ? void 0 : companyData.details) {
                            const details = typeof companyData.details === "string"
                                ? JSON.parse(companyData.details)
                                : companyData.details;
                            // Set API keys if they exist
                            if (details.api_keys) {
                                setApiKeys({
                                    stripe: details.api_keys.stripe || "",
                                    twilio_sid: details.api_keys.twilio_sid || "",
                                    twilio_token: details.api_keys.twilio_token || "",
                                    heygen: details.api_keys.heygen || "",
                                });
                            }
                        }
                    }
                    else {
                        // If no company is found, try to get the first one for API keys
                        const { data: companies } = yield supabase
                            .from("companies")
                            .select("id, details")
                            .limit(1);
                        if (companies && companies.length > 0) {
                            setCompanyId(companies[0].id);
                            // Load existing API keys if they exist
                            if (companies[0].details) {
                                const details = typeof companies[0].details === "string"
                                    ? JSON.parse(companies[0].details)
                                    : companies[0].details;
                                if (details.api_keys) {
                                    setApiKeys({
                                        stripe: details.api_keys.stripe || "",
                                        twilio_sid: details.api_keys.twilio_sid || "",
                                        twilio_token: details.api_keys.twilio_token || "",
                                        heygen: details.api_keys.heygen || "",
                                    });
                                }
                            }
                        }
                    }
                }
                // Fetch global security settings using Supabase RPC
                const { data: securityData, error: securityError } = yield supabase.rpc("get_security_settings");
                if (securityError) {
                    console.error("Error fetching security settings:", securityError);
                }
                else {
                    setSecuritySettings(securityData || {
                        twoFactorEnabled: false,
                        extendedSessionTimeout: false,
                        strictContentSecurity: false,
                        enhancedApiProtection: false,
                    });
                }
            }
            catch (error) {
                console.error("Error fetching settings data:", error);
            }
            finally {
                setIsLoading(false);
            }
        });
        fetchData();
    }, []);
    if (isLoading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center bg-background", children: _jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" }) }));
    }
    return (_jsx(_Fragment, { children: children({
            companyId,
            isLoading,
            apiKeys,
            securitySettings,
        }) }));
};
export default AdminSettingsProvider;
