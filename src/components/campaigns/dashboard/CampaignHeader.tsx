
import React from 'react';
import { RefreshCcw, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Props for the CampaignHeader component
 */
interface CampaignHeaderProps {
  /** Function to refresh campaign data - returns a Promise */
  onRefresh: () => Promise<void>;
  
  /** Function to create a new campaign */
  onCreateCampaign: () => void;
  
  /** Whether campaign data is currently refreshing */
  isRefreshing: boolean;
}

/**
 * CampaignHeader Component
 * 
 * Displays the header for the campaign dashboard with title and action buttons
 * for refreshing data and creating new campaigns.
 */
export function CampaignHeader({ onRefresh, onCreateCampaign, isRefreshing }: CampaignHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold mb-1">Campaign Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your advertising campaigns across different platforms
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => onRefresh()}
          disabled={isRefreshing}
          aria-label={isRefreshing ? "Refreshing campaign data" : "Refresh campaign data"}
        >
          <RefreshCcw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
        
        <Button 
          onClick={onCreateCampaign}
          aria-label="Create new campaign"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>
    </div>
  );
}
