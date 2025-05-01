
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminOnly from '@/components/AdminOnly';
import AdminSidebar from '@/components/layout/AdminSidebar';
import AdminHeader from '@/components/layout/AdminHeader';

export default function AdminLayout() {
  return (
    <AdminOnly>
      <div className="min-h-screen flex flex-col">
        <AdminHeader />
        <div className="flex-1 flex">
          <aside className="w-64 hidden md:block">
            <AdminSidebar />
          </aside>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminOnly>
  );
}
