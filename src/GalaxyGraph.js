import { jsx as _jsx } from "react/jsx-runtime";
import { ForceGraph2D } from "react-force-graph";
import { useRouter } from "next/router";
const GalaxyGraph = ({ data }) => {
    const router = useRouter();
    const handleNodeClick = (node) => {
        if (node.type === "plugin") {
            router.push(`/plugin/${node.id}`);
        }
        else if (node.type === "strategy") {
            router.push(`/strategy/${node.id}`);
        }
    };
    return (_jsx(ForceGraph2D, { graphData: data, onNodeClick: (node) => {
            handleNodeClick(node);
            // any extra logic here
        } }));
};
export default GalaxyGraph;
