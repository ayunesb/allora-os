import React, { useState } from "react";
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
        dataSource: "leads"
    });
    // Mock data sources for demonstration
    const dataSources = [
        { id: "leads", name: "Leads" },
        { id: "campaigns", name: "Campaigns" },
        { id: "communications", name: "Communications" },
        { id: "website_visits", name: "Website Visits" },
        { id: "aibots_usage", name: "AI Bots Usage" }
    ];
    const chartTypes = [
        { id: "line", name: "Line Chart" },
        { id: "bar", name: "Bar Chart" },
        { id: "pie", name: "Pie Chart" },
        { id: "area", name: "Area Chart" },
        { id: "funnel", name: "Funnel Analysis" },
        { id: "heatmap", name: "Heatmap" },
        { id: "treemap", name: "Treemap" },
        { id: "bubble", name: "Bubble Chart" }
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
                        { name: "Clients", value: 200 }
                    ];
                }
                else if (chartType === "heatmap") {
                    return Array.from({ length: 100 }, (_, i) => ({
                        name: `Cell ${i}`,
                        value: Math.floor(Math.random() * 100)
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
                        { name: "Lost", value: 40 }
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
                                name: "Lead"
                            }))
                        }
                    ];
                }
                else {
                    return Array.from({ length: 12 }, (_, i) => ({
                        name: `Month ${i + 1}`,
                        value: Math.floor(Math.random() * 100),
                        value2: Math.floor(Math.random() * 80)
                    }));
                }
            case "campaigns":
                return Array.from({ length: 8 }, (_, i) => ({
                    name: `Campaign ${i + 1}`,
                    value: Math.floor(Math.random() * 100),
                    value2: Math.floor(Math.random() * 80)
                }));
            case "communications":
                return Array.from({ length: 6 }, (_, i) => ({
                    name: `Channel ${i + 1}`,
                    value: Math.floor(Math.random() * 100),
                    value2: Math.floor(Math.random() * 80)
                }));
            default:
                return Array.from({ length: 10 }, (_, i) => ({
                    name: `Item ${i + 1}`,
                    value: Math.floor(Math.random() * 100),
                    value2: Math.floor(Math.random() * 80)
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
            config: newElement.config || {}
        };
        setReportElements([...reportElements, element]);
        setIsAddElementOpen(false);
        setNewElement({
            type: "basic",
            chartType: "line",
            dataSource: "leads"
        });
        toast.success("Report element added");
    };
    const handleRemoveElement = (id) => {
        setReportElements(reportElements.filter(element => element.id !== id));
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
            id: selectedReport?.id || `report-${Date.now()}`,
            name: reportName,
            description: reportDescription,
            elements: reportElements,
            createdAt: selectedReport?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        if (selectedReport) {
            // Update existing report
            setSavedReports(savedReports.map(report => report.id === selectedReport.id ? newReport : report));
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
        const data = getDemoData(element.dataSource, element.chartType);
        // Advanced visualization types
        if (["heatmap", "treemap", "funnel", "bubble"].includes(element.chartType)) {
            return (<EnhancedVisualization type={element.chartType} data={data} title={element.title} config={element.config}/>);
        }
        // Basic chart types
        return (<AnalyticsChart title={element.title} description={`Data source: ${dataSources.find(ds => ds.id === element.dataSource)?.name}`} chartType={element.chartType} data={data} dataKeys={["value", "value2"]} colors={["#8884d8", "#82ca9d"]} xAxisDataKey="name"/>);
    };
    return (<div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Custom Reports</h2>
          <p className="text-muted-foreground">
            Build, save, and analyze custom reports for your business
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleNewReport}>
            <PlusCircle className="mr-2 h-4 w-4"/>
            New Report
          </Button>
          <Button onClick={handleSaveReport}>
            <Save className="mr-2 h-4 w-4"/>
            Save Report
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="builder">Report Builder</TabsTrigger>
          <TabsTrigger value="saved">Saved Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="reportName">Report Name</Label>
                    <Input id="reportName" value={reportName} onChange={(e) => setReportName(e.target.value)} placeholder="Enter report name"/>
                  </div>
                  <div>
                    <Label htmlFor="reportDescription">Description (Optional)</Label>
                    <Input id="reportDescription" value={reportDescription} onChange={(e) => setReportDescription(e.target.value)} placeholder="Enter report description"/>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <Button variant="outline" onClick={() => toast.success("Report exported as PDF")}>
                    <Download className="mr-2 h-4 w-4"/>
                    Export Report
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Report Elements</h3>
            <Dialog open={isAddElementOpen} onOpenChange={setIsAddElementOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4"/>
                  Add Element
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Report Element</DialogTitle>
                  <DialogDescription>
                    Configure a new visualization element for your report
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="elementTitle">Element Title</Label>
                    <Input id="elementTitle" value={newElement.title || ""} onChange={(e) => setNewElement({ ...newElement, title: e.target.value })} placeholder="Enter element title"/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dataSource">Data Source</Label>
                    <Select value={newElement.dataSource} onValueChange={(value) => setNewElement({ ...newElement, dataSource: value })}>
                      <SelectTrigger id="dataSource">
                        <SelectValue placeholder="Select data source"/>
                      </SelectTrigger>
                      <SelectContent>
                        {dataSources.map((source) => (<SelectItem key={source.id} value={source.id}>
                            {source.name}
                          </SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chartType">Visualization Type</Label>
                    <Select value={newElement.chartType} onValueChange={(value) => setNewElement({ ...newElement, chartType: value })}>
                      <SelectTrigger id="chartType">
                        <SelectValue placeholder="Select chart type"/>
                      </SelectTrigger>
                      <SelectContent>
                        {chartTypes.map((chart) => (<SelectItem key={chart.id} value={chart.id}>
                            {chart.name}
                          </SelectItem>))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddElementOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddElement}>
                    Add Element
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {reportElements.length === 0 ? (<div className="border border-dashed rounded-md p-8 text-center bg-background text-muted-foreground">
              <Layout className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50"/>
              <h3 className="text-lg font-medium mb-1">No elements added yet</h3>
              <p className="mb-4">Add visualization elements to create your custom report</p>
              <Button variant="secondary" onClick={() => setIsAddElementOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4"/>
                Add Your First Element
              </Button>
            </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reportElements.map((element) => (<div key={element.id} className="relative group">
                  {renderReportElement(element)}
                  <Button className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity" size="icon" variant="destructive" onClick={() => handleRemoveElement(element.id)}>
                    <Trash className="h-4 w-4"/>
                  </Button>
                </div>))}
            </div>)}
        </TabsContent>

        <TabsContent value="saved" className="space-y-6">
          {savedReports.length === 0 ? (<div className="border border-dashed rounded-md p-8 text-center bg-background text-muted-foreground">
              <Save className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50"/>
              <h3 className="text-lg font-medium mb-1">No saved reports</h3>
              <p className="mb-4">Build and save your custom reports for quick access</p>
              <Button variant="secondary" onClick={handleNewReport}>
                <PlusCircle className="mr-2 h-4 w-4"/>
                Create Your First Report
              </Button>
            </div>) : (<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {savedReports.map((report) => (<Card key={report.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
                  <CardContent className="p-4" onClick={() => handleLoadReport(report)}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium truncate">{report.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {new Date(report.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-xs bg-secondary text-secondary-foreground rounded-full px-2 py-1">
                        {report.elements.length} elements
                      </div>
                    </div>
                    {report.description && (<p className="text-sm text-muted-foreground line-clamp-2">
                        {report.description}
                      </p>)}
                  </CardContent>
                </Card>))}
            </div>)}
        </TabsContent>
      </Tabs>
    </div>);
}
