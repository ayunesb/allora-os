
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
import { useCompliance } from "@/context/ComplianceContext";

export default function ComplianceReports() {
  const [activeTab, setActiveTab] = useState("reports");
  const { 
    applyAllUpdates, 
    pendingUpdates, 
    isApplyingUpdate 
  } = useCompliance();

  const handleUpdateAll = () => {
    applyAllUpdates();
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
              disabled={isApplyingUpdate || pendingUpdates.length === 0}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isApplyingUpdate ? "animate-spin" : ""}`} />
              {isApplyingUpdate ? "Updating..." : "Update All Documents"}
              {pendingUpdates.length > 0 && !isApplyingUpdate && (
                <span className="ml-1 text-xs bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {pendingUpdates.length}
                </span>
              )}
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
