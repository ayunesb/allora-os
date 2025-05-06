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
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export const LeadActions = ({ leadId, onStatusUpdate, onDelete }) => {
    const handleStatusUpdate = (status) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield onStatusUpdate(leadId, status);
            toast.success(`Lead status updated to ${status}`);
        }
        catch (error) {
            console.error("Failed to update lead status:", error);
            toast.error("Failed to update lead status");
        }
    });
    const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        if (window.confirm("Are you sure you want to delete this lead?")) {
            try {
                yield onDelete(leadId);
                toast.success("Lead deleted successfully");
            }
            catch (error) {
                console.error("Failed to delete lead:", error);
                toast.error("Failed to delete lead");
            }
        }
    });
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(MoreHorizontal, { className: "h-4 w-4" }) }) }), _jsxs(DropdownMenuContent, { align: "end", children: [_jsx(DropdownMenuItem, { onClick: () => handleStatusUpdate("new"), children: "Mark as New" }), _jsx(DropdownMenuItem, { onClick: () => handleStatusUpdate("contacted"), children: "Mark as Contacted" }), _jsx(DropdownMenuItem, { onClick: () => handleStatusUpdate("qualified"), children: "Mark as Qualified" }), _jsx(DropdownMenuItem, { onClick: () => handleStatusUpdate("client"), children: "Mark as Client" }), _jsx(DropdownMenuItem, { onClick: () => handleStatusUpdate("closed"), children: "Mark as Closed" }), _jsx(DropdownMenuItem, { className: "text-destructive", onClick: handleDelete, children: "Delete" })] })] }));
};
