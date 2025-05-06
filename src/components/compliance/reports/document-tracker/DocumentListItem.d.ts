interface DocumentItemProps {
  id: string;
  name: string;
  currentVersion: string;
  lastUpdated: string;
  status: "current" | "outdated" | "update-available";
  nextUpdateDue?: string;
  autoUpdatesEnabled: boolean;
  onUpdate: (docId: string) => void;
  onToggleAutoUpdate: (docId: string) => void;
}
export default function DocumentListItem({
  id,
  name,
  currentVersion,
  lastUpdated,
  status,
  nextUpdateDue,
  autoUpdatesEnabled,
  onUpdate,
  onToggleAutoUpdate,
}: DocumentItemProps): import("react").JSX.Element;
export {};
