interface PolicyDocument {
  id: string;
  name: string;
  version: string;
  path: string;
  lastUpdated: string;
  updateAvailable: boolean;
}
interface DocumentItemProps {
  document: PolicyDocument;
  updatingDocId: string | null;
}
export default function DocumentItem({
  document,
  updatingDocId,
}: DocumentItemProps): import("react").JSX.Element;
export {};
