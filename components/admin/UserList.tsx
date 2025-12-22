"use client";

import { useAdmin } from "@/hooks/useAdmin";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";

type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    isVisible: boolean;
};

interface UserListProps {
    filterRole?: string;
}

const UserList = ({ filterRole }: UserListProps) => {
    const { isLoading, isError, getAllUser } = useAdmin();

    // 1. Handle Loading State
    if (isLoading) return <div className="p-10 text-center animate-pulse">Loading users...</div>;

    // 2. Handle Error State
    if (isError) return <div className="p-10 text-center text-red-500">Failed to load users.</div>;

    const displayedUsers = filterRole
        ? getAllUser?.filter((user: any) => user.role.toLowerCase() === filterRole.toLowerCase())
        : getAllUser;

    return (
        <Table>
            <TableHeader className="bg-gray-50">
                <TableRow>
                    <TableHead>NAME</TableHead>
                    <TableHead>EMAIL</TableHead>
                    <TableHead>ROLE</TableHead>
                    <TableHead>STATUS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {displayedUsers?.length > 0 ? (
                    displayedUsers.map((user: any) => (
                        <TableRow key={user._id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="capitalize">{user.role}</TableCell>
                            <TableCell>{user.isVisible ? "Active" : "Pending"}</TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center py-10 text-gray-400">
                            No {filterRole}s found.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default UserList;