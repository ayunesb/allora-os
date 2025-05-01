import React, { useState, useEffect } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Edit, Trash2 } from "lucide-react";
import { SocialMediaPost } from '@/types';
import { useSocialMedia } from '@/hooks/useSocialMedia';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import SocialMediaPostForm from '../SocialMediaPostForm';
import AlertMessage from '@/components/ui/AlertMessage';

interface SocialMediaCalendarProps {
  companyId?: string;
  filters?: {
    platform?: string;
    status?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
  };
  onCreatePost?: () => void;
}

const LoadingState = () => (
  <div className="space-y-4">
    <Skeleton className="h-10 w-32" />
    <Skeleton className="h-40 w-full" />
    <Skeleton className="h-8 w-24" />
    <Skeleton className="h-6 w-full" />
  </div>
);

const EmptyState = ({ onCreatePost }: { onCreatePost?: () => void }) => (
  <div className="flex flex-col items-center justify-center h-64">
    <p className="text-muted-foreground mb-4">No posts scheduled for this period.</p>
    {onCreatePost && (
      <Button onClick={onCreatePost}>
        <Plus className="mr-2 h-4 w-4" />
        Create First Post
      </Button>
    )}
  </div>
);

export function SocialMediaContent({ companyId, filters, onCreatePost }: SocialMediaCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<SocialMediaPost | null>(null);
  const { posts, isLoading, error, fetchPosts, deletePost } = useSocialMedia();

  useEffect(() => {
    if (companyId) {
      const formattedDate = date ? format(date, 'yyyy-MM-dd') : undefined;
      fetchPosts(companyId, { ...filters, startDate: formattedDate, endDate: formattedDate });
    }
  }, [companyId, date, filters, fetchPosts]);

  const handleCreateDialogOpen = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false);
    fetchPosts(companyId, { ...filters, startDate: format(date, 'yyyy-MM-dd'), endDate: format(date, 'yyyy-MM-dd') });
  };

  const handleEditDialogOpen = (post: SocialMediaPost) => {
    setSelectedPost(post);
    setIsEditDialogOpen(true);
  };

  const handleEditDialogOpenClose = () => {
    setIsEditDialogOpen(false);
    setSelectedPost(null);
    fetchPosts(companyId, { ...filters, startDate: format(date, 'yyyy-MM-dd'), endDate: format(date, 'yyyy-MM-dd') });
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(postId);
        fetchPosts(companyId, { ...filters, startDate: format(date, 'yyyy-MM-dd'), endDate: format(date, 'yyyy-MM-dd') });
      } catch (deleteError: any) {
        alert(`Failed to delete post: ${deleteError.message || 'Unknown error'}`);
      }
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (error !== null) {
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <AlertMessage 
            title="Error Loading Calendar" 
            description={error.message || "Failed to load social media calendar"} 
          />
        </div>
      );
    }

    if (!posts || posts.length === 0) {
      return <EmptyState onCreatePost={onCreatePost} />;
    }

    return posts.map((post) => (
      <Card key={post.id} className="mb-4">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {post.title || 'Social Media Post'}
            <Badge variant="secondary">{post.platform}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{post.content.substring(0, 100)}...</p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Scheduled: {post.scheduled_at ? format(new Date(post.scheduled_at), 'Pp') : 'N/A'}
            </p>
            <div>
              <Button variant="ghost" size="sm" onClick={() => handleEditDialogOpen(post)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleDeletePost(post.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Social Media Calendar</h3>
        <Button onClick={handleCreateDialogOpen}>
          <Plus className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>

      <div className="rounded-md border">
        <CalendarHeader date={date} setDate={setDate} />
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="border-none shadow-none"
        />
      </div>

      {renderContent()}

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Social Media Post</DialogTitle>
            <DialogDescription>
              Schedule a new social media post for your company.
            </DialogDescription>
          </DialogHeader>
          <SocialMediaPostForm onClose={handleCreateDialogClose} />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Social Media Post</DialogTitle>
            <DialogDescription>
              Edit an existing social media post for your company.
            </DialogDescription>
          </DialogHeader>
          <SocialMediaPostForm post={selectedPost} onClose={handleEditDialogOpenClose} />
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface CalendarHeaderProps {
  date: Date;
  setDate: (date: Date) => void;
}

function CalendarHeader({ date, setDate }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex flex-col space-y-1.5 text-center sm:text-left">
        <h2 className="text-lg font-semibold">
          {format(date, "MMMM yyyy")}
        </h2>
        <p className="text-muted-foreground">
          Select a day to view scheduled posts
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()))}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()))}
        >
          Next
          <CalendarIcon className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
