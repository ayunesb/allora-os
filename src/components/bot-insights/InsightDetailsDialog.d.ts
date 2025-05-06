import { BotInsight } from "./BotInsightCard";
interface InsightDetailsDialogProps {
  insight: BotInsight | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export default function InsightDetailsDialog({
  insight,
  open,
  onOpenChange,
}: InsightDetailsDialogProps): JSX.Element;
export {};
