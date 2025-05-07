import { jsx as _jsx } from "react/jsx-runtime";
import DashboardBreadcrumb from "@/components/DashboardBreadcrumb";
const Publish = () => {
    return (_jsx("div", { children: _jsx(DashboardBreadcrumb, { rootPath: "/vault", rootLabel: "Vault" }) }));
};
export default Publish;
