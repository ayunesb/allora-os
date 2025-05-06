interface ViewToggleProps {
  view: "calendar" | "list";
  onViewChange: (value: "calendar" | "list") => void;
  postCount: number;
}
export declare function ViewToggle({
  view,
  onViewChange,
  postCount,
}: ViewToggleProps): JSX.Element;
export {};
