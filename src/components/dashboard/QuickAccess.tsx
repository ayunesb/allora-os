
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, LineChart, Briefcase, Phone, BarChart, PieChart, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuickAccess = () => {
  const navigate = useNavigate();

  const links = [
    {
      title: "Executives",
      description: "Manage your AI executive team",
      icon: <Users className="h-5 w-5" />,
      path: "/dashboard/executives",
    },
    {
      title: "Leads",
      description: "View and manage your leads",
      icon: <Users className="h-5 w-5" />,
      path: "/dashboard/leads",
    },
    {
      title: "Campaigns",
      description: "Create and manage campaigns",
      icon: <Briefcase className="h-5 w-5" />,
      path: "/dashboard/campaigns",
    },
    {
      title: "Analytics",
      description: "View analytics and insights",
      icon: <BarChart3 className="h-5 w-5" />,
      path: "/dashboard/analytics",
    },
    {
      title: "Strategies",
      description: "Browse and implement strategies",
      icon: <LineChart className="h-5 w-5" />,
      path: "/dashboard/strategies",
    },
    {
      title: "Calls",
      description: "Schedule and manage calls",
      icon: <Phone className="h-5 w-5" />,
      path: "/dashboard/calls",
    },
    {
      title: "Risk Analysis",
      description: "Risk assessment heatmap",
      icon: <PieChart className="h-5 w-5" />,
      path: "/dashboard/risk-heatmap",
    },
    {
      title: "Forecasting",
      description: "KPI predictions & anomaly detection",
      icon: <TrendingUp className="h-5 w-5" />,
      path: "/dashboard/forecast",
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Access</CardTitle>
        <CardDescription>
          Access key features and tools
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {links.map((link) => (
            <div
              key={link.title}
              className="p-4 flex flex-col items-center justify-center rounded-lg border bg-card text-card-foreground shadow hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              onClick={() => handleNavigate(link.path)}
            >
              <div className="mb-2 rounded-full p-2 bg-primary/10">
                {link.icon}
              </div>
              <div className="text-sm font-medium text-center">{link.title}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccess;
