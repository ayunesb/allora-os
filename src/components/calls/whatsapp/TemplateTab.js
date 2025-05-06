var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Loader2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { toast } from "sonner";
import { sendWhatsAppTemplate } from "@/utils/twilioHelpers";
export default function TemplateTab({ phoneNumber, selectedLeadId, templates, isLoadingTemplates, onMessageSent, isLoadingMutation, }) {
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [templateVariables, setTemplateVariables] = useState({});
    const [isSending, setIsSending] = useState(false);
    const handleSendTemplate = () => __awaiter(this, void 0, void 0, function* () {
        if (!phoneNumber.trim()) {
            toast.error("Please enter a valid phone number");
            return;
        }
        if (!selectedTemplate) {
            toast.error("Please select a template");
            return;
        }
        const formattedNumber = phoneNumber.replace(/[^0-9+]/g, "");
        setIsSending(true);
        try {
            const sentViaApi = yield sendWhatsAppTemplate(formattedNumber, selectedTemplate, templateVariables, selectedLeadId);
            if (sentViaApi) {
                const communicationData = {
                    type: "whatsapp",
                    status: "completed",
                    notes: `WhatsApp template: ${selectedTemplate} sent`,
                    metadata: {
                        template_name: selectedTemplate,
                        variables: templateVariables,
                    },
                };
                yield onMessageSent(communicationData);
            }
            setSelectedTemplate("");
            setTemplateVariables({});
            toast.success("WhatsApp template sent successfully");
        }
        catch (error) {
            console.error("Error sending WhatsApp template:", error);
            toast.error("Failed to send WhatsApp template");
        }
        finally {
            setIsSending(false);
        }
    });
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "whatsapp-template", children: "Select Template" }), _jsxs(Select, { value: selectedTemplate, onValueChange: setSelectedTemplate, disabled: isLoadingTemplates, children: [_jsx(SelectTrigger, { id: "whatsapp-template", children: _jsx(SelectValue, { placeholder: "Select a template" }) }), _jsx(SelectContent, { children: templates.map((template) => (_jsx(SelectItem, { value: template.name, children: template.name }, template.sid))) })] })] }), selectedTemplate && (_jsxs("div", { className: "space-y-2 border p-3 rounded-md bg-muted/20", children: [_jsx("h4", { className: "font-medium", children: "Template Variables" }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "variable-1", children: "Name" }), _jsx(Input, { id: "variable-1", placeholder: "Enter customer name", value: templateVariables.name || "", onChange: (e) => setTemplateVariables(Object.assign(Object.assign({}, templateVariables), { name: e.target.value })) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "variable-2", children: "Company" }), _jsx(Input, { id: "variable-2", placeholder: "Enter company name", value: templateVariables.company || "", onChange: (e) => setTemplateVariables(Object.assign(Object.assign({}, templateVariables), { company: e.target.value })) })] })] })), _jsx(Button, { onClick: handleSendTemplate, disabled: isSending || isLoadingMutation || !phoneNumber || !selectedTemplate, className: "w-full", children: isSending ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Sending..."] })) : (_jsxs(_Fragment, { children: [_jsx(FileText, { className: "mr-2 h-4 w-4" }), "Send Template"] })) })] }));
}
