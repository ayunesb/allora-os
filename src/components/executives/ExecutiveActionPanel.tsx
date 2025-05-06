import { useState } from "react";
import { useExecutiveAgent } from "@/hooks/useExecutiveAgent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OutputStream } from "./OutputStream";
export const ExecutiveActionPanel = () => {
  const [prompt, setPrompt] = useState(
    "Should we increase ad budget based on this month's revenue?",
  );
  const [selectedExecutive, setSelectedExecutive] = useState("CMO");
  const [saveToNotion, setSaveToNotion] = useState(true);
  const [addToAuditLog, setAddToAuditLog] = useState(true);
  const { executeQuery, isLoading, response, reset } = useExecutiveAgent();
  const handleRun = async () => {
    await executeQuery(prompt, selectedExecutive, {
      saveToNotion,
      addToAuditLog,
      userContext: {
        timestamp: new Date().toISOString(),
      },
    });
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          Executive Action Panel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="executive" className="text-sm font-medium">
            Executive Role
          </label>
          <select
            id="executive"
            className="w-full p-2 border rounded-md"
            value={selectedExecutive}
            onChange={(e) => setSelectedExecutive(e.target.value)}
          >
            <option value="CEO">CEO</option>
            <option value="CMO">CMO</option>
            <option value="CTO">CTO</option>
            <option value="CFO">CFO</option>
            <option value="COO">COO</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium">
            Your Question
          </label>
          <textarea
            id="prompt"
            rows={3}
            className="w-full p-2 border rounded-md"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={saveToNotion}
              onChange={() => setSaveToNotion(!saveToNotion)}
            />
            <span>Save to Notion</span>
          </label>

          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={addToAuditLog}
              onChange={() => setAddToAuditLog(!addToAuditLog)}
            />
            <span>Add to Audit Log</span>
          </label>
        </div>

        <Button onClick={handleRun} className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Ask ${selectedExecutive}`
          )}
        </Button>

        {response && (
          <Tabs defaultValue="response" className="mt-6">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="response">Response</TabsTrigger>
              <TabsTrigger value="tool-execution">Tool Execution</TabsTrigger>
              <TabsTrigger value="raw">Raw Output</TabsTrigger>
            </TabsList>

            <TabsContent value="response">
              <OutputStream
                text={response.aiResponse}
                executive={selectedExecutive}
              />
            </TabsContent>

            <TabsContent value="tool-execution">
              {response.toolResponses && response.toolResponses.length > 0 ? (
                <div className="space-y-4">
                  {response.toolResponses.map((toolResponse, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="bg-muted py-2">
                        <CardTitle className="text-sm font-medium capitalize">
                          {toolResponse.tool} Tool
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <p className="mb-2 font-medium">
                          {toolResponse.result}
                        </p>
                        {toolResponse.data && (
                          <pre className="bg-muted p-2 rounded text-xs overflow-auto">
                            {JSON.stringify(toolResponse.data, null, 2)}
                          </pre>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-muted-foreground">
                  No tools were executed for this query
                </div>
              )}
            </TabsContent>

            <TabsContent value="raw">
              <pre className="bg-muted p-4 rounded text-xs overflow-auto max-h-[300px]">
                {JSON.stringify(response, null, 2)}
              </pre>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};
export default ExecutiveActionPanel;
