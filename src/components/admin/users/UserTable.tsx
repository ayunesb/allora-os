
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@/models/user";
import { Shield, ShieldOff, Trash2, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useBreakpoint } from '@/hooks/use-mobile';

interface UserTableProps {
  users: User[];
  onUpdateUser: (userId: string, data: any) => void;
  onDeleteUser: (userId: string, userName: string) => void;
}

export const UserTable = ({ users, onUpdateUser, onDeleteUser }: UserTableProps) => {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  const isTabletView = breakpoint === 'tablet';
  
  if (users.length === 0) {
    return (
      <div className="text-center py-8 border rounded-md text-muted-foreground">
        No users found
      </div>
    );
  }

  // For mobile view, use a card-based layout instead of a table
  if (isMobileView) {
    return (
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="border rounded-md p-4 bg-card shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-primary/10 rounded-full p-2 mr-3">
                  <UserIcon size={16} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{user.name || 'Unnamed User'}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Badge variant={user.role === 'admin' ? "default" : "secondary"}>
                {user.role}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground mb-3">
              Created: {new Date(user.created_at).toLocaleDateString()}
            </div>
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const newRole = user.role === 'admin' ? 'user' : 'admin';
                  onUpdateUser(user.id, { role: newRole });
                  toast.success(`User role updated to ${newRole}`);
                }}
                className="flex-1 h-8 px-2"
              >
                {user.role === 'admin' ? (
                  <>
                    <ShieldOff className="h-3 w-3 mr-2" /> 
                    Make User
                  </>
                ) : (
                  <>
                    <Shield className="h-3 w-3 mr-2" /> 
                    Make Admin
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 h-8 px-2 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                onClick={() => onDeleteUser(user.id, user.name || user.email || '')}
              >
                <Trash2 className="h-3 w-3 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Regular table for tablet and desktop
  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className={isTabletView ? "hidden lg:table-cell" : ""}>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name || 'Unnamed User'}</TableCell>
              <TableCell className={isTabletView ? "hidden lg:table-cell" : ""}>{user.email}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
