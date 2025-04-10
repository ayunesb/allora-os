
import { Brain, FilePieChart, MessageSquare, Phone, Users, Mail, Briefcase, LineChart } from "lucide-react";
import { Link } from "react-router-dom";

export default function QuickAccess() {
  const quickAccess = [
    {
      title: "Executive Team",
      description: "Consult with AI executives",
      icon: Brain,
      link: "/dashboard/ai-bots",
      color: "text-purple-500"
    },
    {
      title: "Strategies",
      description: "View business strategies",
      icon: FilePieChart,
      link: "/dashboard/strategies",
      color: "text-blue-500"
    },
    {
      title: "Campaigns",
      description: "Manage marketing campaigns",
      icon: Mail,
      link: "/dashboard/campaigns",
      color: "text-green-500"
    },
    {
      title: "Call Scripts",
      description: "Access call & message scripts",
      icon: Phone,
      link: "/dashboard/calls",
      color: "text-amber-500"
    },
    {
      title: "Leads",
      description: "Manage your leads",
      icon: Users,
      link: "/dashboard/leads",
      color: "text-red-500"
    },
    {
      title: "Analytics",
      description: "Track your performance",
      icon: LineChart,
      link: "/dashboard/analytics",
      color: "text-cyan-500"
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Quick Access</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {quickAccess.map((item, index) => (
          <Link key={index} to={item.link} className="block">
            <div className="border rounded-lg p-4 h-full transition-all duration-200 hover:border-primary/50 hover:bg-primary/5">
              <div className={`${item.color} mb-2`}>
                <item.icon size={24} />
              </div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
