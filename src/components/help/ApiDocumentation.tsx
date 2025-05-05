import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "lucide-react";
export function ApiDocumentationPage() {
    return (<Tabs defaultValue="overview" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="authentication">Authentication</TabsTrigger>
        <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
        <TabsTrigger value="examples">Examples</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>API Overview</CardTitle>
            <CardDescription>Introduction to the Allora AI platform API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              The Allora AI API provides programmatic access to your business acceleration platform. 
              Use this API to integrate Allora AI's executive insights, strategy recommendations, 
              and business intelligence into your workflows and applications.
            </p>
            <h3 className="text-lg font-semibold mt-4">Base URL</h3>
            <div className="bg-muted p-2 rounded-md font-mono text-sm">
              https://api.all-or-a.online/v1
            </div>
            <h3 className="text-lg font-semibold mt-4">Response Format</h3>
            <p>All API responses are returned in JSON format.</p>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="authentication">
        <Card>
          <CardHeader>
            <CardTitle>Authentication</CardTitle>
            <CardDescription>How to authenticate with the Allora AI API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Authentication to the Allora AI API is performed using API keys. Each request must 
              include your API key in the Authorization header.
            </p>
            <h3 className="text-lg font-semibold mt-4">API Keys</h3>
            <p>
              You can generate an API key from your dashboard under Settings → API Keys. 
              Your API key should be kept secure and not shared publicly.
            </p>
            <h3 className="text-lg font-semibold mt-4">Authentication Header</h3>
            <div className="bg-muted p-2 rounded-md font-mono text-sm">
              Authorization: Bearer YOUR_API_KEY
            </div>
            <h3 className="text-lg font-semibold mt-4">Example Request</h3>
            <div className="bg-muted p-2 rounded-md font-mono text-sm overflow-x-auto">
              <pre>{`curl -X GET "https://api.all-or-a.online/v1/strategies" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</pre>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="endpoints">
        <Card>
          <CardHeader>
            <CardTitle>API Endpoints</CardTitle>
            <CardDescription>Available endpoints and their functionality</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold">Strategies</h3>
              <div className="bg-muted/30 rounded-md p-4 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">GET</span>
                  <code className="text-sm">/strategies</code>
                </div>
                <p className="text-sm text-muted-foreground">Get all strategies for your business</p>
              </div>
              
              <div className="bg-muted/30 rounded-md p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">GET</span>
                  <code className="text-sm">/strategies/{'{id}'}</code>
                </div>
                <p className="text-sm text-muted-foreground">Get a specific strategy by ID</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Executives</h3>
              <div className="bg-muted/30 rounded-md p-4 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">GET</span>
                  <code className="text-sm">/executives</code>
                </div>
                <p className="text-sm text-muted-foreground">Get all AI executives available to your account</p>
              </div>
              
              <div className="bg-muted/30 rounded-md p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-medium">POST</span>
                  <code className="text-sm">/executives/debate</code>
                </div>
                <p className="text-sm text-muted-foreground">Start a new executive debate on a topic</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Analytics</h3>
              <div className="bg-muted/30 rounded-md p-4 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">GET</span>
                  <code className="text-sm">/analytics/overview</code>
                </div>
                <p className="text-sm text-muted-foreground">Get overall business analytics</p>
              </div>
              
              <div className="bg-muted/30 rounded-md p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">GET</span>
                  <code className="text-sm">/analytics/campaigns</code>
                </div>
                <p className="text-sm text-muted-foreground">Get analytics for marketing campaigns</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="examples">
        <Card>
          <CardHeader>
            <CardTitle>API Examples</CardTitle>
            <CardDescription>Code examples for using the Allora AI API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Code size={18}/>
                JavaScript Example
              </h3>
              <div className="bg-muted/50 p-4 rounded-md mt-2 overflow-x-auto">
                <pre className="text-sm">{`// Fetch strategies using fetch API
async function getStrategies() {
  try {
    const response = await fetch('https://api.all-or-a.online/v1/strategies', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const data = await response.json();
    console.log('Strategies:', data);
    return data;
  } catch (error) {
    console.error('Error fetching strategies:', error);
  }
}`}</pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Code size={18}/>
                Python Example
              </h3>
              <div className="bg-muted/50 p-4 rounded-md mt-2 overflow-x-auto">
                <pre className="text-sm">{`import requests

def get_strategies():
    api_key = "YOUR_API_KEY"
    url = "https://api.all-or-a.online/v1/strategies"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise exception for 4XX/5XX responses
        
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching strategies: {e}")
        return None

strategies = get_strategies()
if strategies:
    print("Strategies:", strategies)`}</pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>);
}
