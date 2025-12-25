
'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ViewProfile from "./protocolProfileView"
import EditProfile from "./EditProtocolProfile"
import { useState } from "react"

const ProtocolProfileLayout = () => {
    const [tab, setTab] = useState("View Profile");
  return (
    <div className="flex justify-center max-w-full min-h-screen p-5 ">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="w-full">
                    <TabsTrigger value="View Profile">View Profile</TabsTrigger>
                    <TabsTrigger value="Edit Profile">Edit Profile</TabsTrigger>
                </TabsList>
                <TabsContent value="View Profile">
                    <ViewProfile />
                </TabsContent>
                <TabsContent value="Edit Profile">
                    <EditProfile />
                </TabsContent>
            </Tabs>
    </div>
  )
}

export default ProtocolProfileLayout