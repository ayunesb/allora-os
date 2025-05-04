import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { optimizedApiClient } from '@/utils/api/optimizedApiClient';
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { DashboardBreadcrumb } from "@/components/ui/dashboard-breadcrumb";
import { Sparkles, TrendingUp, Download, FileBarChart, Filter } from 'lucide-react';
import { toast } from "sonner";
const MOCK_PLUGINS = [
    {
        name: "StripeSync",
        installs: 91,
        roi: 112.3,
        category: "Billing",
        lastUsed: "2025-04-28T17:40:00Z"
    },
    {
        name: "GoogleAnalytics",
        installs: 84,
        roi: 87.5,
        category: "Analytics",
        lastUsed: "2025-04-29T09:15:22Z"
    },
    {
        name: "ShopifyConnect",
        installs: 76,
        roi: 132.8,
        category: "E-commerce",
        lastUsed: "2025-04-27T14:22:10Z"
    },
    {
        name: "SEOOptimizer",
        installs: 68,
        roi: 95.2,
        category: "Marketing",
        lastUsed: "2025-04-25T11:30:45Z"
    },
    {
        name: "ZoomIntegration",
        installs: 62,
        roi: 78.6,
        category: "Communications",
        lastUsed: "2025-04-26T16:05:33Z"
    },
    {
        name: "SlackNotifier",
        installs: 57,
        roi: 64.3,
        category: "Communications",
        lastUsed: "2025-04-28T13:42:18Z"
    },
    {
        name: "HubSpotCRM",
        installs: 52,
        roi: 128.7,
        category: "CRM",
        lastUsed: "2025-04-29T08:10:05Z"
    },
    {
        name: "DocuSignConnect",
        installs: 49,
        roi: 76.4,
        category: "Legal",
        lastUsed: "2025-04-24T09:35:17Z"
    },
    {
        name: "SalesforceSync",
        installs: 47,
        roi: 141.2,
        category: "CRM",
        lastUsed: "2025-04-28T15:20:30Z"
    }
];
export default function PluginLeaderboard() {
    const [plugins, setPlugins] = useState(MOCK_PLUGINS);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("all");
    const [sortBy, setSortBy] = useState("installs");
    // Categories for filtering
    const categories = Array.from(new Set(plugins.map(p => p.category))).filter(Boolean);
    useEffect(() => {
        const loadPlugins = async () => {
            setIsLoading(true);
            try {
                const result = await optimizedApiClient.fetch('/api/plugin-usage', {
                    fallbackData: MOCK_PLUGINS
                });
                if (result.data) {
                    setPlugins(result.data);
                }
            }
            catch (err) {
                console.error('Failed to load plugin leaderboard', err);
                toast.error("Could not load plugin data");
            }
            finally {
                setIsLoading(false);
            }
        };
        loadPlugins();
    }, []);
    // Filter and sort plugins based on active tab and sort preference
    const filteredPlugins = plugins.filter(plugin => activeTab === "all" || plugin.category === activeTab).sort((a, b) => {
        if (sortBy === "installs") {
            return b.installs - a.installs;
        }
        else {
            return b.roi - a.roi;
        }
    });
    // Table columns configuration for the responsive table
    const columns = [
        {
            key: 'name',
            title: 'Plugin Name',
            render: (plugin) => (<div>
          <div className="font-medium">{plugin.name}</div>
          <div className="text-xs text-muted-foreground">
            {plugin.category}
          </div>
        </div>)
        },
        {
            key: 'installs',
            title: 'Installs',
            render: (plugin) => (<div className="font-medium">{plugin.installs.toLocaleString()}</div>)
        },
        {
            key: 'roi',
            title: 'ROI',
            render: (plugin) => (<div className="font-medium text-green-500">
          {plugin.roi.toFixed(1)}%
        </div>)
        },
        {
            key: 'lastUsed',
            title: 'Last Used',
            hideOnMobile: true,
            render: (plugin) => (<div className="text-sm text-muted-foreground">
          {plugin.lastUsed
                    ? new Date(plugin.lastUsed).toLocaleDateString()
                    : '—'}
        </div>)
        },
    ];
    return (<div className="space-y-6">
      <DashboardBreadcrumb />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-400"/>
            Plugin Leaderboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Most installed and highest ROI plugins across the Galaxy ecosystem
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            // Download functionality would be implemented here
            toast.success("Leaderboard data exported");
        }} className="flex items-center gap-1">
            <Download className="h-4 w-4"/>
            <span className="hidden sm:inline">Export</span>
          </Button>
          
          <Button variant="outline" size="sm" onClick={() => setSortBy(sortBy === "installs" ? "roi" : "installs")} className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4"/>
            <span className="hidden sm:inline">Sort by {sortBy === "installs" ? "ROI" : "Installs"}</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Plugins</TabsTrigger>
            {categories.map(category => (<TabsTrigger key={category} value={category} className="hidden md:inline-flex">
                {category}
              </TabsTrigger>))}
          </TabsList>
          
          <Button variant="ghost" size="sm" className="md:hidden">
            <Filter className="h-4 w-4 mr-1"/>
            Filter
          </Button>
        </div>

        <TabsContent value={activeTab} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlugins.slice(0, 3).map((plugin) => (<Card key={plugin.name} className="overflow-hidden border-white/10 bg-white/5 hover:shadow-md transition">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="font-semibold text-lg">{plugin.name}</h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="outline" className="text-xs">
                          {plugin.category || 'General'}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          Last used: {plugin.lastUsed ? new Date(plugin.lastUsed).toLocaleDateString() : '—'}
                        </span>
                      </div>
                    </div>
                    <Badge className={`${plugin.roi > 100 ? 'bg-green-500/10 text-green-500' :
                plugin.roi > 80 ? 'bg-blue-500/10 text-blue-500' :
                    'bg-amber-500/10 text-amber-500'} font-medium`}>
                      {sortBy === "roi" ?
                `#${filteredPlugins.indexOf(plugin) + 1}` :
                `${plugin.roi.toFixed(1)}%`}
                    </Badge>
                  </div>
                  
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Installs</p>
                      <p className="text-xl font-bold">{plugin.installs.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">ROI</p>
                      <p className="text-xl font-bold text-green-500">{plugin.roi.toFixed(1)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>))}
          </div>
          
          <Card>
            <CardContent className="p-4 sm:p-6">
              <ResponsiveTable data={filteredPlugins} columns={columns} mobileColumns={columns.filter(col => !col.hideOnMobile)} emptyState={<div className="text-center py-8">
                    <FileBarChart className="h-10 w-10 mx-auto mb-2 text-muted-foreground/50"/>
                    <p className="font-medium">No plugin data available</p>
                    <p className="text-sm text-muted-foreground">Check back later or adjust your filters</p>
                  </div>}/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>);
}
