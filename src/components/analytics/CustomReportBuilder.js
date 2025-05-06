import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { PlusCircle, Save, Trash, Download, Layout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog";
import { toast } from "sonner";
import AnalyticsChart from "./AnalyticsChart";
import { EnhancedVisualization } from "./EnhancedVisualizations";
export function CustomReportBuilder() {
    const [activeTab, setActiveTab] = useState("builder");
    const [reportName, setReportName] = useState("New Report");
    const [reportDescription, setReportDescription] = useState("");
    const [reportElements, setReportElements] = useState([]);
    const [savedReports, setSavedReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isAddElementOpen, setIsAddElementOpen] = useState(false);
    const [newElement, setNewElement] = useState({
        type: "basic",
        chartType: "line",
        dataSource: "leads",
    });
    // Mock data sources for demonstration
    const dataSources = [
        { id: "leads", name: "Leads" },
        { id: "campaigns", name: "Campaigns" },
        { id: "communications", name: "Communications" },
        { id: "website_visits", name: "Website Visits" },
        { id: "aibots_usage", name: "AI Bots Usage" },
    ];
    const chartTypes = [
        { id: "line", name: "Line Chart" },
        { id: "bar", name: "Bar Chart" },
        { id: "pie", name: "Pie Chart" },
        { id: "area", name: "Area Chart" },
        { id: "funnel", name: "Funnel Analysis" },
        { id: "heatmap", name: "Heatmap" },
        { id: "treemap", name: "Treemap" },
        { id: "bubble", name: "Bubble Chart" },
    ];
    // Sample data for demonstrations
    const getDemoData = (dataSource, chartType) => {
        switch (dataSource) {
            case "leads":
                if (chartType === "funnel") {
                    return [
                        { name: "Visitors", value: 5000 },
                        { name: "Leads", value: 2500 },
                        { name: "Qualified", value: 1500 },
                        { name: "Proposals", value: 800 },
                        { name: "Negotiations", value: 400 },
                        { name: "Clients", value: 200 },
                    ];
                }
                else if (chartType === "heatmap") {
                    return Array.from({ length: 100 }, (_, i) => ({
                        name: `Cell ${i}`,
                        value: Math.floor(Math.random() * 100),
                    }));
                }
                else if (chartType === "treemap") {
                    return [
                        { name: "New", value: 400 },
                        { name: "Contacted", value: 300 },
                        { name: "Qualified", value: 200 },
                        { name: "Proposal", value: 150 },
                        { name: "Negotiation", value: 100 },
                        { name: "Closed", value: 80 },
                        { name: "Lost", value: 40 },
                    ];
                }
                else if (chartType === "bubble") {
                    return [
                        {
                            name: "Quality Score",
                            data: Array.from({ length: 15 }, () => ({
                                x: Math.floor(Math.random() * 100),
                                y: Math.floor(Math.random() * 100),
                                z: Math.floor(Math.random() * 100),
                                name: "Lead",
                            })),
                        },
                    ];
                }
                else {
                    return Array.from({ length: 12 }, (_, i) => ({
                        name: `Month ${i + 1}`,
                        value: Math.floor(Math.random() * 100),
                        value2: Math.floor(Math.random() * 80),
                    }));
                }
            case "campaigns":
                return Array.from({ length: 8 }, (_, i) => ({
                    name: `Campaign ${i + 1}`,
                    value: Math.floor(Math.random() * 100),
                    value2: Math.floor(Math.random() * 80),
                }));
            case "communications":
                return Array.from({ length: 6 }, (_, i) => ({
                    name: `Channel ${i + 1}`,
                    value: Math.floor(Math.random() * 100),
                    value2: Math.floor(Math.random() * 80),
                }));
            default:
                return Array.from({ length: 10 }, (_, i) => ({
                    name: `Item ${i + 1}`,
                    value: Math.floor(Math.random() * 100),
                    value2: Math.floor(Math.random() * 80),
                }));
        }
    };
    const handleAddElement = () => {
        if (!newElement.title) {
            toast.error("Please provide a title for the report element");
            return;
        }
        const element = {
            id: `element-${Date.now()}`,
            type: newElement.type || "basic",
            title: newElement.title || "New Element",
            chartType: newElement.chartType || "line",
            dataSource: newElement.dataSource || "leads",
            config: newElement.config || {},
        };
        setReportElements([...reportElements, element]);
        setIsAddElementOpen(false);
        setNewElement({
            type: "basic",
            chartType: "line",
            dataSource: "leads",
        });
        toast.success("Report element added");
    };
    const handleRemoveElement = (id) => {
        setReportElements(reportElements.filter((element) => element.id !== id));
        toast.success("Element removed");
    };
    const handleSaveReport = () => {
        if (!reportName) {
            toast.error("Please provide a name for the report");
            return;
        }
        if (reportElements.length === 0) {
            toast.error("Please add at least one element to the report");
            return;
        }
        const newReport = {
            id: (selectedReport === null || selectedReport === void 0 ? void 0 : selectedReport.id) || `report-${Date.now()}`,
            name: reportName,
            description: reportDescription,
            elements: reportElements,
            createdAt: (selectedReport === null || selectedReport === void 0 ? void 0 : selectedReport.createdAt) || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        if (selectedReport) {
            // Update existing report
            setSavedReports(savedReports.map((report) => report.id === selectedReport.id ? newReport : report));
            toast.success("Report updated successfully");
        }
        else {
            // Create new report
            setSavedReports([...savedReports, newReport]);
            toast.success("Report saved successfully");
        }
        setSelectedReport(newReport);
    };
    const handleLoadReport = (report) => {
        setReportName(report.name);
        setReportDescription(report.description);
        setReportElements(report.elements);
        setSelectedReport(report);
        setActiveTab("builder");
        toast.success(`Loaded report: ${report.name}`);
    };
    const handleNewReport = () => {
        setReportName("New Report");
        setReportDescription("");
        setReportElements([]);
        setSelectedReport(null);
        setActiveTab("builder");
    };
    const renderReportElement = (element) => {
        var _a;
        const data = getDemoData(element.dataSource, element.chartType);
        // Advanced visualization types
        if (["heatmap", "treemap", "funnel", "bubble"].includes(element.chartType)) {
            return (_jsx(EnhancedVisualization, { type: element.chartType, data: data, title: element.title, config: element.config }));
        }
        // Basic chart types
        return (_jsx(AnalyticsChart, { title: element.title, description: `Data source: ${(_a = dataSources.find((ds) => ds.id === element.dataSource)) === null || _a === void 0 ? void 0 : _a.name}`, chartType: element.chartType, data: data, dataKeys: ["value", "value2"], colors: ["#8884d8", "#82ca9d"], xAxisDataKey: "name" }));
    };
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold", children: "Custom Reports" }), _jsx("p", { className: "text-muted-foreground", children: "Build, save, and analyze custom reports for your business" })] }), _jsxs("div", { className: "flex gap-2", children: [_jsxs(Button, { variant: "outline", onClick: handleNewReport, children: [_jsx(PlusCircle, { className: "mr-2 h-4 w-4" }), "New Report"] }), _jsxs(Button, { onClick: handleSaveReport, children: [_jsx(Save, { className: "mr-2 h-4 w-4" }), "Save Report"] })] })] }), _jsxs(Tabs, { value: activeTab, onValueChange: setActiveTab, className: "w-full", children: [_jsxs(TabsList, { className: "grid grid-cols-2 mb-6", children: [_jsx(TabsTrigger, { value: "builder", children: "Report Builder" }), _jsx(TabsTrigger, { value: "saved", children: "Saved Reports" })] }), _jsxs(TabsContent, { value: "builder", className: "space-y-6", children: [_jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "reportName", children: "Report Name" }), _jsx(Input, { id: "reportName", value: reportName, onChange: (e) => setReportName(e.target.value), placeholder: "Enter report name" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "reportDescription", children: "Description (Optional)" }), _jsx(Input, { id: "reportDescription", value: reportDescription, onChange: (e) => setReportDescription(e.target.value), placeholder: "Enter report description" })] })] }), _jsx("div", { className: "flex items-center justify-end", children: _jsxs(Button, { variant: "outline", onClick: () => toast.success("Report exported as PDF"), children: [_jsx(Download, { className: "mr-2 h-4 w-4" }), "Export Report"] }) })] }) }) }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("h3", { className: "text-lg font-medium", children: "Report Elements" }), _jsxs(Dialog, { open: isAddElementOpen, onOpenChange: setIsAddElementOpen, children: [_jsx(DialogTrigger, { asChild: true, children: _jsxs(Button, { children: [_jsx(PlusCircle, { className: "mr-2 h-4 w-4" }), "Add Element"] }) }), _jsxs(DialogContent, { children: [_jsxs(DialogHeader, { children: [_jsx(DialogTitle, { children: "Add Report Element" }), _jsx(DialogDescription, { children: "Configure a new visualization element for your report" })] }), _jsxs("div", { className: "space-y-4 py-2", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "elementTitle", children: "Element Title" }), _jsx(Input, { id: "elementTitle", value: newElement.title || "", onChange: (e) => setNewElement(Object.assign(Object.assign({}, newElement), { title: e.target.value })), placeholder: "Enter element title" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "dataSource", children: "Data Source" }), _jsxs(Select, { value: newElement.dataSource, onValueChange: (value) => setNewElement(Object.assign(Object.assign({}, newElement), { dataSource: value })), children: [_jsx(SelectTrigger, { id: "dataSource", children: _jsx(SelectValue, { placeholder: "Select data source" }) }), _jsx(SelectContent, { children: dataSources.map((source) => (_jsx(SelectItem, { value: source.id, children: source.name }, source.id))) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "chartType", children: "Visualization Type" }), _jsxs(Select, { value: newElement.chartType, onValueChange: (value) => setNewElement(Object.assign(Object.assign({}, newElement), { chartType: value })), children: [_jsx(SelectTrigger, { id: "chartType", children: _jsx(SelectValue, { placeholder: "Select chart type" }) }), _jsx(SelectContent, { children: chartTypes.map((chart) => (_jsx(SelectItem, { value: chart.id, children: chart.name }, chart.id))) })] })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => setIsAddElementOpen(false), children: "Cancel" }), _jsx(Button, { onClick: handleAddElement, children: "Add Element" })] })] })] })] }), reportElements.length === 0 ? (_jsxs("div", { className: "border border-dashed rounded-md p-8 text-center bg-background text-muted-foreground", children: [_jsx(Layout, { className: "h-12 w-12 mx-auto mb-4 text-muted-foreground/50" }), _jsx("h3", { className: "text-lg font-medium mb-1", children: "No elements added yet" }), _jsx("p", { className: "mb-4", children: "Add visualization elements to create your custom report" }), _jsxs(Button, { variant: "secondary", onClick: () => setIsAddElementOpen(true), children: [_jsx(PlusCircle, { className: "mr-2 h-4 w-4" }), "Add Your First Element"] })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: reportElements.map((element) => (_jsxs("div", { className: "relative group", children: [renderReportElement(element), _jsx(Button, { className: "absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity", size: "icon", variant: "destructive", onClick: () => handleRemoveElement(element.id), children: _jsx(Trash, { className: "h-4 w-4" }) })] }, element.id))) }))] }), _jsx(TabsContent, { value: "saved", className: "space-y-6", children: savedReports.length === 0 ? (_jsxs("div", { className: "border border-dashed rounded-md p-8 text-center bg-background text-muted-foreground", children: [_jsx(Save, { className: "h-12 w-12 mx-auto mb-4 text-muted-foreground/50" }), _jsx("h3", { className: "text-lg font-medium mb-1", children: "No saved reports" }), _jsx("p", { className: "mb-4", children: "Build and save your custom reports for quick access" }), _jsxs(Button, { variant: "secondary", onClick: handleNewReport, children: [_jsx(PlusCircle, { className: "mr-2 h-4 w-4" }), "Create Your First Report"] })] })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: savedReports.map((report) => (_jsx(Card, { className: "cursor-pointer hover:bg-accent/50 transition-colors", children: _jsxs(CardContent, { className: "p-4", onClick: () => handleLoadReport(report), children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-medium truncate", children: report.name }), _jsx("p", { className: "text-xs text-muted-foreground", children: new Date(report.updatedAt).toLocaleDateString() })] }), _jsxs("div", { className: "text-xs bg-secondary text-secondary-foreground rounded-full px-2 py-1", children: [report.elements.length, " elements"] })] }), report.description && (_jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: report.description }))] }) }, report.id))) })) })] })] }));
}
