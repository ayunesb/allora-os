
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export default function ProfileDiagnostics() {
  const { user, profile, refreshProfile, session } = useAuth();
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Extract userEmail directly from user object
  const userEmail = user?.email;

  // Fetch the current session directly from Supabase
  const checkSession = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      setSessionInfo(data.session);
      
      toast.success("Session retrieved", {
        description: "Check the console for detailed information"
      });
      
      console.log("Current session data:", data.session);
      console.log("Current user from session:", data.session?.user);
      console.log("User email from session:", data.session?.user?.email);
    } catch (error) {
      console.error("Error fetching session:", error);
      toast.error("Error fetching session");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("User Authentication Diagnostics:");
    console.log("1. User object from Auth Context:", user);
    console.log("2. Profile object from Auth Context:", profile);
    console.log("3. User email from Auth Context:", userEmail);
    console.log("4. Session object from Auth Context:", session);

    // Check if email is present in user object
    if (user?.email) {
      console.log("Email found in user object:", user.email);
    } else {
      console.warn("Email NOT found in user object");
    }

    // Check if email is present in profile object (it might be stored here as a backup)
    if (profile?.email) {
      console.log("Email found in profile object:", profile.email);
    } else {
      console.warn("Email NOT found in profile object");
    }
  }, [user, profile, userEmail, session]);

  return (
    <Card className="mb-6">
      <CardHeader className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-100 dark:border-yellow-800">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Account Verification</CardTitle>
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Diagnostic Tool
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <div className="font-semibold">User Email</div>
            <div className="bg-muted p-2 rounded text-sm">
              {userEmail || "Not found in user object"}
            </div>
          </div>
          
          <div className="grid gap-2">
            <div className="font-semibold">User ID</div>
            <div className="bg-muted p-2 rounded text-sm overflow-x-auto">
              {user?.id || "Not available"}
            </div>
          </div>
          
          <div className="grid gap-2">
            <div className="font-semibold">Company Name</div>
            <div className="bg-muted p-2 rounded text-sm">
              {profile?.company || "Not found in profile"}
            </div>
          </div>
          
          <div className="grid gap-2">
            <div className="font-semibold">Profile Name</div>
            <div className="bg-muted p-2 rounded text-sm">
              {profile?.name || "Not found in profile"}
            </div>
          </div>
          
          <div className="grid gap-2">
            <div className="font-semibold">Auth Status</div>
            <div className="bg-muted p-2 rounded text-sm">
              {session ? "Authenticated" : "Not authenticated"}
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={checkSession} 
              variant="secondary" 
              size="sm"
              disabled={isLoading}
            >
              {isLoading ? "Checking..." : "Check Direct Session"}
            </Button>
            
            <Button 
              onClick={() => refreshProfile()} 
              variant="outline" 
              size="sm"
            >
              Refresh Profile Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
