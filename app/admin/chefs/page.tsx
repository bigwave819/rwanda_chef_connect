import ChefLayout from "@/components/admin/chef/chef-layout";

function AllChefs() {
    return ( 
        <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                        Chefs Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Manage your team of chefs and their specialties
                    </p>
                </div>
                
                <ChefLayout />
            </div>
        </div>
    );
}

export default AllChefs;