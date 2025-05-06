import { ChecklistCategory } from "./types";
interface ChecklistProgressProps {
  completed: number;
  total: number;
  categories?: ChecklistCategory[];
}
export declare function ChecklistProgress({
  completed,
  total,
  categories,
}: ChecklistProgressProps): JSX.Element;
export {};
