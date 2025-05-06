import React from "react";
/**
 * A simple component to display JSON data in a formatted way
 */
export function JsonViewer({
  data,
  collapsed = false,
  shouldCollapse,
  maxHeight = "96",
}) {
  // Format JSON with proper indentation
  const formattedJson = React.useMemo(() => {
    try {
      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error("Error formatting JSON:", error);
      return String(data);
    }
  }, [data]);
  // Ensure the maxHeight is a valid Tailwind class value
  const heightClass =
    maxHeight && !isNaN(parseInt(maxHeight))
      ? `max-h-${maxHeight}`
      : `max-h-96`;
  return (
    <pre
      className={`bg-muted p-4 rounded-md overflow-auto ${heightClass} text-xs font-mono`}
    >
      {formattedJson}
    </pre>
  );
}
export default JsonViewer;
