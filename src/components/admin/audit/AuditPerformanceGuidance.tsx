
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Zap, BarChart3 } from 'lucide-react';

interface PerformanceIssue {
  id: string;
  title: string;
  description: string;
  solution: string;
  impact: 'high' | 'medium' | 'low';
}

export function AuditPerformanceGuidance({ pageLoadTime }: { pageLoadTime: number | null }) {
  // Dynamic optimization guidance based on detected performance
  const getOptimizationGuidance = (): PerformanceIssue[] => {
    const issues: PerformanceIssue[] = [];
    
    // Page load time guidance
    if (pageLoadTime && pageLoadTime > 2) {
      issues.push({
        id: 'slow-load',
        title: 'Slow Page Load Time',
        description: `Your page load time is ${pageLoadTime.toFixed(2)}s, which exceeds the recommended 2s target.`,
        solution: 'Consider using code-splitting, lazy-loading components, and optimizing assets to improve load times.',
        impact: pageLoadTime > 3 ? 'high' : 'medium'
      });
    }
    
    // Check for large bundle size (simulated)
    if (document.querySelectorAll('script').length > 10) {
      issues.push({
        id: 'bundle-size',
        title: 'Large JavaScript Bundle',
        description: 'Your application may have a large JavaScript bundle size.',
        solution: 'Use dynamic imports, tree shaking, and code splitting to reduce bundle size.',
        impact: 'high'
      });
    }
    
    // Check for unoptimized images
    const images = document.querySelectorAll('img');
    let unoptimizedImagesCount = 0;
    
    images.forEach(img => {
      if (!img.getAttribute('loading') && 
          !(img.getAttribute('width') && img.getAttribute('height'))) {
        unoptimizedImagesCount++;
      }
    });
    
    if (unoptimizedImagesCount > 0) {
      issues.push({
        id: 'image-opt',
        title: 'Unoptimized Images',
        description: `${unoptimizedImagesCount} images could be further optimized.`,
        solution: 'Add loading="lazy" attribute and specify width/height to prevent layout shifts. Consider using WebP format.',
        impact: unoptimizedImagesCount > 5 ? 'high' : 'medium'
      });
    }
    
    // Add general performance best practices
    if (issues.length === 0) {
      issues.push({
        id: 'best-practices',
        title: 'Performance Best Practices',
        description: 'Your application is performing well, but here are some best practices to maintain optimal performance.',
        solution: 'Regularly monitor Core Web Vitals, minimize third-party scripts, and implement proper caching strategies.',
        impact: 'low'
      });
    }
    
    return issues;
  };
  
  const performanceIssues = getOptimizationGuidance();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          Performance Optimization Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {performanceIssues.map(issue => (
          <Alert 
            key={issue.id} 
            className={`
              ${issue.impact === 'high' ? 'border-red-200 bg-red-50' : 
                issue.impact === 'medium' ? 'border-amber-200 bg-amber-50' : 
                'border-blue-200 bg-blue-50'}
            `}
          >
            <Lightbulb className={`
              h-4 w-4 
              ${issue.impact === 'high' ? 'text-red-500' : 
                issue.impact === 'medium' ? 'text-amber-500' : 
                'text-blue-500'}
            `} />
            <AlertTitle className="font-medium">
              {issue.title}
              <span className={`
                ml-2 text-xs px-2 py-0.5 rounded-full 
                ${issue.impact === 'high' ? 'bg-red-100 text-red-800' : 
                  issue.impact === 'medium' ? 'bg-amber-100 text-amber-800' : 
                  'bg-blue-100 text-blue-800'}
              `}>
                {issue.impact.charAt(0).toUpperCase() + issue.impact.slice(1)} Impact
              </span>
            </AlertTitle>
            <AlertDescription>
              <div className="mt-2 space-y-2">
                <p>{issue.description}</p>
                <div className="bg-white p-3 rounded border mt-2">
                  <p className="font-medium text-sm flex items-center">
                    <Zap className="h-3 w-3 mr-1 text-primary" /> 
                    Recommended Solution:
                  </p>
                  <p className="text-sm mt-1">{issue.solution}</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        ))}
        
        <div className="bg-muted/30 p-4 rounded-md mt-4">
          <h3 className="text-sm font-medium flex items-center mb-2">
            <BarChart3 className="h-4 w-4 mr-2 text-primary" />
            Performance Benchmarks
          </h3>
          <ul className="space-y-1 text-sm">
            <li>• Page Load Time: &lt; 2 seconds</li>
            <li>• First Contentful Paint: &lt; 1.8 seconds</li>
            <li>• Largest Contentful Paint: &lt; 2.5 seconds</li>
            <li>• First Input Delay: &lt; 100ms</li>
            <li>• Cumulative Layout Shift: &lt; 0.1</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
