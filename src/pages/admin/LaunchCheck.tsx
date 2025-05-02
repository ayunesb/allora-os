import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VerificationContent } from "@/components/admin/launch-verification/VerificationContent";
import { LaunchInfoBox } from "@/components/admin/launch-verification/LaunchInfoBox";
import { LaunchProgress } from "@/components/admin/launch-verification/LaunchProgress";
import { useLaunchVerification } from "@/hooks/admin/useLaunchVerification";
import { useLaunchProcess } from "@/components/admin/launch-verification/useLaunchProcess";
import { toast } from "sonner";

export default function LaunchCheck() {
  const [activeTab, setActiveTab] = useState("verification");
  const { 
    runValidation, 
    validationResults, 
    isChecking, 
    lastCheckTime,
    validationStatus
  } = useLaunchVerification();
  
  const {
    isLaunching,
    launchStep,
    isComplete,
    launchFirstCustomerFlow
  } = useLaunchProcess();

  // Fix the missing argument issue
  const handleRunValidation = () => {
    runValidation({ type: "full" });
  };

  const handleLaunch = async () => {
    if (!validationResults || validationStatus !== 'passed') {
      toast.error("Cannot launch until all verification checks pass");
      return;
    }
    
    const success = await launchFirstCustomerFlow();
    
    if (success) {
      toast.success("Launch successful! Your system is now live.");
    } else {
      toast.error("Launch failed. Please check the logs and try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Launch Verification</h1>
          <p className="text-muted-foreground">
            Verify your system is ready for production
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleRunValidation}
            disabled={isChecking}
          >
            Run Validation
          </Button>
          
          <Button 
            onClick={handleLaunch}
            disabled={isLaunching || validationStatus !== 'passed'}
          >
            {isLaunching ? "Launching..." : "Launch System"}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>System Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="verification" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="verification">Verification</TabsTrigger>
                  <TabsTrigger value="launch">Launch Process</TabsTrigger>
                </TabsList>
                <TabsContent value="verification">
                  <VerificationContent 
                    results={validationResults}
                    isChecking={isChecking}
                  />
                </TabsContent>
                <TabsContent value="launch">
                  <LaunchProgress 
                    isLaunching={isLaunching}
                    currentStep={launchStep}
                    isComplete={isComplete}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <LaunchInfoBox 
            lastCheckTime={lastCheckTime}
            status={validationStatus}
            onRunCheck={handleRunValidation}
            isChecking={isChecking}
          />
        </div>
      </div>
    </div>
  );
}
