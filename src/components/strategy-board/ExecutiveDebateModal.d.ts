import { Strategy } from "@/models/strategy";
import { DebateSession } from "@/hooks/useExecutiveDebate";
interface ExecutiveDebateModalProps {
  isOpen: boolean;
  onClose: () => void;
  strategy: Strategy | null;
  debate: DebateSession | null;
  isLoading: boolean;
}
export default function ExecutiveDebateModal({
  isOpen,
  onClose,
  strategy,
  debate,
  isLoading,
}: ExecutiveDebateModalProps): JSX.Element;
export {};
