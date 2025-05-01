
import { Card } from "@/components/ui/card";
import { LaunchInfoBoxProps } from './types';

export function LaunchInfoBox({ title, description, icon, status, children }: LaunchInfoBoxProps) {
  const getBgColor = () => {
    switch (status) {
      case 'completed': return 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50';
      case 'error': return 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50';
      case 'in-progress': return 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50';
      default: return 'bg-muted/40';
    }
  };

  return (
    <Card className={`p-4 ${getBgColor()}`}>
      <div className="flex items-center gap-3 mb-2">
        {icon && <div>{icon}</div>}
        <div>
          <h3 className="font-medium">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
      
      {children && <div className="mt-4">{children}</div>}
    </Card>
  );
}
