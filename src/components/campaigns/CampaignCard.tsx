
import { Campaign } from "@/models/campaign";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Trash2, Download, ThumbsUp, ThumbsDown } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CampaignCardProps {
  campaign: Campaign;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onFeedback?: (id: string, isPositive: boolean) => void;
  onExport?: (id: string, format: 'pdf' | 'csv') => void;
}

export default function CampaignCard({
  campaign,
  onEdit,
  onDelete,
  onFeedback,
  onExport
}: CampaignCardProps) {
  const executiveName = typeof campaign.executiveBot === 'string' 
    ? campaign.executiveBot 
    : campaign.executiveBot?.name || '';
  
  const getStatusColor = () => {
    const status = campaign.status?.toLowerCase();
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-500';
      case 'paused': return 'bg-yellow-500/10 text-yellow-500';
      case 'completed': return 'bg-blue-500/10 text-blue-500';
      case 'draft': return 'bg-gray-500/10 text-gray-500';
      case 'approved': return 'bg-purple-500/10 text-purple-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getHealthColor = () => {
    switch (campaign.healthScore) {
      case 'good': return 'bg-green-500/10 text-green-500';
      case 'warning': return 'bg-yellow-500/10 text-yellow-500';
      case 'critical': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const renderMetrics = () => {
    const metrics = [];
    
    if (campaign.impressions !== undefined) metrics.push(`Impressions: ${campaign.impressions.toLocaleString()}`);
    if (campaign.clicks !== undefined) metrics.push(`Clicks: ${campaign.clicks.toLocaleString()}`);
    if (campaign.leads !== undefined) metrics.push(`Leads: ${campaign.leads}`);
    
    return metrics.length > 0 ? metrics.join(' | ') : 'No metrics available';
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle>{campaign.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Badge 
                variant="outline" 
                className="mr-2"
              >
                {campaign.platform}
              </Badge>
              {campaign.status && (
                <Badge variant="outline" className={getStatusColor()}>
                  {campaign.status}
                </Badge>
              )}
            </CardDescription>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(campaign.id)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              {onExport && (
                <>
                  <DropdownMenuItem onClick={() => onExport(campaign.id, 'pdf')}>
                    <Download className="mr-2 h-4 w-4" />
                    Export as PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onExport(campaign.id, 'csv')}>
                    <Download className="mr-2 h-4 w-4" />
                    Export as CSV
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuItem 
                onClick={() => onDelete(campaign.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-4">
          <div>
            <div className="grid grid-cols-2 gap-y-1 text-sm mb-2">
              <span className="text-muted-foreground">Budget:</span>
              <span>${campaign.budget || 0}</span>
              
              <span className="text-muted-foreground">Health:</span>
              <Badge variant="outline" className={getHealthColor()}>
                {campaign.healthScore ? campaign.healthScore.charAt(0).toUpperCase() + campaign.healthScore.slice(1) : 'N/A'}
              </Badge>
              
              <span className="text-muted-foreground">Created by:</span>
              <span>{executiveName || 'N/A'}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {renderMetrics()}
            </p>
          </div>
          
          {campaign.justification && (
            <div className="bg-muted p-3 rounded-md text-sm">
              <p className="font-medium mb-1">Executive Justification:</p>
              <p className="text-muted-foreground">{campaign.justification}</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2">
        <div className="w-full flex space-x-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onEdit(campaign.id)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          
          {onFeedback && campaign.aiGenerated && (
            <div className="flex space-x-2 flex-1">
              <Button 
                variant="outline" 
                className="flex-1 bg-green-500/10 hover:bg-green-500/20 border-green-500/30"
                onClick={() => onFeedback(campaign.id, true)}
              >
                <ThumbsUp className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 bg-red-500/10 hover:bg-red-500/20 border-red-500/30"
                onClick={() => onFeedback(campaign.id, false)}
              >
                <ThumbsDown className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
