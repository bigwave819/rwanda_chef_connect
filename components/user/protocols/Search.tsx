'use client'

interface SearchComponentProps {
  query: string
  onSearchChange: (term: string) => void
}

const SearchComponent = ({ query, onSearchChange }: SearchComponentProps) => {
  return (
    <div className="max-w-xl mx-auto mt-8 w-full">
      <input
        type="text"
        value={query}
        placeholder="Search protocols..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full py-3 px-4 rounded-3xl bg-white shadow-xl border focus:outline-none focus:ring-2 focus:ring-pink-400 transition-all"
      />
    </div>
  )
}

export default SearchComponent
