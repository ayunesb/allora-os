import React from "react";
import { Outlet } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/dashboard/Sidebar";
export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <ScrollArea className="h-screen w-full">
          <main className="flex-1 p-4 md:p-6">{children ?? <Outlet />}</main>
        </ScrollArea>
      </div>
    </div>
  );
}
