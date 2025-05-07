import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const JsonViewer = ({ data, expandLevel = 2 }) => {
    const formatJson = (obj, level = 0) => {
        if (obj === null)
            return _jsx("span", { className: "text-gray-500", children: "null" });
        if (obj === undefined)
            return _jsx("span", { className: "text-gray-500", children: "undefined" });
        if (typeof obj === "string")
            return _jsxs("span", { className: "text-green-600", children: ["\"", obj, "\""] });
        if (typeof obj === "number")
            return _jsx("span", { className: "text-blue-600", children: obj });
        if (typeof obj === "boolean")
            return _jsx("span", { className: "text-orange-600", children: obj ? "true" : "false" });
        if (Array.isArray(obj)) {
            const isExpanded = level < expandLevel;
            if (!isExpanded) {
                return _jsx("span", { className: "text-gray-500", children: "[...Array]" });
            }
            if (obj.length === 0) {
                return _jsx("span", { className: "text-gray-500", children: "[]" });
            }
            return (_jsxs("div", { className: `ml-${level > 0 ? "4" : "0"}`, children: [_jsx("span", { className: "text-gray-700", children: "[" }), _jsx("div", { className: "ml-4", children: obj.map((item, i) => (_jsx("div", { className: "flex", children: _jsxs("span", { children: [formatJson(item, level + 1), i < obj.length - 1 ? "," : ""] }) }, i))) }), _jsx("span", { className: "text-gray-700", children: "]" })] }));
        }
        if (typeof obj === "object") {
            const isExpanded = level < expandLevel;
            const keys = Object.keys(obj);
            if (!isExpanded) {
                return _jsx("span", { className: "text-gray-500", children: "...Object" });
            }
            if (keys.length === 0) {
                return _jsx("span", { className: "text-gray-500", children: "{}" });
            }
            return (_jsxs("div", { className: `ml-${level > 0 ? "4" : "0"}`, children: [_jsx("span", { className: "text-gray-700", children: "{" }), _jsx("div", { className: "ml-4", children: keys.map((key, i) => (_jsxs("div", { className: "flex", children: [_jsxs("span", { className: "text-purple-600", children: ["\"", key, "\""] }), _jsx("span", { className: "mr-1", children: ": " }), _jsxs("span", { children: [formatJson(obj[key], level + 1), i < keys.length - 1 ? "," : ""] })] }, key))) }), _jsx("span", { className: "text-gray-700", children: "}" })] }));
        }
        return _jsx("span", { children: String(obj) });
    };
    try {
        return (_jsx("pre", { className: "text-xs font-mono whitespace-pre-wrap break-all", children: formatJson(data) }));
    }
    catch (error) {
        return (_jsxs("div", { className: "text-red-500 text-xs", children: ["Error formatting JSON:", " ", error instanceof Error ? error.message : String(error)] }));
    }
};
export default JsonViewer;
