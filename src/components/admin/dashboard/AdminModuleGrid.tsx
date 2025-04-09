
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

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
  if (isLoading) return null; // Loading state is handled by the parent component
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module, index) => (
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
  );
}
