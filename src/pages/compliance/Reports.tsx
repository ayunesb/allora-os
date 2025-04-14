
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportsList } from '@/components/compliance/reports/ReportsList';
import { CertificationsList } from '@/components/compliance/reports/CertificationsList';
import { DocumentVersionTracker } from '@/components/compliance/reports/DocumentVersionTracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Reports() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Compliance Reports</CardTitle>
          <CardDescription>View and generate compliance reports and certifications</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="reports" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="reports">Compliance Reports</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="documents">Document History</TabsTrigger>
            </TabsList>
            <TabsContent value="reports">
              <ReportsList />
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
