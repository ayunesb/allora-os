
import React from 'react';

interface JsonViewerProps {
  data: any;
  collapsed?: boolean;
  shouldCollapse?: (field: string, level: number) => boolean;
  maxHeight?: string;
}

/**
 * A simple component to display JSON data in a formatted way
 */
export function JsonViewer({ data, collapsed = false, shouldCollapse, maxHeight = "96" }: JsonViewerProps) {
  // Handle different JSON display options
  const formattedJson = JSON.stringify(data, null, 2);
  
  return (
    <pre className={`bg-muted p-4 rounded-md overflow-auto max-h-${maxHeight} text-xs`}>
      {formattedJson}
    </pre>
  );
}

export default JsonViewer;
