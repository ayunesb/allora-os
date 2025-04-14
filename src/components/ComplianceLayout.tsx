
import React from 'react';
import Navbar from "@/components/Navbar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";
import { Shield, AlertCircle } from "lucide-react";
import { ErrorBoundary } from "@/components/ErrorBoundary";

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
        <ErrorBoundary fallback={
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-4">
              There was an error loading this compliance section
            </p>
            <Link 
              to="/dashboard" 
              className="text-primary hover:underline"
            >
              Return to Dashboard
            </Link>
          </div>
        }>
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
              <TabsTrigger value="/compliance/overview" asChild>
                <Link to="/compliance/overview">Overview</Link>
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
        </ErrorBoundary>
      </div>
    </div>
  );
}
