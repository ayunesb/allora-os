import React from "react";
interface SettingsSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}
export default function SettingsSection({
  title,
  description,
  icon,
  children,
}: SettingsSectionProps): JSX.Element;
export {};
