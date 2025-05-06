interface ChecklistActionsProps {
  isSaving: boolean;
  isLoading: boolean;
  onLoadChecklist: () => void;
  onSaveChecklist: () => void;
}
export declare function ChecklistActions({
  isSaving,
  isLoading,
  onLoadChecklist,
  onSaveChecklist,
}: ChecklistActionsProps): JSX.Element;
export {};
