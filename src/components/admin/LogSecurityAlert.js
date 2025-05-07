import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const LogSecurityAlert = ({ alertMessage, timestamp, }) => {
    return (_jsxs("div", { className: "security-alert", children: [_jsxs("p", { children: [_jsx("strong", { children: "Alert:" }), " ", alertMessage] }), _jsx("p", { children: _jsx("small", { children: new Date(timestamp).toLocaleString() }) })] }));
};
// Auto-registration block (example)
export const registerLogSecurityAlert = () => {
    // Logic to register this component in admin/system views
    console.log("LogSecurityAlert component registered.");
};
export default LogSecurityAlert;
