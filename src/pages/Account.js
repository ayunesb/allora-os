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
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Save, Mail, Phone, Globe, Building, MapPin, Shield, Bell, Key, Trash, AlertTriangle, } from "lucide-react";
export default function Account() {
    const { user, profile } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: (profile === null || profile === void 0 ? void 0 : profile.name) || "",
        email: (user === null || user === void 0 ? void 0 : user.email) || "",
        phone: (profile === null || profile === void 0 ? void 0 : profile.phone) || "",
        website: (profile === null || profile === void 0 ? void 0 : profile.website) || "",
        company: (profile === null || profile === void 0 ? void 0 : profile.company) || "",
        location: (profile === null || profile === void 0 ? void 0 : profile.location) || "",
        bio: (profile === null || profile === void 0 ? void 0 : profile.bio) || "",
    });
    const handleChange = (e) => {
        setFormData((prev) => (Object.assign(Object.assign({}, prev), { [e.target.name]: e.target.value })));
    };
    const handleSaveProfile = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!(user === null || user === void 0 ? void 0 : user.id)) {
            toast.error("You must be logged in to update your profile");
            return;
        }
        setIsLoading(true);
        try {
            const { error } = yield supabase
                .from("profiles")
                .update({
                name: formData.name,
                phone: formData.phone,
                website: formData.website,
                company: formData.company,
                location: formData.location,
                bio: formData.bio,
            })
                .eq("id", user.id);
            if (error)
                throw error;
            toast.success("Profile updated successfully");
        }
        catch (error) {
            toast.error(`Error updating profile: ${error.message}`);
        }
        finally {
            setIsLoading(false);
        }
    });
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
    };
    // Don't render anything if user is not logged in
    if (!user) {
        return (_jsx("div", { className: "container mx-auto py-8 flex flex-col items-center justify-center min-h-[60vh]", children: _jsxs(Card, { className: "w-full max-w-md", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Account Access" }), _jsx(CardDescription, { children: "You must be logged in to view this page" })] }), _jsx(CardFooter, { children: _jsx(Button, { onClick: () => navigate("/auth/login"), className: "w-full", children: "Log In" }) })] }) }));
    }
    return (_jsx(ErrorBoundary, { children: _jsx("div", { className: "container mx-auto py-8 space-y-8", children: _jsxs("div", { className: "flex flex-col md:flex-row gap-8 items-start", children: [_jsxs("div", { className: "md:w-1/3 w-full space-y-4", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsx(CardTitle, { children: "Account" }), _jsx(CardDescription, { children: "Manage your personal information" })] }), _jsxs(CardContent, { className: "flex flex-col items-center justify-center py-6", children: [_jsxs(Avatar, { className: "h-24 w-24 mb-4", children: [_jsx(AvatarImage, { src: (profile === null || profile === void 0 ? void 0 : profile.avatar_url) || "", alt: (profile === null || profile === void 0 ? void 0 : profile.name) || "User" }), _jsx(AvatarFallback, { className: "text-lg", children: getInitials((profile === null || profile === void 0 ? void 0 : profile.name) || "User") })] }), _jsx("h3", { className: "text-lg font-medium", children: (profile === null || profile === void 0 ? void 0 : profile.name) || "User" }), _jsx("p", { className: "text-sm text-muted-foreground", children: user.email }), _jsxs("div", { className: "mt-2 text-xs text-muted-foreground flex items-center gap-1", children: [_jsx(Building, { className: "h-3 w-3" }), (profile === null || profile === void 0 ? void 0 : profile.company) || "No company"] })] })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { className: "pb-3", children: [_jsx(CardTitle, { children: "Subscription" }), _jsx(CardDescription, { children: "Your current plan information" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Plan:" }), _jsx("span", { className: "text-sm font-medium", children: (profile === null || profile === void 0 ? void 0 : profile.subscription_status)
                                                                ? profile.subscription_plan_id
                                                                : "Free Plan" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Status:" }), _jsx("span", { className: "text-sm font-medium", children: (profile === null || profile === void 0 ? void 0 : profile.subscription_status) || "Inactive" })] }), (profile === null || profile === void 0 ? void 0 : profile.subscription_expires_at) && (_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-sm", children: "Expires:" }), _jsx("span", { className: "text-sm font-medium", children: new Date(profile.subscription_expires_at).toLocaleDateString() })] }))] }) }), _jsx(CardFooter, { children: _jsx(Button, { variant: "outline", className: "w-full", children: "Manage Subscription" }) })] })] }), _jsx("div", { className: "md:w-2/3 w-full", children: _jsxs(Tabs, { defaultValue: "profile", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "profile", children: "Profile" }), _jsx(TabsTrigger, { value: "security", children: "Security" }), _jsx(TabsTrigger, { value: "notifications", children: "Notifications" })] }), _jsx(TabsContent, { value: "profile", className: "mt-4 space-y-4", children: _jsx(Card, { children: _jsxs("form", { onSubmit: handleSaveProfile, children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Profile Information" }), _jsx(CardDescription, { children: "Update your account details and public profile" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Full Name" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { id: "name", name: "name", placeholder: "Your name", value: formData.name, onChange: handleChange, className: "pl-10" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "email", children: "Email" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { id: "email", name: "email", value: formData.email, disabled: true, className: "pl-10 bg-muted" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "phone", children: "Phone Number" }), _jsxs("div", { className: "relative", children: [_jsx(Phone, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { id: "phone", name: "phone", placeholder: "Your phone number", value: formData.phone, onChange: handleChange, className: "pl-10" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "website", children: "Website" }), _jsxs("div", { className: "relative", children: [_jsx(Globe, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { id: "website", name: "website", placeholder: "Your website", value: formData.website, onChange: handleChange, className: "pl-10" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "company", children: "Company" }), _jsxs("div", { className: "relative", children: [_jsx(Building, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { id: "company", name: "company", placeholder: "Your company", value: formData.company, onChange: handleChange, className: "pl-10" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "location", children: "Location" }), _jsxs("div", { className: "relative", children: [_jsx(MapPin, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { id: "location", name: "location", placeholder: "Your location", value: formData.location, onChange: handleChange, className: "pl-10" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "bio", children: "Bio" }), _jsx("textarea", { id: "bio", name: "bio", rows: 4, placeholder: "Tell us a bit about yourself", value: formData.bio || "", onChange: handleChange, className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" })] })] }), _jsx(CardFooter, { className: "border-t px-6 py-4", children: _jsxs(Button, { type: "submit", disabled: isLoading, children: [isLoading ? "Saving..." : "Save Changes", !isLoading && _jsx(Save, { className: "ml-2 h-4 w-4" })] }) })] }) }) }), _jsx(TabsContent, { value: "security", className: "mt-4 space-y-4", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Security Settings" }), _jsx(CardDescription, { children: "Manage your password and account security settings" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Change Password" }), _jsxs("div", { className: "grid gap-4", children: [_jsxs("div", { className: "relative", children: [_jsx(Key, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { type: "password", placeholder: "Current password", className: "pl-10" })] }), _jsxs("div", { className: "relative", children: [_jsx(Key, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { type: "password", placeholder: "New password", className: "pl-10" })] }), _jsxs("div", { className: "relative", children: [_jsx(Key, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { type: "password", placeholder: "Confirm new password", className: "pl-10" })] })] }), _jsx(Button, { className: "mt-2", children: "Update Password" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-medium", children: "Security Options" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Shield, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: "Two-factor authentication" })] }), _jsx(Button, { variant: "outline", size: "sm", children: "Enable" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Mail, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: "Email verification" })] }), _jsx(Button, { variant: "outline", size: "sm", disabled: true, children: "Verified" })] })] }), _jsxs("div", { className: "pt-4 border-t", children: [_jsx("h3", { className: "text-lg font-medium text-destructive mb-2", children: "Danger Zone" }), _jsxs("div", { className: "flex items-center justify-between bg-destructive/10 p-4 rounded-md", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Trash, { className: "h-4 w-4 text-destructive" }), _jsxs("div", { children: [_jsx("span", { className: "font-medium", children: "Delete Account" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Once deleted, your account cannot be recovered" })] })] }), _jsx(Button, { variant: "destructive", size: "sm", children: "Delete" })] })] })] })] }) }), _jsx(TabsContent, { value: "notifications", className: "mt-4 space-y-4", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Notification Preferences" }), _jsx(CardDescription, { children: "Manage how and when we contact you" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Bell, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: "Email notifications" })] }), _jsx("div", { className: "flex items-center space-x-2", children: _jsx("input", { type: "checkbox", id: "email-notifications", className: "rounded border-gray-300 text-primary focus:ring-primary" }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Bell, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: "SMS notifications" })] }), _jsx("div", { className: "flex items-center space-x-2", children: _jsx("input", { type: "checkbox", id: "sms-notifications", className: "rounded border-gray-300 text-primary focus:ring-primary" }) })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Bell, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: "Marketing emails" })] }), _jsx("div", { className: "flex items-center space-x-2", children: _jsx("input", { type: "checkbox", id: "marketing-emails", className: "rounded border-gray-300 text-primary focus:ring-primary" }) })] }), _jsxs("div", { className: "bg-muted/50 p-4 rounded-md mt-4 flex items-start gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4 text-amber-500 mt-0.5" }), _jsxs("div", { className: "text-sm", children: [_jsx("p", { className: "font-medium", children: "Communication Preference Note" }), _jsx("p", { className: "text-muted-foreground", children: "We respect your communication preferences. You can manage your email subscription settings at any time. By opting in, you agree to receive communications from Allora AI." })] })] })] }) }), _jsx(CardFooter, { className: "border-t px-6 py-4", children: _jsx(Button, { children: "Save Preferences" }) })] }) })] }) })] }) }) }));
}
