
import React from "react";
import { CompanyHeader, CompanyTable } from "@/components/admin/companies";

export default function CompaniesPage() {
  return (
    <div className="space-y-6">
      <CompanyHeader />
      <CompanyTable />
    </div>
  );
}
