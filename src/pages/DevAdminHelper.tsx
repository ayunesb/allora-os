
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldAlert, ShieldCheck, AlertCircle } from "lucide-react";
import { setCurrentUserAsAdmin, checkIfUserIsAdmin } from "@/utils/adminHelper";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from 'react-router-dom';
import { Alert, AlertDescription } from "@/components/ui/alert";

// The admin email that's allowed
const ADMIN_EMAIL = 'ayunesb@icloud.com';

export default function DevAdminHelper() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Check admin status on load
  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const adminStatus = await checkIfUserIsAdmin();
        setIsAdmin(adminStatus);
      }
      setIsChecking(false);
    };
    
    checkAdmin();
  }, [user]);
  
  const handleSetAsAdmin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (user?.email !== ADMIN_EMAIL) {
        setError(`Only ${ADMIN_EMAIL} is authorized to be an admin`);
        return;
      }
      
      await setCurrentUserAsAdmin();
      setIsAdmin(true);
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  const isAuthorizedEmail = user.email === ADMIN_EMAIL;
  
  return (
    <div className="container mx-auto max-w-md py-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-amber-500" />
            Development Admin Helper
          </CardTitle>
          <CardDescription>
            This utility helps authorized users become an admin for the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {isChecking ? (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : isAdmin ? (
            <div className="bg-green-50 p-4 rounded-md border border-green-200 flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-green-500" />
              <div>
                <p className="font-medium text-green-700">You are an admin</p>
                <p className="text-sm text-green-600">You can now access all admin features</p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
              <p className="text-amber-700">You are not currently an admin.</p>
              {isAuthorizedEmail ? (
                <p className="text-sm text-amber-600 mt-1">Your email is authorized. Click the button below to set yourself as an admin.</p>
              ) : (
                <p className="text-sm text-amber-600 mt-1">Only {ADMIN_EMAIL} is authorized to be an admin.</p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            onClick={handleSetAsAdmin} 
            disabled={isLoading || isAdmin || !isAuthorizedEmail} 
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting as Admin...
              </>
            ) : isAdmin ? (
              <>
                <ShieldCheck className="mr-2 h-4 w-4" />
                Already an Admin
              </>
            ) : !isAuthorizedEmail ? (
              "Unauthorized Email"
            ) : (
              "Set Myself as Admin"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
