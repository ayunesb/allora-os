import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
const NotionIntegration = () => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const { register, handleSubmit } = useForm();
  const handleConnect = async (data) => {
    setIsConnecting(true);
    try {
      // In a real app, we would store this in the database
      const { apiKey } = data;
      // Test the connection by calling the Notion tool function
      const { data: response, error } = await supabase.functions.invoke(
        "notion-tool",
        {
          body: {
            title: "Connection Test",
            content: "This is a test of the Notion integration",
          },
          headers: {
            "X-Notion-API-Key": apiKey,
          },
        },
      );
      if (error) throw error;
      // For a real app, store the API key securely
      // This would be done securely server-side
      localStorage.setItem("notion_api_key", apiKey);
      setIsConnected(true);
      toast({
        title: "Notion connected",
        description: "Your Notion account has been successfully connected.",
      });
    } catch (error) {
      console.error("Error connecting to Notion:", error);
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect to Notion",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };
  const handleDisconnect = async () => {
    try {
      // Remove the API key
      localStorage.removeItem("notion_api_key");
      setIsConnected(false);
      toast({
        title: "Notion disconnected",
        description: "Your Notion account has been disconnected.",
      });
    } catch (error) {
      console.error("Error disconnecting from Notion:", error);
      toast({
        title: "Error",
        description: "Failed to disconnect from Notion",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Notion Integration</h1>
      <p className="text-muted-foreground mb-6">
        Connect Allora AI to your Notion workspace to log decisions, strategies,
        and actions.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Connect to Notion</CardTitle>
          <CardDescription>
            Enter your Notion API key to enable automatic logging of AI
            decisions and strategies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isConnected ? (
            <form onSubmit={handleSubmit(handleConnect)} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="apiKey" className="text-sm font-medium">
                  Notion API Key
                </label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="secret_..."
                  {...register("apiKey", { required: true })}
                />
                <p className="text-xs text-muted-foreground">
                  Get your Notion API key from the{" "}
                  <a
                    href="https://www.notion.so/my-integrations"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Notion Integrations page
                  </a>
                </p>
              </div>

              <Button type="submit" disabled={isConnecting}>
                {isConnecting ? "Connecting..." : "Connect to Notion"}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 text-green-800 rounded-md">
                <p className="font-medium">Connected to Notion</p>
                <p className="text-sm mt-1">
                  All executive decisions and strategies will be automatically
                  logged to your Notion workspace.
                </p>
              </div>

              <Button variant="outline" onClick={handleDisconnect}>
                Disconnect from Notion
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default NotionIntegration;
