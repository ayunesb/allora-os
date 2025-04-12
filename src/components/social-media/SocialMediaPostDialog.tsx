
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import SocialMediaPostForm from './SocialMediaPostForm';
import { SocialMediaPost } from '@/types/socialMedia';

interface DialogEditProps {
  post: SocialMediaPost;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
}

interface DialogCreateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => Promise<{ success: boolean; error?: string }>;
}

/**
 * Dialog component for editing a social media post
 */
export function DialogEdit({ post, open, onOpenChange, onSubmit }: DialogEditProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    const result = await onSubmit(data);
    setIsSubmitting(false);
    return result;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Social Media Post</DialogTitle>
          <DialogDescription>
            Make changes to your social media post and save when done.
          </DialogDescription>
        </DialogHeader>
        
        <SocialMediaPostForm
          post={post}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}

/**
 * Dialog component for creating a new social media post
 */
export function DialogCreate({ open, onOpenChange, onSubmit }: DialogCreateProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    const result = await onSubmit(data);
    setIsSubmitting(false);
    return result;
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Social Media Post</DialogTitle>
          <DialogDescription>
            Create a new post for your social media calendar.
          </DialogDescription>
        </DialogHeader>
        
        <SocialMediaPostForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
}
