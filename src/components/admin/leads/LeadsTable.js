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
import { ArrowUpDown } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, } from "@/components/ui/table";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { LeadActions } from "./LeadActions";
export const LeadsTable = ({ leads, sortBy, sortOrder, onSort, onStatusUpdate, onDelete, isMobileView, }) => {
    // Handle status update with void return to match component props
    const handleStatusUpdate = (leadId, status) => __awaiter(void 0, void 0, void 0, function* () {
        yield onStatusUpdate(leadId, status);
    });
    // Handle delete with void return to match component props
    const handleDelete = (leadId) => __awaiter(void 0, void 0, void 0, function* () {
        yield onDelete(leadId);
    });
    return (_jsxs(Table, { children: [_jsx(TableHeader, { children: _jsxs(TableRow, { children: [_jsx(TableHead, { className: "w-[200px] cursor-pointer", onClick: () => onSort("name"), children: _jsxs("div", { className: "flex items-center", children: ["Name", _jsx(ArrowUpDown, { className: "h-4 w-4 ml-1" })] }) }), _jsx(TableHead, { children: "Email" }), _jsx(TableHead, { children: "Phone" }), _jsx(TableHead, { children: "Status" }), _jsx(TableHead, { className: "cursor-pointer", onClick: () => onSort("created_at"), children: _jsxs("div", { className: "flex items-center", children: ["Created", _jsx(ArrowUpDown, { className: "h-4 w-4 ml-1" })] }) }), _jsx(TableHead, { className: "text-right", children: "Actions" })] }) }), _jsx(TableBody, { children: leads.length === 0 ? (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: 6, className: "text-center py-8 text-muted-foreground", children: "No leads found" }) })) : (leads.map((lead) => (_jsxs(TableRow, { children: [_jsx(TableCell, { className: "font-medium", children: lead.name }), _jsx(TableCell, { children: lead.email }), _jsx(TableCell, { children: lead.phone }), _jsx(TableCell, { children: _jsx(LeadStatusBadge, { status: lead.status }) }), _jsx(TableCell, { children: new Date(lead.created_at).toLocaleDateString() }), _jsx(TableCell, { className: "text-right", children: _jsx(LeadActions, { leadId: lead.id, onStatusUpdate: handleStatusUpdate, onDelete: handleDelete }) })] }, lead.id)))) })] }));
};
