import SearchProtocolWrapper from "@/components/user/protocols/SearchProtocolWrapper"

const ProtocolPage = () => {
  return (
    <div className="flex w-full min-h-screen flex-col items-center py-8">

      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Discover <span className="text-pink-600">Top Protocols</span>
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Search, filter and hire Rwanda's top Protocol professionals.
        </p>
      </div>

      <SearchProtocolWrapper />
    </div>
  )
}

export default ProtocolPage
