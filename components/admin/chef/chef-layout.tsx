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
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="search" 
              placeholder="Search chefs..." 
              className="input pl-10 w-full" 
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