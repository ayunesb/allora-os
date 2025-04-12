
import React, { useState, useEffect } from 'react';
import { Loader2, Users, Building2, BarChart3, UserPlus, LineChart, Settings } from "lucide-react";
import { getSystemAnalytics } from "@/backend/analyticsService";
import { supabase } from "@/backend/supabase";
import { toast } from "sonner";
import { AdminHeader } from '@/components/admin/dashboard/AdminHeader';
import { StatsRow } from '@/components/admin/dashboard/StatsRow';
import { AdminModuleGrid, AdminModule } from '@/components/admin/dashboard/AdminModuleGrid';
import { formatRevenue, formatSessionTime } from '@/utils/admin/formatters';
import { StatItem } from '@/components/admin/dashboard/StatsRow';
import { useBreakpoint } from '@/hooks/use-mobile';

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
  
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);

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

  // Platform statistics
  const stats: StatItem[] = [
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

  // Admin modules config with responsive icon sizes
  const iconSize = isMobileView ? 16 : 20;
  
  const adminModules: AdminModule[] = [
    {
      title: "Users",
      count: counts.users.toString(),
      icon: <Users className={`h-${isMobileView ? 4 : 5} w-${isMobileView ? 4 : 5} text-primary`} />,
      description: "Active user accounts",
      href: "/admin/users",
    },
    {
      title: "Companies",
      count: counts.companies.toString(),
      icon: <Building2 className={`h-${isMobileView ? 4 : 5} w-${isMobileView ? 4 : 5} text-primary`} />,
      description: "Registered companies",
      href: "/admin/companies",
    },
    {
      title: "Campaigns",
      count: counts.campaigns.toString(),
      icon: <BarChart3 className={`h-${isMobileView ? 4 : 5} w-${isMobileView ? 4 : 5} text-primary`} />,
      description: "Active marketing campaigns",
      href: "/admin/campaigns",
    },
    {
      title: "Leads",
      count: counts.leads.toString(),
      icon: <UserPlus className={`h-${isMobileView ? 4 : 5} w-${isMobileView ? 4 : 5} text-primary`} />,
      description: "Generated sales leads",
      href: "/admin/leads",
    },
    {
      title: "Analytics",
      icon: <LineChart className={`h-${isMobileView ? 4 : 5} w-${isMobileView ? 4 : 5} text-primary`} />,
      description: "System performance metrics",
      href: "/admin/analytics",
    },
    {
      title: "Settings",
      icon: <Settings className={`h-${isMobileView ? 4 : 5} w-${isMobileView ? 4 : 5} text-primary`} />,
      description: "System configuration",
      href: "/admin/settings",
    },
  ];

  return (
    <div className={isMobileView ? "animate-fadeIn" : "container mx-auto animate-fadeIn"}>
      <AdminHeader />
      
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
          <Loader2 className={`h-${isMobileView ? 5 : 6} w-${isMobileView ? 5 : 6} animate-spin text-primary`} />
          <span className="ml-2 text-sm">Loading dashboard data...</span>
        </div>
      ) : (
        <>
          <StatsRow stats={stats} isLoading={loading} />
          <AdminModuleGrid modules={adminModules} isLoading={loading} />
        </>
      )}
    </div>
  );
}
