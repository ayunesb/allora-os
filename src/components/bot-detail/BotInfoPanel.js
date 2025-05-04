import React from 'react';
import { Badge } from '@/components/ui/badge';
export function BotInfoPanel({ description, specialties, expertise }) {
    return (<div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">About</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Expertise</h3>
        <Badge variant="outline" className="bg-primary/10 text-primary">
          {expertise}
        </Badge>
      </div>

      {specialties && specialties.length > 0 && (<div>
          <h3 className="text-lg font-medium mb-2">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty, index) => (<Badge key={index} variant="outline" className="bg-secondary/10">
                {specialty}
              </Badge>))}
          </div>
        </div>)}
    </div>);
}
export default BotInfoPanel;
