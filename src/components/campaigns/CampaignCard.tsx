
import { useState } from "react";
import { Campaign } from "@/models/campaign";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadIcon, Edit, Facebook, Linkedin, Mail, MoreHorizontal, ThumbsDown, ThumbsUp, Trash2, Twitter } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatCurrency, formatPercent } from "@/utils/formatters";

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onFeedback: (id: string, isPositive: boolean) => void;
  onExport: (id: string, format: 'pdf' | 'csv') => void;
}

export default function CampaignCard({ 
  campaign, 
  onEdit, 
  onDelete,
  onFeedback,
  onExport
}: CampaignCardProps) {
  const [isLiked, setIsLiked] = useState<boolean | null>(null);

  // Get platform icon
  const getPlatformIcon = () => {
    switch (campaign.platform) {
      case 'Facebook':
        return <Facebook className="h-4 w-4" />;
      case 'LinkedIn':
        return <Linkedin className="h-4 w-4" />;
      case 'Twitter':
        return <Twitter className="h-4 w-4" />;
      case 'Email':
        return <Mail className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Get status color
  const getStatusColor = () => {
    switch (campaign.status) {
      case 'Active':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Paused':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Completed':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'Draft':
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  // Generate mock metrics
  const getMetrics = () => {
    const budget = campaign.budget || 1000;
    const clicks = Math.floor(budget * 0.5 * (Math.random() + 0.5));
    const impressions = clicks * (Math.floor(Math.random() * 20) + 10);
    const ctr = impressions > 0 ? clicks / impressions : 0;
    const leads = Math.floor(clicks * (Math.random() * 0.1 + 0.01));
    const convRate = clicks > 0 ? leads / clicks : 0;
    
    return {
      clicks,
      impressions,
      ctr,
      leads,
      convRate,
      cpl: leads > 0 ? budget / leads : 0,
      progress: Math.min(100, Math.floor(Math.random() * 100)),
      health: Math.random() > 0.7 ? 'warning' : Math.random() > 0.9 ? 'critical' : 'good'
    };
  };

  const metrics = getMetrics();

  // Handle like/dislike
  const handleFeedback = (isPositive: boolean) => {
    setIsLiked(isPositive);
    onFeedback(campaign.id, isPositive);
  };

  // Safely get avatar name for URL
  const getAvatarName = () => {
    if (!campaign.executiveBot) return '';
    return typeof campaign.executiveBot === 'string' 
      ? campaign.executiveBot.toLowerCase().replace(/\s+/g, '-')
      : '';
  };

  // Safely get avatar initials
  const getAvatarInitials = () => {
    if (!campaign.executiveBot) return '';
    return typeof campaign.executiveBot === 'string'
      ? campaign.executiveBot.charAt(0)
      : '';
  };

  return (
    <Card className="overflow-hidden border-l-4 border-l-primary">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-semibold">{campaign.name}</h3>
            {campaign.status && (
              <Badge variant="outline" className={getStatusColor()}>
                {campaign.status}
              </Badge>
            )}
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onEdit(campaign.id)}>
                <Edit className="mr-2 h-4 w-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onExport(campaign.id, 'pdf')}>
                <DownloadIcon className="mr-2 h-4 w-4" /> Export PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onExport(campaign.id, 'csv')}>
                <DownloadIcon className="mr-2 h-4 w-4" /> Export CSV
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDelete(campaign.id)} className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          {getPlatformIcon()}
          <span className="ml-1 mr-3">{campaign.platform}</span>
          <span className="font-medium">{formatCurrency(campaign.budget || 0)}</span>
          {campaign.executiveBot && (
            <div className="ml-auto flex items-center">
              <Avatar className="h-5 w-5 mr-1">
                <AvatarImage src={`/avatars/${getAvatarName()}.png`} />
                <AvatarFallback>{getAvatarInitials()}</AvatarFallback>
              </Avatar>
              <span className="text-xs">AI Managed</span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Campaign Progress</span>
            <span>{metrics.progress}%</span>
          </div>
          <Progress value={metrics.progress} className="h-2" />
        </div>
        
        {/* Metrics */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Leads:</span>
            <span className="font-medium">{metrics.leads}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Clicks:</span>
            <span className="font-medium">{metrics.clicks}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">CTR:</span>
            <span className="font-medium">{formatPercent(metrics.ctr)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Conv Rate:</span>
            <span className="font-medium">{formatPercent(metrics.convRate)}</span>
          </div>
        </div>
        
        {/* Health status */}
        <div className="mt-4 flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`rounded-full h-2.5 w-2.5 mr-2 ${
                  metrics.health === 'good' 
                    ? 'bg-green-500' 
                    : metrics.health === 'warning' 
                    ? 'bg-yellow-500' 
                    : 'bg-red-500'
                }`} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Campaign Health: {metrics.health === 'good' 
                  ? 'Good - performing well' 
                  : metrics.health === 'warning' 
                  ? 'Warning - needs attention' 
                  : 'Critical - urgent action needed'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-xs">
            {metrics.health === 'good' 
              ? 'Campaign is performing well' 
              : metrics.health === 'warning' 
              ? 'CTR below target - needs optimization' 
              : 'High CPA - urgent review needed'}
          </span>
        </div>
        
        {/* AI Recommendation */}
        {campaign.justification && (
          <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-md">
            <div className="flex items-start">
              {campaign.executiveBot && (
                <Avatar className="h-7 w-7 mr-2">
                  <AvatarImage src={`/avatars/${getAvatarName()}.png`} />
                  <AvatarFallback>{getAvatarInitials()}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <p className="text-xs">{campaign.justification}</p>
                <div className="flex items-center mt-2">
                  {campaign.executiveBot && (
                    <span className="text-xs text-muted-foreground mr-2">
                      — {campaign.executiveBot}
                    </span>
                  )}
                  
                  {/* Feedback buttons */}
                  {isLiked === null && (
                    <div className="flex items-center ml-auto">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 rounded-full"
                        onClick={() => handleFeedback(true)}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        <span className="sr-only">Like</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 rounded-full ml-1"
                        onClick={() => handleFeedback(false)}
                      >
                        <ThumbsDown className="h-3.5 w-3.5" />
                        <span className="sr-only">Dislike</span>
                      </Button>
                    </div>
                  )}
                  
                  {isLiked !== null && (
                    <span className="text-xs text-muted-foreground ml-auto">
                      Feedback recorded
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="border-t pt-3 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(campaign.id)}
          className="flex-1"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(campaign.id)}
          className="flex-1 text-destructive hover:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
