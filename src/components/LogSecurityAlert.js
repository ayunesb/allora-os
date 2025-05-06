import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const LogSecurityAlert = ({ message, severity, }) => {
    const getAlertColor = () => {
        switch (severity) {
            case "low":
                return "green";
            case "medium":
                return "orange";
            case "high":
                return "red";
            default:
                return "gray";
        }
    };
    return (_jsxs("div", { style: {
            border: `1px solid ${getAlertColor()}`,
            padding: "10px",
            borderRadius: "5px",
        }, children: [_jsx("strong", { children: "Security Alert:" }), " ", message] }));
};
