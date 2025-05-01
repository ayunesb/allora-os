
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shield } from 'lucide-react';
import { ModeToggle } from '@/components/ui/mode-toggle';

export default function AdminHeader() {
  const navigate = useNavigate();
  
  return (
    <header className="h-14 border-b px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div className="hidden md:flex items-center gap-1">
          <Shield className="h-4 w-4 text-primary" />
          <span className="font-medium">Admin Portal</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <ModeToggle />
      </div>
    </header>
  );
}
