
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

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
  children 
}: SettingsSectionProps) {
  return (
    <Card>
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
    </Card>
  );
}
