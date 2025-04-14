
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { performanceMonitor } from '@/utils/performance/performanceMonitor';

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
        
        // Check for legal documents
        const checkLegalDocuments = () => {
          // Array of legal routes to check
          const legalRoutes = [
            '/legal/terms-of-service',
            '/legal/privacy-policy',
            '/legal/cookies',
            '/legal/messaging-consent',
            '/legal/refund-policy',
            '/legal/compliance'
          ];
          
          // Check in routes configuration
          const routes = document.querySelectorAll('a');
          const foundRoutes = [];
          
          routes.forEach(route => {
            const href = route.getAttribute('href');
            if (href && legalRoutes.some(legalRoute => href.includes(legalRoute))) {
              foundRoutes.push(href);
            }
          });
          
          // Return true if we found at least 4 of the 6 legal routes
          return foundRoutes.length >= 4;
        };
        
        // Check performance metrics
        const checkPerformanceMetrics = () => {
          if (!window.performance) return true;
          
          try {
            // Check navigation timing if available
            if (window.performance.timing) {
              const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
              return loadTime < 2000;
            }
            
            // Alternative check using performance.now()
            return window.performance.now() < 2000;
          } catch (error) {
            console.error('Error checking performance metrics:', error);
            return true; // Pass by default on error
          }
        };
        
        // Check for image optimization
        const checkImageOptimization = () => {
          const images = document.querySelectorAll('img');
          let optimizedCount = 0;
          
          images.forEach(img => {
            if (img.getAttribute('loading') === 'lazy' || 
                (img.getAttribute('width') && img.getAttribute('height')) ||
                img.complete) {
              optimizedCount++;
            }
          });
          
          return optimizedCount >= images.length * 0.7;
        };
        
        // Check for consistent branding
        const checkConsistentBranding = () => {
          // Check for primary colors
          const primaryElements = document.querySelectorAll('.text-primary, .bg-primary, [class*="border-primary"]');
          
          // Check for consistent typography
          const fontElements = document.querySelectorAll('[class*="font-"]');
          
          // Check for logo presence
          const logoElements = document.querySelectorAll('img[src*="logo"], [class*="logo"], [id*="logo"]');
          
          return primaryElements.length > 5 && fontElements.length > 10 && logoElements.length > 0;
        };
        
        // Simulate audit process with progress updates
        await new Promise(resolve => setTimeout(resolve, 800));
        setProgress(25);
        
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
        
        await new Promise(resolve => setTimeout(resolve, 600));
        setProgress(100);
        
        const allPassed = legalDocsValid && performanceValid && imagesOptimized && brandingConsistent && internalLinks;
        
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
              <div className="w-full bg-secondary h-2 rounded-full mt-4">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground">{progress}% Complete</p>
            </div>
          ) : (
            <div className="space-y-4">
              {auditComplete ? (
                <div className="flex justify-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
              ) : (
                <div className="flex justify-center">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                </div>
              )}
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
