'use client'

import { useEffect, useState, useCallback } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { getAllProtocols } from "@/app/actions/admin-action"
import CardComponent from "./Card"
import SearchComponent from "./Search"

interface ProtocolProps {
  id: string
  name: string
  number: string
  imageUrl: string
}

const SearchProtocolWrapper = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.get("query") || "")
  const [protocols, setProtocols] = useState<ProtocolProps[]>([])
  const [loading, setLoading] = useState(false)

  // Debounced fetch
  const fetchProtocols = useDebouncedCallback(async (term: string) => {
    setLoading(true)
    try {
      const data = await getAllProtocols(term)

      // Convert string dates to Date objects
      const formatted = data.map((p: any) => ({
        ...p,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
      }))

      setProtocols(formatted)
    } catch (err) {
      console.error(err)
      setProtocols([])
    } finally {
      setLoading(false)
    }
  }, 300) // 300ms debounce

  // Trigger fetch whenever query changes
  useEffect(() => {
    fetchProtocols(query)
  }, [query, fetchProtocols])

  // Update URL when typing
  const handleSearchChange = (term: string) => {
    setQuery(term)
    const params = new URLSearchParams(searchParams.toString())
    if (term) params.set("query", term)
    else params.delete("query")
    router.replace(`?${params.toString()}`)
  }

  return (
    <div className="w-full max-w-7xl flex flex-col items-center">
      {/* Search Input */}
      <SearchComponent query={query} onSearchChange={handleSearchChange} />

      {/* Loading */}
      {loading && <p className="mt-4 text-center">Loading...</p>}

      {/* No results */}
      {!loading && protocols.length === 0 && (
        <p className="mt-4 text-center text-gray-500">No protocols found.</p>
      )}

      {/* Protocol cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 w-full">
        <CardComponent protocols={protocols} />
      </div>
    </div>
  )
}

export default SearchProtocolWrapper
