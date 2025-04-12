
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, GitBranch, Phone, Bot, Zap } from "lucide-react";

export default function QuickAccess() {
  const quickItems = [
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
    },
    {
      title: "Technical",
      description: "Performance improvements",
      icon: <Zap className="h-8 w-8 text-amber-500" />,
      link: "/dashboard/technical-improvements"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Quick Access</CardTitle>
        <CardDescription>
          Frequently used tools and resources
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {quickItems.map((item, index) => (
            <Link to={item.link} key={index}>
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border hover:bg-accent/50 transition-colors h-full">
                {item.icon}
                <h3 className="mt-3 font-medium text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground text-center mt-1">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
