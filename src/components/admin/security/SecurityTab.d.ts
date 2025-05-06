import { SecuritySettingsType } from "./types";
interface SecurityTabProps {
  initialSettings?: SecuritySettingsType;
}
declare const SecurityTab: ({
  initialSettings,
}: SecurityTabProps) => JSX.Element;
export default SecurityTab;
