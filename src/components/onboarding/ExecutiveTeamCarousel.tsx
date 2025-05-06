import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
export function ExecutiveTeamCarousel({ executives }) {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {executives.map((executive) => (
          <CarouselItem
            key={executive.id}
            className="md:basis-1/2 lg:basis-1/3"
          >
            <Card className="border">
              <CardContent className="flex flex-col items-center p-4 pt-6 text-center">
                <Avatar className="h-16 w-16 mb-2">
                  <AvatarImage src={executive.avatar} alt={executive.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {executive.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="font-medium text-lg">{executive.name}</div>
                <Badge variant="outline" className="mt-1 mb-2">
                  {executive.title}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {executive.specialty}
                </p>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
}
