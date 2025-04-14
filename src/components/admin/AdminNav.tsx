
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
  Zap,
  CheckSquare,
  LayoutDashboard
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard className="h-5 w-5" />,
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
    title: "Pre-Launch Audit",
    href: "/admin/pre-launch-audit",
    icon: <CheckSquare className="h-5 w-5" />,
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
    <nav className="grid items-start gap-2 p-4 bg-sidebar-accent/5 rounded-xl backdrop-blur-sm">
      <div className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground/50 px-2">
        Admin Functions
      </div>
      
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
            "hover:bg-primary/10 hover:text-primary",
            pathname === item.href 
              ? "bg-primary/15 text-primary relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary/50 after:rounded-full" 
              : "text-gray-300"
          )}
        >
          <span className={cn(
            "mr-3 transition-all duration-200 text-muted-foreground",
            pathname === item.href && "text-primary"
          )}>
            {item.icon}
          </span>
          <span>{item.title}</span>
          
          {pathname === item.href && (
            <span className="ml-auto bg-primary/20 px-1.5 py-0.5 rounded-md text-xs font-semibold text-primary">
              Active
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}
