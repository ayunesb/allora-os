import { Strategy } from "@/models/strategy";
/**
 * Generates and downloads a PDF for a strategy
 */
export declare const exportStrategyToPdf: (strategy: Strategy) => void;
/**
 * Generates all strategies as a PDF and downloads it
 */
export declare const exportAllStrategiesToPdf: (strategies: Strategy[]) => void;
