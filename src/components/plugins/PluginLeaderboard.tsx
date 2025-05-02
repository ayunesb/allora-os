
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePlugins } from '@/hooks/usePlugins';
import { PluginImpactData } from '@/types/fixed/Plugin';
import { ArrowUp } from 'lucide-react';
import { formatDate } from '@/utils/exportUtils';
import { toast } from 'sonner';

interface PluginLeaderboardProps {
  className?: string;
}

export function PluginLeaderboard({ className }: PluginLeaderboardProps) {
  const [pluginImpact, setPluginImpact] = useState<PluginImpactData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchPluginImpact } = usePlugins();

  useEffect(() => {
    const loadPluginImpact = async () => {
      try {
        const impact = await fetchPluginImpact();
        setPluginImpact(impact.sort((a, b) => b.total_value - a.total_value));
      } catch (error) {
        console.error("Error loading plugin impact data:", error);
        toast.error("Failed to load plugin impact data");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPluginImpact();
  }, [fetchPluginImpact]);

  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Plugin ROI Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center animate-pulse">
                <div className="flex-1">
                  <div className="h-5 bg-muted rounded w-1/3 mb-1"></div>
                  <div className="h-4 bg-muted rounded w-1/4 opacity-70"></div>
                </div>
                <div className="h-6 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!pluginImpact.length) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Plugin ROI Leaderboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No plugin impact data available yet. Install and use plugins to see their ROI.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Plugin ROI Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pluginImpact.slice(0, 5).map((plugin, index) => (
            <div key={plugin.plugin_name} className="flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{index + 1}.</span>
                  <span className="font-medium">{plugin.plugin_name}</span>
                  {index === 0 && (
                    <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                      Top ROI
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {plugin.usage_count} uses • Avg. value: ${plugin.average_value.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center text-green-600 font-medium">
                <ArrowUp className="h-4 w-4 mr-1" />
                ${plugin.total_value.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
