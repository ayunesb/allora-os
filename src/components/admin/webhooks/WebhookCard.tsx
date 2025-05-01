
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, ExternalLink, Clock } from 'lucide-react';

interface Webhook {
  id: string;
  type: string;
  url: string;
  created_at?: string;
}

interface WebhookCardProps {
  webhook: Webhook;
  onEdit: (webhook: Webhook) => void;
  onDelete: (webhookId: string) => void;
  onTest: (webhookId: string) => void;
}

export default function WebhookCard({ webhook, onEdit, onDelete, onTest }: WebhookCardProps) {
  const formatWebhookType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const truncateUrl = (url: string) => {
    return url.length > 40 ? `${url.substring(0, 40)}...` : url;
  };

  const getWebhookBadgeColor = (type: string) => {
    switch (type) {
      case 'strategy_created':
        return 'bg-blue-100 text-blue-800';
      case 'campaign_updated':
        return 'bg-green-100 text-green-800';
      case 'lead_captured':
        return 'bg-yellow-100 text-yellow-800';
      case 'payment_received':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            <Badge className={`${getWebhookBadgeColor(webhook.type)}`}>
              {formatWebhookType(webhook.type)}
            </Badge>
          </CardTitle>
          {webhook.created_at && (
            <div className="text-xs text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {new Date(webhook.created_at).toLocaleDateString()}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">URL:</span>{' '}
            <a 
              href={webhook.url} 
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline flex items-center"
            >
              <span className="truncate">{truncateUrl(webhook.url)}</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onTest(webhook.id)}
        >
          Test
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onEdit(webhook)}
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => onDelete(webhook.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
