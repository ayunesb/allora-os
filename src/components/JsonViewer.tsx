
import React from 'react';

interface JsonViewerProps {
  data: any;
}

const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
  return (
    <pre className="text-xs p-3 bg-muted/50 font-mono overflow-x-auto">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
};

export default JsonViewer;
