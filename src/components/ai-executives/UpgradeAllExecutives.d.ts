import { UpgradedExecutiveBot } from "@/utils/executive-os/integrationService";
interface UpgradeAllExecutivesProps {
  onUpgradeComplete?: (upgradedBots: UpgradedExecutiveBot[]) => void;
}
export declare function UpgradeAllExecutives({
  onUpgradeComplete,
}: UpgradeAllExecutivesProps): JSX.Element;
export {};
