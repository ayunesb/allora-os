
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Megaphone,
  FileText,
  Phone,
  Bot,
  Settings,
  UserCircle,
  BarChartHorizontal,
  Lightbulb
} from 'lucide-react';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  end?: boolean;
}

const NavItem = ({ to, icon, children, end }: NavItemProps) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) =>
      `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-secondary'
      }`
    }
  >
    {icon}
    <span>{children}</span>
  </NavLink>
);

export function DashboardTabs() {
  return (
    <nav className="flex-1 space-y-1">
      <NavItem to="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} end>
        Dashboard
      </NavItem>
      <NavItem to="/dashboard/leads" icon={<Users className="h-5 w-5" />}>
        Leads
      </NavItem>
      <NavItem to="/dashboard/campaigns" icon={<Megaphone className="h-5 w-5" />}>
        Campaigns
      </NavItem>
      <NavItem to="/dashboard/strategies" icon={<FileText className="h-5 w-5" />}>
        Strategies
      </NavItem>
      <NavItem to="/dashboard/calls" icon={<Phone className="h-5 w-5" />}>
        Calls
      </NavItem>
      <NavItem to="/dashboard/ai-bots" icon={<Bot className="h-5 w-5" />}>
        AI Bots
      </NavItem>
      <NavItem to="/dashboard/insights" icon={<Lightbulb className="h-5 w-5" />}>
        Insights
      </NavItem>
      <NavItem to="/dashboard/analytics" icon={<BarChartHorizontal className="h-5 w-5" />}>
        Analytics
      </NavItem>
      <NavItem to="/dashboard/profile" icon={<UserCircle className="h-5 w-5" />}>
        Profile
      </NavItem>
      <NavItem to="/dashboard/settings" icon={<Settings className="h-5 w-5" />}>
        Settings
      </NavItem>
    </nav>
  );
}
