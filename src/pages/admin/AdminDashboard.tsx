
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import TechnicalHealthAccess from '@/components/admin/TechnicalHealthAccess';
import { AdminHeader, StatsRow, AdminModuleGrid } from '@/components/admin/dashboard';
import { StatItem } from '@/components/admin/dashboard/StatsRow';

export default function AdminDashboard() {
  // Define mock stats for dashboard display
  const [loading, setLoading] = useState(false);
  
  const stats: StatItem[] = [
    { 
      name: "Total Revenue", 
      value: "$124,500", 
      change: "+12.5%", 
      up: true 
    },
    { 
      name: "Active Users", 
      value: "2,345", 
      change: "+18.2%", 
      up: true 
    },
    { 
      name: "Conversion Rate", 
      value: "3.6%", 
      change: "-0.8%", 
      up: false 
    },
    { 
      name: "Avg. Session", 
      value: "4m 12s", 
      change: "+2.4%", 
      up: true 
    },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Allora AI</title>
      </Helmet>
      
      <div className="space-y-6">
        <AdminHeader />
        <StatsRow stats={stats} isLoading={loading} />
        <AdminModuleGrid />
      </div>
    </>
  );
}
