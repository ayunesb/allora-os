
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Shield, Database, User } from "lucide-react";

export default function DevAdminHelper() {
  const [email, setEmail] = useState("ayunesb@icloud.com");
  const [loading, setLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const navigate = useNavigate();
  
  // Safely access auth context with fallback values
  let user = null;
  let profile = null;
  
  try {
    const auth = useAuth();
    user = auth?.user;
    profile = auth?.profile;
    
    useEffect(() => {
      if (profile) {
        setCurrentRole(profile.role);
      }
    }, [profile]);
  } catch (error) {
    console.error("Auth context not available:", error);
  }

  const makeUserAdmin = async () => {
    if (!user) {
      toast.error("User not authenticated");
      return;
    }
    
    setLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: "admin" })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("User role updated to admin");
      setCurrentRole("admin");
      
      // Navigate to admin page after a short delay
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } catch (error: any) {
      console.error("Error updating user role:", error);
      toast.error(`Failed to update role: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const runDatabaseChecks = () => {
    navigate("/admin/database-verification");
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Development Admin Helper
            </CardTitle>
            <CardDescription>
              Tools to help with development and testing of admin features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user ? (
              <>
                <div className="bg-muted/40 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground mb-1">Current User</div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <span className="font-medium">{user.email}</span>
                  </div>
                  <div className="text-sm mt-2">
                    Role: <span className="font-semibold">{currentRole || "loading..."}</span>
                    {currentRole === "admin" && (
                      <span className="ml-2 text-green-500 text-xs">(Admin access granted)</span>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    onClick={makeUserAdmin} 
                    className="w-full"
                    disabled={loading || currentRole === "admin"}
                  >
                    {loading ? "Updating..." : currentRole === "admin" ? "Already Admin" : "Make Me Admin"}
                  </Button>
                </div>
              </>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                Please log in to use this tool
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={runDatabaseChecks}
              className="w-full"
              disabled={!user}
            >
              <Database className="h-4 w-4 mr-2" />
              Run Database Verification
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate("/admin")} 
              className="w-full"
              disabled={!user || currentRole !== "admin"}
            >
              Go to Admin Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
