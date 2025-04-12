
import React from 'react';
import { Helmet } from 'react-helmet-async';
import SocialMediaCalendar from '@/components/social-media/SocialMediaCalendar';

/**
 * Social Media Calendar page component
 * Provides a comprehensive calendar for planning and managing social media posts
 */
export default function SocialMediaCalendarPage() {
  return (
    <>
      <Helmet>
        <title>Social Media Calendar - Allora AI</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-6">
        <SocialMediaCalendar />
      </div>
    </>
  );
}
