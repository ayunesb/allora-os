import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

interface DashboardBreadcrumbProps {
  rootPath: string;
  rootLabel: string;
}

const DashboardBreadcrumb: React.FC<DashboardBreadcrumbProps> = ({ rootPath, rootLabel }) => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to={rootPath}>{rootLabel}</Link>
      </Breadcrumb.Item>
      {/* Add more breadcrumb items as needed */}
    </Breadcrumb>
  );
};

export default DashboardBreadcrumb;