import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PolicyDocuments from '@/components/compliance/data-policies/PolicyDocuments';
import PolicyToggles from '@/components/compliance/data-policies/PolicyToggles';
import RegulatoryFrameworks from '@/components/compliance/data-policies/RegulatoryFrameworks';
import ComplianceContact from '@/components/compliance/data-policies/ComplianceContact';
export default function DataPolicies() {
    return (<div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Data Policies</CardTitle>
          <CardDescription>Manage your organization's data handling policies and compliance documents</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="documents" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="documents">Policy Documents</TabsTrigger>
              <TabsTrigger value="settings">Policy Settings</TabsTrigger>
              <TabsTrigger value="frameworks">Regulatory Frameworks</TabsTrigger>
              <TabsTrigger value="contact">Compliance Contact</TabsTrigger>
            </TabsList>
            <TabsContent value="documents">
              <PolicyDocuments />
            </TabsContent>
            <TabsContent value="settings">
              <PolicyToggles />
            </TabsContent>
            <TabsContent value="frameworks">
              <RegulatoryFrameworks />
            </TabsContent>
            <TabsContent value="contact">
              <ComplianceContact />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>);
}
