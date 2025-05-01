
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface BotInfoPanelProps {
  bot?: {
    name: string;
    title?: string;
    avatar?: string;
    description?: string;
    expertise?: string;
    specialties?: string[];
  };
}

const BotInfoPanel: React.FC<BotInfoPanelProps> = ({ bot }) => {
  if (!bot) {
    return (
      <Card className="h-full">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            No bot selected
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">
          {bot.name} {bot.title ? `- ${bot.title}` : ''}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bot.avatar && (
            <div className="flex justify-center">
              <div className="relative h-20 w-20 rounded-full overflow-hidden">
                <img 
                  src={bot.avatar} 
                  alt={bot.name} 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          )}
          
          {bot.description && (
            <div>
              <h3 className="text-sm font-medium mb-1">About</h3>
              <p className="text-sm text-muted-foreground">{bot.description}</p>
            </div>
          )}
          
          {bot.expertise && (
            <div>
              <h3 className="text-sm font-medium mb-1">Expertise</h3>
              <p className="text-sm text-muted-foreground">{bot.expertise}</p>
            </div>
          )}
          
          {bot.specialties && bot.specialties.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {bot.specialties.map((specialty, index) => (
                  <Badge key={index} variant="outline">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BotInfoPanel;
