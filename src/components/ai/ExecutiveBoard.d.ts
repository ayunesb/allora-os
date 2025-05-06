interface ExecutiveBoardMember {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  status: "active" | "inactive" | "learning";
  specialties?: string[];
  lastActivity?: string;
}
interface ExecutiveBoardProps {
  executives: ExecutiveBoardMember[];
  onSelectExecutive?: (executiveId: string) => void;
}
export default function ExecutiveBoard({
  executives,
  onSelectExecutive,
}: ExecutiveBoardProps): JSX.Element;
export {};
