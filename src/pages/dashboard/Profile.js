import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import CompanyDetailsForm from "@/components/CompanyDetailsForm";
import ProfileForm from "@/components/profile/ProfileForm";
import { toast } from "sonner";
import ProfileDiagnostics from "@/components/settings/ProfileDiagnostics";
// Ensure the object being used is typed correctly
const user = {
    id: "123",
    name: "John Doe",
    company: "TechCorp",
    industry: "Software",
};
export default function Profile() {
    const auth = useAuth();
    const { user, profile, isLoading, refreshProfile } = auth;
    const userEmail = user === null || user === void 0 ? void 0 : user.email; // Extract email directly from user object
    useEffect(() => {
        // Call refreshProfile to make sure we have the latest data
        if (user && !isLoading && refreshProfile) {
            refreshProfile();
        }
    }, [user, isLoading, refreshProfile]);
    useEffect(() => {
        // Detailed logging for verification
        console.log("Current User Details:", {
            email: userEmail,
            userId: user === null || user === void 0 ? void 0 : user.id,
            profileName: profile === null || profile === void 0 ? void 0 : profile.name,
            profileCompany: profile === null || profile === void 0 ? void 0 : profile.company,
            profileIndustry: profile === null || profile === void 0 ? void 0 : profile.industry,
        });
        // Toast notification to make verification clear to the user
        if (user) {
            toast.info("User Account Verification", {
                description: `Logged in as: ${userEmail || "Email not available"}`,
                duration: 5000,
            });
        }
    }, [user, profile, userEmail, isLoading]);
    if (isLoading) {
        return (_jsx("div", { className: "container max-w-4xl mx-auto px-4 py-10", children: _jsxs("div", { className: "space-y-6", children: [_jsx(Skeleton, { className: "h-12 w-1/3" }), _jsx(Skeleton, { className: "h-4 w-2/3" }), _jsxs("div", { className: "grid gap-6", children: [_jsx(Skeleton, { className: "h-36 w-full" }), _jsx(Skeleton, { className: "h-36 w-full" })] })] }) }));
    }
    return (_jsxs("div", { className: "container max-w-4xl mx-auto px-4 py-10", children: [_jsx("h1", { className: "text-3xl font-bold mb-2", children: "Profile Settings" }), _jsx("p", { className: "text-muted-foreground mb-8", children: "Manage your account information" }), _jsx(ProfileDiagnostics, {}), _jsxs(Tabs, { defaultValue: "basic", children: [_jsxs(TabsList, { className: "mb-4", children: [_jsx(TabsTrigger, { value: "basic", children: "Basic Info" }), _jsx(TabsTrigger, { value: "company", children: "Company Details" })] }), _jsx(TabsContent, { value: "basic", className: "space-y-6", children: _jsx(ProfileForm, {}) }), _jsx(TabsContent, { value: "company", children: _jsx(CompanyDetailsForm, {}) })] })] }));
}
