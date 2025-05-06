"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiDocumentationPage = ApiDocumentationPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
function ApiDocumentationPage() {
  return (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
    defaultValue: "overview",
    className: "w-full",
    children: [
      (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
        className: "mb-4",
        children: [
          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
            value: "overview",
            children: "Overview",
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
            value: "authentication",
            children: "Authentication",
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
            value: "endpoints",
            children: "Endpoints",
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
            value: "examples",
            children: "Examples",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
        value: "overview",
        children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "API Overview",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children: "Introduction to the Allora AI platform API",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  children:
                    "The Allora AI API provides programmatic access to your business acceleration platform. Use this API to integrate Allora AI's executive insights, strategy recommendations, and business intelligence into your workflows and applications.",
                }),
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-lg font-semibold mt-4",
                  children: "Base URL",
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "bg-muted p-2 rounded-md font-mono text-sm",
                  children: "https://api.all-or-a.online/v1",
                }),
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-lg font-semibold mt-4",
                  children: "Response Format",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  children: "All API responses are returned in JSON format.",
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
        value: "authentication",
        children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "Authentication",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children: "How to authenticate with the Allora AI API",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  children:
                    "Authentication to the Allora AI API is performed using API keys. Each request must include your API key in the Authorization header.",
                }),
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-lg font-semibold mt-4",
                  children: "API Keys",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  children:
                    "You can generate an API key from your dashboard under Settings \u2192 API Keys. Your API key should be kept secure and not shared publicly.",
                }),
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-lg font-semibold mt-4",
                  children: "Authentication Header",
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "bg-muted p-2 rounded-md font-mono text-sm",
                  children: "Authorization: Bearer YOUR_API_KEY",
                }),
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-lg font-semibold mt-4",
                  children: "Example Request",
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className:
                    "bg-muted p-2 rounded-md font-mono text-sm overflow-x-auto",
                  children: (0, jsx_runtime_1.jsx)("pre", {
                    children:
                      'curl -X GET "https://api.all-or-a.online/v1/strategies" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json"',
                  }),
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
        value: "endpoints",
        children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "API Endpoints",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children: "Available endpoints and their functionality",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
              className: "space-y-6",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "text-lg font-semibold",
                      children: "Strategies",
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "bg-muted/30 rounded-md p-4 mt-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2 mb-2",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className:
                                "bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium",
                              children: "GET",
                            }),
                            (0, jsx_runtime_1.jsx)("code", {
                              className: "text-sm",
                              children: "/strategies",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children: "Get all strategies for your business",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "bg-muted/30 rounded-md p-4 mt-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2 mb-2",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className:
                                "bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium",
                              children: "GET",
                            }),
                            (0, jsx_runtime_1.jsxs)("code", {
                              className: "text-sm",
                              children: ["/strategies/", "{id}"],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children: "Get a specific strategy by ID",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "text-lg font-semibold",
                      children: "Executives",
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "bg-muted/30 rounded-md p-4 mt-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2 mb-2",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className:
                                "bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium",
                              children: "GET",
                            }),
                            (0, jsx_runtime_1.jsx)("code", {
                              className: "text-sm",
                              children: "/executives",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children:
                            "Get all AI executives available to your account",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "bg-muted/30 rounded-md p-4 mt-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2 mb-2",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className:
                                "bg-emerald-500 text-white px-2 py-1 rounded text-xs font-medium",
                              children: "POST",
                            }),
                            (0, jsx_runtime_1.jsx)("code", {
                              className: "text-sm",
                              children: "/executives/debate",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children: "Start a new executive debate on a topic",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "text-lg font-semibold",
                      children: "Analytics",
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "bg-muted/30 rounded-md p-4 mt-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2 mb-2",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className:
                                "bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium",
                              children: "GET",
                            }),
                            (0, jsx_runtime_1.jsx)("code", {
                              className: "text-sm",
                              children: "/analytics/overview",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children: "Get overall business analytics",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "bg-muted/30 rounded-md p-4 mt-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2 mb-2",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className:
                                "bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium",
                              children: "GET",
                            }),
                            (0, jsx_runtime_1.jsx)("code", {
                              className: "text-sm",
                              children: "/analytics/campaigns",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children: "Get analytics for marketing campaigns",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
        value: "examples",
        children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                  children: "API Examples",
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                  children: "Code examples for using the Allora AI API",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
              className: "space-y-6",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsxs)("h3", {
                      className:
                        "text-lg font-semibold flex items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Code, {
                          size: 18,
                        }),
                        "JavaScript Example",
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className:
                        "bg-muted/50 p-4 rounded-md mt-2 overflow-x-auto",
                      children: (0, jsx_runtime_1.jsx)("pre", {
                        className: "text-sm",
                        children:
                          "// Fetch strategies using fetch API\nasync function getStrategies() {\n  try {\n    const response = await fetch('https://api.all-or-a.online/v1/strategies', {\n      method: 'GET',\n      headers: {\n        'Authorization': 'Bearer YOUR_API_KEY',\n        'Content-Type': 'application/json'\n      }\n    });\n    \n    if (!response.ok) {\n      throw new Error(`HTTP error! status: ${response.status}`);\n    }\n    \n    const data = await response.json();\n    console.log('Strategies:', data);\n    return data;\n  } catch (error) {\n    console.error('Error fetching strategies:', error);\n  }\n}",
                      }),
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsxs)("h3", {
                      className:
                        "text-lg font-semibold flex items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Code, {
                          size: 18,
                        }),
                        "Python Example",
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className:
                        "bg-muted/50 p-4 rounded-md mt-2 overflow-x-auto",
                      children: (0, jsx_runtime_1.jsx)("pre", {
                        className: "text-sm",
                        children:
                          'import requests\n\ndef get_strategies():\n    api_key = "YOUR_API_KEY"\n    url = "https://api.all-or-a.online/v1/strategies"\n    \n    headers = {\n        "Authorization": f"Bearer {api_key}",\n        "Content-Type": "application/json"\n    }\n    \n    try:\n        response = requests.get(url, headers=headers)\n        response.raise_for_status()  # Raise exception for 4XX/5XX responses\n        \n        return response.json()\n    except requests.exceptions.RequestException as e:\n        print(f"Error fetching strategies: {e}")\n        return None\n\nstrategies = get_strategies()\nif strategies:\n    print("Strategies:", strategies)',
                      }),
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
