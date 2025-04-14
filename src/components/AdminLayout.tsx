
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  BarChart3, 
  UserPlus, 
  LineChart, 
  Settings,
  Menu,
  X,
  Rocket,
  Bot,
  Server,
  MessagesSquare,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useBreakpoint } from '@/hooks/use-mobile';
import { AdminNav } from '@/components/admin/AdminNav';

export interface AdminLayoutProps {
  children?: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const getActiveTab = () => {
    if (currentPath.includes('/platform-stability')) return 'platform-stability';
    if (currentPath.includes('/user-onboarding')) return 'user-onboarding';
    if (currentPath.includes('/ai-bot-logic')) return 'ai-bot-logic';
    if (currentPath.includes('/dashboard-modules')) return 'dashboard-modules';
    if (currentPath.includes('/communication-tools')) return 'communication-tools';
    return '';
  };
  
  const [activeTab, setActiveTab] = useState(getActiveTab());
  
  useEffect(() => {
    setActiveTab(getActiveTab());
    setMobileMenuOpen(false);
  }, [location]);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    navigate(`/admin/${tab}`);
  };
  
  const tabs = [
    { id: 'platform-stability', label: 'Platform Stability', icon: <Shield className="h-4 w-4" /> },
    { id: 'user-onboarding', label: 'User Onboarding', icon: <Users className="h-4 w-4" /> },
    { id: 'ai-bot-logic', label: 'AI Bot Logic', icon: <Bot className="h-4 w-4" /> },
    { id: 'dashboard-modules', label: 'Dashboard Modules', icon: <LayoutDashboard className="h-4 w-4" /> },
    { id: 'communication-tools', label: 'Communication Tools', icon: <MessagesSquare className="h-4 w-4" /> }
  ];
  
  const adminMenuItems = [
    { icon: <LayoutDashboard size={isMobileView ? 16 : 18} />, label: "Dashboard", href: "/admin" },
    { icon: <Users size={isMobileView ? 16 : 18} />, label: "Users", href: "/admin/users" },
    { icon: <Building2 size={isMobileView ? 16 : 18} />, label: "Companies", href: "/admin/companies" },
    { icon: <BarChart3 size={isMobileView ? 16 : 18} />, label: "Campaigns", href: "/admin/campaigns" },
    { icon: <UserPlus size={isMobileView ? 16 : 18} />, label: "Leads", href: "/admin/leads" },
    { icon: <LineChart size={isMobileView ? 16 : 18} />, label: "Analytics", href: "/admin/analytics" },
    { icon: <Settings size={isMobileView ? 16 : 18} />, label: "Settings", href: "/admin/settings" },
    { icon: <Rocket size={isMobileView ? 16 : 18} />, label: "Launch Prep", href: "/admin/launch-prep" },
  ];

  const isRouteActive = (href: string) => {
    if (href === '/admin' && currentPath === '/admin') {
      return true;
    }
    return href !== '/admin' && currentPath.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const renderContent = () => {
    if (children) {
      return children;
    }
    return <Outlet />;
  };

  if (isMobileView) {
    return (
      <div className="min-h-screen bg-[#0F1729]">
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#0F1729] border-b border-white/10 shadow-sm">
          <div className="flex items-center justify-between p-3">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
            <span className="font-medium text-sm text-white">Admin Control Panel</span>
            <div className="w-8"></div>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={toggleMobileMenu} />
        )}
        
        <div 
          className={`fixed top-14 left-0 bottom-0 z-50 w-64 bg-[#0F1729] border-r border-white/10 transform transition-transform duration-200 ease-in-out overflow-y-auto ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="py-2">
            <AdminNav />
          </div>
        </div>
        
        <div className="pt-14 pb-4 px-3 max-w-full overflow-x-hidden">
          {(currentPath.includes('/platform-stability') || 
            currentPath.includes('/user-onboarding') || 
            currentPath.includes('/ai-bot-logic') || 
            currentPath.includes('/dashboard-modules') || 
            currentPath.includes('/communication-tools')) && (
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-1 p-1 bg-muted rounded-lg">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    size="sm"
                    className="flex items-center gap-1 px-2"
                    onClick={() => handleTabChange(tab.id)}
                  >
                    {tab.icon}
                    <span className="text-xs sm:text-sm">{tab.label}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
          {renderContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1729] flex">
      <div className="hidden md:flex flex-col fixed top-0 left-0 bottom-0 w-[260px] bg-[#0F1729] border-r border-white/10 z-30">
        <div className="p-6">
          <h1 className="font-bold text-2xl text-white">Admin Control Panel</h1>
        </div>
        
        <div className="flex-1 px-3 py-3">
          <AdminNav />
        </div>
      </div>
      
      <div className="flex-1 md:ml-[260px]">
        {(currentPath.includes('/platform-stability') || 
          currentPath.includes('/user-onboarding') || 
          currentPath.includes('/ai-bot-logic') || 
          currentPath.includes('/dashboard-modules') || 
          currentPath.includes('/communication-tools')) && (
          <div className="border-b border-white/10 bg-[#0F1729]">
            <div className="flex space-x-2 p-4 max-w-screen-xl mx-auto">
              {tabs.map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "outline"}
                  size="sm"
                  className={`flex items-center gap-2 px-4 ${activeTab === tab.id ? 'bg-primary/10 text-primary border-primary' : 'text-muted-foreground'}`}
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
        <div className="p-6 max-w-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
