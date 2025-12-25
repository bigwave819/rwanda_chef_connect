"use client";

import { useDashboard } from "@/hooks/useAdmin";
import { CheckCircle2, Users, UserCheck } from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

const Dashboard = () => {

    const { data: stats, isLoading, isError } = useDashboard();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-500">
                Loading dashboard...
            </div>
        );
    }

    if (isError || !stats) {
        return (
            <div className="flex justify-center items-center h-screen text-red-500">
                Failed to load dashboard data.
            </div>
        );
    }

    const roleData = stats
        ? Object.entries(stats.rolesCount).map(([role, count]) => ({
            name: role,
            value: count,
        }))
        : [];

    const approvalData = stats
        ? [
            { name: "Approved", value: stats.approvedUsers },
            { name: "Unapproved", value: stats.unapprovedUsers },
        ]
        : [];

    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
                    <Users size={32} className="text-pink-500" />
                    <div>
                        <p className="text-gray-500 text-sm">Total Users</p>
                        <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
                    <CheckCircle2 size={32} className="text-green-500" />
                    <div>
                        <p className="text-gray-500 text-sm">Approved Users</p>
                        <p className="text-2xl font-bold">{stats.approvedUsers}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4">
                    <UserCheck size={32} className="text-blue-500" />
                    <div>
                        <p className="text-gray-500 text-sm">Unapproved Users</p>
                        <p className="text-2xl font-bold">{stats.unapprovedUsers}</p>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Users by Role - Pie Chart */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Users by Role</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={roleData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {roleData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Approved vs Unapproved - Bar Chart */}
                <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Approved vs Unapproved</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={approvalData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#FF6384" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Dashboard