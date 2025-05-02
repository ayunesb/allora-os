
import React from 'react';

interface JsonViewerProps {
  data: any;
  expandLevel?: number;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data, expandLevel = 2 }) => {
  const formatJson = (obj: any, level = 0): React.ReactNode => {
    if (obj === null) return <span className="text-gray-500">null</span>;
    if (obj === undefined) return <span className="text-gray-500">undefined</span>;
    
    if (typeof obj === 'string') return <span className="text-green-600">"{obj}"</span>;
    if (typeof obj === 'number') return <span className="text-blue-600">{obj}</span>;
    if (typeof obj === 'boolean') return <span className="text-orange-600">{obj ? 'true' : 'false'}</span>;
    
    if (Array.isArray(obj)) {
      const isExpanded = level < expandLevel;
      
      if (!isExpanded) {
        return <span className="text-gray-500">[...Array]</span>;
      }
      
      if (obj.length === 0) {
        return <span className="text-gray-500">[]</span>;
      }
      
      return (
        <div className={`ml-${level > 0 ? '4' : '0'}`}>
          <span className="text-gray-700">[</span>
          <div className="ml-4">
            {obj.map((item, i) => (
              <div key={i} className="flex">
                <span>{formatJson(item, level + 1)}{i < obj.length - 1 ? ',' : ''}</span>
              </div>
            ))}
          </div>
          <span className="text-gray-700">]</span>
        </div>
      );
    }
    
    if (typeof obj === 'object') {
      const isExpanded = level < expandLevel;
      const keys = Object.keys(obj);
      
      if (!isExpanded) {
        return <span className="text-gray-500">{'...Object'}</span>;
      }
      
      if (keys.length === 0) {
        return <span className="text-gray-500">{'{}'}</span>;
      }
      
      return (
        <div className={`ml-${level > 0 ? '4' : '0'}`}>
          <span className="text-gray-700">{'{'}</span>
          <div className="ml-4">
            {keys.map((key, i) => (
              <div key={key} className="flex">
                <span className="text-purple-600">"{key}"</span>
                <span className="mr-1">: </span>
                <span>
                  {formatJson(obj[key], level + 1)}
                  {i < keys.length - 1 ? ',' : ''}
                </span>
              </div>
            ))}
          </div>
          <span className="text-gray-700">{'}'}</span>
        </div>
      );
    }
    
    return <span>{String(obj)}</span>;
  };
  
  try {
    return (
      <pre className="text-xs font-mono whitespace-pre-wrap break-all">
        {formatJson(data)}
      </pre>
    );
  } catch (error) {
    return (
      <div className="text-red-500 text-xs">
        Error formatting JSON: {error instanceof Error ? error.message : String(error)}
      </div>
    );
  }
}

export default JsonViewer;
