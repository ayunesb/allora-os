import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle } from "lucide-react";
import { getExecutiveImage } from "@/utils/ai-executives";
export const DebateContent = ({
  topic,
  summary,
  discussion,
  conclusion,
  onStartNewDebate,
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">AI Executive Boardroom</CardTitle>
        <CardDescription>
          A simulated debate among your AI executives on key business strategies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-md font-semibold">Topic of Discussion</h3>
          <p className="text-muted-foreground">{topic}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-md font-semibold">Summary</h3>
          <p className="text-muted-foreground">{summary}</p>
        </div>

        <div>
          <h3 className="text-md font-semibold">Executive Perspectives</h3>
          <Tabs defaultValue="discussion" className="space-y-4">
            <TabsList>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="conclusion">Conclusion</TabsTrigger>
            </TabsList>
            <TabsContent value="discussion" className="space-y-4">
              {discussion.length > 0 ? (
                discussion.map((item, index) => (
                  <div key={index} className="flex space-x-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={getExecutiveImage(item.speaker)} />
                      <AvatarFallback>
                        {item.speaker?.substring(0, 2) || "EX"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{item.speaker}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.message}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No discussion data available.
                </p>
              )}
            </TabsContent>
            <TabsContent value="conclusion">
              {conclusion ? (
                <p className="text-muted-foreground">{conclusion}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No conclusion data available.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button onClick={onStartNewDebate} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Start New Debate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
