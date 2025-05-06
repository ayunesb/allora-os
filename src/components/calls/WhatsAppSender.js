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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCommunications } from "@/hooks/communications";
import { useLeads } from "@/hooks/admin/useLeads";
import { getWhatsAppTemplates } from "@/utils/twilioHelpers";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
// Import component parts
import LeadSelector from "./whatsapp/LeadSelector";
import DirectMessageTab from "./whatsapp/DirectMessageTab";
import TemplateTab from "./whatsapp/TemplateTab";
import WhatsAppFooter from "./whatsapp/WhatsAppFooter";
export default function WhatsAppSender({ phoneNumber, onPhoneNumberChange }) {
    const [selectedLeadId, setSelectedLeadId] = useState("");
    const [activeTab, setActiveTab] = useState("direct");
    const [templates, setTemplates] = useState([]);
    const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
    const [templateError, setTemplateError] = useState(null);
    const { leads, isLoading: leadsLoading } = useLeads();
    const { logCommunication, isLoadingMutation } = useCommunications();
    useEffect(() => {
        function fetchTemplates() {
            return __awaiter(this, void 0, void 0, function* () {
                setIsLoadingTemplates(true);
                setTemplateError(null);
                try {
                    const templatesList = yield getWhatsAppTemplates();
                    setTemplates(templatesList);
                    if (templatesList.length === 0) {
                        setTemplateError("No WhatsApp templates found. Templates may not be configured properly.");
                    }
                }
                catch (error) {
                    console.error("Error fetching WhatsApp templates:", error);
                    setTemplateError(`Error fetching WhatsApp templates: ${error.message || "Unknown error"}`);
                    toast.error("Failed to load WhatsApp templates");
                }
                finally {
                    setIsLoadingTemplates(false);
                }
            });
        }
        fetchTemplates();
    }, []);
    const handleSelectLead = (leadId) => {
        setSelectedLeadId(leadId);
        const selectedLead = leads === null || leads === void 0 ? void 0 : leads.find((lead) => lead.id === leadId);
        if (selectedLead === null || selectedLead === void 0 ? void 0 : selectedLead.phone) {
            onPhoneNumberChange(selectedLead.phone);
        }
        else {
            onPhoneNumberChange("");
        }
    };
    // Create a wrapper function to ensure correct parameter passing
    const handleMessageSent = (communicationData) => __awaiter(this, void 0, void 0, function* () {
        if (selectedLeadId) {
            yield logCommunication(selectedLeadId, communicationData);
        }
    });
    return (_jsxs("div", { className: "space-y-4", children: [_jsx(LeadSelector, { selectedLeadId: selectedLeadId, onSelectLead: handleSelectLead, leads: leads, isLoading: leadsLoading }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "whatsapp-phone", children: "Phone Number" }), _jsx(Input, { id: "whatsapp-phone", placeholder: "+1 (555) 123-4567", value: phoneNumber, onChange: (e) => onPhoneNumberChange(e.target.value) })] }), templateError && (_jsxs(Alert, { variant: "destructive", className: "my-4", children: [_jsx(AlertCircle, { className: "h-4 w-4" }), _jsx(AlertDescription, { children: templateError })] })), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid grid-cols-2 w-full", children: [_jsx(TabsTrigger, { value: "direct", children: "Direct Message" }), _jsx(TabsTrigger, { value: "template", children: "Template" })] }), _jsx(TabsContent, { value: "direct", className: "space-y-4", children: _jsx(DirectMessageTab, { phoneNumber: phoneNumber, selectedLeadId: selectedLeadId, onMessageSent: handleMessageSent, isLoadingMutation: isLoadingMutation }) }), _jsx(TabsContent, { value: "template", className: "space-y-4", children: _jsx(TemplateTab, { phoneNumber: phoneNumber, selectedLeadId: selectedLeadId, templates: templates, isLoadingTemplates: isLoadingTemplates, onMessageSent: handleMessageSent, isLoadingMutation: isLoadingMutation }) })] }), _jsx(WhatsAppFooter, {})] }));
}
