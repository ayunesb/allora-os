
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface NavItem {
  label: string;
  path: string;
}

interface DashboardTabsProps {
  navItems: NavItem[];
}

export function DashboardTabs({ navItems }: DashboardTabsProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  const getActiveValue = () => {
    if (currentPath === '/dashboard') return '/dashboard';
    
    for (const item of navItems) {
      if (currentPath.startsWith(item.path) && item.path !== '/dashboard') {
        return item.path;
      }
    }
    
    return '/dashboard';
  };

  return (
    <Tabs defaultValue={getActiveValue()} className="w-auto mr-4" value={getActiveValue()}>
      <TabsList className="bg-transparent">
        {navItems.map((item) => (
          <TabsTrigger 
            key={item.path} 
            value={item.path}
            className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
            asChild
          >
            <Link to={item.path}>{item.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
