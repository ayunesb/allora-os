
import React from 'react';
import SocialMediaCalendar from '@/components/social-media/SocialMediaCalendar';
import { Card } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import { useBreakpoint } from '@/hooks/use-mobile';
import useMediaQuery from '@/hooks/useMediaQuery';
import { AccessibilityProvider } from '@/context/AccessibilityContext';

/**
 * Social Media Calendar page component
 * Provides a comprehensive calendar for planning and managing social media posts
 */
export default function SocialMediaCalendarPage() {
  const breakpoint = useBreakpoint();
  const isMobile = ['xs', 'mobile'].includes(breakpoint);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  return (
    <>
      <Helmet>
        <title>Social Media Calendar | Allora AI</title>
        <meta name="description" content="Plan and manage your social media content calendar" />
      </Helmet>
      
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <Card 
          className={isMobile ? "p-3" : "p-6"} 
          role="region" 
          aria-label="Social Media Calendar"
        >
          <AccessibilityProvider>
            <SocialMediaCalendar />
          </AccessibilityProvider>
        </Card>
      </div>
    </>
  );
}
