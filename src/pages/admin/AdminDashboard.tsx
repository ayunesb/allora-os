
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminModuleGrid } from "@/components/admin/dashboard/AdminModuleGrid";
import { AdminHeader } from "@/components/admin/dashboard/AdminHeader";
import { StatsRow } from "@/components/admin/dashboard/StatsRow";
import { StatItem } from "@/components/admin/dashboard/StatsRow";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useProductionData } from "@/hooks/useProductionData";

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isProductionReady } = useProductionData();

  useEffect(() => {
    const fetchRealData = async () => {
      setIsLoading(true);
      try {
        // Get real user count
        const { count: userCount, error: userError } = await supabase
          .from('profiles')
          .select('id', { count: 'exact' });
        
        if (userError) throw userError;

        // Get real company count
        const { count: companyCount, error: companyError } = await supabase
          .from('companies')
          .select('id', { count: 'exact', head: false });
        
        if (companyError) throw companyError;

        // Get subscription data for revenue calculation
        const { data: subscriptions, error: subError } = await supabase
          .from('profiles')
          .select('subscription_plan_id, subscription_status')
          .not('subscription_plan_id', 'is', null)
          .eq('subscription_status', 'active');
          
        if (subError) throw subError;
        
        // Calculate revenue based on subscription plans
        const planPrices = { 
          'basic': 49.99, 
          'pro': 99.99, 
          'enterprise': 299.99,
          'free': 0
        };
        
        let revenue = 0;
        if (subscriptions) {
          revenue = subscriptions.reduce((total, sub) => {
            const plan = sub.subscription_plan_id as keyof typeof planPrices || 'free';
            return total + (planPrices[plan] || 0);
          }, 0);
        }
        
        // Get leads data for conversion calculation
        const { data: leads, error: leadsError } = await supabase
          .from('leads')
          .select('status');
          
        if (leadsError) throw leadsError;
        
        // Calculate conversion rate
        const convertedLeads = leads?.filter(lead => 
          lead.status === 'converted' || lead.status === 'customer'
        ).length || 0;
        
        const totalLeads = leads?.length || 1; // Avoid division by zero
        const conversionRate = (convertedLeads / totalLeads) * 100;
        
        // Get historical data for changes (simplified for now)
        // In a real app, you would compare with previous period data
        setStats([
          { 
            name: "Total Users", 
            value: userCount?.toString() || "0", 
            change: "+5.2%", 
            up: true 
          },
          { 
            name: "Active Companies", 
            value: companyCount?.toString() || "0", 
            change: "+3.8%", 
            up: true 
          },
          { 
            name: "Monthly Revenue", 
            value: `$${revenue.toFixed(2)}`, 
            change: "+7.4%", 
            up: true 
          },
          { 
            name: "Conversion Rate", 
            value: `${conversionRate.toFixed(1)}%`, 
            change: conversionRate > 2.5 ? "+1.2%" : "-0.5%", 
            up: conversionRate > 2.5
          }
        ]);
      } catch (error) {
        console.error("Error fetching admin dashboard data:", error);
        toast.error("Failed to load dashboard data");
        
        // Fallback to empty values rather than fake data
        setStats([
          { name: "Total Users", value: "0", change: "0%", up: false },
          { name: "Active Companies", value: "0", change: "0%", up: false },
          { name: "Monthly Revenue", value: "$0", change: "0%", up: false },
          { name: "Conversion Rate", value: "0%", change: "0%", up: false }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRealData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading dashboard data...</p>
      </div>
    );
  }

  if (!isProductionReady) {
    return (
      <div className="space-y-6">
        <AdminHeader />
        
        <Card className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
          <CardHeader>
            <CardTitle className="text-amber-700 dark:text-amber-400">Production Data Not Ready</CardTitle>
            <CardDescription className="text-amber-600 dark:text-amber-500">
              Your database contains test or demo data that needs to be cleaned up before going to production.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-amber-600 dark:text-amber-500">
              Please run the Production Data Validation in the Development Admin Helper page to identify and fix data issues.
            </p>
          </CardContent>
        </Card>
        
        <StatsRow stats={stats} isLoading={isLoading} />
        
        <Card>
          <CardHeader>
            <CardTitle>Admin Modules</CardTitle>
            <CardDescription>
              Access various administrative tools and settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AdminModuleGrid />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminHeader />
      <StatsRow stats={stats} isLoading={isLoading} />
      
      <Card>
        <CardHeader>
          <CardTitle>Admin Modules</CardTitle>
          <CardDescription>
            Access various administrative tools and settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminModuleGrid />
        </CardContent>
      </Card>
    </div>
  );
}
