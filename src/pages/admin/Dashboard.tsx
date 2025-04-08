
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, BarChart3, Phone, Settings } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const adminModules = [
    {
      title: "Manage Users",
      icon: <Users className="h-8 w-8 text-primary" />,
      description: "Review and manage user accounts",
      href: "/admin/users",
    },
    {
      title: "Manage Campaigns",
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      description: "Monitor all marketing campaigns",
      href: "/admin/campaigns",
    },
    {
      title: "Manage Leads",
      icon: <Phone className="h-8 w-8 text-primary" />,
      description: "Track and assign sales leads",
      href: "/admin/leads",
    },
    {
      title: "System Settings",
      icon: <Settings className="h-8 w-8 text-primary" />,
      description: "Configure system preferences",
      href: "/admin/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isLoggedIn={true} />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage all aspects of your Allora AI platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminModules.map((module, index) => (
            <Card key={index} className="border-primary/10 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    {module.icon}
                  </div>
                  <CardTitle>{module.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{module.description}</p>
                <Button asChild>
                  <Link to={module.href}>Access {module.title}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
