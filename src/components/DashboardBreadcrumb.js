import { jsx as _jsx } from "react/jsx-runtime";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
const DashboardBreadcrumb = ({ rootPath, rootLabel, }) => {
    return (_jsx(Breadcrumb, { children: _jsx(Breadcrumb.Item, { children: _jsx(Link, { to: rootPath, children: rootLabel }) }) }));
};
export default DashboardBreadcrumb;
