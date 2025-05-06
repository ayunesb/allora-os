import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow, format } from "date-fns";
import { Calendar, Edit, Trash2, Clock, ArrowUpRight } from "lucide-react";
export function SocialPostCard({
  post,
  onEdit,
  onDelete,
  onSchedule,
  onPublish,
}) {
  const {
    id,
    title,
    content,
    platform = "All Platforms",
    status = "Draft",
    scheduled_date,
    published_date,
    created_at,
    media_urls = [],
  } = post;
  const isDraft = status === "draft" || status === "Draft";
  const isScheduled = status === "scheduled" || status === "Scheduled";
  const isPublished = status === "published" || status === "Published";
  // Safely format dates with fallbacks
  const getFormattedDate = (dateString) => {
    if (!dateString) return "Not set";
    try {
      return format(new Date(dateString), "MMM d, yyyy h:mm a");
    } catch (e) {
      return "Invalid date";
    }
  };
  const getTimeAgo = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return "Unknown time";
    }
  };
  const scheduledDate = scheduled_date
    ? getFormattedDate(scheduled_date)
    : "Not scheduled";
  const publishedDate = published_date
    ? getFormattedDate(published_date)
    : "Not published";
  const createdAt = getTimeAgo(created_at);
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-lg">{title || "Untitled Post"}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{platform}</span>
              <span>•</span>
              <span
                className={`
                ${isPublished ? "text-green-600" : ""}
                ${isScheduled ? "text-blue-600" : ""}
                ${isDraft ? "text-amber-600" : ""}
              `}
              >
                {status}
              </span>
            </div>
          </div>

          <div>
            {isDraft && onSchedule && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSchedule(id)}
                className="mr-2"
              >
                <Clock className="h-4 w-4 mr-1" />
                Schedule
              </Button>
            )}

            {(isDraft || isScheduled) && onPublish && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPublish(id)}
                className="mr-2"
              >
                <ArrowUpRight className="h-4 w-4 mr-1" />
                Publish
              </Button>
            )}
          </div>
        </div>

        <p className="text-sm mb-3 line-clamp-3">{content}</p>

        {media_urls.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {media_urls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Media for ${title || "post"}`}
                className="h-20 w-20 object-cover rounded"
              />
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          {scheduled_date && (
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {scheduledDate}
            </div>
          )}

          {published_date && (
            <div className="flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              {publishedDate}
            </div>
          )}

          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            Created {createdAt}
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 py-3 border-t bg-muted/30 flex justify-end">
        <Button variant="ghost" size="sm" onClick={() => onEdit(id)}>
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(id)}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
