import { User } from "@/models/user";
interface UserTableProps {
    users: User[];
    isLoading?: boolean;
    onUpdateUser: (userId: string, data: Partial<User>) => void;
    onDeleteUser: (userId: string, userName: string) => void;
}
export declare const UserTable: ({ users, isLoading, onUpdateUser, onDeleteUser }: UserTableProps) => JSX.Element;
export {};
