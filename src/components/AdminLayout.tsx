
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
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset
} from '@/components/ui/sidebar';

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
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen bg-background flex">
        {/* Using isLoggedIn prop to ensure the Navbar doesn't render dashboard tabs in admin layout */}
        <Navbar isLoggedIn={false} />
        
        <Sidebar>
          <SidebarHeader>
            <div className="pt-16 px-2">
              <h2 className="text-lg font-semibold mb-2">Admin Control Panel</h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPath === item.href}
                  >
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3"
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        
        <SidebarInset>
          <div className="container mx-auto px-4 pt-24 pb-12">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
