
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, Building2, BarChart3, UserPlus, LineChart, Settings, Activity, Loader2 } from "lucide-react";
import { getSystemAnalytics } from "@/backend/analyticsService";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";

export default function AdminIndex() {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    users: 0,
    companies: 0,
    campaigns: 0,
    leads: 0
  });
  const [metrics, setMetrics] = useState({
    revenue: 0,
    activeUsers: 0,
    conversionRate: 0,
    avgSession: 0,
    revenueChange: 0,
    userChange: 0,
    conversionChange: 0,
    sessionChange: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch counts from database
        const [usersData, companiesData, campaignsData, leadsData] = await Promise.all([
          supabase.from('profiles').select('id', { count: 'exact' }),
          supabase.from('companies').select('id', { count: 'exact' }),
          supabase.from('campaigns').select('id', { count: 'exact' }),
          supabase.from('leads').select('id', { count: 'exact' })
        ]);

        // Fetch system analytics for performance metrics
        const systemAnalytics = await getSystemAnalytics();
        
        // Get subscription data for revenue calculation (simplified version)
        const { data: subscriptions } = await supabase
          .from('profiles')
          .select('subscription_plan_id')
          .not('subscription_plan_id', 'is', null);
          
        // Calculate estimated revenue (simplified)
        const planPrices = { 
          'basic': 49.99, 
          'pro': 99.99, 
          'enterprise': 299.99,
          'free': 0
        };
        
        const revenue = subscriptions?.reduce((total, sub) => {
          const plan = sub.subscription_plan_id as keyof typeof planPrices || 'free';
          return total + (planPrices[plan] || 0);
        }, 0) || 0;
        
        // Set the counts
        setCounts({
          users: usersData.count || 0,
          companies: companiesData.count || 0,
          campaigns: campaignsData.count || 0,
          leads: leadsData.count || 0
        });
        
        // Set the metrics
        setMetrics({
          revenue: revenue * 12, // Annual revenue estimate
          activeUsers: systemAnalytics.activeSubscriptions,
          conversionRate: systemAnalytics.errorRate * 100, // Using error rate for demo
          avgSession: systemAnalytics.averageResponseTime / 1000, // Convert ms to seconds
          revenueChange: 12.5, // Example change percentage
          userChange: 8.2,
          conversionChange: -1.3,
          sessionChange: 22.4
        });
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatRevenue = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatSessionTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  const adminModules = [
    {
      title: "Users",
      count: counts.users.toString(),
      icon: <Users className="h-8 w-8 text-primary" />,
      description: "Active user accounts",
      href: "/admin/users",
    },
    {
      title: "Companies",
      count: counts.companies.toString(),
      icon: <Building2 className="h-8 w-8 text-primary" />,
      description: "Registered companies",
      href: "/admin/companies",
    },
    {
      title: "Campaigns",
      count: counts.campaigns.toString(),
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      description: "Active marketing campaigns",
      href: "/admin/campaigns",
    },
    {
      title: "Leads",
      count: counts.leads.toString(),
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
    { 
      name: "Total Revenue", 
      value: formatRevenue(metrics.revenue), 
      change: `+${metrics.revenueChange}%`, 
      up: true 
    },
    { 
      name: "Active Users", 
      value: metrics.activeUsers.toString(), 
      change: `+${metrics.userChange}%`, 
      up: true 
    },
    { 
      name: "Conversion Rate", 
      value: `${metrics.conversionRate.toFixed(1)}%`, 
      change: `${metrics.conversionChange}%`, 
      up: metrics.conversionChange > 0 
    },
    { 
      name: "Avg. Session", 
      value: formatSessionTime(metrics.avgSession), 
      change: `+${metrics.sessionChange}%`, 
      up: true 
    },
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
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading dashboard data...</span>
        </div>
      ) : (
        <>
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
      )}
    </>
  );
}
