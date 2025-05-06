import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { runTestCompanySetup } from "@/utils/company/test";
import { checkSupabaseConnection } from "@/integrations/supabase/client";
import { Lock, Database, Code } from "lucide-react";
import ApiTestingTool from "./ApiTestingTool";
import { Badge } from "@/components/ui/badge";
export default function DevelopmentToolsTab() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const handleSetupTestCompany = async () => {
    if (!user?.email) {
      toast.error("User email not available");
      return;
    }
    setIsLoading(true);
    try {
      const result = await runTestCompanySetup(user.email);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error in test company setup:", error);
      toast.error("Failed to set up test company");
    } finally {
      setIsLoading(false);
    }
  };
  const handleDatabaseTest = async () => {
    setIsLoading(true);
    try {
      const result = await checkSupabaseConnection();
      if (result.connected) {
        toast.success(result.message || "Database connection successful");
      } else {
        toast.error(result.message || "Database connection failed");
      }
      console.log("Database connection test result:", result);
    } catch (error) {
      console.error("Database test error:", error);
      toast.error(`Database test failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Development Tools
            <Badge
              variant="outline"
              className="bg-yellow-100 text-yellow-800 border-yellow-300 ml-2"
            >
              Admin Only
            </Badge>
            <Lock className="h-4 w-4 text-yellow-600" />
          </CardTitle>
          <CardDescription>Tools for testing and debugging</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Test Data</h3>
            <p className="text-muted-foreground mb-4">
              Set up test company data for the current user.
            </p>
            <Button
              onClick={handleSetupTestCompany}
              disabled={isLoading}
              variant="outline"
            >
              {isLoading ? "Setting up..." : "Set Up Test Company"}
              {!isLoading && <Code className="ml-2 h-4 w-4" />}
            </Button>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-2">
              Database Connection Test
            </h3>
            <p className="text-muted-foreground mb-4">
              Verify your connection to the database.
            </p>
            <Button
              variant="outline"
              onClick={handleDatabaseTest}
              disabled={isLoading}
            >
              {isLoading ? "Testing..." : "Test Database Connection"}
              {!isLoading && <Database className="ml-2 h-4 w-4" />}
            </Button>
          </div>

          <Separator />

          <ApiTestingTool />
        </CardContent>
      </Card>
    </div>
  );
}
