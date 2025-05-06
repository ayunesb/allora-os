import React from "react";
import { Strategy } from "@/models/strategy";
interface StrategyDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  strategy: Strategy | null;
}
declare const StrategyDetailModal: React.FC<StrategyDetailModalProps>;
export default StrategyDetailModal;
