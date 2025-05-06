import { ChecklistItem as ChecklistItemType } from "@/hooks/admin/usePreLaunchChecklist";
interface ChecklistItemProps {
  item: ChecklistItemType;
  onToggle: (id: string) => void;
}
export declare function ChecklistItem({
  item,
  onToggle,
}: ChecklistItemProps): JSX.Element;
export {};
