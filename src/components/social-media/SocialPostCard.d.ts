interface SocialPostCardProps {
  post: {
    id: string;
    title?: string;
    content: string;
    platform?: string;
    status?: string;
    scheduled_date?: string;
    published_date?: string;
    created_at: string;
    media_urls?: string[];
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSchedule?: (id: string) => void;
  onPublish?: (id: string) => void;
}
export declare function SocialPostCard({
  post,
  onEdit,
  onDelete,
  onSchedule,
  onPublish,
}: SocialPostCardProps): JSX.Element;
export {};
