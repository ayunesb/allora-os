
import React from 'react';
import { Lead } from '@/models/lead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LeadStatusBadge } from '@/components/admin/leads/LeadStatusBadge';
import { LeadScoreBadge } from './LeadScoreBadge';
import { MoreHorizontal, Phone, Mail } from 'lucide-react';

interface MobileLeadCardsProps {
  leads: Lead[];
  onViewLead: (lead: Lead) => void;
  onStatusUpdate: (leadId: string, status: Lead['status']) => Promise<void>;
  onDelete: (leadId: string) => Promise<void>;
  getLeadScore: (lead: Lead) => 'hot' | 'warm' | 'cold';
  getNextBestAction: (lead: Lead) => string;
}

export const MobileLeadCards: React.FC<MobileLeadCardsProps> = ({
  leads,
  onViewLead,
  onStatusUpdate,
  onDelete,
  getLeadScore,
  getNextBestAction
}) => {
  return (
    <div className="space-y-4">
      {leads.map((lead) => {
        const leadScore = getLeadScore(lead);
        const nextAction = getNextBestAction(lead);
        
        return (
          <Card key={lead.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base font-medium">{lead.name}</CardTitle>
                <div className="flex gap-2">
                  <LeadStatusBadge status={lead.status} />
                  <LeadScoreBadge score={leadScore} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid gap-1">
                {lead.email && (
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{lead.email}</span>
                  </div>
                )}
                {lead.phone && (
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{lead.phone}</span>
                  </div>
                )}
                <div className="pt-2 text-sm">
                  <span className="font-medium">Next action: </span>
                  {nextAction}
                </div>
                <div className="text-xs text-muted-foreground pt-1">
                  Added on {new Date(lead.created_at).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button size="sm" variant="secondary" onClick={() => onViewLead(lead)}>
                View Details
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onStatusUpdate(lead.id, 'contacted')}>
                    Mark as Contacted
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onStatusUpdate(lead.id, 'qualified')}>
                    Mark as Qualified
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(lead.id)} className="text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};
