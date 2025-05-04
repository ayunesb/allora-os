import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReadinessChecklist from "@/components/admin/ReadinessChecklist";
import { AlertCircle, CheckCircle, FileText, Rocket } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export default function LaunchPlan() {
    const [launchState, setLaunchState] = React.useState('preparing');
    const handleLaunch = () => {
        // This would actually trigger the launch sequence
        setLaunchState('launched');
        toast.success("🚀 Allora AI has been successfully launched!", {
            description: "The platform is now live for all users.",
        });
    };
    return (<div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Launch Plan</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive implementation plan and launch readiness
          </p>
        </div>
        
        {launchState === 'ready' ? (<AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="gap-2">
                <Rocket className="h-4 w-4"/>
                Launch Platform
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you ready to launch?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will make Allora AI available to all users. Ensure all critical 
                  implementation items are complete before proceeding.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLaunch}>Launch</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>) : launchState === 'launched' ? (<Button variant="outline" className="gap-2 text-green-600" disabled>
            <CheckCircle className="h-4 w-4"/>
            Platform Launched
          </Button>) : (<Button variant="outline" className="gap-2" disabled>
            <AlertCircle className="h-4 w-4"/>
            Not Ready to Launch
          </Button>)}
      </div>
      
      <Card className="bg-amber-50 border-amber-200 p-4">
        <div className="flex items-start gap-3">
          <FileText className="h-6 w-6 text-amber-600 mt-0.5 shrink-0"/>
          <div>
            <h3 className="font-medium text-amber-800 mb-1">Launch Plan Overview</h3>
            <p className="text-amber-700 text-sm">
              This dashboard tracks the implementation progress for Allora AI launch. 
              Complete all critical items before launching the platform. Run the validation 
              check to ensure all systems are ready.
            </p>
          </div>
        </div>
      </Card>
      
      <Tabs defaultValue="checklist" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="checklist">Checklist</TabsTrigger>
          <TabsTrigger value="executive-collective">Executive Collective</TabsTrigger>
          <TabsTrigger value="technical">Technical Infrastructure</TabsTrigger>
        </TabsList>
        
        <TabsContent value="checklist" className="mt-6">
          <ReadinessChecklist />
        </TabsContent>
        
        <TabsContent value="executive-collective" className="mt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Executive Collective</h2>
              <p className="text-muted-foreground">
                Implementation of 100 virtual executives with specialized expertise
              </p>
            </div>
            
            <div className="bg-secondary/40 border border-border/50 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Executive Collective Implementation</h3>
              <p className="text-muted-foreground mb-6">
                The executive collective feature is being implemented as part of the
                launch plan. Check the Checklist tab for specific implementation items.
              </p>
              <Button variant="outline" onClick={() => document.querySelector('[value="checklist"]')?.dispatchEvent(new Event('click'))}>
                View Checklist
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="technical" className="mt-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Technical Infrastructure</h2>
              <p className="text-muted-foreground">
                Database, API integrations, and security implementation
              </p>
            </div>
            
            <div className="bg-secondary/40 border border-border/50 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold mb-2">Technical Implementation</h3>
              <p className="text-muted-foreground mb-6">
                Technical infrastructure implementation is tracked as part of the
                launch plan. Check the Checklist tab for specific implementation items.
              </p>
              <Button variant="outline" onClick={() => document.querySelector('[value="checklist"]')?.dispatchEvent(new Event('click'))}>
                View Checklist
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>);
}
