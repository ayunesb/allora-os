import React from "react";
import { ApiKeys } from "./ProfileForm";
interface ApiKeysSectionProps {
  personalApiKeys: ApiKeys;
  handleApiKeyChange: (key: keyof ApiKeys, value: string) => void;
}
declare const ApiKeysSection: React.FC<ApiKeysSectionProps>;
export default ApiKeysSection;
