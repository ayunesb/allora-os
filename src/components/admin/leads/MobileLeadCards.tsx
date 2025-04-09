
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Lead } from '@/models/lead';
import { LeadStatusBadge } from './LeadStatusBadge';
import { LeadActions } from './LeadActions';

type MobileLeadCardsProps = {
  leads: Lead[];
  onStatusUpdate: (leadId: string, status: Lead['status']) => Promise<void>;
  onDelete: (leadId: string) => Promise<void>;
};

export const MobileLeadCards: React.FC<MobileLeadCardsProps> = ({
  leads,
  onStatusUpdate,
  onDelete
}) => {
  return (
    <div className="space-y-3">
      {leads.length === 0 ? (
        <Card className="border-primary/10 shadow-sm">
          <CardContent className="p-4 text-center text-muted-foreground">
            No leads found
          </CardContent>
        </Card>
      ) : (
        leads.map((lead) => (
          <Card key={lead.id} className="border-primary/10 shadow-sm overflow-hidden">
            <CardHeader className="p-3 pb-1">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base truncate">{lead.name}</CardTitle>
                <LeadStatusBadge status={lead.status} />
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-1 space-y-1">
              <p className="text-xs truncate text-muted-foreground">{lead.email}</p>
              <p className="text-xs text-muted-foreground">{lead.phone}</p>
              <div className="flex justify-between items-center pt-2 mt-1 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {new Date(lead.created_at).toLocaleDateString()}
                </span>
                <LeadActions 
                  leadId={lead.id} 
                  onStatusUpdate={onStatusUpdate} 
                  onDelete={onDelete}
                />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
