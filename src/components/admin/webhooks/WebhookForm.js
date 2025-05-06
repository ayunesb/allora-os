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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { toast } from "sonner";
const webhookFormSchema = z.object({
    type: z.string().min(1, { message: "Webhook type is required" }),
    url: z.string().url({ message: "Please enter a valid URL" }),
});
export default function WebhookForm({ initialData, onSubmit, isSubmitting = false, }) {
    const form = useForm({
        resolver: zodResolver(webhookFormSchema),
        defaultValues: initialData || {
            type: "",
            url: "",
        },
    });
    const handleSubmit = (values) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield onSubmit(values);
            if (!initialData) {
                form.reset();
            }
            toast.success(`Webhook ${initialData ? "updated" : "created"} successfully`);
        }
        catch (error) {
            console.error("Error submitting webhook:", error);
            toast.error("Failed to save webhook");
        }
    });
    return (_jsx(Form, Object.assign({}, form, { children: _jsxs("form", { onSubmit: form.handleSubmit(handleSubmit), className: "space-y-6", children: [_jsx(FormField, { control: form.control, name: "type", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Webhook Type" }), _jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, disabled: isSubmitting, children: [_jsx(FormControl, { children: _jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select webhook type" }) }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "strategy_created", children: "Strategy Created" }), _jsx(SelectItem, { value: "campaign_updated", children: "Campaign Updated" }), _jsx(SelectItem, { value: "lead_captured", children: "Lead Captured" }), _jsx(SelectItem, { value: "payment_received", children: "Payment Received" }), _jsx(SelectItem, { value: "custom", children: "Custom" })] })] }), _jsx(FormMessage, {})] })) }), _jsx(FormField, { control: form.control, name: "url", render: ({ field }) => (_jsxs(FormItem, { children: [_jsx(FormLabel, { children: "Webhook URL" }), _jsx(FormControl, { children: _jsx(Input, Object.assign({ placeholder: "https://example.com/webhook" }, field, { disabled: isSubmitting })) }), _jsx(FormMessage, {})] })) }), _jsx(Button, { type: "submit", disabled: isSubmitting, children: isSubmitting
                        ? "Saving..."
                        : initialData
                            ? "Update Webhook"
                            : "Create Webhook" })] }) })));
}
