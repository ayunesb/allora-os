
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { performanceMonitor } from '@/utils/performance/performanceMonitor';
import { Button } from '@/components/ui/button';
import { Zap, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function TechnicalImprovementsPage() {
  const [measurements, setMeasurements] = React.useState(performanceMonitor.getAllMeasurements());
  
  const refreshMeasurements = () => {
    setMeasurements(performanceMonitor.getAllMeasurements());
    toast.success("Performance measurements refreshed");
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Technical Improvements</h1>
          <p className="text-muted-foreground">
            Monitor and optimize application performance
          </p>
        </div>
        
        <Button onClick={refreshMeasurements}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-amber-500" />
            Performance Monitoring
          </CardTitle>
          <CardDescription>
            View application performance metrics and measurements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>Performance measurements will be displayed here. Use the performance monitoring utilities to track application performance.</p>
            
            <pre className="bg-muted p-4 rounded-md text-sm overflow-auto">
              {JSON.stringify(measurements, null, 2)}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
