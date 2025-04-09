
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  BarChart3, 
  UserPlus, 
  LineChart, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useBreakpoint } from '@/hooks/use-mobile';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';

export default function AdminLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);
  
  const adminMenuItems = [
    { icon: <LayoutDashboard size={isMobileView ? 16 : 18} />, label: "Dashboard", href: "/admin" },
    { icon: <Users size={isMobileView ? 16 : 18} />, label: "Users", href: "/admin/users" },
    { icon: <Building2 size={isMobileView ? 16 : 18} />, label: "Companies", href: "/admin/companies" },
    { icon: <BarChart3 size={isMobileView ? 16 : 18} />, label: "Campaigns", href: "/admin/campaigns" },
    { icon: <UserPlus size={isMobileView ? 16 : 18} />, label: "Leads", href: "/admin/leads" },
    { icon: <LineChart size={isMobileView ? 16 : 18} />, label: "Analytics", href: "/admin/analytics" },
    { icon: <Settings size={isMobileView ? 16 : 18} />, label: "Settings", href: "/admin/settings" },
  ];

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (isMobileView) {
    return (
      <div className="min-h-screen bg-background">
        {/* Mobile Navbar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b shadow-sm">
          <div className="flex items-center justify-between p-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
            <span className="font-medium text-sm">Admin Panel</span>
            <div className="w-8"></div> {/* Empty div for alignment */}
          </div>
        </div>
        
        {/* Mobile menu overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleMobileMenu} />
        )}
        
        {/* Mobile sidebar */}
        <div 
          className={`fixed top-14 left-0 bottom-0 z-50 w-64 bg-background border-r transform transition-transform duration-200 ease-in-out overflow-y-auto ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="py-2">
            {adminMenuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 text-sm",
                  currentPath === item.href || currentPath.startsWith(item.href + '/') 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-muted/50"
                )}
                onClick={toggleMobileMenu}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Page content */}
        <div className="pt-14 pb-4 px-3 max-w-full overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={!isMobileView}>
      <div className="min-h-screen bg-background flex w-full">
        {/* Using isLoggedIn prop to ensure the Navbar doesn't render dashboard tabs in admin layout */}
        <Navbar isLoggedIn={false} />
        
        <Sidebar>
          <SidebarHeader>
            <div className={cn(
              "flex items-center", 
              "pt-16 px-2"
            )}>
              <h2 className="text-lg font-semibold mb-2 flex items-center">
                <span>Admin Control Panel</span>
                <SidebarTrigger className="ml-auto md:hidden" />
              </h2>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPath === item.href || currentPath.startsWith(item.href + '/')}
                    tooltip={item.label}
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
          <SidebarFooter />
        </Sidebar>
        
        <SidebarInset>
          <div className="p-4 sm:p-6 w-full overflow-x-hidden">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
