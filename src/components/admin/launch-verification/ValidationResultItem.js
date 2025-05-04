import React from 'react';
import { Check, X } from "lucide-react";
export function ValidationResultItem({ id, title, result }) {
    const getStatusIcon = () => {
        if (result.valid) {
            return <Check className="h-4 w-4 text-green-500"/>;
        }
        else {
            return <X className="h-4 w-4 text-red-500"/>;
        }
    };
    return (<div className="flex items-start gap-4 px-4 py-3 border rounded-md bg-muted/20">
      <div className="mt-0.5">{getStatusIcon()}</div>
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        <p className="text-sm text-muted-foreground">{result.message}</p>
      </div>
    </div>);
}
