import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
export default function LeadSelector({ selectedLeadId, onSelectLead, leads, isLoading, }) {
    return (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "lead-select", children: "Select Lead (Optional)" }), _jsxs(Select, { value: selectedLeadId, onValueChange: onSelectLead, disabled: isLoading, children: [_jsx(SelectTrigger, { id: "lead-select", children: _jsx(SelectValue, { placeholder: "Select a lead" }) }), _jsx(SelectContent, { children: leads === null || leads === void 0 ? void 0 : leads.map((lead) => (_jsx(SelectItem, { value: lead.id, children: lead.name }, lead.id))) })] })] }));
}
