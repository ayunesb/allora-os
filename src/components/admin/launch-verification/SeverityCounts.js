import React from 'react';
import { Badge } from "@/components/ui/badge";
export function SeverityCounts({ counts }) {
    return (<div className="flex flex-wrap gap-2 my-3">
      <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
        Critical: {counts.critical}
      </Badge>
      <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
        High: {counts.high}
      </Badge>
      <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
        Medium: {counts.medium}
      </Badge>
      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
        Low: {counts.low}
      </Badge>
    </div>);
}
