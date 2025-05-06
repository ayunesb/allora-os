import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
const SecurityToggleItem = ({
  id,
  title,
  description,
  icon: Icon,
  checked,
  onCheckedChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5 flex items-center">
        <Icon className="h-4 w-4 mr-2 text-primary" />
        <div>
          <Label htmlFor={id}>{title}</Label>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};
export default SecurityToggleItem;
