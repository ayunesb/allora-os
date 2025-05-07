import { jsx as _jsx } from "react/jsx-runtime";
import { LogSecurityAlert } from "@/components/admin/LogSecurityAlert";
const LogsPage = ({ logs, }) => {
    return (_jsx("div", { children: logs.map((log) => (_jsx(LogSecurityAlert, { level: log.level, message: log.message }, log.id))) }));
};
export default LogsPage;
