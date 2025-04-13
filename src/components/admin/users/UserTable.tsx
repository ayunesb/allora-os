
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@/models/user";
import { Shield, ShieldOff, Trash2, User as UserIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useBreakpoint } from '@/hooks/use-mobile';

interface UserTableProps {
  users: User[];
  isLoading?: boolean; // Make isLoading optional
  onUpdateUser: (userId: string, data: Partial<User>) => void;
  onDeleteUser: (userId: string, userName: string) => void;
}

export const UserTable = ({ users, isLoading = false, onUpdateUser, onDeleteUser }: UserTableProps) => {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  const isTabletView = breakpoint === 'tablet';
  
  if (isLoading) {
    return (
      <div className="text-center py-8 border border-white/10 rounded-md text-gray-400 bg-[#111827]">
        Loading users...
      </div>
    );
  }
  
  if (users.length === 0) {
    return (
      <div className="text-center py-8 border border-white/10 rounded-md text-gray-400 bg-[#111827]">
        No users found
      </div>
    );
  }

  // For mobile view, use a card-based layout instead of a table
  if (isMobileView) {
    return (
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="border border-white/10 rounded-md p-4 bg-[#111827] shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className="bg-[#1E293B] rounded-full p-2 mr-3">
                  <UserIcon size={16} className="text-[#5A67D8]" />
                </div>
                <div>
                  <h3 className="font-medium text-white">{user.name || 'Unnamed User'}</h3>
                  <p className="text-sm text-gray-400">{user.email}</p>
                </div>
              </div>
              <Badge variant={user.role === 'admin' ? "default" : "secondary"} className={user.role === 'admin' ? "bg-[#5A67D8]" : "bg-gray-600"}>
                {user.role}
              </Badge>
            </div>
            <div className="text-xs text-gray-400 mb-3">
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
                className="flex-1 h-8 px-2 border-white/10 bg-[#1E293B] hover:bg-[#2D3A4F] text-white"
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
                className="flex-1 h-8 px-2 text-red-500 border-white/10 bg-[#1E293B] hover:bg-[#2D3A4F]"
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
    <div className="rounded-md border border-white/10 overflow-x-auto bg-[#111827]">
      <Table>
        <TableHeader className="bg-[#1A1F2C]">
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="text-gray-400">Name</TableHead>
            <TableHead className={`text-gray-400 ${isTabletView ? "hidden lg:table-cell" : ""}`}>Email</TableHead>
            <TableHead className="text-gray-400">Role</TableHead>
            <TableHead className="hidden md:table-cell text-gray-400">Created</TableHead>
            <TableHead className="text-gray-400">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} className="border-white/10 hover:bg-[#1E293B]">
              <TableCell className="font-medium text-white">{user.name || 'Unnamed User'}</TableCell>
              <TableCell className={`text-gray-300 ${isTabletView ? "hidden lg:table-cell" : ""}`}>{user.email}</TableCell>
              <TableCell>
                <Badge variant={user.role === 'admin' ? "default" : "secondary"} className={user.role === 'admin' ? "bg-[#5A67D8]" : "bg-gray-600"}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell text-gray-300">{new Date(user.created_at).toLocaleDateString()}</TableCell>
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
                    className="h-8 px-2 flex items-center gap-1 border-white/10 bg-[#1E293B] hover:bg-[#2D3A4F] text-white"
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
                    className="h-8 px-2 flex items-center gap-1 text-red-500 border-white/10 bg-[#1E293B] hover:bg-[#2D3A4F]"
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
