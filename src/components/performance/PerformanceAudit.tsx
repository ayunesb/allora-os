
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function PerformanceAudit() {
  const [pageLoadTime, setPageLoadTime] = useState<number | null>(null);
  const [fcp, setFcp] = useState<number | null>(null);
  const [lcp, setLcp] = useState<number | null>(null);
  const [cls, setCls] = useState<number | null>(null);
  
  useEffect(() => {
    // Measure page load time
    if (window.performance && window.performance.timing) {
      const { navigationStart, loadEventEnd } = window.performance.timing;
      const loadTime = loadEventEnd - navigationStart;
      setPageLoadTime(loadTime / 1000); // Convert to seconds
    }
    
    // Set up performance observer to measure Core Web Vitals
    try {
      // Report First Contentful Paint
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const firstEntry = entries[0];
          setFcp(firstEntry.startTime / 1000);
        }
      });
      
      fcpObserver.observe({ type: 'paint', buffered: true });
      
      // Report Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const largestEntry = entries[entries.length - 1];
          setLcp(largestEntry.startTime / 1000);
        }
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      
      // Report Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((entryList) => {
        let clsValue = 0;
        for (const entry of entryList.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        setCls(clsValue);
      });
      
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      
      return () => {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
        clsObserver.disconnect();
      };
    } catch (error) {
      console.error('Performance API not fully supported', error);
    }
  }, []);
  
  const getMetricStatus = (value: number | null, thresholds: [number, number]) => {
    if (value === null) return 'unknown';
    if (value <= thresholds[0]) return 'good';
    if (value <= thresholds[1]) return 'needs-improvement';
    return 'poor';
  };
  
  const getMetricColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-500';
      case 'needs-improvement': return 'text-yellow-500';
      case 'poor': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };
  
  const getProgressColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-500';
      case 'needs-improvement': return 'bg-yellow-500';
      case 'poor': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const pageLoadStatus = getMetricStatus(pageLoadTime, [2, 4]);
  const fcpStatus = getMetricStatus(fcp, [1.8, 3]);
  const lcpStatus = getMetricStatus(lcp, [2.5, 4]);
  const clsStatus = getMetricStatus(cls, [0.1, 0.25]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Page Load Time</span>
              <span className={`text-sm ${getMetricColor(pageLoadStatus)}`}>
                {pageLoadTime !== null ? `${pageLoadTime.toFixed(2)}s` : 'Measuring...'}
              </span>
            </div>
            <Progress value={pageLoadTime !== null ? Math.min(100, 100 - (pageLoadTime / 6) * 100) : 0} 
                     className={`h-2 ${getProgressColor(pageLoadStatus)}`} />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">First Contentful Paint (FCP)</span>
              <span className={`text-sm ${getMetricColor(fcpStatus)}`}>
                {fcp !== null ? `${fcp.toFixed(2)}s` : 'Measuring...'}
              </span>
            </div>
            <Progress value={fcp !== null ? Math.min(100, 100 - (fcp / 5) * 100) : 0} 
                     className={`h-2 ${getProgressColor(fcpStatus)}`} />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Largest Contentful Paint (LCP)</span>
              <span className={`text-sm ${getMetricColor(lcpStatus)}`}>
                {lcp !== null ? `${lcp.toFixed(2)}s` : 'Measuring...'}
              </span>
            </div>
            <Progress value={lcp !== null ? Math.min(100, 100 - (lcp / 6) * 100) : 0} 
                     className={`h-2 ${getProgressColor(lcpStatus)}`} />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Cumulative Layout Shift (CLS)</span>
              <span className={`text-sm ${getMetricColor(clsStatus)}`}>
                {cls !== null ? cls.toFixed(3) : 'Measuring...'}
              </span>
            </div>
            <Progress value={cls !== null ? Math.min(100, 100 - (cls / 0.5) * 100) : 0} 
                     className={`h-2 ${getProgressColor(clsStatus)}`} />
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mt-4">
          <p>Good metrics are shown in green, needs improvement in yellow, and poor in red.</p>
          <p>These metrics are measured in real-time on your current browser session.</p>
        </div>
      </CardContent>
    </Card>
  );
}
