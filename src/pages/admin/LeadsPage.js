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
import { LeadsHeader, LeadsTable } from "@/components/admin/leads";
import { useBreakpoint } from "@/hooks/use-mobile";
export default function LeadsPage() {
    const breakpoint = useBreakpoint();
    const isMobileView = ["xs", "mobile"].includes(breakpoint);
    const [leads, setLeads] = useState([
        {
            id: "lead-1",
            name: "John Doe",
            email: "john@example.com",
            companyId: "company-1",
            company: "Acme Corp",
            status: "new",
            score: 85,
            lastContact: "2025-04-01",
            created_at: "2025-03-15",
            campaign_id: "campaign-1",
        },
        {
            id: "lead-2",
            name: "Jane Smith",
            email: "jane@example.com",
            companyId: "company-2",
            company: "XYZ Inc",
            status: "contacted",
            score: 72,
            lastContact: "2025-03-25",
            created_at: "2025-03-10",
            campaign_id: "campaign-2",
        },
        {
            id: "lead-3",
            name: "Bob Johnson",
            email: "bob@example.com",
            companyId: "company-3",
            company: "Tech Solutions",
            status: "qualified",
            score: 90,
            lastContact: "2025-04-05",
            created_at: "2025-03-20",
            campaign_id: "campaign-1",
        },
    ]);
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        }
        else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };
    const handleAddLead = () => {
        console.log("Add lead clicked");
    };
    const handleDeleteLead = (leadId) => {
        console.log("Delete lead", leadId);
        setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
    };
    // Add mock implementation for required props
    const handleStatusUpdate = (leadId, status) => __awaiter(this, void 0, void 0, function* () {
        console.log("Update lead status", leadId, status);
        return true;
    });
    const handleDelete = (leadId) => __awaiter(this, void 0, void 0, function* () {
        console.log("Delete lead", leadId);
        setLeads((prev) => prev.filter((lead) => lead.id !== leadId));
        return true;
    });
    return (_jsxs("div", { className: "space-y-6", children: [_jsx(LeadsHeader, { isMobileView: isMobileView, onAddLead: handleAddLead }), _jsx(LeadsTable, { leads: leads, sortBy: sortBy, sortOrder: sortOrder, onSort: handleSort, isMobileView: isMobileView, onStatusUpdate: handleStatusUpdate, onDelete: handleDelete })] }));
}
