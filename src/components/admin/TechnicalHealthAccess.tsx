
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Zap, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TechnicalHealthAccess() {
  const adminLinks = [
    {
      title: "Technical",
      description: "Performance improvements",
      icon: <Zap className="h-8 w-8 text-amber-500" />,
      link: "/admin/technical-improvements"
    },
    {
      title: "System Health",
      description: "Monitor system performance",
      icon: <Activity className="h-8 w-8 text-blue-500" />,
      link: "/admin/system-health"
    }
  ];

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Server className="h-5 w-5 text-primary mr-2" />
          Technical Administration
        </CardTitle>
        <CardDescription>
          Monitor and manage system performance
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {adminLinks.map((link, index) => (
            <Link to={link.link} key={index}>
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border hover:bg-accent/50 transition-colors h-full">
                {link.icon}
                <h3 className="mt-3 font-medium text-sm">{link.title}</h3>
                <p className="text-xs text-muted-foreground text-center mt-1">{link.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
