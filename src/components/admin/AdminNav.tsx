
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Building2, Webhook, Key, Database, RocketIcon } from 'lucide-react';

const AdminNav = () => {
  return (
    <nav className="space-y-1">
      <NavLink
        to="/admin"
        end
        className={({ isActive }) =>
          `flex items-center px-3 py-2 text-sm rounded-md ${
            isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-primary/5'
          }`
        }
      >
        <span className="truncate">Dashboard</span>
      </NavLink>
      <NavLink
        to="/admin/users"
        className={({ isActive }) =>
          `flex items-center px-3 py-2 text-sm rounded-md ${
            isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-primary/5'
          }`
        }
      >
        <Users className="mr-2 h-4 w-4" />
        <span className="truncate">User Management</span>
      </NavLink>
      <NavLink
        to="/admin/companies"
        className={({ isActive }) =>
          `flex items-center px-3 py-2 text-sm rounded-md ${
            isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-primary/5'
          }`
        }
      >
        <Building2 className="mr-2 h-4 w-4" />
        <span className="truncate">Companies</span>
      </NavLink>
      <NavLink
        to="/admin/webhooks"
        className={({ isActive }) =>
          `flex items-center px-3 py-2 text-sm rounded-md ${
            isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-primary/5'
          }`
        }
      >
        <Webhook className="mr-2 h-4 w-4" />
        <span className="truncate">Webhooks</span>
      </NavLink>
      <NavLink
        to="/admin/api-config"
        className={({ isActive }) =>
          `flex items-center px-3 py-2 text-sm rounded-md ${
            isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-primary/5'
          }`
        }
      >
        <Key className="mr-2 h-4 w-4" />
        <span className="truncate">API Keys</span>
      </NavLink>
      <NavLink
        to="/admin/database"
        className={({ isActive }) =>
          `flex items-center px-3 py-2 text-sm rounded-md ${
            isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-primary/5'
          }`
        }
      >
        <Database className="mr-2 h-4 w-4" />
        <span className="truncate">Database Verification</span>
      </NavLink>
      <NavLink
        to="/admin/launch-check"
        className={({ isActive }) =>
          `flex items-center px-3 py-2 text-sm rounded-md ${
            isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-primary/5'
          }`
        }
      >
        <RocketIcon className="mr-2 h-4 w-4" />
        <span className="truncate">Launch Check</span>
      </NavLink>
      <NavLink
        to="/admin/launch-prep"
        className={({ isActive }) =>
          `flex items-center px-3 py-2 text-sm rounded-md ${
            isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-primary/5'
          }`
        }
      >
        <RocketIcon className="mr-2 h-4 w-4" />
        <span className="truncate">Launch Preparation</span>
      </NavLink>
    </nav>
  );
};

export default AdminNav;
