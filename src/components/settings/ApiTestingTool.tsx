import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Send } from "lucide-react";
export default function ApiTestingTool() {
    const [isTestingApi, setIsTestingApi] = useState(false);
    const [apiEndpoint, setApiEndpoint] = useState("");
    const [apiMethod, setApiMethod] = useState("GET");
    const [apiResponse, setApiResponse] = useState("");
    const [apiHeaders, setApiHeaders] = useState("{\n  \"Content-Type\": \"application/json\"\n}");
    const [apiBody, setApiBody] = useState("{}");
    const handleApiTest = async () => {
        if (!apiEndpoint) {
            toast.error("API endpoint is required");
            return;
        }
        setIsTestingApi(true);
        setApiResponse("");
        try {
            // Prepare headers
            let headers = {};
            try {
                headers = JSON.parse(apiHeaders);
            }
            catch (e) {
                toast.error("Invalid JSON format in headers");
                return;
            }
            // Prepare body for POST, PUT, PATCH
            let bodyData = undefined;
            if (["POST", "PUT", "PATCH"].includes(apiMethod)) {
                try {
                    bodyData = JSON.parse(apiBody);
                }
                catch (e) {
                    toast.error("Invalid JSON format in request body");
                    return;
                }
            }
            // Make the request
            const response = await fetch(apiEndpoint, {
                method: apiMethod,
                headers,
                body: bodyData ? JSON.stringify(bodyData) : undefined,
            });
            // Get response as text first
            const responseText = await response.text();
            // Try to parse as JSON for pretty display
            try {
                const responseJson = JSON.parse(responseText);
                setApiResponse(JSON.stringify(responseJson, null, 2));
            }
            catch (e) {
                // If not valid JSON, show as text
                setApiResponse(responseText);
            }
            toast.success(`API request completed with status: ${response.status}`);
        }
        catch (error) {
            console.error("API test error:", error);
            setApiResponse(`Error: ${error.message}`);
            toast.error(`API request failed: ${error.message}`);
        }
        finally {
            setIsTestingApi(false);
        }
    };
    return (<div className="space-y-4">
      <h3 className="text-lg font-medium mb-2">API Testing</h3>
      <p className="text-muted-foreground mb-4">
        Test API endpoints and view responses.
      </p>
      
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="api-endpoint">API Endpoint</Label>
          <Input id="api-endpoint" placeholder="https://api.example.com/data" value={apiEndpoint} onChange={(e) => setApiEndpoint(e.target.value)}/>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="api-method">Method</Label>
          <Select value={apiMethod} onValueChange={setApiMethod}>
            <SelectTrigger id="api-method">
              <SelectValue placeholder="Select method"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="api-headers">Headers (JSON)</Label>
          <Textarea id="api-headers" placeholder='{"Content-Type": "application/json"}' value={apiHeaders} onChange={(e) => setApiHeaders(e.target.value)} rows={3}/>
        </div>
        
        {["POST", "PUT", "PATCH"].includes(apiMethod) && (<div className="grid gap-2">
            <Label htmlFor="api-body">Request Body (JSON)</Label>
            <Textarea id="api-body" placeholder='{"key": "value"}' value={apiBody} onChange={(e) => setApiBody(e.target.value)} rows={5}/>
          </div>)}
        
        <Button onClick={handleApiTest} disabled={isTestingApi || !apiEndpoint}>
          {isTestingApi ? "Testing..." : "Test API"}
          {!isTestingApi && <Send className="ml-2 h-4 w-4"/>}
        </Button>
        
        {apiResponse && (<div className="mt-4">
            <Label htmlFor="api-response">Response</Label>
            <div className="mt-2 p-4 bg-secondary/20 rounded-md overflow-auto max-h-80">
              <pre id="api-response" className="text-sm whitespace-pre-wrap">
                {apiResponse}
              </pre>
            </div>
          </div>)}
      </div>
    </div>);
}
