"use client";

import { useBooking } from "@/hooks/useBooking";
import { useState } from "react";
import { Calendar, User, Utensils, Trash2 } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  accepted: "bg-blue-50 text-blue-700 border-blue-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
  completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const ChefBookingView = () => {
  const { bookings, isLoading, isError, deleteBooking } = useBooking();
  const [selectedStatus, setSelectedStatus] = useState<{ [key: string]: string }>({});

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
          <p className="text-gray-400 font-medium">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100">
          <p className="text-red-600 font-semibold text-lg">Failed to load bookings</p>
          <button className="mt-4 text-sm text-red-500 underline">Try again</button>
        </div>
      </div>
    );
  }

  const handleStatusChange = (bookingId: string, status: string) => {
    setSelectedStatus((prev) => ({ ...prev, [bookingId]: status }));
    // TODO: call API to update status
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Bookings</h1>
          <p className="text-slate-500 mt-1">Manage your upcoming culinary services and client requests.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
           <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-slate-500">Total: {bookings?.length || 0}</span>
        </div>
      </header>

      {bookings?.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
          <Utensils className="mx-auto h-12 w-12 text-slate-300 mb-4" />
          <p className="text-slate-500 text-lg">No bookings found yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {bookings?.map((booking) => (
            <div
              key={booking._id}
              className="group bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col h-full"
            >
              {/* Status Header */}
              <div className="flex items-center justify-between mb-6">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${statusColors[selectedStatus[booking._id] || booking.status]}`}>
                  {(selectedStatus[booking._id] || booking.status).toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-slate-400">ID: {booking._id.slice(-6)}</span>
              </div>

              {/* Booking Info Card */}
              <div className="space-y-4 grow">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                    <User className="h-4 w-4 text-slate-600 group-hover:text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold">Client</p>
                    <p className="text-slate-900 font-semibold">{booking.user.name}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                    <Utensils className="h-4 w-4 text-slate-600 group-hover:text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold">Service</p>
                    <p className="text-slate-900 font-semibold">{booking.service}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                    <Calendar className="h-4 w-4 text-slate-600 group-hover:text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold">Date & Time</p>
                    <p className="text-slate-900 font-semibold">
                      {new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      <span className="text-slate-400 font-normal ml-2">
                         at {new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </p>
                  </div>
                </div>

                {booking.notes && (
                   <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 italic text-sm text-slate-600">
                     "{booking.notes}"
                   </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3">
                <select
                  className="flex-1 bg-slate-50 border-none rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                  value={selectedStatus[booking._id] || booking.status}
                  onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="completed">Completed</option>
                </select>

                <button
                  className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                  onClick={() => deleteBooking.mutate(booking._id)}
                  title="Delete Booking"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChefBookingView;