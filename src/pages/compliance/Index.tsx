
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RefreshCw, Calendar } from "lucide-react";
import ComplianceLayout from "@/components/ComplianceLayout";
import ComplianceUpdateNotification from "@/components/compliance/ComplianceUpdateNotification";
import { useCompliance } from "@/context/ComplianceContext";
import React, { useState } from "react";

export default function ComplianceOverview() {
  // Mock compliance scores
  const complianceScores = {
    gdpr: 87,
    hipaa: 92,
    pci: 78,
    sox: 85
  };
  
  const { 
    pendingUpdates, 
    checkForUpdates, 
    isCheckingUpdates,
    scheduleComplianceCheck
  } = useCompliance();
  
  const [scheduleDays, setScheduleDays] = useState(5);
  const [isScheduling, setIsScheduling] = useState(false);
  
  const handleScheduleCheck = async () => {
    setIsScheduling(true);
    try {
      await scheduleComplianceCheck(scheduleDays);
    } finally {
      setIsScheduling(false);
    }
  };
  
  return (
    <ComplianceLayout>
      {pendingUpdates.length > 0 && (
        <ComplianceUpdateNotification className="mb-6" />
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
            <CardDescription>Overview of regulatory compliance status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">GDPR</span>
                  <span className="text-sm">{complianceScores.gdpr}%</span>
                </div>
                <Progress value={complianceScores.gdpr} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">HIPAA</span>
                  <span className="text-sm">{complianceScores.hipaa}%</span>
                </div>
                <Progress value={complianceScores.hipaa} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">PCI DSS</span>
                  <span className="text-sm">{complianceScores.pci}%</span>
                </div>
                <Progress value={complianceScores.pci} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">SOX</span>
                  <span className="text-sm">{complianceScores.sox}%</span>
                </div>
                <Progress value={complianceScores.sox} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Required Actions</CardTitle>
            <CardDescription>Urgent compliance issues that need attention</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="p-3 border border-red-300 rounded-md bg-red-50 dark:bg-red-950/20 dark:border-red-900">
                <span className="font-medium block">PCI DSS: Data Encryption</span>
                <span className="text-sm text-muted-foreground">Update encryption standards for payment processing</span>
              </li>
              <li className="p-3 border border-yellow-300 rounded-md bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-900">
                <span className="font-medium block">GDPR: Cookie Consent</span>
                <span className="text-sm text-muted-foreground">Update cookie consent mechanism for EU visitors</span>
              </li>
              <li className="p-3 border border-yellow-300 rounded-md bg-yellow-50 dark:bg-yellow-950/20 dark:border-yellow-900">
                <span className="font-medium block">SOX: Financial Reporting</span>
                <span className="text-sm text-muted-foreground">Complete quarterly financial reporting documents</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Automatic Compliance Checks</CardTitle>
            <CardDescription>Schedule regular checks for regulatory updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>Currently checking every <strong>{scheduleDays} days</strong> for updates</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <label htmlFor="days" className="text-sm">Check frequency (days):</label>
                <select 
                  id="days" 
                  className="border rounded p-1 text-sm"
                  value={scheduleDays}
                  onChange={(e) => setScheduleDays(parseInt(e.target.value))}
                >
                  <option value="1">Daily</option>
                  <option value="3">Every 3 days</option>
                  <option value="5">Every 5 days</option>
                  <option value="7">Weekly</option>
                  <option value="14">Every 2 weeks</option>
                  <option value="30">Monthly</option>
                </select>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={checkForUpdates}
                  disabled={isCheckingUpdates}
                >
                  {isCheckingUpdates ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    "Check Now"
                  )}
                </Button>
                
                <Button
                  size="sm"
                  onClick={handleScheduleCheck}
                  disabled={isScheduling}
                >
                  {isScheduling ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    "Schedule Automatic Checks"
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground mt-2">
                Automatic compliance checks help ensure your legal documents stay up-to-date
                with the latest regulatory requirements.
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Compliance Deadlines</CardTitle>
            <CardDescription>Important dates for regulatory submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="border-l-2 border-muted-foreground/20 absolute h-full left-4"></div>
              <ul className="space-y-6 relative">
                <li className="ml-10 relative">
                  <div className="absolute -left-6 h-4 w-4 rounded-full bg-primary"></div>
                  <span className="font-medium block">GDPR Annual Review</span>
                  <span className="text-sm text-muted-foreground">Due in 30 days - May 25, 2025</span>
                </li>
                <li className="ml-10 relative">
                  <div className="absolute -left-6 h-4 w-4 rounded-full bg-primary"></div>
                  <span className="font-medium block">PCI DSS Certification</span>
                  <span className="text-sm text-muted-foreground">Due in 45 days - June 10, 2025</span>
                </li>
                <li className="ml-10 relative">
                  <div className="absolute -left-6 h-4 w-4 rounded-full bg-primary"></div>
                  <span className="font-medium block">HIPAA Security Assessment</span>
                  <span className="text-sm text-muted-foreground">Due in 60 days - June 25, 2025</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </ComplianceLayout>
  );
}
