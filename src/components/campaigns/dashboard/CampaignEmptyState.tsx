import { BarChart3, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
export function CampaignEmptyState({ onCreateCampaign }) {
    return (<Card className="text-center py-12">
      <CardContent>
        <div className="flex flex-col items-center">
          <BarChart3 className="h-12 w-12 text-muted-foreground mb-4"/>
          <h2 className="text-xl font-semibold mb-2">No Campaigns Yet</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Start by creating your first advertising campaign to reach your target audience.
          </p>
          <Button onClick={onCreateCampaign}>
            <Plus className="mr-2 h-4 w-4"/>
            Create Your First Campaign
          </Button>
        </div>
      </CardContent>
    </Card>);
}
