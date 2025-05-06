import React, { useState } from "react";
import { useSocialMedia } from "@/hooks/useSocialMedia";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw, CalendarDays, List } from "lucide-react";
export function SocialMediaContent() {
  const {
    posts,
    loading,
    error,
    view,
    currentMonth,
    createPost,
    updatePost,
    deletePost,
    schedule,
    approve,
    refreshPosts,
    isCreateDialogOpen,
    openCreateDialog,
    closeCreateDialog,
  } = useSocialMedia();
  const [editPost, setEditPost] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  // Handle edit post
  const handleEditPost = (post) => {
    setEditPost(post);
    setIsEditDialogOpen(true);
  };
  // Close edit dialog
  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditPost(null);
  };
  // Submit handler for post creation
  const handleCreateSubmit = async (formData) => {
    try {
      await createPost(formData);
      return { success: true };
    } catch (err) {
      return { success: false, error: "Failed to create post" };
    }
  };
  // Submit handler for post editing
  const handleEditSubmit = async (formData) => {
    try {
      if (!editPost) return { success: false, error: "No post to edit" };
      await updatePost(editPost.id, formData);
      closeEditDialog();
      return { success: true };
    } catch (err) {
      return { success: false, error: "Failed to update post" };
    }
  };
  // Placeholder renderer for posts display
  const renderPosts = () => {
    if (loading) {
      return <div className="p-6 text-center">Loading posts...</div>;
    }
    if (error) {
      return <div className="p-6 text-center text-red-500">{error}</div>;
    }
    if (posts.length === 0) {
      return (
        <div className="p-6 text-center">
          <p className="mb-4 text-muted-foreground">No posts found.</p>
          <Button onClick={openCreateDialog}>Create your first post</Button>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-bold">{post.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              {post.platform}
            </p>
            <p className="mb-4">{post.content}</p>
            <div className="flex justify-end gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEditPost(post)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => deletePost(post.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  // Placeholder component for the form
  const SocialMediaPostForm = ({ post, onSubmit, isSubmitting, onClose }) => {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold">
          {post ? "Edit Post" : "Create Post"}
        </h2>
        <div className="space-y-2">
          <div>Form fields would go here</div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={isSubmitting} onClick={() => onSubmit({})}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    );
  };
  return (
    <Card>
      <CardContent className="p-0 md:p-6">
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refreshPosts && refreshPosts()}
              disabled={loading}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <div className="flex border rounded-md">
              <Button
                variant={view === "calendar" ? "default" : "ghost"}
                size="sm"
                className="rounded-r-none"
              >
                <CalendarDays className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="sm"
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button onClick={openCreateDialog} size="sm">
            <PlusCircle className="h-4 w-4 mr-2" />
            New Post
          </Button>
        </div>

        {renderPosts()}

        {/* Create Post Dialog */}
        <Dialog
          open={isCreateDialogOpen}
          onOpenChange={(open) => !open && closeCreateDialog()}
        >
          <DialogContent>
            <SocialMediaPostForm
              onSubmit={handleCreateSubmit}
              isSubmitting={loading}
              onClose={closeCreateDialog}
            />
          </DialogContent>
        </Dialog>

        {/* Edit Post Dialog */}
        <Dialog
          open={isEditDialogOpen}
          onOpenChange={(open) => !open && closeEditDialog()}
        >
          <DialogContent>
            {editPost && (
              <SocialMediaPostForm
                post={editPost}
                onSubmit={handleEditSubmit}
                isSubmitting={loading}
                onClose={closeEditDialog}
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
