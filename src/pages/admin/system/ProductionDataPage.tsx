
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, ServerCrash, Shield, RefreshCw, ArrowRightLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProductionDataPage() {
  const navigate = useNavigate();
  const [isProductionMode, setIsProductionMode] = React.useState(false);
  
  const toggleProductionMode = () => {
    if (!isProductionMode) {
      if (window.confirm('Are you sure you want to switch to production mode? This will affect live data.')) {
        setIsProductionMode(true);
      }
    } else {
      setIsProductionMode(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold tracking-tight">Production Data Management</h2>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          
          <Button
            variant={isProductionMode ? "destructive" : "default"}
            size="sm"
            className="gap-2"
            onClick={toggleProductionMode}
          >
            <ArrowRightLeft className="h-4 w-4" />
            {isProductionMode ? "Switch to Development" : "Switch to Production"}
          </Button>
        </div>
      </div>
      
      <div className="bg-muted/30 rounded-lg p-4 mb-6 flex items-center">
        <div className="mr-4">
          <Badge variant={isProductionMode ? "destructive" : "default"} className="px-3 py-1">
            {isProductionMode ? "PRODUCTION MODE" : "DEVELOPMENT MODE"}
          </Badge>
        </div>
        <div className="text-sm">
          {isProductionMode 
            ? "You are currently modifying production data. All changes will affect the live system." 
            : "You are in development mode. Changes won't affect the production system."}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <Database className="mr-2 h-5 w-5 text-primary" />
              Database Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <div className="flex justify-between mb-2">
                <span>Connection:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Connected</Badge>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tables:</span>
                <span className="font-medium">32</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>RLS Policies:</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span>Functions:</span>
                <span className="font-medium">8</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4"
              onClick={() => navigate('/admin/entities')}
            >
              Manage Database
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <ServerCrash className="mr-2 h-5 w-5 text-primary" />
              API Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <div className="flex justify-between mb-2">
                <span>Status:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Operational</Badge>
              </div>
              <div className="flex justify-between mb-2">
                <span>Edge Functions:</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Webhooks:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span>Response Time:</span>
                <span className="font-medium">124ms</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4"
              onClick={() => navigate('/admin/webhooks')}
            >
              Manage Services
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-base">
              <Shield className="mr-2 h-5 w-5 text-primary" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <div className="flex justify-between mb-2">
                <span>Status:</span>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Secure</Badge>
              </div>
              <div className="flex justify-between mb-2">
                <span>API Keys:</span>
                <span className="font-medium">4</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Auth Providers:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span>Last Audit:</span>
                <span className="font-medium">2 days ago</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-4"
              onClick={() => navigate('/admin/audit')}
            >
              Run Security Audit
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
