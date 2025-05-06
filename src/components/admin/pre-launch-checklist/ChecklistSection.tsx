import React from "react";
import { ChecklistItem } from "./ChecklistItem";
export function ChecklistSection({ title, items, onToggle }) {
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <ChecklistItem key={item.id} item={item} onToggle={onToggle} />
        ))}
      </div>
    </div>
  );
}
