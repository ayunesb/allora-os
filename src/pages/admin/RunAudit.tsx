
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { performanceMonitor } from '@/utils/performance/performanceMonitor';

export default function RunAudit() {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = React.useState(true);

  useEffect(() => {
    // Start monitoring page load time
    const loadMeasureId = performanceMonitor.startMeasure('audit-page-load');
    
    // This simulates running the audit automatically when the page loads
    const runFullAudit = async () => {
      try {
        toast.info('Starting comprehensive system audit...', {
          duration: 3000,
        });
        
        // Simulate audit process
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        toast.success('Audit completed successfully. View detailed results.', {
          duration: 5000,
        });
        
        // Navigate to the audit results page after completion
        setTimeout(() => {
          navigate('/admin/audit');
        }, 1500); // Reduced from 2000ms to 1500ms for faster response
      } catch (error) {
        console.error('Audit error:', error);
        toast.error('An error occurred during the audit. Please try again.');
      } finally {
        setIsRunning(false);
        // End performance monitoring
        performanceMonitor.endMeasure(loadMeasureId);
      }
    };

    runFullAudit();
    
    // Cleanup
    return () => {
      performanceMonitor.mark('audit-page-unload');
    };
  }, [navigate]);

  return (
    <div className="container py-8 max-w-md mx-auto">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="pb-2 text-center">
          <CardTitle className="text-2xl">System Audit</CardTitle>
        </CardHeader>
        <CardContent className="text-center pt-6">
          {isRunning ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Running Full Audit</h3>
                <p className="text-muted-foreground">
                  Checking all systems and components...
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Audit Complete</h3>
              <Button 
                className="w-full" 
                onClick={() => navigate('/admin/audit')}
              >
                View Detailed Results
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
