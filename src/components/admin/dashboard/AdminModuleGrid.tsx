
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useBreakpoint } from '@/hooks/use-mobile';

export interface AdminModule {
  title: string;
  count?: string;
  icon: React.ReactNode;
  description: string;
  href: string;
}

interface AdminModuleGridProps {
  modules: AdminModule[];
  isLoading: boolean;
}

export function AdminModuleGrid({ modules, isLoading }: AdminModuleGridProps) {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  if (isLoading) return null; // Loading state is handled by the parent component
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {modules.map((module, index) => (
        <Link to={module.href} key={index}>
          <Card className="border-primary/10 shadow-sm hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader className={`pb-0 ${isMobileView ? 'px-3 py-3' : 'px-4 py-4'}`}>
              <div className="flex justify-between items-center">
                <div className="p-2 rounded-full bg-primary/10">
                  {module.icon}
                </div>
                {module.count && (
                  <span className={`${isMobileView ? 'text-base' : 'text-lg'} font-bold`}>{module.count}</span>
                )}
              </div>
            </CardHeader>
            <CardContent className={isMobileView ? 'px-3 py-3 pt-1' : 'px-4 py-4 pt-1'}>
              <CardTitle className={`${isMobileView ? 'text-base' : 'text-lg'} mb-1`}>{module.title}</CardTitle>
              <p className={`text-muted-foreground ${isMobileView ? 'text-xs' : 'text-sm'}`}>{module.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
