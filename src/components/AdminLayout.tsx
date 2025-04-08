
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  BarChart3, 
  UserPlus, 
  LineChart, 
  Settings
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';

export default function AdminLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const adminMenuItems = [
    { icon: <LayoutDashboard size={18} />, label: "Dashboard", href: "/admin" },
    { icon: <Users size={18} />, label: "Users", href: "/admin/users" },
    { icon: <Building2 size={18} />, label: "Companies", href: "/admin/companies" },
    { icon: <BarChart3 size={18} />, label: "Campaigns", href: "/admin/campaigns" },
    { icon: <UserPlus size={18} />, label: "Leads", href: "/admin/leads" },
    { icon: <LineChart size={18} />, label: "Analytics", href: "/admin/analytics" },
    { icon: <Settings size={18} />, label: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Navbar isLoggedIn={true} />
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-card border-r border-border h-screen fixed top-0 left-0 pt-16">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 px-2">Admin Control Panel</h2>
          <nav>
            <ul className="space-y-1">
              {adminMenuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors",
                      currentPath === item.href && "text-foreground bg-accent"
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
      
      {/* Main Content */}
      <main className="pl-64 w-full">
        <div className="container mx-auto px-4 pt-24 pb-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
