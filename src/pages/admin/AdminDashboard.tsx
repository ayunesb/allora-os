import React from 'react';
import { Helmet } from 'react-helmet-async';
import TechnicalHealthAccess from '@/components/admin/TechnicalHealthAccess';
import { AdminHeader, StatsRow, AdminModuleGrid } from '@/components/admin/dashboard';

export default function AdminDashboard() {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Allora AI</title>
      </Helmet>
      
      <div className="space-y-6">
        <AdminHeader />
        <StatsRow />
        <AdminModuleGrid />
      </div>
    </>
  );
}
