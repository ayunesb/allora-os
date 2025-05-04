import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { ResponsiveTable } from "@/components/ui/responsive-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
const mockEntities = [
    { id: "1", name: "User", type: "Core", createdAt: "2023-03-15", status: "active" },
    { id: "2", name: "Company", type: "Core", createdAt: "2023-03-15", status: "active" },
    { id: "3", name: "Strategy", type: "Business", createdAt: "2023-04-20", status: "active" },
    { id: "4", name: "Executive", type: "AI", createdAt: "2023-05-10", status: "active" }
];
export default function AdminEntities() {
    const columns = [
        {
            key: "name",
            title: "Entity Name",
            render: (item) => <span className="font-medium">{item.name}</span>,
        },
        {
            key: "type",
            title: "Type",
            render: (item) => <span>{item.type}</span>,
        },
        {
            key: "createdAt",
            title: "Created",
            hideOnMobile: true,
            render: (item) => <span>{item.createdAt}</span>,
        },
        {
            key: "status",
            title: "Status",
            render: (item) => (<span className={`inline-flex px-2 py-1 text-xs rounded-full ${item.status === "active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : item.status === "inactive"
                        ? "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>
          {item.status}
        </span>),
        },
    ];
    const mobileColumns = [
        {
            key: "name",
            title: "Entity Name",
            render: (item) => <span className="font-medium">{item.name}</span>,
        },
        {
            key: "type",
            title: "Type",
            render: (item) => <span>{item.type}</span>,
        },
        {
            key: "status",
            title: "Status",
            render: (item) => (<span className={`inline-flex px-2 py-1 text-xs rounded-full ${item.status === "active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : item.status === "inactive"
                        ? "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"}`}>
          {item.status}
        </span>),
        },
    ];
    const actions = (item) => (<div className="flex gap-2 justify-end">
      <Button variant="outline" size="sm">Edit</Button>
      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Delete</Button>
    </div>);
    return (<div className="container mx-auto px-4 py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TypographyH1>Entity Management</TypographyH1>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2"/>
          Add Entity
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>System Entities</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveTable data={mockEntities} columns={columns} mobileColumns={mobileColumns} actions={actions} emptyState={<div className="text-center py-8">
                <TypographyP>No entities found. Create your first entity to get started.</TypographyP>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2"/>
                  Add Entity
                </Button>
              </div>}/>
        </CardContent>
      </Card>
    </div>);
}
