
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleCheck, CircleAlert, AlertOctagon, Shield } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { AdminCheckHandler } from '@/components/auth/AdminCheckHandler';

const DevHelperRedirect = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Define hasInitialized based on user presence
  const hasInitialized = user !== undefined;

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Admin Verification
            </CardTitle>
            <CardDescription>
              Verifying your admin access level...
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <AdminCheckHandler 
              user={user} 
              roleRequired="admin"
              adminOnly={true}
              hasInitialized={hasInitialized}
            >
              {(isUserAdmin, adminCheckDone) => (
                <div className="space-y-4">
                  {!adminCheckDone ? (
                    <div className="flex items-center justify-center py-6">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="ml-2 text-muted-foreground">Verifying admin access...</span>
                    </div>
                  ) : isUserAdmin ? (
                    <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-md">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        <h3 className="font-medium">Admin Access Verified</h3>
                      </div>
                      <p className="mt-1 text-sm">You have admin access to the system.</p>
                    </div>
                  ) : (
                    <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-md">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        <h3 className="font-medium">Admin Access Required</h3>
                      </div>
                      <p className="mt-1 text-sm">You do not have the required admin privileges.</p>
                    </div>
                  )}
                </div>
              )}
            </AdminCheckHandler>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-2">
            <Button 
              onClick={() => navigate('/dev-admin-helper')}
              className="w-full"
            >
              Go to Admin Helper
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/')} 
              className="w-full"
            >
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DevHelperRedirect;
