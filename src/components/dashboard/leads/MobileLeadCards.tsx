
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare, Video, MoreHorizontal } from "lucide-react";
import { Lead } from '@/models/lead';
import { LeadStatusBadge } from '@/components/admin/leads/LeadStatusBadge';
import { LeadScoreBadge } from './LeadScoreBadge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type MobileLeadCardsProps = {
  leads: Lead[];
  onViewLead: (lead: Lead) => void;
  onStatusUpdate: (leadId: string, status: Lead['status']) => Promise<void>;
  onDelete: (leadId: string) => Promise<void>;
  getLeadScore: (lead: Lead) => 'hot' | 'warm' | 'cold';
  getNextBestAction: (lead: Lead) => string;
};

export const MobileLeadCards: React.FC<MobileLeadCardsProps> = ({
  leads,
  onViewLead,
  onStatusUpdate,
  onDelete,
  getLeadScore,
  getNextBestAction
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
          <Card 
            key={lead.id} 
            className="border-primary/10 shadow-sm overflow-hidden"
            onClick={() => onViewLead(lead)}
          >
            <CardHeader className="p-3 pb-1">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base truncate">{lead.name}</CardTitle>
                <div className="flex gap-1">
                  <LeadStatusBadge status={lead.status} />
                  <LeadScoreBadge score={getLeadScore(lead)} />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-1 space-y-1">
              {lead.email && <p className="text-xs truncate text-muted-foreground">{lead.email}</p>}
              {lead.phone && <p className="text-xs text-muted-foreground">{lead.phone}</p>}
              
              <div className="pt-2 text-xs text-muted-foreground">
                <p className="font-medium">Suggested action:</p>
                <p>{getNextBestAction(lead)}</p>
              </div>
              
              <div className="flex justify-between items-center pt-2 mt-1 border-t border-border">
                <span className="text-xs text-muted-foreground">
                  {new Date(lead.created_at).toLocaleDateString()}
                </span>
                
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => {
                    // This would open a phone dialer or call app
                    window.open(`tel:${lead.phone}`);
                  }}>
                    <Phone className="h-4 w-4 text-blue-600" />
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => {
                    // This would open WhatsApp with the lead's number
                    if (lead.phone) {
                      window.open(`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`);
                    }
                  }}>
                    <MessageSquare className="h-4 w-4 text-green-600" />
                  </Button>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onStatusUpdate(lead.id, 'new')}>
                        Mark as New
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onStatusUpdate(lead.id, 'contacted')}>
                        Mark as Contacted
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onStatusUpdate(lead.id, 'qualified')}>
                        Mark as Qualified
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onStatusUpdate(lead.id, 'closed')}>
                        Mark as Closed
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-destructive" 
                        onClick={() => onDelete(lead.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};
