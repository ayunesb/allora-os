import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { FileText, FileSpreadsheet, FilePieChart, FileCheck, Download, ArrowRight, Loader2, Plus, Settings, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
export function DocumentGenerator() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [selectedTab, setSelectedTab] = useState("templates");
    const [docName, setDocName] = useState("");
    const [docDetails, setDocDetails] = useState("");
    const [docType, setDocType] = useState("proposal");
    const documentTemplates = [
        {
            id: "business-proposal",
            title: "Business Proposal",
            description: "Generate a comprehensive business proposal based on your company data and AI insights",
            icon: _jsx(FileText, { className: "h-12 w-12 text-blue-500" }),
            type: "proposal",
        },
        {
            id: "quarterly-report",
            title: "Quarterly Report",
            description: "Create a quarterly performance report with key metrics and growth analysis",
            icon: _jsx(FileSpreadsheet, { className: "h-12 w-12 text-green-500" }),
            type: "report",
        },
        {
            id: "market-analysis",
            title: "Market Analysis",
            description: "Generate a detailed market analysis with competitive insights",
            icon: _jsx(FilePieChart, { className: "h-12 w-12 text-purple-500" }),
            type: "analysis",
        },
        {
            id: "executive-summary",
            title: "Executive Summary",
            description: "Create a concise executive summary of your business strategy",
            icon: _jsx(FileCheck, { className: "h-12 w-12 text-orange-500" }),
            type: "summary",
        },
    ];
    const handleGenerateDocument = () => {
        if (!docName.trim()) {
            toast.error("Please enter a document name");
            return;
        }
        setIsGenerating(true);
        // Simulate document generation
        setTimeout(() => {
            setIsGenerating(false);
            toast.success(`${docName} has been generated successfully`);
        }, 3000);
    };
    const handleOpenTemplate = (template) => {
        setSelectedDocument(template);
        setDocName(`${template.title} - ${new Date().toLocaleDateString()}`);
        setDocType(template.type);
    };
    const recentDocuments = [
        {
            name: "Q2 Marketing Proposal",
            date: "2025-04-08",
            type: "proposal",
            icon: _jsx(FileText, { className: "h-5 w-5 text-blue-500" }),
        },
        {
            name: "Meta Ads Market Analysis",
            date: "2025-04-05",
            type: "analysis",
            icon: _jsx(FilePieChart, { className: "h-5 w-5 text-purple-500" }),
        },
        {
            name: "Q1 Performance Report",
            date: "2025-03-28",
            type: "report",
            icon: _jsx(FileSpreadsheet, { className: "h-5 w-5 text-green-500" }),
        },
    ];
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex justify-between items-center mb-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold", children: "Document Generation" }), _jsx("p", { className: "text-muted-foreground", children: "Create professional business documents powered by AI insights" })] }), _jsxs(Button, { onClick: () => setSelectedTab("custom"), children: [_jsx(Plus, { className: "mr-2 h-4 w-4" }), "New Document"] })] }), _jsxs(Tabs, { value: selectedTab, onValueChange: setSelectedTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid grid-cols-3 w-[400px]", children: [_jsx(TabsTrigger, { value: "templates", children: "Templates" }), _jsx(TabsTrigger, { value: "recent", children: "Recent Documents" }), _jsx(TabsTrigger, { value: "custom", children: "Custom Document" })] }), _jsx(TabsContent, { value: "templates", className: "space-y-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: documentTemplates.map((template) => (_jsxs(Card, { className: "cursor-pointer hover:shadow-md transition-shadow", onClick: () => handleOpenTemplate(template), children: [_jsxs(CardHeader, { className: "flex flex-row items-center gap-4", children: [template.icon, _jsxs("div", { children: [_jsx(CardTitle, { children: template.title }), _jsx(CardDescription, { children: template.description })] })] }), _jsx(CardFooter, { children: _jsxs(Button, { variant: "ghost", className: "ml-auto", children: ["Use Template ", _jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] }) })] }, template.id))) }) }), _jsx(TabsContent, { value: "recent", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Recently Generated Documents" }), _jsx(CardDescription, { children: "Access your recently created documents and reports" })] }), _jsx(CardContent, { children: _jsx("div", { className: "space-y-4", children: recentDocuments.map((doc, index) => (_jsxs("div", { className: "flex items-center justify-between py-3 border-b last:border-b-0", children: [_jsxs("div", { className: "flex items-center", children: [doc.icon, _jsxs("div", { className: "ml-3", children: [_jsx("h4", { className: "text-sm font-medium", children: doc.name }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["Created: ", doc.date] })] })] }), _jsxs("div", { className: "flex space-x-2", children: [_jsx(Button, { variant: "ghost", size: "icon", children: _jsx(Settings, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(Download, { className: "h-4 w-4" }) })] })] }, index))) }) })] }) }), _jsx(TabsContent, { value: "custom", className: "space-y-6", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Generate Custom Document" }), _jsx(CardDescription, { children: "Create a new document with your specific requirements" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "doc-name", children: "Document Name" }), _jsx(Input, { id: "doc-name", placeholder: "Enter document name", value: docName, onChange: (e) => setDocName(e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "doc-type", children: "Document Type" }), _jsxs(Select, { value: docType, onValueChange: setDocType, children: [_jsx(SelectTrigger, { id: "doc-type", children: _jsx(SelectValue, { placeholder: "Select document type" }) }), _jsxs(SelectContent, { children: [_jsx(SelectItem, { value: "proposal", children: "Business Proposal" }), _jsx(SelectItem, { value: "report", children: "Business Report" }), _jsx(SelectItem, { value: "analysis", children: "Market Analysis" }), _jsx(SelectItem, { value: "summary", children: "Executive Summary" }), _jsx(SelectItem, { value: "plan", children: "Action Plan" }), _jsx(SelectItem, { value: "presentation", children: "Presentation" })] })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "doc-details", children: "Additional Details" }), _jsx(Textarea, { id: "doc-details", placeholder: "Enter any specific information you'd like to include in this document", rows: 4, value: docDetails, onChange: (e) => setDocDetails(e.target.value) })] })] }), _jsxs(CardFooter, { className: "flex justify-between", children: [_jsx(Button, { variant: "outline", onClick: () => setSelectedTab("templates"), children: "Cancel" }), _jsx(Button, { onClick: handleGenerateDocument, disabled: isGenerating, children: isGenerating ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Generating..."] })) : (_jsx(_Fragment, { children: "Generate Document" })) })] })] }) })] }), _jsx(Dialog, { open: !!selectedDocument, onOpenChange: (open) => !open && setSelectedDocument(null), children: _jsxs(DialogContent, { className: "sm:max-w-[540px]", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "flex items-center", children: [selectedDocument === null || selectedDocument === void 0 ? void 0 : selectedDocument.icon, _jsx("span", { className: "ml-3", children: selectedDocument === null || selectedDocument === void 0 ? void 0 : selectedDocument.title })] }), _jsx(DialogDescription, { children: selectedDocument === null || selectedDocument === void 0 ? void 0 : selectedDocument.description })] }), _jsxs("div", { className: "grid gap-4 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "template-name", children: "Document Name" }), _jsx(Input, { id: "template-name", value: docName, onChange: (e) => setDocName(e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "template-details", children: "Additional Details" }), _jsx(Textarea, { id: "template-details", placeholder: "Enter any specific information you'd like to include", rows: 3, value: docDetails, onChange: (e) => setDocDetails(e.target.value) })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setSelectedDocument(null), children: "Cancel" }), _jsx(Button, { onClick: handleGenerateDocument, disabled: isGenerating, children: isGenerating ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Generating..."] })) : (_jsx(_Fragment, { children: "Generate Document" })) })] })] }) })] }));
}
