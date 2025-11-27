'use client'

import { getAllProtocols } from "@/app/actions/admin-action"
import Image from "next/image"
import { ShieldAlert, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

const SkeletonCard = () => (
  <div className="animate-pulse rounded-2xl overflow-hidden shadow-lg bg-gray-200 dark:bg-gray-700 h-72 w-full">
    <div className="h-56 bg-gray-300 dark:bg-gray-600 w-full"></div>
    <div className="p-4">
      <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
  </div>
)


interface Protocol {
  id: string
  name: string
  number: string
  imageUrl: string
}

const ViewProtocols = () => {
  const [protocol, setProtocol] = useState<Protocol[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchChefs = async () => {
          try {
            setLoading(true)
            const data = await getAllProtocols()
            setProtocol(data)
          } catch (err) {
            console.error(err)
          } finally {
            setLoading(false)
          }
        }
    
        fetchChefs()
      }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
      {loading
        ? Array.from({ length: 6 }).map((_, idx) => <SkeletonCard key={idx} />)
        : protocol.map((items) => (
          <div
            key={items.id}
            className="group rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition hover:shadow-2xl"
          >
            {/* Image Section */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={items.imageUrl}
                alt={items.name}
                fill
                unoptimized
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              {/* Floating Badge */}
              <div className="absolute top-3 left-3 bg-white/80 dark:bg-black/40 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow">
                <ShieldAlert className="w-4 h-4 text-orange-600" />
                <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                  Protocols
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                {items.name}
                <Sparkles className="w-4 h-4 text-yellow-500" />
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 flex items-center gap-2">
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  Number:
                </span>
                {items.number}
              </p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default ViewProtocols