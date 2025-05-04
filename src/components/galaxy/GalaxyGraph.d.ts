type Node = {
    id: string;
    group: string;
};
type Link = {
    source: string;
    target: string;
};
type GraphProps = {
    nodes: Node[];
    links: Link[];
    onNodeClick?: (node: Node) => void;
};
declare const GalaxyGraph: ({ nodes, links, onNodeClick }: GraphProps) => import("react").JSX.Element;
export default GalaxyGraph;
