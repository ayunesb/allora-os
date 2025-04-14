
import React from 'react';
import Navbar from "@/components/Navbar"; // Changed from { Navbar } to default import
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";
import { Shield } from "lucide-react";

interface ComplianceLayoutProps {
  children: React.ReactNode;
}

export default function ComplianceLayout({ children }: ComplianceLayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-16">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold">Compliance Center</h1>
          </div>
          <p className="text-muted-foreground">
            Manage regulatory compliance, data handling, and audit records
          </p>
        </div>
        
        <Tabs value={currentPath} className="mb-8">
          <TabsList>
            <TabsTrigger value="/compliance" asChild>
              <Link to="/compliance">Overview</Link>
            </TabsTrigger>
            <TabsTrigger value="/compliance/data-policies" asChild>
              <Link to="/compliance/data-policies">Data Policies</Link>
            </TabsTrigger>
            <TabsTrigger value="/compliance/audit-logs" asChild>
              <Link to="/compliance/audit-logs">Audit Logs</Link>
            </TabsTrigger>
            <TabsTrigger value="/compliance/reports" asChild>
              <Link to="/compliance/reports">Compliance Reports</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}
