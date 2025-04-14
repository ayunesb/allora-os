
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/ui/page-title";
import { Trophy, Star, Gem, TrendingUp, BarChart, RefreshCw, Shield } from "lucide-react";
import { forecastExecutiveResources } from "@/agents/forecaster";
import { toast } from "sonner";
import { SupabaseConnectionStatus } from "@/components/dashboard/SupabaseConnectionStatus";

interface Executive {
  id: string;
  name: string;
  role: string;
  level: string;
  star_rating: number;
  successful_actions: number;
  failed_actions: number;
  resource_points: number;
  forecast?: number | null;
}

export default function ExecutivesDashboard() {
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExecutives = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from("executives")
        .select("*")
        .order("star_rating", { ascending: false });

      if (error) {
        throw error;
      }
      
      // Generate forecasts for each executive's resource points
      const executivesWithForecasts = await Promise.all(
        (data || []).map(async (exec) => {
          // For this demo we'll create synthetic historical data
          // In a real app, you'd fetch this from executive_resource_history
          const historicalPoints = [
            exec.resource_points * 0.8,
            exec.resource_points * 0.9,
            exec.resource_points
          ];
          
          const forecast = await forecastExecutiveResources(historicalPoints);
          return { ...exec, forecast };
        })
      );
      
      setExecutives(executivesWithForecasts);
    } catch (err: any) {
      console.error("Failed to fetch executives:", err);
      setError(err.message || "Failed to load executive data");
      
      // If no data, add sample data for display
      if (executives.length === 0) {
        setExecutives(getSampleExecutives());
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExecutives();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill={index < rating ? 'currentColor' : 'none'}
      />
    ));
  };

  const getForecastTrend = (current: number, forecast: number | null) => {
    if (forecast === null) return null;
    
    const diff = forecast - current;
    if (diff > 10) return { trend: "up", color: "text-green-500" };
    if (diff < -10) return { trend: "down", color: "text-red-500" };
    return { trend: "stable", color: "text-blue-400" };
  };

  const handleRefresh = () => {
    fetchExecutives();
    toast.success("Executive data refreshed");
  };

  // Sample executives for display when database connection fails
  const getSampleExecutives = (): Executive[] => [
    {
      id: "1",
      name: "Elon Musk",
      role: "CEO",
      level: "Senior",
      star_rating: 5,
      successful_actions: 48,
      failed_actions: 12,
      resource_points: 340,
      forecast: 365
    },
    {
      id: "2",
      name: "Warren Buffett",
      role: "CFO",
      level: "Senior",
      star_rating: 4,
      successful_actions: 35,
      failed_actions: 5,
      resource_points: 290,
      forecast: 305
    },
    {
      id: "3",
      name: "Satya Nadella",
      role: "CTO",
      level: "Senior",
      star_rating: 4,
      successful_actions: 31,
      failed_actions: 7,
      resource_points: 270,
      forecast: 280
    },
    {
      id: "4",
      name: "Antonio Lucio",
      role: "CMO",
      level: "Middle",
      star_rating: 3,
      successful_actions: 22,
      failed_actions: 14,
      resource_points: 180,
      forecast: 170
    },
    {
      id: "5",
      name: "Sheryl Sandberg",
      role: "COO",
      level: "Senior",
      star_rating: 4,
      successful_actions: 38,
      failed_actions: 6,
      resource_points: 300,
      forecast: 320
    }
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <PageTitle 
        title="AI Executive Team" 
        description="Performance and career progression of your AI executives"
      />

      <div className="flex justify-between items-center">
        <div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
        </div>
        <Badge variant="outline" className="px-3 py-1">
          <Shield className="h-4 w-4 mr-1 inline" />
          Executives Online: {executives.length}
        </Badge>
      </div>

      {error && <SupabaseConnectionStatus />}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {executives.map((exec) => {
            const forecastTrend = getForecastTrend(exec.resource_points, exec.forecast);
            
            return (
              <Card key={exec.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>{exec.name}</span>
                    <Badge variant={exec.level === "Senior" ? "default" : "secondary"}>
                      {exec.level}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-2">
                    <Trophy className="h-5 w-5 mr-2 text-primary" />
                    <span>{exec.role}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    {renderStars(exec.star_rating)}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-green-50 dark:bg-green-950/30 p-2 rounded">
                      <span className="text-sm text-muted-foreground">Successful Actions</span>
                      <p className="font-bold text-green-600 dark:text-green-400">{exec.successful_actions}</p>
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/30 p-2 rounded">
                      <span className="text-sm text-muted-foreground">Failed Actions</span>
                      <p className="font-bold text-red-600 dark:text-red-400">{exec.failed_actions}</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2 p-2 border rounded">
                    <Gem className="h-5 w-5 mr-2 text-blue-500" />
                    <span className="text-sm text-muted-foreground">Resource Points</span>
                    <span className="ml-2 font-bold">{exec.resource_points}</span>
                  </div>
                  
                  {exec.forecast !== null && (
                    <div className="flex items-center mt-3 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      <BarChart className="h-5 w-5 mr-2 text-purple-500" />
                      <span className="text-sm text-muted-foreground">Forecast</span>
                      <span className="ml-2 font-bold">{exec.forecast}</span>
                      {forecastTrend && (
                        <TrendingUp className={`h-4 w-4 ml-2 ${forecastTrend.color}`} />
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
