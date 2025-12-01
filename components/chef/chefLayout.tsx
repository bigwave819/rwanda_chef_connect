import { auth } from "@/lib/auth"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import EditProfile from "./EditProfile"
import { headers } from "next/headers"

const ChefLayout = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div className="w-full min-h-screen flex justify-center pt-16 px-4 pb-10 bg-gray-50">
      <Tabs
        defaultValue="profileView"
        className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6"
      >
        {/* Tabs */}
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="profileView">Profile View</TabsTrigger>
          <TabsTrigger value="profileEdit">Edit Profile</TabsTrigger>
        </TabsList>

        {/* Profile View */}
        <TabsContent value="profileView">
          <div className="mt-6 space-y-4 bg-gray-50 border rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="text-lg font-medium text-gray-800">{session?.user.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-medium text-gray-800">{session?.user.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-lg font-medium text-gray-800">{session?.user.role}</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Edit Profile */}
        <TabsContent value="profileEdit" className="mt-6">
          <EditProfile />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ChefLayout
