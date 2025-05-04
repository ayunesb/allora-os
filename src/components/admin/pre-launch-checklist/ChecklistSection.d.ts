import { ChecklistItem as ChecklistItemType } from '@/hooks/admin/usePreLaunchChecklist';
interface ChecklistSectionProps {
    title: string;
    items: ChecklistItemType[];
    onToggle: (id: string) => void;
}
export declare function ChecklistSection({ title, items, onToggle }: ChecklistSectionProps): JSX.Element;
export {};
