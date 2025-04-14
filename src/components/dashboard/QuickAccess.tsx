
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, PieChart, Phone, ShoppingCart, User, Users, GitBranch, Bot } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

export default function QuickAccess() {
  const { profile } = useAuth();
  const isAdmin = profile?.role === 'admin';

  const links = [
    {
      title: "Manage Leads",
      description: "View and manage your leads",
      icon: <Users className="h-8 w-8 text-blue-500" />,
      link: "/dashboard/leads"
    },
    {
      title: "Strategies",
      description: "Browse business strategies",
      icon: <GitBranch className="h-8 w-8 text-green-500" />,
      link: "/dashboard/strategies"
    },
    {
      title: "Communications",
      description: "Manage calls and messages",
      icon: <Phone className="h-8 w-8 text-orange-500" />,
      link: "/dashboard/calls"
    },
    {
      title: "AI Bots",
      description: "Access AI executive team",
      icon: <Bot className="h-8 w-8 text-purple-500" />,
      link: "/dashboard/ai-bots"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Access</CardTitle>
        <CardDescription>
          Shortcuts to frequently used features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {links.map((link, index) => (
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
