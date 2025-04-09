
import { Link } from "react-router-dom";
import { TrendingUp, BarChart, Phone, Users, Bot } from "lucide-react";

const quickAccessLinks = [
  { icon: <TrendingUp className="h-6 w-6" />, title: "Strategies", path: "/dashboard/strategies" },
  { icon: <BarChart className="h-6 w-6" />, title: "Campaigns", path: "/dashboard/campaigns" },
  { icon: <Phone className="h-6 w-6" />, title: "Calls", path: "/dashboard/calls" },
  { icon: <Users className="h-6 w-6" />, title: "Leads", path: "/dashboard/leads" },
  { icon: <Bot className="h-6 w-6" />, title: "AI Team", path: "/dashboard/ai-bots" },
];

export default function QuickAccess() {
  return (
    <>
      <h2 className="text-2xl font-bold mt-10 mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {quickAccessLinks.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center p-4 bg-card border rounded-lg hover:bg-accent/10 transition-colors"
          >
            <div className="mr-3 text-primary">{item.icon}</div>
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
