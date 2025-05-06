import { SystemService } from "../SystemHealthPage";
interface ServiceStatusListProps {
  services: SystemService[];
  showViewAllButton?: boolean;
  onViewAllClick?: () => void;
}
export default function ServiceStatusList({
  services,
  showViewAllButton,
  onViewAllClick,
}: ServiceStatusListProps): JSX.Element;
export {};
