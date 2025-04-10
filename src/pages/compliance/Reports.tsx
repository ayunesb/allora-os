
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, History, Shield, RefreshCw } from "lucide-react";
import ComplianceLayout from "@/components/ComplianceLayout";
import ReportsList from "@/components/compliance/reports/ReportsList";
import CertificationsList from "@/components/compliance/reports/CertificationsList";
import DocumentVersionTracker from "@/components/compliance/reports/DocumentVersionTracker";
import { complianceReports } from "@/components/compliance/reports/mockData";
import { useState } from "react";
import { toast } from "sonner";

export default function ComplianceReports() {
  const [activeTab, setActiveTab] = useState("reports");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateAll = () => {
    setIsUpdating(true);
    
    // Simulate update process
    setTimeout(() => {
      setIsUpdating(false);
      toast.success("All documents updated", {
        description: "Legal documents are now up-to-date with the latest regulations."
      });
    }, 2000);
  };

  return (
    <ComplianceLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold">Compliance Reports</h2>
            <p className="text-muted-foreground">
              Review and download compliance reports, certifications, and manage legal documents
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={handleUpdateAll}
              disabled={isUpdating}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isUpdating ? "animate-spin" : ""}`} />
              {isUpdating ? "Updating..." : "Update All Documents"}
            </Button>
            <Button>
              <FileText className="mr-2 h-4 w-4" />
              Generate New Report
            </Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="reports">
              <FileText className="h-4 w-4 mr-2" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="certifications">
              <Shield className="h-4 w-4 mr-2" />
              Certifications
            </TabsTrigger>
            <TabsTrigger value="documents">
              <History className="h-4 w-4 mr-2" />
              Document Versions
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="reports" className="space-y-4">
            <ReportsList reports={complianceReports} />
          </TabsContent>
          
          <TabsContent value="certifications" className="space-y-4">
            <CertificationsList />
          </TabsContent>
          
          <TabsContent value="documents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Legal Document Versioning</CardTitle>
                <CardDescription>
                  Track and manage the versioning of legal and compliance documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentVersionTracker />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ComplianceLayout>
  );
}
