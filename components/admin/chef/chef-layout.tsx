import AddChief from "./add-chief"
import { Search } from 'lucide-react'
import ViewChefs from "./viewChefs"

const ChefLayout = () => {
  return (
    <div className="w-full">
      <div className="card p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/** add the chef form button trigger */}
          <AddChief />

          {/** searchbar to search the chefs */}
          <div className="w-full sm:w-80 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="search"
              placeholder="Search protocols..."
              className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm shadow-sm focus:outline-none transition-all"
            />
          </div>
        </div>

        {/** Add chef list/grid container here */}
        <div className="mt-6">
          {/* Your chefs list/grid will go here */}
          <ViewChefs />
        </div>
      </div>
    </div>
  )
}

export default ChefLayout