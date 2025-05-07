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
import { Button } from "@/components/ui/button";
import { useCommunications } from "@/hooks/communications";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
export default function CommunicationStatusSelector({ communicationId, currentStatus, currentOutcome, }) {
    const [outcome, setOutcome] = useState(currentOutcome);
    const { updateCommunicationStatus } = useCommunications();
    const handleUpdateOutcome = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield updateCommunicationStatus(communicationId, currentStatus, undefined, outcome);
        }
        catch (error) {
            console.error("Error updating outcome:", error);
        }
    });
    return (_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 py-2 border-y", children: [_jsxs("div", { children: [_jsx("span", { className: "text-sm font-medium mr-2", children: "Outcome:" }), _jsxs(Select, { value: outcome || "null", onValueChange: (val) => setOutcome(val === "null" ? null : val), children: [_jsx(SelectTrigger, { className: "w-[180px]", children: _jsx(SelectValue, { placeholder: "Select outcome" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "null", children: "No outcome" }), _jsx(SelectItem, { value: "follow_up", children: "Follow-up Needed" }), _jsx(SelectItem, { value: "opportunity", children: "New Opportunity" }), _jsx(SelectItem, { value: "closed_won", children: "Closed (Won)" }), _jsx(SelectItem, { value: "closed_lost", children: "Closed (Lost)" })] })] })] }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleUpdateOutcome, disabled: outcome === currentOutcome, children: "Update Outcome" })] }));
}
