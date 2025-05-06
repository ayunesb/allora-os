import React from "react";
interface InspectorSidebarProps {
  data: any;
  onClose: () => void;
  onNodeHover: (node: any) => void;
}
export declare const InspectorSidebar: React.FC<InspectorSidebarProps>;
export {};
