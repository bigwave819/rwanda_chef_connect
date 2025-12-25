'use client'

import { useBooking } from "@/hooks/useBooking"
import { Calendar, Clock, User, MessageSquare, Loader2, CheckCircle2, XCircle, Timer } from "lucide-react"
import { format } from "date-fns"

const BookingsPage = () => {
    const { bookings, isLoading, isError } = useBooking()

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                <p className="text-gray-500 font-medium">Fetching your bookings...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="text-center py-20 text-red-500 bg-red-50 rounded-2xl m-8">
                <p className="font-semibold">Failed to load bookings. Please try again later.</p>
            </div>
        )
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'accepted': return 'bg-green-100 text-green-700 border-green-200'
            case 'rejected': return 'bg-red-100 text-red-700 border-red-200'
            case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200'
            default: return 'bg-yellow-100 text-yellow-700 border-yellow-200'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'accepted': return <CheckCircle2 className="w-4 h-4" />
            case 'rejected': return <XCircle className="w-4 h-4" />
            default: return <Timer className="w-4 h-4" />
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-6 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Your Bookings</h1>
                    <p className="text-gray-500 mt-1">Manage your appointments and service history</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
                    <span className="text-sm font-medium text-gray-500">Total: </span>
                    <span className="text-lg font-bold text-blue-600">{bookings?.length || 0}</span>
                </div>
            </div>

            {bookings?.length === 0 ? (
                <div className="text-center bg-white border-2 border-dashed border-gray-200 rounded-3xl py-20">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900">No bookings yet</h3>
                    <p className="text-gray-500 max-w-xs mx-auto mt-2">
                        When you book a service or get booked, they will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {bookings?.map((booking: any) => (
                        <div 
                            key={booking._id} 
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
                        >
                            {/* Status Ribbon */}
                            <div className={`absolute top-0 right-0 px-4 py-1.5 rounded-bl-xl text-xs font-bold uppercase tracking-wider border-l border-b flex items-center gap-1.5 ${getStatusColor(booking.status)}`}>
                                {getStatusIcon(booking.status)}
                                {booking.status}
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                                    <User className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 capitalize">
                                        {/* Shows the name of the person you booked, or the person booking you */}
                                        {booking.bookedUser?.name || booking.user?.name}
                                    </h3>
                                    <p className="text-sm text-blue-600 font-medium mb-4">{booking.service}</p>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <span>{format(new Date(booking.date), 'EEEE, MMMM do, yyyy')}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <span>Scheduled for standard hours</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-5 border-t border-gray-50 flex gap-3">
                                <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 border border-gray-200">
                                    <MessageSquare className="w-4 h-4" />
                                    Contact
                                </button>
                                {booking.status === 'pending' && (
                                    <button className="flex-1 bg-white hover:bg-red-50 text-red-600 py-2.5 rounded-xl text-sm font-semibold transition-colors border border-red-100">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BookingsPage