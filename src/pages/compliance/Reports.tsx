
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Calendar, CheckCircle2 } from "lucide-react";
import ComplianceLayout from "@/components/ComplianceLayout";

// Mock report data
const complianceReports = [
  {
    id: "1",
    title: "GDPR Compliance Audit",
    date: "2025-03-15",
    status: "completed",
    type: "quarterly"
  },
  {
    id: "2",
    title: "Data Security Assessment",
    date: "2025-02-28",
    status: "completed",
    type: "quarterly"
  },
  {
    id: "3",
    title: "PCI DSS Compliance Check",
    date: "2025-01-20",
    status: "completed",
    type: "quarterly"
  },
  {
    id: "4",
    title: "CCPA Implementation Review",
    date: "2024-12-10",
    status: "completed",
    type: "annual"
  },
  {
    id: "5",
    title: "Annual Security Review",
    date: "2024-11-30",
    status: "completed",
    type: "annual"
  },
  {
    id: "6",
    title: "SOC 2 Type II Audit",
    date: "2024-10-15",
    status: "completed",
    type: "annual"
  },
  {
    id: "7",
    title: "GDPR Compliance Audit",
    date: "2025-06-30",
    status: "scheduled",
    type: "upcoming"
  },
  {
    id: "8",
    title: "Q2 Security Assessment",
    date: "2025-05-15",
    status: "scheduled",
    type: "upcoming"
  }
];

export default function ComplianceReports() {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredReports = activeTab === "all" 
    ? complianceReports 
    : complianceReports.filter(report => report.type === activeTab);
  
  return (
    <ComplianceLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-bold">Compliance Reports</h2>
            <p className="text-muted-foreground">
              Review and download compliance reports and certifications
            </p>
          </div>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate New Report
          </Button>
        </div>
        
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
            <TabsTrigger value="annual">Annual</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReports.map((report) => (
                <Card key={report.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      {report.status === "completed" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <Calendar className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <CardDescription className="flex items-center">
                      {new Date(report.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-sm font-medium">Status: </span>
                        <span className={`text-sm ${
                          report.status === "completed" 
                            ? "text-green-500" 
                            : "text-blue-500"
                        }`}>
                          {report.status === "completed" ? "Completed" : "Scheduled"}
                        </span>
                      </div>
                      
                      {report.status === "completed" ? (
                        <Button size="sm" variant="outline">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" disabled>
                          Pending
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
            <CardDescription>
              Current compliance certifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="border rounded-md p-4 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <img 
                    src="https://placeholder.svg" 
                    alt="GDPR Certification" 
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="font-medium">GDPR Compliance</h3>
                <p className="text-sm text-muted-foreground mb-2">Valid until Dec 2025</p>
                <Button size="sm" variant="ghost">View Certificate</Button>
              </div>
              
              <div className="border rounded-md p-4 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <img 
                    src="https://placeholder.svg" 
                    alt="SOC 2 Certification" 
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="font-medium">SOC 2 Type II</h3>
                <p className="text-sm text-muted-foreground mb-2">Valid until Oct 2025</p>
                <Button size="sm" variant="ghost">View Certificate</Button>
              </div>
              
              <div className="border rounded-md p-4 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <img 
                    src="https://placeholder.svg" 
                    alt="ISO 27001 Certification" 
                    className="w-12 h-12"
                  />
                </div>
                <h3 className="font-medium">ISO 27001</h3>
                <p className="text-sm text-muted-foreground mb-2">Valid until Aug 2025</p>
                <Button size="sm" variant="ghost">View Certificate</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ComplianceLayout>
  );
}
