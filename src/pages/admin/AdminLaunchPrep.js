import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle, Rocket, AlertTriangle, Clipboard, Clock } from "lucide-react";
export default function AdminLaunchPrep() {
    const launchProgress = 65;
    return (<div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TypographyH1>Launch Preparation</TypographyH1>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            <Clipboard className="h-4 w-4 mr-2"/>
            Export Checklist
          </Button>
          <Button variant="default" className="w-full sm:w-auto">
            <Rocket className="h-4 w-4 mr-2"/>
            Launch Application
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Launch Progress</CardTitle>
          <CardDescription>Complete all necessary steps before launching</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex items-center justify-between">
            <span>{launchProgress}% Complete</span>
            <Badge variant={launchProgress >= 80 ? "default" : "outline"}>
              {launchProgress >= 80 ? "Ready to Launch" : "In Progress"}
            </Badge>
          </div>
          <Progress value={launchProgress} className="h-2"/>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Technical Checklist</CardTitle>
            <CardDescription>Verify all technical requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5"/>
                <div>
                  <p className="font-medium">Database optimization complete</p>
                  <TypographyP>All queries have been optimized for production use</TypographyP>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5"/>
                <div>
                  <p className="font-medium">Security audit passed</p>
                  <TypographyP>All security vulnerabilities have been addressed</TypographyP>
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5"/>
                <div>
                  <p className="font-medium">Performance testing</p>
                  <TypographyP>Load testing shows some concerns under high traffic</TypographyP>
                </div>
              </li>
              <li className="flex items-start">
                <Circle className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0 mt-0.5"/>
                <div>
                  <p className="font-medium">API documentation</p>
                  <TypographyP>Complete API documentation for third-party integrations</TypographyP>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Business Checklist</CardTitle>
            <CardDescription>Verify all business requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5"/>
                <div>
                  <p className="font-medium">Legal approval</p>
                  <TypographyP>Terms of service and privacy policy approved</TypographyP>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5"/>
                <div>
                  <p className="font-medium">Payment integration</p>
                  <TypographyP>Payment processing tested and verified</TypographyP>
                </div>
              </li>
              <li className="flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5"/>
                <div>
                  <p className="font-medium">Marketing materials</p>
                  <TypographyP>Some assets still pending approval</TypographyP>
                </div>
              </li>
              <li className="flex items-start">
                <Circle className="h-5 w-5 mr-2 text-muted-foreground flex-shrink-0 mt-0.5"/>
                <div>
                  <p className="font-medium">Customer support training</p>
                  <TypographyP>Support team needs training on new features</TypographyP>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Launch Timeline</CardTitle>
          <CardDescription>Estimated timeline for launch activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-1/2 before:h-full before:bg-muted">
            <div className="relative pl-8">
              <div className="absolute left-0 rounded-full bg-primary w-6 h-6 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-white"/>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <p className="font-medium">Database Migration</p>
                  <TypographyP>Final database schema updates and data migration</TypographyP>
                </div>
                <Badge variant="outline" className="w-fit flex items-center gap-1">
                  <Clock className="h-3 w-3"/>
                  Completed
                </Badge>
              </div>
            </div>
            
            <div className="relative pl-8">
              <div className="absolute left-0 rounded-full bg-primary w-6 h-6 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-white"/>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <p className="font-medium">Security Audit</p>
                  <TypographyP>Final security checks and penetration testing</TypographyP>
                </div>
                <Badge variant="outline" className="w-fit flex items-center gap-1">
                  <Clock className="h-3 w-3"/>
                  Completed
                </Badge>
              </div>
            </div>
            
            <div className="relative pl-8">
              <div className="absolute left-0 rounded-full bg-yellow-500 w-6 h-6 flex items-center justify-center">
                <Clock className="h-4 w-4 text-white"/>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <p className="font-medium">Performance Optimization</p>
                  <TypographyP>Final performance tuning and optimization</TypographyP>
                </div>
                <Badge variant="outline" className="w-fit flex items-center gap-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                  <Clock className="h-3 w-3"/>
                  In Progress
                </Badge>
              </div>
            </div>
            
            <div className="relative pl-8">
              <div className="absolute left-0 rounded-full bg-muted w-6 h-6 flex items-center justify-center">
                <Circle className="h-4 w-4 text-muted-foreground"/>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div>
                  <p className="font-medium">Go-Live</p>
                  <TypographyP>Official product launch and public announcement</TypographyP>
                </div>
                <Badge variant="outline" className="w-fit flex items-center gap-1">
                  <Clock className="h-3 w-3"/>
                  Scheduled for Apr 20
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);
}
