
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Settings, 
  Building2, 
  Key, 
  Workflow, 
  Webhook,
  Rocket,
  Zap
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Company Settings",
    href: "/admin/company",
    icon: <Building2 className="h-5 w-5" />,
  },
  {
    title: "API Keys",
    href: "/admin/api-keys",
    icon: <Key className="h-5 w-5" />,
  },
  {
    title: "System Settings",
    href: "/admin/system",
    icon: <Settings className="h-5 w-5" />,
  },
  {
    title: "Integrations",
    href: "/admin/integrations",
    icon: <Workflow className="h-5 w-5" />,
  },
  {
    title: "Webhooks",
    href: "/admin/webhooks",
    icon: <Webhook className="h-5 w-5" />,
  },
  {
    title: "Launch Plan",
    href: "/admin/launch-plan",
    icon: <Rocket className="h-5 w-5" />,
  },
  {
    title: "Zapier Readiness",
    href: "/admin/zapier-readiness",
    icon: <Zap className="h-5 w-5" />,
  }
];

export function AdminNav() {
  const { pathname } = useLocation();

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent" : "transparent"
          )}
        >
          {item.icon}
          <span className="ml-3">{item.title}</span>
        </Link>
      ))}
    </nav>
  );
}
