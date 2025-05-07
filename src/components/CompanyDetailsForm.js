var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateCompanyDetails } from "@/utils/company";
import { CompanyDetailsSurvey } from "@/components/onboarding/company-details";
import { fetchUserCompany } from "@/utils/companyHelpers";
import { createAuthCompatibilityLayer } from "@/utils/authCompatibility";
export default function CompanyDetailsForm() {
    const authContext = useAuth();
    const auth = createAuthCompatibilityLayer(authContext);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [companyDetails, setCompanyDetails] = useState({});
    const [errorMessage, setErrorMessage] = useState(undefined);
    // Load company details when profile changes
    useEffect(() => {
        function loadCompanyData() {
            return __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (!((_a = auth.profile) === null || _a === void 0 ? void 0 : _a.company_id)) {
                    setIsLoading(false);
                    return;
                }
                setIsLoading(true);
                try {
                    console.log("Loading company details for company ID:", auth.profile.company_id);
                    const company = yield fetchUserCompany(((_b = auth.user) === null || _b === void 0 ? void 0 : _b.id) || "");
                    if (company) {
                        console.log("Company details loaded:", company);
                        // If company has details property, use that for additional details
                        const additionalDetails = company.details || {};
                        setCompanyDetails(additionalDetails);
                    }
                }
                catch (error) {
                    console.error("Error loading company details:", error);
                }
                finally {
                    setIsLoading(false);
                }
            });
        }
        loadCompanyData();
    }, [auth.profile, auth.user]);
    const updateCompanyDetailsState = (details) => {
        setCompanyDetails(Object.assign(Object.assign({}, companyDetails), details));
    };
    const handleSaveCompanyDetails = () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if (!auth.user) {
            toast.error("You must be logged in to update company details");
            return;
        }
        setIsUpdating(true);
        setErrorMessage(undefined);
        try {
            // Extract basic info that's required by the API
            const companyName = ((_a = auth.profile) === null || _a === void 0 ? void 0 : _a.company) || "";
            const industryName = ((_b = auth.profile) === null || _b === void 0 ? void 0 : _b.industry) || "";
            console.log("Saving company details for user:", auth.user.id);
            console.log("Company name:", companyName);
            console.log("Industry:", industryName);
            console.log("Company details:", companyDetails);
            // Provide the bare minimum required fields plus the additionalDetails
            const result = yield updateCompanyDetails(auth.user.id, {
                name: companyName,
                industry: industryName,
                description: companyDetails.description || "",
                mission: companyDetails.mission || "",
                vision: companyDetails.vision || "",
                headquarters: companyDetails.headquarters || "",
                phone: companyDetails.phone || "",
                additionalDetails: companyDetails,
            });
            if (!result.success) {
                throw new Error(result.error || "Failed to update company details");
            }
            // Refresh profile to get updated data
            if (auth.refreshProfile) {
                yield auth.refreshProfile();
            }
            toast.success("Company details updated successfully!");
        }
        catch (error) {
            console.error("Error updating company details:", error);
            const errorMsg = error.message || "An error occurred during update";
            setErrorMessage(errorMsg);
            toast.error(errorMsg);
        }
        finally {
            setIsUpdating(false);
        }
    });
    if (isLoading) {
        return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Company Details" }), _jsx(CardDescription, { children: "Loading company information..." })] }), _jsx(CardContent, { children: _jsx("div", { className: "h-40 flex items-center justify-center", children: _jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) })] }));
    }
    return (_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Company Details" }), _jsx(CardDescription, { children: "Provide comprehensive information about your company to help us better understand your business" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-6", children: _jsx(CompanyDetailsSurvey, { companyDetails: companyDetails, updateCompanyDetails: updateCompanyDetailsState, error: errorMessage }) }) }), _jsxs(CardFooter, { className: "flex justify-end space-x-2", children: [_jsx(Button, { variant: "outline", disabled: isUpdating, children: "Cancel" }), _jsx(Button, { onClick: handleSaveCompanyDetails, disabled: isUpdating, children: isUpdating ? "Saving..." : "Save Company Details" })] })] }));
}
