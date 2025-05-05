import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
const BotInfoPanel = ({ bot, description: propDescription, specialties: propSpecialties, expertise: propExpertise }) => {
    // Use props if provided, otherwise use bot object
    const description = propDescription || bot?.description;
    const specialties = propSpecialties || bot?.specialties;
    const expertise = propExpertise || bot?.expertise;
    if (!bot && !description && !expertise) {
        return (<Card className="h-full">
        <CardContent className="pt-6">
          <div className="text-center text-muted-foreground">
            No bot information available
          </div>
        </CardContent>
      </Card>);
    }
    return (<Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">
          {bot?.name ? `About ${bot.name}` : 'Bot Information'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bot?.avatar && (<div className="flex justify-center">
              <div className="relative h-20 w-20 rounded-full overflow-hidden">
                <img src={bot.avatar} alt={bot.name} className="object-cover w-full h-full"/>
              </div>
            </div>)}
          
          {description && (<div>
              <h3 className="text-sm font-medium mb-1">About</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>)}
          
          {expertise && (<div>
              <h3 className="text-sm font-medium mb-1">Expertise</h3>
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {expertise}
              </Badge>
            </div>)}
          
          {specialties && specialties.length > 0 && (<div>
              <h3 className="text-sm font-medium mb-2">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty, index) => (<Badge key={index} variant="outline">
                    {specialty}
                  </Badge>))}
              </div>
            </div>)}
        </div>
      </CardContent>
    </Card>);
};
export default BotInfoPanel;
