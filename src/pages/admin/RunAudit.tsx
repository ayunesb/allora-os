
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { performanceMonitor } from '@/utils/performance/performanceMonitor';
import { RunAuditStatus } from '@/components/admin/audit/RunAuditStatus';
import { 
  checkLegalDocuments, 
  checkPerformanceMetrics, 
  checkImageOptimization, 
  checkConsistentBranding, 
  checkAIStrategyGeneration 
} from '@/components/admin/audit/AuditChecks';

export default function RunAudit() {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [auditComplete, setAuditComplete] = React.useState(false);

  useEffect(() => {
    // Start monitoring page load time
    const loadMeasureId = performanceMonitor.startMeasure('audit-page-load');
    
    // This simulates running the audit automatically when the page loads
    const runFullAudit = async () => {
      try {
        toast.info('Starting comprehensive system audit...', {
          duration: 3000,
        });
        
        setProgress(10);
        
        // Run legal documents check
        const legalDocsValid = checkLegalDocuments();
        if (!legalDocsValid) {
          console.warn('Legal documents check failed: Not all required legal documents found');
        }
        
        await new Promise(resolve => setTimeout(resolve, 700));
        setProgress(40);
        
        // Run performance check
        const performanceValid = checkPerformanceMetrics();
        if (!performanceValid) {
          console.warn('Performance check failed: Page load time exceeds 2 seconds');
        }
        
        await new Promise(resolve => setTimeout(resolve, 700));
        setProgress(55);
        
        // Run image optimization check
        const imagesOptimized = checkImageOptimization();
        if (!imagesOptimized) {
          console.warn('Image optimization check failed: Not all images are optimized');
        }
        
        await new Promise(resolve => setTimeout(resolve, 700));
        setProgress(70);
        
        // Run branding check
        const brandingConsistent = checkConsistentBranding();
        if (!brandingConsistent) {
          console.warn('Branding check failed: Inconsistent use of colors, fonts, or missing logo');
        }
        
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(85);
        
        // Check for internal links
        const internalLinks = document.querySelectorAll('a[href^="/"]').length > 5;
        if (!internalLinks) {
          console.warn('Internal links check failed: Not enough internal navigation links found');
        }

        // Check AI Strategy Generation
        const aiStrategyValid = checkAIStrategyGeneration();
        if (!aiStrategyValid) {
          console.warn('AI Strategy Generation check failed: Strategy generator not working properly');
        }
        
        await new Promise(resolve => setTimeout(resolve, 600));
        setProgress(100);
        
        const allPassed = legalDocsValid && performanceValid && imagesOptimized && 
                         brandingConsistent && internalLinks && aiStrategyValid;
        
        if (allPassed) {
          toast.success('All audit checks passed successfully! 🎉', {
            duration: 5000,
          });
        } else {
          toast.success('Audit completed with some warnings. View detailed results.', {
            duration: 5000,
          });
        }
        
        setAuditComplete(true);
        
        // Navigate to the audit results page after completion
        setTimeout(() => {
          navigate('/admin/audit');
        }, 1500);
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
          <RunAuditStatus 
            isRunning={isRunning} 
            progress={progress} 
            auditComplete={auditComplete} 
          />
        </CardContent>
      </Card>
    </div>
  );
}
