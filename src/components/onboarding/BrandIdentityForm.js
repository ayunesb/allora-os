import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Upload, ImageIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
// Brand tone options
const brandTones = [
    { value: "formal", label: "Formal" },
    { value: "friendly", label: "Friendly" },
    { value: "bold", label: "Bold" },
    { value: "creative", label: "Creative" },
    { value: "innovative", label: "Innovative" },
    { value: "premium", label: "Premium" },
];
export function BrandIdentityForm({ companyDetails, updateCompanyDetails }) {
    var _a;
    const [previewLogo, setPreviewLogo] = useState(null);
    const [brandStylePreview, setBrandStylePreview] = useState("This is how your brand message will appear to users.");
    // Handle color change
    const handleColorChange = (field, value) => {
        updateCompanyDetails(Object.assign(Object.assign({}, companyDetails), { [field]: value }));
    };
    // Handle logo upload
    const handleLogoUpload = (event) => {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            // For a real implementation, you would upload this file to your storage
            // and get back a URL. For now, we'll just create a local preview
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                const dataUrl = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                setPreviewLogo(dataUrl);
                updateCompanyDetails(Object.assign(Object.assign({}, companyDetails), { logoUrl: dataUrl }));
            };
            reader.readAsDataURL(file);
        }
    };
    // Clear the logo
    const handleClearLogo = () => {
        setPreviewLogo(null);
        updateCompanyDetails(Object.assign(Object.assign({}, companyDetails), { logoUrl: "" }));
    };
    // Update preview based on selected brand tone and colors
    useEffect(() => {
        let styleDescription = "This is how your brand message will appear.";
        switch (companyDetails.brandTone) {
            case "formal":
                styleDescription =
                    "Your brand uses professional, straightforward language.";
                break;
            case "friendly":
                styleDescription =
                    "Your brand uses approachable, conversational language.";
                break;
            case "bold":
                styleDescription =
                    "Your brand makes strong statements with confidence.";
                break;
            case "creative":
                styleDescription = "Your brand uses imaginative language to inspire.";
                break;
            case "innovative":
                styleDescription =
                    "Your brand focuses on future-oriented, progressive messaging.";
                break;
            case "premium":
                styleDescription = "Your brand emphasizes quality and exclusivity.";
                break;
            default:
                styleDescription = "Select a brand tone to see a preview.";
        }
        setBrandStylePreview(styleDescription);
    }, [companyDetails.brandTone]);
    // Set up initial preview logo if logoUrl exists
    useEffect(() => {
        if (companyDetails.logoUrl) {
            setPreviewLogo(companyDetails.logoUrl);
        }
    }, []);
    return (_jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "logo-upload", children: "Company Logo" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-24 h-24 border-2 border-dashed border-muted rounded-md flex items-center justify-center overflow-hidden bg-muted/10", children: previewLogo ? (_jsx("img", { src: previewLogo, alt: "Logo preview", className: "max-w-full max-h-full object-contain" })) : (_jsx(ImageIcon, { className: "h-8 w-8 text-muted-foreground" })) }), _jsxs("div", { children: [_jsx(Input, { id: "logo-upload", type: "file", accept: "image/*", className: "hidden", onChange: handleLogoUpload }), _jsxs("div", { className: "flex space-x-2", children: [_jsxs(Button, { variant: "outline", onClick: () => { var _a; return (_a = document.getElementById("logo-upload")) === null || _a === void 0 ? void 0 : _a.click(); }, type: "button", size: "sm", children: [_jsx(Upload, { className: "h-4 w-4 mr-2" }), "Upload Logo"] }), previewLogo && (_jsxs(Button, { variant: "outline", onClick: handleClearLogo, type: "button", size: "sm", className: "text-destructive hover:text-destructive", children: [_jsx(Trash2, { className: "h-4 w-4 mr-2" }), "Remove"] }))] }), _jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Recommended: Square image, at least 200x200px" })] })] })] }), _jsx(Separator, { className: "my-6" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "primary-color", children: "Primary Brand Color" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { id: "primary-color", type: "color", value: companyDetails.primaryColor || "#000000", onChange: (e) => handleColorChange("primaryColor", e.target.value), className: "w-12 h-10 p-1" }), _jsx(Input, { value: companyDetails.primaryColor || "#000000", onChange: (e) => handleColorChange("primaryColor", e.target.value), placeholder: "#000000", className: "flex-1" })] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Used for buttons, links, and important UI elements" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "secondary-color", children: "Secondary Brand Color" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { id: "secondary-color", type: "color", value: companyDetails.secondaryColor || "#ffffff", onChange: (e) => handleColorChange("secondaryColor", e.target.value), className: "w-12 h-10 p-1" }), _jsx(Input, { value: companyDetails.secondaryColor || "#ffffff", onChange: (e) => handleColorChange("secondaryColor", e.target.value), placeholder: "#ffffff", className: "flex-1" })] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Used for accents, highlights, and supporting elements" })] })] }), _jsxs("div", { className: "space-y-2 pt-2", children: [_jsx(Label, { htmlFor: "brand-tone", children: "Brand Tone" }), _jsxs(Select, { value: companyDetails.brandTone || "", onValueChange: (value) => updateCompanyDetails(Object.assign(Object.assign({}, companyDetails), { brandTone: value })), children: [_jsx(SelectTrigger, { id: "brand-tone", children: _jsx(SelectValue, { placeholder: "Select brand tone" }) }), _jsx(SelectContent, { children: brandTones.map((tone) => (_jsx(SelectItem, { value: tone.value, children: tone.label }, tone.value))) })] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Defines how your brand communicates with your audience" })] }), _jsx(Separator, { className: "my-6" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Brand Style Preview" }), _jsxs(Card, { className: "overflow-hidden", children: [_jsx("div", { className: "h-2", style: {
                                        backgroundColor: companyDetails.primaryColor || "#4F46E5",
                                    } }), _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-2", children: [previewLogo ? (_jsx("img", { src: previewLogo, alt: "Logo", className: "h-8 w-8 object-contain" })) : (_jsx("div", { className: "h-8 w-8 rounded flex items-center justify-center", style: {
                                                        backgroundColor: companyDetails.secondaryColor || "#10B981",
                                                    }, children: _jsx("span", { className: "text-xs font-bold text-white", children: ((_a = companyDetails.name) === null || _a === void 0 ? void 0 : _a.substring(0, 1)) || "A" }) })), _jsx("span", { className: "font-medium", children: companyDetails.name || "Your Company" })] }), _jsx("p", { className: "text-sm mb-3", children: brandStylePreview }), _jsxs("div", { className: "flex flex-wrap gap-2", children: [_jsx(Badge, { style: {
                                                        backgroundColor: companyDetails.primaryColor || "#4F46E5",
                                                        color: "#ffffff",
                                                    }, children: "Primary Button" }), _jsx(Badge, { variant: "outline", style: {
                                                        borderColor: companyDetails.secondaryColor || "#10B981",
                                                        color: companyDetails.secondaryColor || "#10B981",
                                                    }, children: "Secondary Button" })] })] })] })] })] }) }));
}
