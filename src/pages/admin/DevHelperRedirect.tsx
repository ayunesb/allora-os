
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

export default function DevHelperRedirect() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  
  useEffect(() => {
    if (profile?.role === 'admin') {
      navigate('/admin');
    } else {
      toast.info('Admin access required', {
        description: 'Use the Dev Admin Helper to grant admin privileges'
      });
      navigate('/dev-admin-helper');
    }
  }, [profile, navigate]);
  
  return (
    <div className="container mx-auto py-12 text-center">
      <p>Redirecting to the appropriate page...</p>
    </div>
  );
}
