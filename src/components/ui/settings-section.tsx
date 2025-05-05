import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
export default function SettingsSection({ title, description, icon, children }) {
    return (<Card>
      <CardHeader>
        <div className="flex items-center space-x-2">
          {icon && <div>{icon}</div>}
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>);
}
