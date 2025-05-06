export type InsightType = "strategy" | "campaign" | "call_script";
export interface BotInsight {
  id: string;
  title: string;
  description: string;
  type: InsightType;
  primaryBot: {
    name: string;
    role: string;
    avatar: string;
  };
  collaborators: Array<{
    name: string;
    role: string;
    contribution: string;
  }>;
  createdAt: Date;
}
interface BotInsightCardProps {
  insight: BotInsight;
  onViewDetails: (insight: BotInsight) => void;
}
export default function BotInsightCard({
  insight,
  onViewDetails,
}: BotInsightCardProps): JSX.Element;
export {};
