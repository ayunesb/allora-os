import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
export function SocialMediaHeader({ onCreatePost }) {
    return (<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold">Social Media Calendar</h1>
        <p className="text-muted-foreground mt-1">
          Plan, schedule, and manage your social media content
        </p>
      </div>
      
      <Button onClick={onCreatePost}>
        <Plus className="mr-2 h-4 w-4"/>
        Create Post
      </Button>
    </div>);
}
