
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import AdminUsers from "./AdminUsers";
import AdminCompanies from "./AdminCompanies";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { LayoutDashboard } from "lucide-react";

export default function EntitiesPage() {
  const [activeTab, setActiveTab] = useState<string>("users");

  return (
    <PageErrorBoundary pageName="Entities Management">
      <Helmet>
        <title>Entities Management | Allora AI</title>
      </Helmet>
      
      <div className="space-y-6 animate-in fade-in duration-500">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin" className="flex items-center gap-1">
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Admin</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Entities</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="pb-2">
          <h1 className="text-3xl font-bold tracking-tight">Entities Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage users and companies within the Allora AI platform
          </p>
        </div>
        
        <Tabs 
          defaultValue="users" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <AdminUsers />
          </TabsContent>
          
          <TabsContent value="companies" className="space-y-4">
            <AdminCompanies />
          </TabsContent>
        </Tabs>
      </div>
    </PageErrorBoundary>
  );
}
