
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ApiEndpoint {
  name: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  endpoint: string;
  description: string;
  requestParams?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  requestBody?: {
    name: string;
    type: string;
    required: boolean;
    description: string;
  }[];
  responses: {
    code: string;
    description: string;
    example: string;
  }[];
}

interface ApiCategory {
  name: string;
  description: string;
  endpoints: ApiEndpoint[];
}

interface ApiDocumentationProps {
  categories: ApiCategory[];
  baseUrl?: string;
}

export function ApiDocumentation({ categories, baseUrl = "https://api.allora.ai/v1" }: ApiDocumentationProps) {
  const [activeCategory, setActiveCategory] = React.useState(categories[0]?.name || "");
  const [copiedEndpoint, setCopiedEndpoint] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, endpoint: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(null), 2000);
  };

  const formatJson = (json: string) => {
    try {
      return JSON.stringify(JSON.parse(json), null, 2);
    } catch (e) {
      return json;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>API Documentation</CardTitle>
        <CardDescription>
          Reference documentation for the Allora AI API endpoints
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory}>
          <div className="border-b px-6">
            <TabsList className="w-full flex overflow-x-auto space-x-2 pb-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.name}
                  value={category.name}
                  className="flex-shrink-0"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map((category) => (
            <TabsContent key={category.name} value={category.name} className="px-6 py-4">
              <div className="text-sm text-muted-foreground mb-6">
                {category.description}
              </div>

              <div className="space-y-8">
                {category.endpoints.map((endpoint) => (
                  <div key={endpoint.endpoint} className="border rounded-lg overflow-hidden">
                    <div className="bg-muted p-4 flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "px-2 py-1 rounded text-xs font-medium text-white",
                          endpoint.method === "GET" && "bg-green-600",
                          endpoint.method === "POST" && "bg-blue-600",
                          endpoint.method === "PUT" && "bg-amber-600",
                          endpoint.method === "PATCH" && "bg-purple-600",
                          endpoint.method === "DELETE" && "bg-red-600",
                        )}>
                          {endpoint.method}
                        </div>
                        <div className="font-mono text-sm">
                          {baseUrl}{endpoint.endpoint}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(`${baseUrl}${endpoint.endpoint}`, endpoint.endpoint)}
                        className="h-8 gap-1"
                      >
                        {copiedEndpoint === endpoint.endpoint ? (
                          <>
                            <Check className="h-4 w-4" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="p-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Description</h4>
                      <p className="text-sm text-muted-foreground mb-4">{endpoint.description}</p>

                      {endpoint.requestParams && endpoint.requestParams.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Request Parameters</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                              <thead>
                                <tr className="bg-muted/50">
                                  <th className="text-left font-medium py-2 px-3">Parameter</th>
                                  <th className="text-left font-medium py-2 px-3">Type</th>
                                  <th className="text-left font-medium py-2 px-3">Required</th>
                                  <th className="text-left font-medium py-2 px-3">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {endpoint.requestParams.map((param, i) => (
                                  <tr key={i} className="border-t border-muted">
                                    <td className="py-2 px-3 font-mono text-xs">{param.name}</td>
                                    <td className="py-2 px-3 text-xs">{param.type}</td>
                                    <td className="py-2 px-3 text-xs">{param.required ? "Yes" : "No"}</td>
                                    <td className="py-2 px-3 text-xs">{param.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {endpoint.requestBody && endpoint.requestBody.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Request Body</h4>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                              <thead>
                                <tr className="bg-muted/50">
                                  <th className="text-left font-medium py-2 px-3">Field</th>
                                  <th className="text-left font-medium py-2 px-3">Type</th>
                                  <th className="text-left font-medium py-2 px-3">Required</th>
                                  <th className="text-left font-medium py-2 px-3">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {endpoint.requestBody.map((field, i) => (
                                  <tr key={i} className="border-t border-muted">
                                    <td className="py-2 px-3 font-mono text-xs">{field.name}</td>
                                    <td className="py-2 px-3 text-xs">{field.type}</td>
                                    <td className="py-2 px-3 text-xs">{field.required ? "Yes" : "No"}</td>
                                    <td className="py-2 px-3 text-xs">{field.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      <h4 className="text-sm font-medium mb-2">Responses</h4>
                      <div className="space-y-4">
                        {endpoint.responses.map((response, i) => (
                          <div key={i} className="rounded border">
                            <div className={cn(
                              "px-4 py-2 text-sm font-medium border-b flex justify-between",
                              response.code.startsWith("2") && "bg-green-50 text-green-700 border-green-100 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900",
                              response.code.startsWith("4") && "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900",
                              response.code.startsWith("5") && "bg-red-50 text-red-700 border-red-100 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900",
                            )}>
                              <span>Response {response.code}</span>
                              <span>{response.description}</span>
                            </div>
                            <div className="p-4 relative">
                              <pre className="font-mono text-xs bg-muted p-3 rounded overflow-x-auto">
                                <code>{formatJson(response.example)}</code>
                              </pre>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(response.example, `${endpoint.endpoint}-response-${i}`)}
                                className="absolute top-6 right-6 h-7 w-7 p-0"
                              >
                                {copiedEndpoint === `${endpoint.endpoint}-response-${i}` ? (
                                  <Check className="h-3.5 w-3.5" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

export function ApiDocumentationPage() {
  // Sample API documentation data
  const apiCategories: ApiCategory[] = [
    {
      name: "Authentication",
      description: "Endpoints for user authentication and session management",
      endpoints: [
        {
          name: "Login",
          method: "POST",
          endpoint: "/auth/login",
          description: "Authenticate a user and get an access token",
          requestBody: [
            {
              name: "email",
              type: "string",
              required: true,
              description: "User's email address"
            },
            {
              name: "password",
              type: "string",
              required: true,
              description: "User's password"
            }
          ],
          responses: [
            {
              code: "200",
              description: "Success",
              example: `{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "usr_123456789",
      "email": "user@example.com",
      "name": "John Doe"
    }
  }
}`
            },
            {
              code: "401",
              description: "Unauthorized",
              example: `{
  "success": false,
  "error": {
    "code": "auth/invalid-credentials",
    "message": "Invalid email or password"
  }
}`
            }
          ]
        },
        {
          name: "Refresh Token",
          method: "POST",
          endpoint: "/auth/refresh",
          description: "Get a new access token using a refresh token",
          requestBody: [
            {
              name: "refresh_token",
              type: "string",
              required: true,
              description: "Refresh token obtained during login"
            }
          ],
          responses: [
            {
              code: "200",
              description: "Success",
              example: `{
  "success": true,
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}`
            },
            {
              code: "401",
              description: "Unauthorized",
              example: `{
  "success": false,
  "error": {
    "code": "auth/invalid-refresh-token",
    "message": "Invalid or expired refresh token"
  }
}`
            }
          ]
        }
      ]
    },
    {
      name: "Strategies",
      description: "Endpoints for managing business strategies",
      endpoints: [
        {
          name: "List Strategies",
          method: "GET",
          endpoint: "/strategies",
          description: "Get a list of business strategies",
          requestParams: [
            {
              name: "risk_level",
              type: "string",
              required: false,
              description: "Filter by risk level (low, medium, high)"
            },
            {
              name: "status",
              type: "string",
              required: false,
              description: "Filter by status (draft, active, archived)"
            }
          ],
          responses: [
            {
              code: "200",
              description: "Success",
              example: `{
  "success": true,
  "data": {
    "strategies": [
      {
        "id": "str_123456789",
        "title": "Market Expansion Strategy",
        "description": "Expand into new markets in Europe and Asia",
        "risk_level": "medium",
        "status": "active",
        "created_at": "2025-02-15T12:00:00Z"
      },
      {
        "id": "str_987654321",
        "title": "Cost Reduction Initiative",
        "description": "Optimize operational costs across departments",
        "risk_level": "low",
        "status": "active",
        "created_at": "2025-01-20T09:30:00Z"
      }
    ],
    "total": 2
  }
}`
            }
          ]
        },
        {
          name: "Create Strategy",
          method: "POST",
          endpoint: "/strategies",
          description: "Create a new business strategy",
          requestBody: [
            {
              name: "title",
              type: "string",
              required: true,
              description: "Strategy title"
            },
            {
              name: "description",
              type: "string",
              required: true,
              description: "Strategy description"
            },
            {
              name: "risk_level",
              type: "string",
              required: true,
              description: "Risk level (low, medium, high)"
            }
          ],
          responses: [
            {
              code: "201",
              description: "Created",
              example: `{
  "success": true,
  "data": {
    "strategy": {
      "id": "str_abc123456",
      "title": "Digital Transformation",
      "description": "Implement digital tools across the organization",
      "risk_level": "medium",
      "status": "draft",
      "created_at": "2025-04-14T15:30:00Z"
    }
  }
}`
            },
            {
              code: "400",
              description: "Bad Request",
              example: `{
  "success": false,
  "error": {
    "code": "validation/invalid-input",
    "message": "Invalid input data",
    "details": {
      "risk_level": "Must be one of: low, medium, high"
    }
  }
}`
            }
          ]
        }
      ]
    },
    {
      name: "Executive Debate",
      description: "Endpoints for managing AI executive debates",
      endpoints: [
        {
          name: "Start Debate",
          method: "POST",
          endpoint: "/debates",
          description: "Initialize a new AI executive debate session",
          requestBody: [
            {
              name: "topic",
              type: "string",
              required: true,
              description: "Debate topic or question"
            },
            {
              name: "participants",
              type: "array",
              required: true,
              description: "List of executive IDs to participate in the debate"
            },
            {
              name: "context",
              type: "object",
              required: false,
              description: "Additional context for the debate"
            }
          ],
          responses: [
            {
              code: "201",
              description: "Created",
              example: `{
  "success": true,
  "data": {
    "debate_id": "deb_789456123",
    "topic": "Should we prioritize expansion into European markets?",
    "status": "initialized",
    "participants": [
      "exec_ceo", "exec_cfo", "exec_cmo", "exec_coo"
    ],
    "estimated_completion_time": "2025-04-14T16:00:00Z"
  }
}`
            }
          ]
        },
        {
          name: "Get Debate Status",
          method: "GET",
          endpoint: "/debates/{debate_id}",
          description: "Check the status of an ongoing debate",
          requestParams: [
            {
              name: "debate_id",
              type: "string",
              required: true,
              description: "Unique ID of the debate"
            }
          ],
          responses: [
            {
              code: "200",
              description: "Success",
              example: `{
  "success": true,
  "data": {
    "debate_id": "deb_789456123",
    "topic": "Should we prioritize expansion into European markets?",
    "status": "in_progress",
    "progress": 65,
    "messages": [
      {
        "executive": "exec_ceo",
        "name": "Jane Smith",
        "role": "CEO",
        "message": "I believe European expansion aligns with our 5-year growth plan.",
        "timestamp": "2025-04-14T15:45:00Z"
      },
      {
        "executive": "exec_cfo",
        "name": "Michael Chen",
        "role": "CFO",
        "message": "We need to consider the capital requirements and ROI timeline.",
        "timestamp": "2025-04-14T15:46:30Z"
      }
    ]
  }
}`
            },
            {
              code: "404",
              description: "Not Found",
              example: `{
  "success": false,
  "error": {
    "code": "resource/not-found",
    "message": "Debate not found"
  }
}`
            }
          ]
        }
      ]
    }
  ];

  return <ApiDocumentation categories={apiCategories} />;
}
