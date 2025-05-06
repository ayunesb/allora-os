import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
// Define the campaign form schema
const campaignSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    platform: z.enum(["meta", "tiktok", "email", "whatsapp"]),
    budget: z.coerce.number().min(1, "Budget must be at least 1"),
});
export default function CampaignFormDialog({ open, onOpenChange, onSubmit, defaultValues = {
    name: "",
    platform: "meta",
    budget: 100,
}, isSubmitting, isEditing, }) {
    const form = useForm({
        resolver: zodResolver(campaignSchema),
        defaultValues,
    });
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: isEditing ? "Edit Campaign" : "Create New Campaign" }), _jsx(DialogDescription, { children: isEditing
                                ? "Update your campaign details below."
                                : "Fill in the details for your new marketing campaign." })] }), _jsx(Form, Object.assign({}, form, { children: _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-4", children: [_jsx(FormField, { control: form.control, name: "name", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Campaign Name" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "Summer Product Launch" }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "platform", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Platform" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select platform" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "meta", children: "Meta" }), _jsx(SelectItem, { value: "tiktok", children: "TikTok" }), _jsx(SelectItem, { value: "email", children: "Email" }), _jsx(SelectItem, { value: "whatsapp", children: "WhatsApp" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "budget", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Budget ($)" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ type: "number", min: 1 }, field)) }), _jsx(FormMessage, {})] })) }), _jsx(DialogFooter, { children: _jsx(Button, { type: "submit", disabled: isSubmitting, children: isSubmitting
                                        ? "Saving..."
                                        : isEditing
                                            ? "Update Campaign"
                                            : "Create Campaign" }) })] }) }))] }) }));
}
