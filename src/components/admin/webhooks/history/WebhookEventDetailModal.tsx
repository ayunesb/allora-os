
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { WebhookEvent } from '@/types/fixed/Webhook';
import { X } from 'lucide-react';
import EventDetailsPanel from '../event-table/EventDetailsPanel';

interface WebhookEventDetailModalProps {
  event: WebhookEvent;
  isOpen: boolean;
  onClose: () => void;
}

export const WebhookEventDetailModal: React.FC<WebhookEventDetailModalProps> = ({
  event,
  isOpen,
  onClose
}) => {
  const eventType = event.eventType || event.event_type || 'Unknown';

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>
              Webhook Event: {eventType}
            </span>
            <DialogClose className="w-5 h-5 rounded-sm opacity-70 hover:opacity-100">
              <X className="h-4 w-4" />
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        
        <div className="pt-4">
          <EventDetailsPanel event={event} expanded={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WebhookEventDetailModal;
