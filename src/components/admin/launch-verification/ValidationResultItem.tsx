
import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ValidationResultProps {
  name: string;
  result: {
    valid: boolean;
    message: string;
  };
}

export function ValidationResultItem({ name, result }: ValidationResultProps) {
  return (
    <div 
      className={`p-3 rounded-md ${
        result.valid ? 'bg-green-50 border border-green-100' : 'bg-red-50 border border-red-100'
      }`}
    >
      <div className="flex items-start gap-2">
        {result.valid ? 
          <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" /> : 
          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
        }
        <div>
          <p className={`font-medium ${result.valid ? 'text-green-700' : 'text-red-700'}`}>
            {name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
          </p>
          <p className={`text-sm ${result.valid ? 'text-green-600' : 'text-red-600'}`}>{result.message}</p>
        </div>
      </div>
    </div>
  );
}
