import UserList from "@/components/admin/users/UserList";
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Search } from "lucide-react"; // Using Lucide for a cleaner look

const AdminPage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-500">Manage, filter, and view all system users.</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          {/* Controls Bar: Tabs + Search */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-6 bg-gray-50/30">
            <TabsList className="grid grid-cols-3 md:flex h-auto p-1 bg-gray-100 rounded-xl">
              <TabsTrigger value="all" className="rounded-lg px-4 py-2">All Users</TabsTrigger>
              <TabsTrigger value="chef" className="rounded-lg px-4 py-2">Chefs</TabsTrigger>
              <TabsTrigger value="user" className="rounded-lg px-4 py-2">Customers</TabsTrigger>
              <TabsTrigger value="protocol" className="rounded-lg px-4 py-2">Protocols</TabsTrigger>
              <TabsTrigger value="admin" className="rounded-lg px-4 py-2">Admin</TabsTrigger>
            </TabsList>

            {/* Search Input styled as a filter */}
            <div className="w-full md:w-72 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Search by name or email..."
              />
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6">
            <TabsContent value="all" className="mt-0">
              <UserList />
            </TabsContent>
            <TabsContent value="chef" className="mt-0">
              <UserList filterRole="chef" />
            </TabsContent>
            <TabsContent value="user" className="mt-0">
              <UserList filterRole="user" />
            </TabsContent>
            <TabsContent value="protocol" className="mt-0">
              <UserList filterRole="protocol" />
            </TabsContent>
            <TabsContent value="admin" className="mt-0">
              <UserList filterRole="admin" />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;