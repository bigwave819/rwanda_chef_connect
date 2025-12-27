"use client";

import { useBooking } from "@/hooks/useBooking";
import { useState } from "react";
import { 
  Clock, 
  MapPin, 
  User, 
  MoreHorizontal, 
  AlertCircle,
  FileText
} from "lucide-react";

const statusConfig: Record<string, { color: string; label: string }> = {
  pending: { color: "bg-amber-50 text-amber-700 border-amber-100", label: "Awaiting Review" },
  accepted: { color: "bg-indigo-50 text-indigo-700 border-indigo-100", label: "Confirmed" },
  rejected: { color: "bg-rose-50 text-rose-700 border-rose-100", label: "Cancelled" },
  completed: { color: "bg-emerald-50 text-emerald-700 border-emerald-100", label: "Fulfilled" },
};

const ProtocolBookingView = () => {
  const { bookings, isLoading, isError, deleteBooking } = useBooking();
  const [selectedStatus, setSelectedStatus] = useState<{ [key: string]: string }>({});

  if (isLoading) return (
    <div className="flex h-96 items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium">Loading protocol schedules...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="p-6 bg-red-50 text-red-600 rounded-xl border border-red-100">
      Error loading bookings. Please refresh the page.
    </div>
  );

  const handleStatusChange = (bookingId: string, status: string) => {
    setSelectedStatus((prev) => ({ ...prev, [bookingId]: status }));
    // API call logic would go here
  };

  return (
    <div className="max-w-6xl mx-auto p-2">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Protocol Management</h1>
          <p className="text-slate-500 mt-1">Coordinate client arrivals, services, and logistics.</p>
        </div>
        <div className="flex gap-3">
          <div className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-sm font-semibold text-slate-700">
            {bookings?.length || 0} Total Requests
          </div>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {bookings?.map((booking) => (
          <div
            key={booking._id}
            className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-indigo-300 transition-all duration-300"
          >
            {/* Top Bar: Status */}
            <div className={`px-5 py-3 border-b flex items-center justify-between ${statusConfig[selectedStatus[booking._id] || booking.status]?.color}`}>
              <span className="text-xs font-bold uppercase tracking-wider">
                {statusConfig[selectedStatus[booking._id] || booking.status]?.label}
              </span>
              <button className="text-current opacity-60 hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6">
              {/* User Section */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-12 w-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight">{booking.user.name}</h3>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-tighter">VIP Client</p>
                </div>
              </div>

              {/* Logistics Grid */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-indigo-50 rounded text-indigo-600">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Schedule</p>
                    <p className="text-sm font-semibold text-slate-700">
                      {new Date(booking.date).toLocaleDateString()} at {new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1.5 bg-emerald-50 rounded text-emerald-600">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Service Type</p>
                    <p className="text-sm font-semibold text-slate-700">{booking.service}</p>
                  </div>
                </div>

                {booking.notes && (
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1.5 bg-slate-50 rounded text-slate-600">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">Instructions</p>
                      <p className="text-sm text-slate-600 italic">"{booking.notes}"</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Area */}
              <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <select
                    className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none transition-all"
                    value={selectedStatus[booking._id] || booking.status}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                  >
                    <option value="pending">Mark Pending</option>
                    <option value="accepted">Confirm Protocol</option>
                    <option value="rejected">Decline/Cancel</option>
                    <option value="completed">Finish Task</option>
                  </select>
                  <button 
                    onClick={() => deleteBooking.mutate(booking._id)}
                    className="p-2.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <AlertCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {bookings?.length === 0 && (
        <div className="text-center py-20 bg-white border border-dashed border-slate-300 rounded-3xl mt-10">
          <p className="text-slate-400 font-medium">No protocol tasks assigned currently.</p>
        </div>
      )}
    </div>
  );
};

export default ProtocolBookingView;