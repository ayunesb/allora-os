import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { INDUSTRY_OPTIONS } from "@/constants/industries";
const companyProfileSchema = z.object({
    name: z.string().min(2, "Company name must be at least 2 characters"),
    industry: z.string().min(1, "Please select an industry"),
    website: z.string().url("Please enter a valid URL").or(z.string().length(0)),
    description: z
        .string()
        .max(500, "Description must be less than 500 characters")
        .optional(),
    size: z.string().optional(),
});
export default function CompanyProfileForm({ onSubmit, initialValues, isLoading, }) {
    const { register, handleSubmit, formState: { errors }, setValue, watch, } = useForm({
        resolver: zodResolver(companyProfileSchema),
        defaultValues: {
            name: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.name) || "",
            industry: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.industry) || "",
            website: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.website) || "",
            description: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.description) || "",
            size: (initialValues === null || initialValues === void 0 ? void 0 : initialValues.size) || "",
        },
    });
    const handleIndustryChange = (value) => {
        setValue("industry", value);
    };
    const handleSizeChange = (value) => {
        setValue("size", value);
    };
    const selectedIndustry = watch("industry");
    const selectedSize = watch("size");
    return (_jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-8", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "name", children: "Company Name" }), _jsx(Input, Object.assign({ id: "name", placeholder: "Enter your company name" }, register("name"), { className: errors.name ? "border-red-500" : "" })), errors.name && (_jsx("p", { className: "text-sm text-red-500", children: errors.name.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "industry", children: "Industry" }), _jsxs(Select, { value: selectedIndustry, onValueChange: handleIndustryChange, children: [_jsx(SelectTrigger, { id: "industry", className: errors.industry ? "border-red-500" : "", children: _jsx(SelectValue, { placeholder: "Select your industry" }) }), _jsx(SelectContent, { children: INDUSTRY_OPTIONS.map((industry) => (_jsx(SelectItem, { value: industry.value, children: industry.label }, industry.value))) })] }), errors.industry && (_jsx("p", { className: "text-sm text-red-500", children: errors.industry.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "website", children: "Website URL" }), _jsx(Input, Object.assign({ id: "website", placeholder: "https://yourcompany.com" }, register("website"), { className: errors.website ? "border-red-500" : "" })), errors.website && (_jsx("p", { className: "text-sm text-red-500", children: errors.website.message }))] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "size", children: "Company Size" }), _jsxs(Select, { value: selectedSize, onValueChange: handleSizeChange, children: [_jsx(SelectTrigger, { id: "size", children: _jsx(SelectValue, { placeholder: "Select company size" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "1-10", children: "1-10 employees" }), _jsx(SelectItem, { value: "11-50", children: "11-50 employees" }), _jsx(SelectItem, { value: "51-200", children: "51-200 employees" }), _jsx(SelectItem, { value: "201-500", children: "201-500 employees" }), _jsx(SelectItem, { value: "501-1000", children: "501-1000 employees" }), _jsx(SelectItem, { value: "1001+", children: "1001+ employees" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "description", children: "Company Description" }), _jsx(Textarea, Object.assign({ id: "description", placeholder: "Brief description of your company" }, register("description"), { className: errors.description ? "border-red-500" : "" })), errors.description && (_jsx("p", { className: "text-sm text-red-500", children: errors.description.message }))] })] }), _jsx(Button, { type: "submit", disabled: isLoading, children: isLoading ? "Saving..." : "Save Company Profile" })] }));
}
