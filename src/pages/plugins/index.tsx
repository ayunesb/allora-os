import React, { useState } from 'react';
import { usePlugins } from '@/hooks/usePlugins';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PluginLeaderboard } from '@/components/plugins/PluginLeaderboard';
import { executePlugin, installPlugin } from '@/utils/pluginAgent';
import { useCompanyId } from '@/hooks/useCompanyId';
import { toast } from 'sonner';
import { Download, Search, BarChart3, Zap, Package } from 'lucide-react';
export default function PluginsPage() {
    const { plugins, loading } = usePlugins();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('marketplace');
    const [installingPlugin, setInstallingPlugin] = useState(null);
    const [executingPlugin, setExecutingPlugin] = useState(null);
    const tenantId = useCompanyId();
    // Filter plugins based on search query
    const filteredPlugins = plugins.filter(plugin => plugin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plugin.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    const handleInstall = async (pluginSlug) => {
        if (!tenantId) {
            toast.error('Cannot install plugin: No tenant ID available');
            return;
        }
        setInstallingPlugin(pluginSlug);
        try {
            const result = await installPlugin(pluginSlug, tenantId);
            if (result.success) {
                toast.success('Plugin installed successfully');
                setActiveTab('installed');
            }
            else {
                toast.error(`Failed to install plugin: ${result.error}`);
            }
        }
        catch (error) {
            console.error('Error installing plugin:', error);
            toast.error('An error occurred while installing the plugin');
        }
        finally {
            setInstallingPlugin(null);
        }
    };
    const handleExecute = async (pluginSlug) => {
        if (!tenantId) {
            toast.error('Cannot execute plugin: No tenant ID available');
            return;
        }
        setExecutingPlugin(pluginSlug);
        try {
            const result = await executePlugin(pluginSlug, tenantId);
            if (result.success) {
                toast.success(result.message);
            }
            else {
                toast.error(`Failed to execute plugin: ${result.error}`);
            }
        }
        catch (error) {
            console.error('Error executing plugin:', error);
            toast.error('An error occurred while executing the plugin');
        }
        finally {
            setExecutingPlugin(null);
        }
    };
    const renderPluginCard = (plugin) => (<Card key={plugin.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{plugin.name}</CardTitle>
          {plugin.tags && plugin.tags.length > 0 && (<Badge variant="outline">{plugin.tags[0]}</Badge>)}
        </div>
        <CardDescription>{plugin.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1">
          {plugin.tags?.slice(1).map(tag => (<Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" disabled={!!executingPlugin} onClick={() => handleExecute(plugin.slug)} className="text-xs">
          {executingPlugin === plugin.slug ? (<>
              <span className="loading loading-spinner loading-xs mr-2"></span>
              Executing...
            </>) : (<>
              <Zap className="h-3 w-3 mr-1"/>
              Execute
            </>)}
        </Button>
        <Button size="sm" disabled={!!installingPlugin} onClick={() => handleInstall(plugin.slug)} className="text-xs">
          {installingPlugin === plugin.slug ? (<>
              <span className="loading loading-spinner loading-xs mr-2"></span>
              Installing...
            </>) : (<>
              <Download className="h-3 w-3 mr-1"/>
              Install
            </>)}
        </Button>
      </CardFooter>
    </Card>);
    return (<div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Plugin Marketplace</h1>
          <p className="text-muted-foreground">Extend your AI platform with powerful integrations</p>
        </div>

        <div className="w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
            <Input type="search" placeholder="Search plugins..." className="pl-8 w-full md:w-[250px] lg:w-[300px]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>
        </div>
      </div>

      <Tabs defaultValue="marketplace" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="marketplace">
            <Package className="h-4 w-4 mr-2"/>
            Marketplace
          </TabsTrigger>
          <TabsTrigger value="installed">
            <Zap className="h-4 w-4 mr-2"/>
            Installed
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="h-4 w-4 mr-2"/>
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="mt-6">
          {loading ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map(i => (<Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-2/3 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-3/4 opacity-70"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-1/4 mb-1"></div>
                    <div className="h-4 bg-muted rounded w-1/3"></div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <div className="h-8 bg-muted rounded w-[100px]"></div>
                  </CardFooter>
                </Card>))}
            </div>) : filteredPlugins.length === 0 ? (<div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-muted-foreground"/>
              <p className="mt-4 text-lg font-medium">No plugins found</p>
              <p className="text-muted-foreground">Try a different search query or check back later for new plugins</p>
            </div>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPlugins.map(renderPluginCard)}
            </div>)}
        </TabsContent>

        <TabsContent value="installed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* This would show installed plugins from the tenant_plugins table */}
            {/* For now, we'll just show some of the filteredPlugins */}
            {filteredPlugins.slice(0, 3).map(renderPluginCard)}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PluginLeaderboard />
            
            <Card>
              <CardHeader>
                <CardTitle>Plugin Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground py-8">
                  Plugin performance analytics coming soon
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>);
}
