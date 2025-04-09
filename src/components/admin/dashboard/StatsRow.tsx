
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";
import { useBreakpoint } from '@/hooks/use-mobile';

export interface StatItem {
  name: string;
  value: string;
  change: string;
  up: boolean;
}

interface StatsRowProps {
  stats: StatItem[];
  isLoading: boolean;
}

export function StatsRow({ stats, isLoading }: StatsRowProps) {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  if (isLoading) return null; // Loading state is handled by the parent component
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4 sm:mb-6">
      {stats.map((stat, i) => (
        <Card key={i} className="border-primary/10 shadow-sm overflow-hidden">
          <CardContent className={`p-3 sm:p-4 ${isMobileView ? 'flex justify-between items-center' : ''}`}>
            <div className={`${isMobileView ? 'flex-1' : ''}`}>
              <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
              <h3 className={`${isMobileView ? 'text-xl' : 'text-2xl'} font-bold mt-1`}>{stat.value}</h3>
            </div>
            <span className={`flex items-center px-2 py-1 rounded text-xs ${
              stat.up ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
            } ${isMobileView ? 'self-end' : 'mt-2'}`}>
              <Activity className="h-3 w-3 mr-1" />
              {stat.change}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
