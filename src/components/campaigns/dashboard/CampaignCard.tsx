
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow, format } from 'date-fns';
import { BarChart2, Calendar, Edit, Trash2, PlayCircle, PauseCircle, CheckCircle } from 'lucide-react';

interface CampaignCardProps {
  campaign: {
    id: string;
    name: string;
    description?: string;
    status: 'draft' | 'active' | 'paused' | 'completed' | string;
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

export function CampaignCard({ 
  campaign, 
  onEdit, 
  onDelete, 
  onViewAnalytics,
  onStatusChange 
}: CampaignCardProps) {
  const {
    id,
    name,
    description,
    status,
    startDate,
    endDate,
    budget,
    platform = 'All Platforms',
    metrics,
    createdAt
  } = campaign;

  // Format dates with fallbacks
  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return null;
    }
  };

  const timeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'some time ago';
    }
  };

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  const dateRange = formattedStartDate && formattedEndDate 
    ? `${formattedStartDate} - ${formattedEndDate}`
    : formattedStartDate 
      ? `Started ${formattedStartDate}` 
      : 'No dates set';

  const isDraft = status === 'draft';
  const isActive = status === 'active';
  const isPaused = status === 'paused';
  const isCompleted = status === 'completed';

  const statusColor = {
    draft: 'bg-gray-200 text-gray-800',
    active: 'bg-green-100 text-green-800',
    paused: 'bg-amber-100 text-amber-800',
    completed: 'bg-blue-100 text-blue-800'
  };

  const getStatusColor = () => {
    if (isDraft) return statusColor.draft;
    if (isActive) return statusColor.active;
    if (isPaused) return statusColor.paused;
    if (isCompleted) return statusColor.completed;
    return statusColor.draft;
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-lg">{name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{platform}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor()}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewAnalytics(id)}
          >
            <BarChart2 className="h-4 w-4 mr-1" />
            Analytics
          </Button>
        </div>
        
        {description && (
          <p className="text-sm mb-3">{description}</p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          {metrics && (
            <>
              <div className="bg-muted p-2 rounded text-center">
                <p className="text-xs text-muted-foreground">Impressions</p>
                <p className="font-medium">{metrics.impressions?.toLocaleString() || '0'}</p>
              </div>
              
              <div className="bg-muted p-2 rounded text-center">
                <p className="text-xs text-muted-foreground">Clicks</p>
                <p className="font-medium">{metrics.clicks?.toLocaleString() || '0'}</p>
              </div>
              
              <div className="bg-muted p-2 rounded text-center">
                <p className="text-xs text-muted-foreground">Conversions</p>
                <p className="font-medium">{metrics.conversions?.toLocaleString() || '0'}</p>
              </div>
            </>
          )}
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
          {budget && (
            <div>
              <span className="font-medium">Budget:</span> ${budget.toLocaleString()}
            </div>
          )}
          
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {dateRange}
          </div>
          
          <div>
            Created {timeAgo(createdAt)}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-4 py-3 border-t bg-muted/30 flex justify-between">
        {onStatusChange && (
          <div className="flex space-x-2">
            {isDraft && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onStatusChange(id, 'active')}
              >
                <PlayCircle className="h-4 w-4 mr-1" />
                Activate
              </Button>
            )}
            
            {isActive && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onStatusChange(id, 'paused')}
              >
                <PauseCircle className="h-4 w-4 mr-1" />
                Pause
              </Button>
            )}
            
            {isPaused && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onStatusChange(id, 'active')}
              >
                <PlayCircle className="h-4 w-4 mr-1" />
                Resume
              </Button>
            )}
            
            {!isCompleted && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onStatusChange(id, 'completed')}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Complete
              </Button>
            )}
          </div>
        )}
        
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onEdit(id)}
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDelete(id)}
            className="text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
