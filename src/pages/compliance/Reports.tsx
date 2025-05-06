import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportsList from "@/components/compliance/reports/ReportsList";
import CertificationsList from "@/components/compliance/reports/CertificationsList";
import DocumentVersionTracker from "@/components/compliance/reports/DocumentVersionTracker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Compliance Reports</CardTitle>
          <CardDescription>
            View and generate compliance reports and certifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="reports" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="reports">Compliance Reports</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="documents">Document History</TabsTrigger>
            </TabsList>
            <TabsContent value="reports">
              <ReportsList reports={mockReports} />
            </TabsContent>
            <TabsContent value="certifications">
              <CertificationsList />
            </TabsContent>
            <TabsContent value="documents">
              <DocumentVersionTracker />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
