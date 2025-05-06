import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
const ProfileAvatar = ({ avatarUrl, setAvatarUrl, avatarFile, setAvatarFile, profileName, userEmail, }) => {
    const handleAvatarChange = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }
        const file = e.target.files[0];
        setAvatarFile(file);
        // Create a preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarUrl(reader.result);
        };
        reader.readAsDataURL(file);
    };
    return (_jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4", children: [_jsxs(Avatar, { className: "h-24 w-24", children: [_jsx(AvatarImage, { src: avatarUrl || "" }), _jsx(AvatarFallback, { className: "text-2xl", children: (profileName === null || profileName === void 0 ? void 0 : profileName.charAt(0)) || (userEmail === null || userEmail === void 0 ? void 0 : userEmail.charAt(0)) || "U" })] }), _jsxs("div", { className: "flex-1 space-y-2", children: [_jsx("h3", { className: "text-lg font-medium", children: "Profile Picture" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Upload a profile picture to personalize your account" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Label, { htmlFor: "avatar", className: "flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-muted transition-colors", children: [_jsx(Upload, { className: "h-4 w-4" }), _jsx("span", { children: "Upload" })] }), _jsx(Input, { id: "avatar", type: "file", accept: "image/*", onChange: handleAvatarChange, className: "hidden" }), avatarUrl && (_jsx(Button, { type: "button", variant: "outline", onClick: () => {
                                    setAvatarUrl(null);
                                    setAvatarFile(null);
                                }, children: "Remove" }))] })] })] }));
};
export default ProfileAvatar;
