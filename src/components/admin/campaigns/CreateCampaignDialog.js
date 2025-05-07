import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import CampaignForm from "./CampaignForm";
const CreateCampaignDialog = ({ open, onOpenChange, formData, onChange, onSubmit, companies, isSubmitting, }) => {
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { children: [_jsx(DialogHeader, { children: _jsx(DialogTitle, { children: "Create New Campaign" }) }), _jsx(CampaignForm, { data: formData, onChange: onChange, onSubmit: onSubmit, companies: companies, isSubmitting: isSubmitting })] }) }));
};
export default CreateCampaignDialog;
