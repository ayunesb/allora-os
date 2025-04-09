
import { Link } from "react-router-dom";
import { TrendingUp, BarChart, Phone, Users, Bot } from "lucide-react";

export default function Dashboard() {
  const dashboardItems = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Strategies",
      description: "AI-generated business strategies",
      href: "/dashboard/strategies",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Campaigns",
      description: "Marketing campaign automation",
      href: "/dashboard/campaigns",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Calls",
      description: "Cold call scripts & automation",
      href: "/dashboard/calls",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Leads",
      description: "Lead generation reports",
      href: "/dashboard/leads",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: "AI Team",
      description: "Your AI executive team",
      href: "/dashboard/ai-bots",
      color: "from-red-500 to-rose-600",
    },
  ];

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Welcome to Your Dashboard</h1>
      <p className="text-gray-300 mb-8">
        Access all your AI-powered business tools below
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="dashboard-card group flex flex-col h-64"
          >
            <div className={`p-4 rounded-full bg-gradient-to-r ${item.color} w-16 h-16 flex items-center justify-center mb-6`}>
              {item.icon}
            </div>
            
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
              {item.title}
            </h2>
            
            <p className="text-gray-300">{item.description}</p>
            
            <div className="mt-auto">
              <span className="text-primary text-sm font-medium group-hover:underline">
                View {item.title} →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
