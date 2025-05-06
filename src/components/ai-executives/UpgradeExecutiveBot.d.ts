import { UpgradedExecutiveBot } from "@/utils/executive-os/integrationService";
interface UpgradeExecutiveBotProps {
  botName: string;
  botRole: string;
  onUpgradeComplete?: (upgradedBot: UpgradedExecutiveBot) => void;
}
export declare function UpgradeExecutiveBot({
  botName,
  botRole,
  onUpgradeComplete,
}: UpgradeExecutiveBotProps): JSX.Element;
export {};
