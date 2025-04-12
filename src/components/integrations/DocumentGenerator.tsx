
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText, 
  FileSpreadsheet, 
  FilePieChart, 
  FileCheck, 
  Download, 
  ArrowRight, 
  Loader2, 
  Plus, 
  Settings 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DocumentTemplate {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  type: string;
}

export function DocumentGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentTemplate | null>(null);
  const [selectedTab, setSelectedTab] = useState('templates');
  const [docName, setDocName] = useState('');
  const [docDetails, setDocDetails] = useState('');
  const [docType, setDocType] = useState('proposal');

  const documentTemplates: DocumentTemplate[] = [
    {
      id: "business-proposal",
      title: "Business Proposal",
      description: "Generate a comprehensive business proposal based on your company data and AI insights",
      icon: <FileText className="h-12 w-12 text-blue-500" />,
      type: "proposal"
    },
    {
      id: "quarterly-report",
      title: "Quarterly Report",
      description: "Create a quarterly performance report with key metrics and growth analysis",
      icon: <FileSpreadsheet className="h-12 w-12 text-green-500" />,
      type: "report"
    },
    {
      id: "market-analysis",
      title: "Market Analysis",
      description: "Generate a detailed market analysis with competitive insights",
      icon: <FilePieChart className="h-12 w-12 text-purple-500" />,
      type: "analysis"
    },
    {
      id: "executive-summary",
      title: "Executive Summary",
      description: "Create a concise executive summary of your business strategy",
      icon: <FileCheck className="h-12 w-12 text-orange-500" />,
      type: "summary"
    }
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

  const handleOpenTemplate = (template: DocumentTemplate) => {
    setSelectedDocument(template);
    setDocName(`${template.title} - ${new Date().toLocaleDateString()}`);
    setDocType(template.type);
  };

  const recentDocuments = [
    { 
      name: "Q2 Marketing Proposal", 
      date: "2025-04-08", 
      type: "proposal",
      icon: <FileText className="h-5 w-5 text-blue-500" />
    },
    { 
      name: "Meta Ads Market Analysis", 
      date: "2025-04-05", 
      type: "analysis",
      icon: <FilePieChart className="h-5 w-5 text-purple-500" />
    },
    { 
      name: "Q1 Performance Report", 
      date: "2025-03-28", 
      type: "report",
      icon: <FileSpreadsheet className="h-5 w-5 text-green-500" />
    }
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold">Document Generation</h2>
          <p className="text-muted-foreground">
            Create professional business documents powered by AI insights
          </p>
        </div>
        <Button onClick={() => setSelectedTab('custom')}>
          <Plus className="mr-2 h-4 w-4" />
          New Document
        </Button>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="recent">Recent Documents</TabsTrigger>
          <TabsTrigger value="custom">Custom Document</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documentTemplates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleOpenTemplate(template)}>
                <CardHeader className="flex flex-row items-center gap-4">
                  {template.icon}
                  <div>
                    <CardTitle>{template.title}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button variant="ghost" className="ml-auto">
                    Use Template <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Generated Documents</CardTitle>
              <CardDescription>
                Access your recently created documents and reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                    <div className="flex items-center">
                      {doc.icon}
                      <div className="ml-3">
                        <h4 className="text-sm font-medium">{doc.name}</h4>
                        <p className="text-xs text-muted-foreground">Created: {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Custom Document</CardTitle>
              <CardDescription>
                Create a new document with your specific requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doc-name">Document Name</Label>
                <Input
                  id="doc-name"
                  placeholder="Enter document name"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="doc-type">Document Type</Label>
                <Select value={docType} onValueChange={setDocType}>
                  <SelectTrigger id="doc-type">
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proposal">Business Proposal</SelectItem>
                    <SelectItem value="report">Business Report</SelectItem>
                    <SelectItem value="analysis">Market Analysis</SelectItem>
                    <SelectItem value="summary">Executive Summary</SelectItem>
                    <SelectItem value="plan">Action Plan</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="doc-details">Additional Details</Label>
                <Textarea
                  id="doc-details"
                  placeholder="Enter any specific information you'd like to include in this document"
                  rows={4}
                  value={docDetails}
                  onChange={(e) => setDocDetails(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setSelectedTab('templates')}>
                Cancel
              </Button>
              <Button onClick={handleGenerateDocument} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Document
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Document Template Dialog */}
      <Dialog open={!!selectedDocument} onOpenChange={(open) => !open && setSelectedDocument(null)}>
        <DialogContent className="sm:max-w-[540px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              {selectedDocument?.icon}
              <span className="ml-3">{selectedDocument?.title}</span>
            </DialogTitle>
            <DialogDescription>
              {selectedDocument?.description}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Document Name</Label>
              <Input
                id="template-name"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="template-details">Additional Details</Label>
              <Textarea
                id="template-details"
                placeholder="Enter any specific information you'd like to include"
                rows={3}
                value={docDetails}
                onChange={(e) => setDocDetails(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedDocument(null)}>
              Cancel
            </Button>
            <Button onClick={handleGenerateDocument} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Document
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
