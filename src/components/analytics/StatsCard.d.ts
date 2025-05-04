import React from "react";
import { LucideIcon } from "lucide-react";
interface StatsCardProps {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
}
declare const StatsCard: React.FC<StatsCardProps>;
export default StatsCard;
