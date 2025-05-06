import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProfileForm } from "@/hooks/useProfileForm";
import { useAuth } from "@/context/AuthContext";
import ProfileAvatar from "./ProfileAvatar";
import PersonalInfoForm from "./PersonalInfoForm";
import ApiKeysSection from "./ApiKeysSection";
import ProfileFormFooter from "./ProfileFormFooter";
const ProfileForm = () => {
    const { user, profile } = useAuth();
    const { isLoading, isDirty, errors, avatarUrl, setAvatarUrl, avatarFile, setAvatarFile, personalApiKeys, handleApiKeyChange, register, handleSubmit, reset, onSubmit, } = useProfileForm();
    useEffect(() => {
        console.log("ProfileForm - Current profile data:", profile);
    }, [profile]);
    return (_jsxs(Card, { className: "w-full", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Profile Settings" }), _jsx(CardDescription, { children: "Update your profile information and avatar" })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [_jsxs(CardContent, { className: "space-y-6", children: [_jsx(ProfileAvatar, { avatarUrl: avatarUrl, setAvatarUrl: setAvatarUrl, avatarFile: avatarFile, setAvatarFile: setAvatarFile, profileName: profile === null || profile === void 0 ? void 0 : profile.name, userEmail: user === null || user === void 0 ? void 0 : user.email }), _jsx(Separator, {}), _jsx(PersonalInfoForm, { register: register, errors: errors, userCreatedAt: user === null || user === void 0 ? void 0 : user.created_at }), _jsx(Separator, {}), _jsx(ApiKeysSection, { personalApiKeys: personalApiKeys, handleApiKeyChange: handleApiKeyChange })] }), _jsx(ProfileFormFooter, { isLoading: isLoading, isDirty: isDirty, avatarFile: avatarFile, onReset: () => reset() })] })] }));
};
export default ProfileForm;
