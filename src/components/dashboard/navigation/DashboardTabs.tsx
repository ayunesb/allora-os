
import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBreakpoint } from "@/hooks/use-mobile";

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
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);

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
    <Tabs 
      defaultValue={getActiveValue()} 
      className={`w-auto ${isMobileView ? 'mr-1' : 'mr-4'}`} 
      value={getActiveValue()}
    >
      <TabsList className={`bg-transparent ${isMobileView ? 'flex-wrap gap-1 p-1' : ''}`}>
        {navItems.map((item) => (
          <TabsTrigger 
            key={item.path} 
            value={item.path}
            className={`
              data-[state=active]:bg-primary/10 
              data-[state=active]:text-primary
              ${isMobileView ? 'text-xs py-1 px-2' : ''}
            `}
            asChild
          >
            <Link to={item.path}>{item.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
