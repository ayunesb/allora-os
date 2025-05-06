import { LucideIcon } from "lucide-react";
interface SecurityToggleItemProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  checked: boolean;
  onCheckedChange: () => void;
}
declare const SecurityToggleItem: ({
  id,
  title,
  description,
  icon: Icon,
  checked,
  onCheckedChange,
}: SecurityToggleItemProps) => JSX.Element;
export default SecurityToggleItem;
