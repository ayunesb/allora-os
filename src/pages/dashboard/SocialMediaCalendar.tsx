
import React from 'react';
import SocialMediaCalendar from '@/components/social-media/SocialMediaCalendar';
import { Card } from '@/components/ui/card';

/**
 * Social Media Calendar page component
 * Provides a comprehensive calendar for planning and managing social media posts
 */
export default function SocialMediaCalendarPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <Card className="p-6">
        <SocialMediaCalendar />
      </Card>
    </div>
  );
}
