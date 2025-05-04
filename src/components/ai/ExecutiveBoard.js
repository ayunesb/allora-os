import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
export default function ExecutiveBoard({ executives, onSelectExecutive }) {
    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {executives.map((executive) => (<Card key={executive.id} className={`cursor-pointer transition-shadow hover:shadow-md ${executive.status === 'inactive' ? 'opacity-70' : ''}`} onClick={() => onSelectExecutive && onSelectExecutive(executive.id)}>
          <CardContent className="p-5">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={executive.avatar} alt={executive.name}/>
                <AvatarFallback>{executive.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">{executive.name}</h3>
                  <StatusBadge status={executive.status}/>
                </div>
                <p className="text-xs text-muted-foreground">{executive.role}</p>
                {executive.specialties && (<div className="flex flex-wrap gap-1.5 mt-2">
                    {executive.specialties.slice(0, 2).map((specialty) => (<Badge key={specialty} variant="outline" className="text-[0.65rem] px-1.5 py-0">
                        {specialty}
                      </Badge>))}
                    {executive.specialties.length > 2 && (<Badge variant="outline" className="text-[0.65rem] px-1.5 py-0">
                        +{executive.specialties.length - 2}
                      </Badge>)}
                  </div>)}
                {executive.lastActivity && (<p className="text-[0.65rem] text-muted-foreground mt-2">
                    Last active: {executive.lastActivity}
                  </p>)}
              </div>
            </div>
          </CardContent>
        </Card>))}
    </div>);
}
function StatusBadge({ status }) {
    const variants = {
        active: { className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
        learning: { className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
        inactive: { className: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' },
    };
    const statusText = {
        active: 'Active',
        learning: 'Learning',
        inactive: 'Inactive',
    };
    return (<span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${variants[status].className}`}>
      <span className="mr-1 h-1.5 w-1.5 rounded-full bg-current"/>
      {statusText[status]}
    </span>);
}
