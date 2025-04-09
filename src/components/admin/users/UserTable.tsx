
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@/models/user";
import { Shield, ShieldOff, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface UserTableProps {
  users: User[];
  onUpdateUser: (userId: string, data: any) => void;
  onDeleteUser: (userId: string, userName: string) => void;
}

export const UserTable = ({ users, onUpdateUser, onDeleteUser }: UserTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name || 'Unnamed User'}</TableCell>
                <TableCell className="hidden sm:table-cell">{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? "default" : "secondary"}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{new Date(user.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        // Toggle user role between admin and user
                        const newRole = user.role === 'admin' ? 'user' : 'admin';
                        onUpdateUser(user.id, { role: newRole });
                        toast.success(`User role updated to ${newRole}`);
                      }}
                      className="h-8 px-2 flex items-center gap-1"
                    >
                      {user.role === 'admin' ? (
                        <>
                          <ShieldOff className="h-3 w-3" /> 
                          <span className="hidden sm:inline">Make User</span>
                        </>
                      ) : (
                        <>
                          <Shield className="h-3 w-3" /> 
                          <span className="hidden sm:inline">Make Admin</span>
                        </>
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2 flex items-center gap-1 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                      onClick={() => onDeleteUser(user.id, user.name || user.email || '')}
                    >
                      <Trash2 className="h-3 w-3" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
