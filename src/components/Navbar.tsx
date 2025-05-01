
import React from 'react';
import { useUser } from '@/hooks/useUser';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getUserDisplayName, getUserAvatar } from '@/utils/authCompatibility';

export const Navbar = () => {
  const { user } = useUser();
  
  return (
    <nav className="bg-background border-b border-border/40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl text-primary">
          Allora AI
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
            Dashboard
          </Link>
          <Link to="/campaigns" className="text-sm font-medium hover:text-primary">
            Campaigns
          </Link>
          <Link to="/analytics" className="text-sm font-medium hover:text-primary">
            Analytics
          </Link>
          
          {user ? (
            <div className="flex items-center gap-2">
              <img
                src={getUserAvatar(user)}
                alt={`${getUserDisplayName(user)}'s avatar`}
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium">
                {getUserDisplayName(user)}
              </span>
            </div>
          ) : (
            <Button asChild size="sm">
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

// This is exported as default for backwards compatibility
export default Navbar;
