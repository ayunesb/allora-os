
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  TrendingUp, 
  BarChart3, 
  UserPlus, 
  Phone, 
  Bot, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/dashboard" },
    { icon: <TrendingUp size={18} />, label: "Strategies", href: "/dashboard/strategies" },
    { icon: <BarChart3 size={18} />, label: "Campaigns", href: "/dashboard/campaigns" },
    { icon: <UserPlus size={18} />, label: "Leads", href: "/dashboard/leads" },
    { icon: <Phone size={18} />, label: "Calls", href: "/dashboard/calls" },
    { icon: <Bot size={18} />, label: "AI Bots", href: "/dashboard/ai-bots" },
    { icon: <Settings size={18} />, label: "Settings", href: "/dashboard/settings" },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border h-screen fixed top-0 left-0 pt-16 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 px-2">Business Center</h2>
        <nav>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
                    (currentPath === item.href || 
                     (item.href !== "/dashboard" && currentPath.startsWith(item.href))) && 
                     "text-foreground bg-accent"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
