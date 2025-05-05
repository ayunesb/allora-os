import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AlertStatusIcon } from './AlertIcon';
import { AlertBadge } from './AlertBadge';
export const AlertItem = ({ alert, onAcknowledge }) => {
    return (<div key={alert.id} className={`rounded-md p-3 border ${alert.acknowledged
            ? 'bg-gray-50 border-gray-200'
            : `bg-${alert.severity === 'critical' ? 'red' : 'amber'}-50 border-${alert.severity === 'critical' ? 'red' : 'amber'}-200`}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-2">
          <AlertStatusIcon severity={alert.severity}/>
          <div>
            <h4 className={`font-medium ${alert.acknowledged ? 'text-gray-700' : 'text-gray-900'}`}>
              {alert.title}
            </h4>
            <p className={`text-sm mt-0.5 ${alert.acknowledged ? 'text-gray-500' : 'text-gray-700'}`}>
              {alert.message}
            </p>
          </div>
        </div>
        <AlertBadge severity={alert.severity}/>
      </div>
      <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
        <span>
          {new Date(alert.timestamp).toLocaleTimeString()}
        </span>
        {!alert.acknowledged && (<Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => onAcknowledge(alert.id)}>
            <CheckCircle2 className="h-3 w-3 mr-1"/> 
            Acknowledge
          </Button>)}
      </div>
    </div>);
};
