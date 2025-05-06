import { WebhookEvent } from "@/types/unified-types";
interface EventDetailsModalProps {
  event: WebhookEvent;
  isOpen: boolean;
  onClose: () => void;
}
export declare function EventDetailsModal({
  event,
  isOpen,
  onClose,
}: EventDetailsModalProps): JSX.Element;
export default EventDetailsModal;
