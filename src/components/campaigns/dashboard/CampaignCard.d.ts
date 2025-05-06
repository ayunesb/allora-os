interface CampaignCardProps {
  campaign: {
    id: string;
    name: string;
    description?: string;
    status: "draft" | "active" | "paused" | "completed" | string;
    startDate?: string;
    endDate?: string;
    budget?: number;
    platform?: string;
    metrics?: {
      impressions?: number;
      clicks?: number;
      conversions?: number;
    };
    createdAt: string;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onViewAnalytics: (id: string) => void;
  onStatusChange?: (id: string, status: string) => void;
}
export declare function CampaignCard({
  campaign,
  onEdit,
  onDelete,
  onViewAnalytics,
  onStatusChange,
}: CampaignCardProps): JSX.Element;
export {};
