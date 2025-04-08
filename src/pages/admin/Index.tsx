
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, Building2, BarChart3, UserPlus, LineChart, Settings, Activity } from "lucide-react";

export default function AdminIndex() {
  const adminModules = [
    {
      title: "Users",
      count: "523",
      icon: <Users className="h-8 w-8 text-primary" />,
      description: "Active user accounts",
      href: "/admin/users",
    },
    {
      title: "Companies",
      count: "84",
      icon: <Building2 className="h-8 w-8 text-primary" />,
      description: "Registered companies",
      href: "/admin/companies",
    },
    {
      title: "Campaigns",
      count: "156",
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      description: "Active marketing campaigns",
      href: "/admin/campaigns",
    },
    {
      title: "Leads",
      count: "2,847",
      icon: <UserPlus className="h-8 w-8 text-primary" />,
      description: "Generated sales leads",
      href: "/admin/leads",
    },
    {
      title: "Analytics",
      icon: <LineChart className="h-8 w-8 text-primary" />,
      description: "System performance metrics",
      href: "/admin/analytics",
    },
    {
      title: "Settings",
      icon: <Settings className="h-8 w-8 text-primary" />,
      description: "System configuration",
      href: "/admin/settings",
    },
  ];

  // Platform statistics
  const stats = [
    { name: "Total Revenue", value: "$528,943.45", change: "+12.5%", up: true },
    { name: "Active Users", value: "3,254", change: "+8.2%", up: true },
    { name: "Conversion Rate", value: "5.6%", change: "-1.3%", up: false },
    { name: "Avg. Session", value: "4m 32s", change: "+22.4%", up: true },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Overview of platform metrics and management tools
        </p>
      </div>
      
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <Card key={i} className="border-primary/10 shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <span className={`flex items-center px-2 py-1 rounded text-xs ${
                  stat.up ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                }`}>
                  <Activity className="h-3 w-3 mr-1" />
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Admin modules grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminModules.map((module, index) => (
          <Link to={module.href} key={index}>
            <Card className="border-primary/10 shadow-md hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-full bg-primary/10">
                    {module.icon}
                  </div>
                  {module.count && (
                    <span className="text-lg font-bold">{module.count}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl mb-2">{module.title}</CardTitle>
                <p className="text-muted-foreground">{module.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
