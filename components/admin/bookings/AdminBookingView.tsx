"use client";

import { useBooking } from "@/hooks/useBooking";
import { 
  Utensils, 
  Search, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle 
} from "lucide-react";
import { useState } from "react";

const statusStyles: Record<string, { bg: string; icon: any }> = {
  pending: { bg: "bg-amber-100 text-amber-700", icon: Clock },
  accepted: { bg: "bg-blue-100 text-blue-700", icon: CheckCircle },
  rejected: { bg: "bg-rose-100 text-rose-700", icon: XCircle },
  completed: { bg: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
};

const AdminBookingView = () => {
  const { bookings, isLoading } = useBooking();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings?.filter((b: any) =>
    b.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="p-8 text-center animate-pulse text-slate-400">Loading master records...</div>;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Booking Management</h1>
          <p className="text-slate-500 text-sm">Reviewing all system-wide bookings (Read-Only)</p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by user or service..."
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 w-full md:w-64"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Service</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase text-slate-500 tracking-wider text-right">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings?.map((booking: any) => {
                const StatusIcon = statusStyles[booking.status]?.icon || AlertCircle;
                return (
                  <tr key={booking._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                          {booking.user.name.charAt(0)}
                        </div>
                        <span className="font-medium text-slate-700">{booking.user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Utensils className="h-4 w-4 text-slate-400" />
                        <span className="text-sm">{booking.service}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-700 font-medium">
                          {new Date(booking.date).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-slate-400">
                          {new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${statusStyles[booking.status]?.bg || "bg-slate-100"}`}>
                        <StatusIcon className="h-3.5 w-3.5" />
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-xs font-mono text-slate-300 group-hover:text-slate-500 transition-colors">
                        #{booking._id.slice(-6)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredBookings?.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-slate-400">No records found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookingView;