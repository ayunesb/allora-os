
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminEntities() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Entity Management</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>System Entities</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page is for entity management. Please implement the entity management functionality.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
