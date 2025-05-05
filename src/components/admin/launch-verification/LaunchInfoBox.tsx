import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
export function LaunchInfoBox({ title, description, status = 'info', children }) {
    const getStatusColor = () => {
        switch (status) {
            case 'success':
                return 'border-green-500';
            case 'warning':
                return 'border-yellow-500';
            case 'error':
                return 'border-red-500';
            default:
                return 'border-blue-500';
        }
    };
    return (<Card className={`border-l-4 ${getStatusColor()}`}>
      <CardContent className="p-4">
        <h3 className="font-medium text-lg">{title}</h3>
        <p className="text-muted-foreground text-sm mt-1">{description}</p>
        {children && <div className="mt-4">{children}</div>}
      </CardContent>
    </Card>);
}
