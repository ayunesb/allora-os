import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "lucide-react";
export function ApiDocumentationPage() {
    return (_jsxs(Tabs, { defaultValue: "overview", className: "w-full", children: [_jsxs(TabsList, { className: "mb-4", children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "authentication", children: "Authentication" }), _jsx(TabsTrigger, { value: "endpoints", children: "Endpoints" }), _jsx(TabsTrigger, { value: "examples", children: "Examples" })] }), _jsx(TabsContent, { value: "overview", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "API Overview" }), _jsx(CardDescription, { children: "Introduction to the Allora AI platform API" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { children: "The Allora AI API provides programmatic access to your business acceleration platform. Use this API to integrate Allora AI's executive insights, strategy recommendations, and business intelligence into your workflows and applications." }), _jsx("h3", { className: "text-lg font-semibold mt-4", children: "Base URL" }), _jsx("div", { className: "bg-muted p-2 rounded-md font-mono text-sm", children: "https://api.all-or-a.online/v1" }), _jsx("h3", { className: "text-lg font-semibold mt-4", children: "Response Format" }), _jsx("p", { children: "All API responses are returned in JSON format." })] })] }) }), _jsx(TabsContent, { value: "authentication", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Authentication" }), _jsx(CardDescription, { children: "How to authenticate with the Allora AI API" })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsx("p", { children: "Authentication to the Allora AI API is performed using API keys. Each request must include your API key in the Authorization header." }), _jsx("h3", { className: "text-lg font-semibold mt-4", children: "API Keys" }), _jsx("p", { children: "You can generate an API key from your dashboard under Settings \u2192 API Keys. Your API key should be kept secure and not shared publicly." }), _jsx("h3", { className: "text-lg font-semibold mt-4", children: "Authentication Header" }), _jsx("div", { className: "bg-muted p-2 rounded-md font-mono text-sm", children: "Authorization: Bearer YOUR_API_KEY" }), _jsx("h3", { className: "text-lg font-semibold mt-4", children: "Example Request" }), _jsx("div", { className: "bg-muted p-2 rounded-md font-mono text-sm overflow-x-auto", children: _jsx("pre", { children: `curl -X GET "https://api.all-or-a.online/v1/strategies" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"` }) })] })] }) }), _jsx(TabsContent, { value: "endpoints", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "API Endpoints" }), _jsx(CardDescription, { children: "Available endpoints and their functionality" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: "Strategies" }), _jsxs("div", { className: "bg-muted/30 rounded-md p-4 mt-2", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("span", { className: "bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium", children: "GET" }), _jsx("code", { className: "text-sm", children: "/strategies" })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Get all strategies for your business" })] }), _jsxs("div", { className: "bg-muted/30 rounded-md p-4 mt-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("span", { className: "bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium", children: "GET" }), _jsxs("code", { className: "text-sm", children: ["/strategies/", "{id}"] })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Get a specific strategy by ID" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: "Executives" }), _jsxs("div", { className: "bg-muted/30 rounded-md p-4 mt-2", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("span", { className: "bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium", children: "GET" }), _jsx("code", { className: "text-sm", children: "/executives" })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Get all AI executives available to your account" })] }), _jsxs("div", { className: "bg-muted/30 rounded-md p-4 mt-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("span", { className: "bg-emerald-500 text-white px-2 py-1 rounded text-xs font-medium", children: "POST" }), _jsx("code", { className: "text-sm", children: "/executives/debate" })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Start a new executive debate on a topic" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: "Analytics" }), _jsxs("div", { className: "bg-muted/30 rounded-md p-4 mt-2", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("span", { className: "bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium", children: "GET" }), _jsx("code", { className: "text-sm", children: "/analytics/overview" })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Get overall business analytics" })] }), _jsxs("div", { className: "bg-muted/30 rounded-md p-4 mt-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("span", { className: "bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium", children: "GET" }), _jsx("code", { className: "text-sm", children: "/analytics/campaigns" })] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Get analytics for marketing campaigns" })] })] })] })] }) }), _jsx(TabsContent, { value: "examples", children: _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "API Examples" }), _jsx(CardDescription, { children: "Code examples for using the Allora AI API" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [_jsx(Code, { size: 18 }), "JavaScript Example"] }), _jsx("div", { className: "bg-muted/50 p-4 rounded-md mt-2 overflow-x-auto", children: _jsx("pre", { className: "text-sm", children: `// Fetch strategies using fetch API
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
}` }) })] }), _jsxs("div", { children: [_jsxs("h3", { className: "text-lg font-semibold flex items-center gap-2", children: [_jsx(Code, { size: 18 }), "Python Example"] }), _jsx("div", { className: "bg-muted/50 p-4 rounded-md mt-2 overflow-x-auto", children: _jsx("pre", { className: "text-sm", children: `import requests

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
    print("Strategies:", strategies)` }) })] })] })] }) })] }));
}
