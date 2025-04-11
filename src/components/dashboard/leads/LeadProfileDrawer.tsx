
import React from 'react';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Lead } from '@/models/lead';
import { LeadStatusBadge } from '@/components/admin/leads/LeadStatusBadge';
import { LeadScoreBadge } from './LeadScoreBadge';
import { Mail, Phone, CalendarClock, LayoutList, ArrowRightCircle } from 'lucide-react';

interface LeadProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: Lead;
  onStatusUpdate: (leadId: string, status: Lead['status']) => Promise<void>;
  onDelete: (leadId: string) => Promise<void>;
  getLeadScore: (lead: Lead) => 'hot' | 'warm' | 'cold';
  getNextBestAction: (lead: Lead) => string;
}

export const LeadProfileDrawer: React.FC<LeadProfileDrawerProps> = ({
  open,
  onOpenChange,
  lead,
  onStatusUpdate,
  onDelete,
  getLeadScore,
  getNextBestAction
}) => {
  const leadScore = getLeadScore(lead);
  const nextAction = getNextBestAction(lead);
  
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader>
          <DrawerTitle className="text-xl">{lead.name}</DrawerTitle>
          <DrawerDescription>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <LeadStatusBadge status={lead.status} />
              <LeadScoreBadge score={leadScore} />
              {lead.campaigns?.name && (
                <div className="text-xs rounded-md bg-gray-100 dark:bg-gray-800 px-2 py-1">
                  <LayoutList className="inline h-3 w-3 mr-1" />
                  {lead.campaigns.name}
                </div>
              )}
            </div>
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="p-4 space-y-6 overflow-auto">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Contact Information</h3>
            {(lead.email || lead.phone) ? (
              <div className="space-y-2">
                {lead.email && (
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
                    <a href={`mailto:${lead.email}`} className="hover:underline">{lead.email}</a>
                  </div>
                )}
                {lead.phone && (
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
                    <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No contact information provided</p>
            )}
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Lead Details</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <CalendarClock className="h-4 w-4 mr-3 text-muted-foreground" />
                <span>Added on {new Date(lead.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm">
                <ArrowRightCircle className="h-4 w-4 mr-3 text-muted-foreground" />
                <span><span className="font-medium">Next action:</span> {nextAction}</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Update Status</h3>
            <div className="flex flex-wrap gap-2">
              <Button 
                size="sm" 
                variant={lead.status === 'new' ? 'default' : 'outline'}
                onClick={() => onStatusUpdate(lead.id, 'new')}
              >
                New
              </Button>
              <Button 
                size="sm" 
                variant={lead.status === 'contacted' ? 'default' : 'outline'}
                onClick={() => onStatusUpdate(lead.id, 'contacted')}
              >
                Contacted
              </Button>
              <Button 
                size="sm" 
                variant={lead.status === 'qualified' ? 'default' : 'outline'}
                onClick={() => onStatusUpdate(lead.id, 'qualified')}
              >
                Qualified
              </Button>
              <Button 
                size="sm" 
                variant={lead.status === 'proposal' ? 'default' : 'outline'}
                onClick={() => onStatusUpdate(lead.id, 'proposal')}
              >
                Proposal
              </Button>
              <Button 
                size="sm" 
                variant={lead.status === 'negotiation' ? 'default' : 'outline'}
                onClick={() => onStatusUpdate(lead.id, 'negotiation')}
              >
                Negotiation
              </Button>
              <Button 
                size="sm" 
                variant={lead.status === 'client' ? 'default' : 'outline'}
                onClick={() => onStatusUpdate(lead.id, 'client')}
              >
                Client
              </Button>
              <Button 
                size="sm" 
                variant={lead.status === 'lost' ? 'default' : 'outline'}
                onClick={() => onStatusUpdate(lead.id, 'lost')}
              >
                Lost
              </Button>
            </div>
          </div>
        </div>
        
        <DrawerFooter className="border-t">
          <Button variant="destructive" onClick={() => {
            onDelete(lead.id);
            onOpenChange(false);
          }}>
            Delete Lead
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
