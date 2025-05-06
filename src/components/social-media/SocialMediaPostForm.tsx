import React from "react";
const SocialMediaPostForm = ({ post, onSubmit, isSubmitting, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementation here
    onSubmit({
      title: "Test post",
      content: "Test content",
      platform: "LinkedIn",
      scheduled_date: "2025-05-01",
      publish_time: "09:00",
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-medium">
        {post ? "Edit Post" : "Create New Post"}
      </h3>

      <div className="space-y-4">
        {/* Mock form fields */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            className="mt-1 block w-full rounded-md border border-gray-300 p-2"
            defaultValue={post?.title || ""}
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end gap-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            {isSubmitting ? "Saving..." : post ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
};
export default SocialMediaPostForm;
