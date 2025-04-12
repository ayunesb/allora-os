
import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Building2, Webhook, Key, Database, Settings, RocketIcon } from 'lucide-react';

export function AdminModuleGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <ModuleCard
        title="User Management"
        description="Manage system users and permissions"
        icon={<Users className="h-5 w-5" />}
        href="/admin/users"
      />
      <ModuleCard
        title="Companies"
        description="Manage company accounts and details"
        icon={<Building2 className="h-5 w-5" />}
        href="/admin/companies"
      />
      <ModuleCard
        title="Webhooks"
        description="Configure integrations with external services"
        icon={<Webhook className="h-5 w-5" />}
        href="/admin/webhooks"
      />
      <ModuleCard
        title="API Keys"
        description="Manage API keys for external services"
        icon={<Key className="h-5 w-5" />}
        href="/admin/api-config"
      />
      <ModuleCard
        title="Database Verification"
        description="Verify database structure and security"
        icon={<Database className="h-5 w-5" />}
        href="/admin/database"
      />
      <ModuleCard
        title="Launch Check"
        description="Verify system readiness for production"
        icon={<RocketIcon className="h-5 w-5" />}
        href="/admin/launch-check"
      />
      <ModuleCard
        title="Launch Preparation"
        description="Prepare and deploy the application"
        icon={<RocketIcon className="h-5 w-5" />}
        href="/admin/launch-prep"
        highlight={true}
      />
      <ModuleCard
        title="System Settings"
        description="Configure global system preferences"
        icon={<Settings className="h-5 w-5" />}
        href="/admin/settings"
      />
    </div>
  );
}

interface ModuleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  highlight?: boolean;
}

function ModuleCard({ title, description, icon, href, highlight = false }: ModuleCardProps) {
  return (
    <Link
      to={href}
      className={`flex flex-col p-6 rounded-xl transition-all ${
        highlight 
          ? 'bg-primary/10 border border-primary/20 hover:bg-primary/15' 
          : 'bg-card border border-border hover:bg-accent/50'
      }`}
    >
      <div className={`p-2 rounded-full w-fit ${highlight ? 'bg-primary/20' : 'bg-secondary'}`}>
        {icon}
      </div>
      <h3 className={`text-lg font-medium mt-4 ${highlight ? 'text-primary' : ''}`}>{title}</h3>
      <p className="text-muted-foreground text-sm mt-1">{description}</p>
    </Link>
  );
}
