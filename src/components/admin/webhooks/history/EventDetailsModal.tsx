
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import EventDetailsPanel from '../event-table/EventDetailsPanel';
import { UnifiedWebhookEvent } from '@/types/unified-types';

interface EventDetailsModalProps {
  event: UnifiedWebhookEvent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventDetailsModal({ event, open, onOpenChange }: EventDetailsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Webhook Event Details</DialogTitle>
        </DialogHeader>
        <EventDetailsPanel event={event} expanded={true} />
      </DialogContent>
    </Dialog>
  );
}

export default EventDetailsModal;
