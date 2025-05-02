
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
  // Format JSON with proper indentation
  const formattedJson = React.useMemo(() => {
    try {
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error("Error formatting JSON:", error);
      return String(data);
    }
  }, [data]);
  
  return (
    <pre className={`bg-muted p-4 rounded-md overflow-auto max-h-${maxHeight} text-xs font-mono`}>
      {formattedJson}
    </pre>
  );
}

export default JsonViewer;
