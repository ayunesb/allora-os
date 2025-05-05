import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
export function CampaignMetricCards({ campaign }) {
    return (<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardContent className="p-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Budget</p>
            <p className="text-2xl font-bold">${campaign.budget.toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
      
      {campaign.management_fee !== undefined && (<Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Management Fee</p>
              <p className="text-2xl font-bold">${campaign.management_fee.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>)}
      
      {campaign.total_amount !== undefined && (<Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">${campaign.total_amount.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>)}
    </div>);
}
