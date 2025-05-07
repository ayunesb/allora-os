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
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { useLeads } from "@/hooks/admin/useLeads";
export const AddLeadDialog = ({ onLeadAdded, campaigns, isMobileView }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [campaignId, setCampaignId] = useState("");
    const [status, setStatus] = useState("new");
    const { addLead, isAddingLead } = useLeads();
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        const lead = yield addLead({
            name,
            email,
            phone,
            campaign_id: campaignId,
            status,
        });
        if (lead) {
            resetForm();
            setOpen(false);
            onLeadAdded();
        }
    });
    const resetForm = () => {
        setName("");
        setEmail("");
        setPhone("");
        setCampaignId("");
        setStatus("new");
    };
    return (_jsxs(Dialog, { open: open, onOpenChange: setOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { size: "sm", children: [_jsx(PlusCircle, { className: "h-4 w-4 mr-2" }), isMobileView ? "Add" : "Add Lead"] }) }), _jsx(DialogContent, { className: "sm:max-w-[425px]", children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Add New Lead" }), _jsx(DialogDescription, { children: "Create a new lead in the system. Fill out the required information." })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "name", className: "text-right", children: "Name" }), _jsx(Input, { id: "name", value: name, onChange: (e) => setName(e.target.value), className: "col-span-3", required: true })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "email", className: "text-right", children: "Email" }), _jsx(Input, { id: "email", type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "col-span-3", required: true })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "phone", className: "text-right", children: "Phone" }), _jsx(Input, { id: "phone", type: "tel", value: phone, onChange: (e) => setPhone(e.target.value), className: "col-span-3" })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "campaign", className: "text-right", children: "Campaign" }), _jsxs(Select, { value: campaignId, onValueChange: setCampaignId, required: true, children: [_jsx(SelectTrigger, { className: "col-span-3", children: _jsx(SelectValue, { placeholder: "Select a campaign" }) }), _jsx(SelectContent, { children: campaigns.map((campaign) => (_jsx(SelectItem, { value: campaign.id, children: campaign.name }, campaign.id))) })] })] }), _jsxs("div", { className: "grid grid-cols-4 items-center gap-4", children: [_jsx(Label, { htmlFor: "status", className: "text-right", children: "Status" }), _jsxs(Select, { value: status, onValueChange: (value) => setStatus(value), required: true, children: [_jsx(SelectTrigger, { className: "col-span-3", children: _jsx(SelectValue, { placeholder: "Select a status" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "new", children: "New" }), _jsx(SelectItem, { value: "contacted", children: "Contacted" }), _jsx(SelectItem, { value: "qualified", children: "Qualified" }), _jsx(SelectItem, { value: "client", children: "Client" }), _jsx(SelectItem, { value: "closed", children: "Closed" })] })] })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { type: "button", variant: "outline", onClick: () => setOpen(false), children: "Cancel" }), _jsx(Button, { type: "submit", disabled: isAddingLead, children: isAddingLead ? "Adding..." : "Add Lead" })] })] }) })] }));
};
