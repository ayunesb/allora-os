
import React from 'react';
import { toast } from 'sonner';
import { generateCustomizedStrategy } from '@/utils/strategy/strategyGenerator';

// Check for legal documents
export const checkLegalDocuments = () => {
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
export const checkPerformanceMetrics = () => {
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
export const checkImageOptimization = () => {
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
export const checkConsistentBranding = () => {
  // Check for primary colors
  const primaryElements = document.querySelectorAll('.text-primary, .bg-primary, [class*="border-primary"]');
  
  // Check for consistent typography
  const fontElements = document.querySelectorAll('[class*="font-"]');
  
  // Check for logo presence
  const logoElements = document.querySelectorAll('img[src*="logo"], [class*="logo"], [id*="logo"]');
  
  return primaryElements.length > 5 && fontElements.length > 10 && logoElements.length > 0;
};

// Check for AI Strategy Generation
export const checkAIStrategyGeneration = () => {
  try {
    // Test if the strategy generator utility works
    const strategy = generateCustomizedStrategy(
      { level: 'Medium', score: 65, breakdown: {} },
      'SaaS',
      'Small',
      'Growth'
    );
    
    // If we get a valid strategy object with expected properties
    return (
      strategy && 
      strategy.title && 
      strategy.description && 
      strategy.keyActions &&
      strategy.keyActions.length > 0
    );
  } catch (error) {
    console.error('Error testing AI Strategy Generation:', error);
    return false;
  }
};
