
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminLayout from '@/components/AdminLayout';

// This is a simple wrapper component to maintain the import structure
// but use our existing AdminLayout component
export default function AdminLayoutWrapper() {
  return <AdminLayout><Outlet /></AdminLayout>;
}
