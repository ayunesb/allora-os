
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
import { useProductionData } from "@/hooks/useProductionData";

export default function DevAdminHelper() {
  const [loading, setLoading] = useState(false);
  const [updatingRole, setUpdatingRole] = useState(false);
  const navigate = useNavigate();
  
  // Safely access auth context
  const auth = useAuth();
  const user = auth?.user;
  const profile = auth?.profile;
  const { validateProductionData, isValidating } = useProductionData();
  
  // Handle making the user an admin
  const makeUserAdmin = async () => {
    if (!user) {
      toast.error("User not authenticated");
      return;
    }
    
    setUpdatingRole(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: "admin" })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("User role updated to admin");
      
      // Navigate to admin page after a short delay
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } catch (error: any) {
      console.error("Error updating user role:", error);
      toast.error(`Failed to update role: ${error.message}`);
    } finally {
      setUpdatingRole(false);
    }
  };

  const runDatabaseChecks = () => {
    setLoading(true);
    validateProductionData()
      .then(() => {
        navigate("/admin/database-verification");
      })
      .catch((error) => {
        console.error("Error running database checks:", error);
        toast.error("Failed to verify database");
      })
      .finally(() => {
        setLoading(false);
      });
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
                    Role: <span className="font-semibold">{profile?.role || "user"}</span>
                    {profile?.role === "admin" && (
                      <span className="ml-2 text-green-500 text-xs">(Admin access granted)</span>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    onClick={makeUserAdmin} 
                    className="w-full"
                    disabled={updatingRole || profile?.role === "admin"}
                  >
                    {updatingRole ? "Updating..." : profile?.role === "admin" ? "Already Admin" : "Make Me Admin"}
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
              disabled={!user || loading || isValidating}
            >
              <Database className="h-4 w-4 mr-2" />
              {loading || isValidating ? "Verifying..." : "Run Database Verification"}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate("/admin")} 
              className="w-full"
              disabled={!user || profile?.role !== "admin"}
            >
              Go to Admin Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
