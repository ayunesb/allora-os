import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
export function MobileAdminTable({
  data,
  columns,
  actions,
  emptyState,
  className,
}) {
  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }
  return (
    <div className={cn("space-y-3", className)}>
      {data.map((item, index) => (
        <Card key={index} className="overflow-hidden shadow-sm">
          <CardContent className="p-0">
            {columns.map((column) => (
              <div
                key={column.key}
                className="flex justify-between items-center p-3 border-b last:border-b-0"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  {column.title}
                </span>
                <span className="text-sm text-right">
                  {column.render ? column.render(item) : item[column.key]}
                </span>
              </div>
            ))}
            {actions && (
              <div className="p-3 bg-muted/20 flex justify-end">
                {actions(item)}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
