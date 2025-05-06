interface JsonViewerProps {
  data: any;
  collapsed?: boolean;
  shouldCollapse?: (field: string, level: number) => boolean;
  maxHeight?: string;
}
/**
 * A simple component to display JSON data in a formatted way
 */
export declare function JsonViewer({
  data,
  collapsed,
  shouldCollapse,
  maxHeight,
}: JsonViewerProps): JSX.Element;
export default JsonViewer;
