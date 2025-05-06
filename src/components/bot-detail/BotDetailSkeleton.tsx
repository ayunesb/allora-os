import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
const BotDetailSkeleton = () => {
  return (
    <Card className="flex flex-col h-[calc(100vh-350px)] min-h-[400px]">
      <CardHeader className="pb-3">
        <Skeleton className="h-6 w-32" />
      </CardHeader>

      <CardContent className="overflow-y-auto flex-grow pb-0 space-y-4">
        <div className="flex flex-col space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] ${i % 2 === 0 ? "mr-auto" : "ml-auto"}`}
                >
                  <Skeleton className="h-8 w-8 rounded-full mb-2" />
                  <Skeleton className="h-24 w-full rounded-lg" />
                </div>
              </div>
            ))}
        </div>
      </CardContent>

      <CardFooter className="pt-4 pb-4 border-t">
        <div className="flex items-center gap-2 w-full">
          <Skeleton className="h-[60px] flex-grow" />
          <Skeleton className="h-[60px] w-[60px] flex-shrink-0" />
        </div>
      </CardFooter>
    </Card>
  );
};
export default BotDetailSkeleton;
