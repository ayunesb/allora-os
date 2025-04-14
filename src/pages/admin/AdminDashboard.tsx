import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminModuleGrid } from "@/components/admin/dashboard/AdminModuleGrid";
import { AdminHeader } from "@/components/admin/dashboard/AdminHeader";
import { StatsRow } from "@/components/admin/dashboard/StatsRow";
import { StatItem } from "@/components/admin/dashboard/StatsRow";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useProductionData } from "@/hooks/useProductionData";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isProductionReady, validateProductionData } = useProductionData();

  useEffect(() => {
    const fetchRealData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Verify we can connect to the database
        const { data: dbCheck, error: dbError } = await supabase
          .from('companies')
          .select('id')
          .limit(1);
        
        if (dbError) throw new Error(`Database connection error: ${dbError.message}`);
        
        // Get real user count (excluding test users)
        const { count: userCount, error: userError } = await supabase
          .from('profiles')
          .select('id', { count: 'exact' })
          .not('email', 'ilike', '%test%')
          .not('email', 'ilike', '%demo%')
          .not('email', 'ilike', '%example%');
        
        if (userError) throw new Error(`User count error: ${userError.message}`);

        // Get real company count (excluding test companies)
        const { count: companyCount, error: companyError } = await supabase
          .from('companies')
          .select('id', { count: 'exact' })
          .not('name', 'ilike', '%test%')
          .not('name', 'ilike', '%demo%')
          .not('name', 'ilike', '%example%');
        
        if (companyError) throw new Error(`Company count error: ${companyError.message}`);

        // Get subscription data for revenue calculation (only real subscriptions)
        const { data: subscriptions, error: subError } = await supabase
          .from('profiles')
          .select('subscription_plan_id, subscription_status')
          .not('subscription_plan_id', 'is', null)
          .eq('subscription_status', 'active')
          .not('email', 'ilike', '%test%');
          
        if (subError) throw new Error(`Subscription data error: ${subError.message}`);
        
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
        
        // Get leads data for conversion calculation (without using is_demo column)
        const { data: leads, error: leadsError } = await supabase
          .from('leads')
          .select('status');
          
        if (leadsError) throw new Error(`Leads data error: ${leadsError.message}`);
        
        // Calculate conversion rate from real data
        const totalLeads = leads?.length || 1; // Avoid division by zero
        if (totalLeads === 0) {
          // No leads yet
          setStats([
            { name: "Total Users", value: userCount?.toString() || "0", change: "N/A", up: false },
            { name: "Active Companies", value: companyCount?.toString() || "0", change: "N/A", up: false },
            { name: "Monthly Revenue", value: `$${revenue.toFixed(2)}`, change: "N/A", up: false },
            { name: "Conversion Rate", value: "N/A", change: "N/A", up: false }
          ]);
        } else {
          const convertedLeads = leads?.filter(lead => 
            lead.status === 'converted' || lead.status === 'customer' || lead.status === 'closed'
          ).length || 0;
          
          const conversionRate = (convertedLeads / totalLeads) * 100;
          
          // Try to get historical data for changes if available
          let userChange = "N/A";
          let userTrend = false;
          let companyChange = "N/A";
          let companyTrend = false;
          let revenueChange = "N/A";
          let revenueTrend = false;
          let conversionChange = "N/A";
          let conversionTrend = false;
          
          try {
            const { data: metricHistory } = await supabase
              .from('admin_metrics_history')
              .select('*')
              .order('created_at', { ascending: false })
              .limit(2);
              
            if (metricHistory && metricHistory.length >= 2) {
              const current = metricHistory[0];
              const previous = metricHistory[1];
              
              // Calculate percent changes if previous values exist
              if (previous.user_count > 0) {
                const userChangeVal = ((userCount - previous.user_count) / previous.user_count) * 100;
                userChange = `${userChangeVal >= 0 ? '+' : ''}${userChangeVal.toFixed(1)}%`;
                userTrend = userChangeVal >= 0;
              }
              
              if (previous.company_count > 0) {
                const companyChangeVal = ((companyCount - previous.company_count) / previous.company_count) * 100;
                companyChange = `${companyChangeVal >= 0 ? '+' : ''}${companyChangeVal.toFixed(1)}%`;
                companyTrend = companyChangeVal >= 0;
              }
              
              if (previous.monthly_revenue > 0) {
                const revenueChangeVal = ((revenue - previous.monthly_revenue) / previous.monthly_revenue) * 100;
                revenueChange = `${revenueChangeVal >= 0 ? '+' : ''}${revenueChangeVal.toFixed(1)}%`;
                revenueTrend = revenueChangeVal >= 0;
              }
              
              if (previous.conversion_rate > 0) {
                const convChangeVal = conversionRate - previous.conversion_rate;
                conversionChange = `${convChangeVal >= 0 ? '+' : ''}${convChangeVal.toFixed(1)}%`;
                conversionTrend = convChangeVal >= 0;
              }
            }
          } catch (historyError) {
            console.warn("Could not fetch metric history:", historyError);
            // Continue with N/A changes if history isn't available
          }
          
          // Save current metrics to history if table exists
          try {
            await supabase
              .from('admin_metrics_history')
              .insert({
                user_count: userCount,
                company_count: companyCount,
                monthly_revenue: revenue,
                conversion_rate: conversionRate
              });
          } catch (insertError) {
            console.warn("Could not save metrics history:", insertError);
            // Non-critical, can continue
          }
          
          setStats([
            { 
              name: "Total Users", 
              value: userCount?.toString() || "0", 
              change: userChange, 
              up: userTrend
            },
            { 
              name: "Active Companies", 
              value: companyCount?.toString() || "0", 
              change: companyChange, 
              up: companyTrend 
            },
            { 
              name: "Monthly Revenue", 
              value: `$${revenue.toFixed(2)}`, 
              change: revenueChange, 
              up: revenueTrend
            },
            { 
              name: "Conversion Rate", 
              value: `${conversionRate.toFixed(1)}%`, 
              change: conversionChange, 
              up: conversionTrend
            }
          ]);
        }
      } catch (error: any) {
        console.error("Error fetching admin dashboard data:", error);
        toast.error("Failed to load dashboard data");
        setError(error.message || "An error occurred while fetching data");
        
        // Use empty values instead of fake data
        setStats([
          { name: "Total Users", value: "0", change: "N/A", up: false },
          { name: "Active Companies", value: "0", change: "N/A", up: false },
          { name: "Monthly Revenue", value: "$0", change: "N/A", up: false },
          { name: "Conversion Rate", value: "0%", change: "N/A", up: false }
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

  if (error) {
    return (
      <div className="space-y-6">
        <AdminHeader />
        
        <Card className="border-red-500 bg-red-50 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="text-red-700 dark:text-red-400">Error Loading Dashboard</CardTitle>
            <CardDescription className="text-red-600 dark:text-red-500">
              We encountered a problem while loading the admin dashboard data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-2 mb-4">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-500">
                {error}
              </p>
            </div>
            <Button 
              onClick={() => window.location.reload()}
              variant="outline"
              className="bg-red-100 hover:bg-red-200 text-red-700 border-red-300"
            >
              Retry Loading
            </Button>
          </CardContent>
        </Card>
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
            <p className="text-sm text-amber-600 dark:text-amber-500 mb-4">
              Please run the Production Data Validation in the Development Admin Helper page to identify and fix data issues.
            </p>
            <Button 
              onClick={() => validateProductionData()}
              variant="outline"
              className="bg-amber-100 hover:bg-amber-200 text-amber-700 border-amber-300"
            >
              Validate Production Data
            </Button>
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
