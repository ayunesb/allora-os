
import React from 'react';
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";

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
          <h1 className="text-3xl font-bold mb-2">Compliance Center</h1>
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
