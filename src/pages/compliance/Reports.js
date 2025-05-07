import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportsList from "@/components/compliance/reports/ReportsList";
import CertificationsList from "@/components/compliance/reports/CertificationsList";
import DocumentVersionTracker from "@/components/compliance/reports/DocumentVersionTracker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
// Mock reports data
const mockReports = [
    {
        id: "1",
        title: "GDPR Compliance Audit",
        type: "Regulatory Compliance",
        date: "April 5, 2025",
        status: "completed",
    },
    {
        id: "2",
        title: "Data Security Assessment",
        type: "Security Audit",
        date: "March 15, 2025",
        status: "completed",
    },
    {
        id: "3",
        title: "CCPA Compliance Check",
        type: "Regulatory Compliance",
        date: "May 10, 2025",
        status: "scheduled",
    },
    {
        id: "4",
        title: "Privacy Policy Review",
        type: "Document Review",
        date: "April 20, 2025",
        status: "scheduled",
    },
    {
        id: "5",
        title: "Annual Security Review",
        type: "Security Audit",
        date: "June 1, 2025",
        status: "scheduled",
    },
];
export default function Reports() {
    return (_jsx("div", { className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-xl", children: "Compliance Reports" }), _jsx(CardDescription, { children: "View and generate compliance reports and certifications" })] }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: "reports", className: "w-full", children: [_jsxs(TabsList, { className: "mb-4", children: [_jsx(TabsTrigger, { value: "reports", children: "Compliance Reports" }), _jsx(TabsTrigger, { value: "certifications", children: "Certifications" }), _jsx(TabsTrigger, { value: "documents", children: "Document History" })] }), _jsx(TabsContent, { value: "reports", children: _jsx(ReportsList, { reports: mockReports }) }), _jsx(TabsContent, { value: "certifications", children: _jsx(CertificationsList, {}) }), _jsx(TabsContent, { value: "documents", children: _jsx(DocumentVersionTracker, {}) })] }) })] }) }));
}
