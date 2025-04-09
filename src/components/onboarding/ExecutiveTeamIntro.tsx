
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import useDebateParticipants from '@/hooks/useDebateParticipants';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ExecutiveTeamIntro() {
  const { availableExecutives } = useDebateParticipants();
  
  // Get a featured subset of executives for the intro
  const featuredExecutives = availableExecutives.slice(0, 5);
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold mb-2">Meet Your AI Executive Team</h3>
        <p className="text-muted-foreground">
          World-class business leaders, ready to debate and execute your strategy
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featuredExecutives.map((executive, index) => (
          <Card key={index} className="overflow-hidden border-primary/10">
            <CardContent className="p-4 flex items-start gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/20">
                <AvatarImage src={executive.avatar} alt={executive.name} />
                <AvatarFallback>{executive.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <h4 className="font-semibold text-lg">{executive.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{executive.role}</p>
                
                <div className="flex flex-wrap gap-1 mt-1">
                  {executive.expertise?.slice(0, 2).map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        Your AI executive team will debate the best strategies for your business
        based on your industry, goals, and risk appetite.
      </p>
    </div>
  );
}
