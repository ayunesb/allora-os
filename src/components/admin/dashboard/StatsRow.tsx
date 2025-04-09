
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
  
  if (isLoading) return null; // Loading state is handled by the parent component
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat, i) => (
        <Card key={i} className="border-primary/10 shadow-sm">
          <CardContent className={`p-4 sm:p-6 ${['xs', 'mobile'].includes(breakpoint) ? 'text-center' : ''}`}>
            <div className={`flex ${['xs', 'mobile'].includes(breakpoint) ? 'flex-col items-center' : 'justify-between items-start'}`}>
              <div className={['xs', 'mobile'].includes(breakpoint) ? 'mb-2' : ''}>
                <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              </div>
              <span className={`flex items-center px-2 py-1 rounded text-xs ${
                stat.up ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
              } ${['xs', 'mobile'].includes(breakpoint) ? 'justify-center' : ''}`}>
                <Activity className="h-3 w-3 mr-1" />
                {stat.change}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
