import React, { useState } from 'react';
import { useSocialMedia } from '@/hooks/useSocialMedia';
import { PostsDisplay } from '../PostsDisplay';
import { Card, CardContent } from '@/components/ui/card';
import SocialMediaPostForm from '../SocialMediaPostForm';
import { Dialog, DialogContent } from '@/components/ui/dialog';
export function SocialMediaContent() {
    const { posts, loading, error, view, currentMonth, createPost, updatePost, deletePost, schedule, approve, refreshPosts, isCreateDialogOpen, openCreateDialog, closeCreateDialog } = useSocialMedia();
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
        }
        catch (err) {
            return { success: false, error: 'Failed to create post' };
        }
    };
    // Submit handler for post editing
    const handleEditSubmit = async (formData) => {
        try {
            if (!editPost)
                return { success: false, error: 'No post to edit' };
            await updatePost(editPost.id, formData);
            closeEditDialog();
            return { success: true };
        }
        catch (err) {
            return { success: false, error: 'Failed to update post' };
        }
    };
    // Delete handler
    const handleDeletePost = async (postId) => {
        await deletePost(postId);
    };
    // Schedule handler
    const handleSchedulePost = async (postId) => {
        await schedule(postId);
    };
    // Approve handler
    const handleApprovePost = async (postId) => {
        await approve(postId);
    };
    return (<Card>
      <CardContent className="p-0 md:p-6">
        <PostsDisplay view={view} posts={posts} currentMonth={currentMonth} isLoading={loading} error={error ? new Error(error) : null} onEditPost={handleEditPost} onDeletePost={handleDeletePost} onSchedulePost={handleSchedulePost} onApprovePost={handleApprovePost} onCreatePost={openCreateDialog} onRefresh={refreshPosts}/>

        {/* Create Post Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={(open) => !open && closeCreateDialog()}>
          <DialogContent>
            <SocialMediaPostForm onSubmit={handleCreateSubmit} isSubmitting={loading} onClose={closeCreateDialog}/>
          </DialogContent>
        </Dialog>

        {/* Edit Post Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={(open) => !open && closeEditDialog()}>
          <DialogContent>
            {editPost && (<SocialMediaPostForm post={editPost} onSubmit={handleEditSubmit} isSubmitting={loading} onClose={closeEditDialog}/>)}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>);
}
