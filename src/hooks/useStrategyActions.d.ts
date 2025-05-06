import { Strategy } from "@/models/strategy";
export declare function useStrategyActions(): {
  handleExportPDF: (strategy: Strategy) => void;
  handleExportAllPDF: (strategies: Strategy[]) => void;
};
