import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, PlusCircle, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getExecutiveImage } from "@/utils/ai-executives";
export const BotsList = ({ filteredBots, onSelectBot }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredBots.length === 0 ? (
        <div className="col-span-3 text-center py-10">
          <p className="text-muted-foreground">
            No executives found matching your criteria.
          </p>
        </div>
      ) : (
        filteredBots.map((bot, index) => (
          <Card
            key={`${bot.role}-${bot.name}-${index}`}
            className="overflow-hidden border border-muted"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border">
                  <AvatarImage
                    src={getExecutiveImage(bot.name)}
                    alt={bot.name}
                  />
                  <AvatarFallback>{getInitials(bot.name)}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 flex-1">
                  <h3 className="font-semibold text-base">{bot.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>{bot.title}</span>
                  </div>
                  <Badge variant="outline" className="mt-1">
                    {bot.role}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Expertise:</span>{" "}
                  {bot.specialty}
                </div>

                {bot.exampleAction && (
                  <div className="text-sm">
                    <span className="font-medium">Example Action:</span>{" "}
                    {bot.exampleAction}
                  </div>
                )}

                {bot.outputLocation && (
                  <div className="text-sm flex items-center">
                    <Activity className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {bot.outputLocation}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex justify-between gap-4">
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => onSelectBot(bot)}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => onSelectBot(bot)}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Consult
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
};
