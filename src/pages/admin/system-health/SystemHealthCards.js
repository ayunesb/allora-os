import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Cpu, Globe, CheckCircle2, Activity, XCircle } from 'lucide-react';
export default function SystemHealthCards({ systemHealth, services }) {
    // Get health status icon
    const getStatusIcon = (status) => {
        switch (status) {
            case 'healthy':
                return <CheckCircle2 className="h-5 w-5 text-green-500"/>;
            case 'degraded':
                return <Activity className="h-5 w-5 text-amber-500"/>;
            case 'down':
                return <XCircle className="h-5 w-5 text-red-500"/>;
            default:
                return null;
        }
    };
    return (<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className={`border-l-4 ${systemHealth.status === 'healthy' ? 'border-l-green-500' :
            systemHealth.status === 'degraded' ? 'border-l-amber-500' :
                'border-l-red-500'}`}>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Shield className="h-5 w-5 mr-2"/>
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            {getStatusIcon(systemHealth.status)}
            <span className="ml-2 font-medium capitalize">
              {systemHealth.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {systemHealth.status === 'healthy'
            ? 'All systems operational'
            : systemHealth.status === 'degraded'
                ? 'Some services degraded'
                : 'Critical services down'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Cpu className="h-5 w-5 mr-2"/>
            Service Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm mb-1">
            <span>{services.filter(s => s.status === 'healthy').length} Healthy</span>
            <span>{services.filter(s => s.status !== 'healthy').length} Issues</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: `${systemHealth.percentage}%` }}></div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Globe className="h-5 w-5 mr-2"/>
            API Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Operational</span>
            </div>
            <span className="text-sm text-muted-foreground">
              Avg: 87ms
            </span>
          </div>
        </CardContent>
      </Card>
    </div>);
}
