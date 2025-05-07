import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const SomeComponent = ({ selectedPluginName, }) => {
    return (_jsxs("div", { children: [_jsx("h1", { children: "Selected Plugin" }), _jsx("p", { children: selectedPluginName ? selectedPluginName : "No plugin selected" }), _jsx("input", { type: "text", value: selectedPluginName !== null && selectedPluginName !== void 0 ? selectedPluginName : undefined })] }));
};
export default SomeComponent;
