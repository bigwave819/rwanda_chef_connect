import { Search } from "lucide-react"
import AddProtocols from "./addProtocols"

const ProtocolLayout = () => {
  return (
    <div className="w-full space-y-6">

      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Protocols</h1>
          <p className="text-sm text-muted-foreground">
            Manage and create new protocols easily.
          </p>
        </div>

        {/* Add Button */}
        <AddProtocols />
      </div>

      {/* Search Bar */}
      <div className="w-full sm:w-80 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="search"
          placeholder="Search protocols..."
          className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 py-2 pl-10 pr-4 text-sm shadow-sm focus:ring-2 focus:ring-primary focus:outline-none transition-all"
        />
      </div>

      {/* Divider */}
      <div className="border-b border-gray-200 dark:border-gray-700" />
    </div>
  )
}

export default ProtocolLayout
