import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageTitle } from "@/components/ui/typography";
import { useCallScripts } from "@/hooks/callScripts/useCallScripts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
const Calls = () => {
  const [scriptType, setScriptType] = useState("sales");
  const { scripts, isLoading, error, generateScript } = useCallScripts();
  const [isFetching, setIsFetching] = useState(false);
  const onGenerateScript = async () => {
    setIsFetching(true);
    try {
      const result = await generateScript({ scriptType });
      if (result) {
        toast.success("Script generated successfully");
      } else {
        toast.error("Failed to generate script");
      }
    } catch (err) {
      console.error("Error generating script:", err);
      toast.error("Error generating script");
    } finally {
      setIsFetching(false);
    }
  };
  return (
    <div className="container mx-auto p-4">
      <PageTitle
        title="Communication Scripts"
        description="AI-generated scripts for your sales calls, follow-ups, and customer engagement"
      />

      <div className="grid gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Generate New Script</CardTitle>
            <CardDescription>
              Choose the type of communication script you need
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="col-span-3">
                <Select value={scriptType} onValueChange={setScriptType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select script type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Call</SelectItem>
                    <SelectItem value="followup">Follow-up Email</SelectItem>
                    <SelectItem value="introduction">
                      Introduction Message
                    </SelectItem>
                    <SelectItem value="meeting">Meeting Agenda</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={onGenerateScript}
                disabled={isFetching}
                className="col-span-1"
              >
                {isFetching ? "Generating..." : "Generate"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Scripts</CardTitle>
            <CardDescription>
              Previously generated communication scripts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Scripts</TabsTrigger>
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="followup">Follow-ups</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                ) : scripts.length > 0 ? (
                  scripts.map((script) => (
                    <div key={script.id} className="p-4 border rounded-md">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">
                          {script.title || script.script_type}
                        </h3>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {script.script_type}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-line">
                        {script.content}
                      </p>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Created:{" "}
                        {new Date(script.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No scripts generated yet. Create your first script!
                  </div>
                )}
              </TabsContent>

              <TabsContent value="sales" className="space-y-4">
                {isLoading ? (
                  <Skeleton className="h-24 w-full" />
                ) : scripts.filter((s) => s.script_type === "sales").length >
                  0 ? (
                  scripts
                    .filter((s) => s.script_type === "sales")
                    .map((script) => (
                      <div key={script.id} className="p-4 border rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">
                            {script.title || "Sales Script"}
                          </h3>
                        </div>
                        <p className="text-sm whitespace-pre-line">
                          {script.content}
                        </p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Created:{" "}
                          {new Date(script.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No sales scripts yet. Generate one now!
                  </div>
                )}
              </TabsContent>

              <TabsContent value="followup" className="space-y-4">
                {isLoading ? (
                  <Skeleton className="h-24 w-full" />
                ) : scripts.filter((s) => s.script_type === "followup").length >
                  0 ? (
                  scripts
                    .filter((s) => s.script_type === "followup")
                    .map((script) => (
                      <div key={script.id} className="p-4 border rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium">
                            {script.title || "Follow-up Script"}
                          </h3>
                        </div>
                        <p className="text-sm whitespace-pre-line">
                          {script.content}
                        </p>
                        <div className="mt-2 text-xs text-muted-foreground">
                          Created:{" "}
                          {new Date(script.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    No follow-up scripts yet. Generate one now!
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Calls;
