
import React from 'react';

interface JsonViewerProps {
  data: any;
  collapsed?: boolean;
  shouldCollapse?: (field: string, level: number) => boolean;
}

/**
 * A simple component to display JSON data in a formatted way
 */
export function JsonViewer({ data, collapsed = false, shouldCollapse }: JsonViewerProps) {
  return (
    <pre className="bg-muted p-4 rounded-md overflow-auto max-h-96 text-xs">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export default JsonViewer;
