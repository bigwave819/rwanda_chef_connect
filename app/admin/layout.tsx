import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import SideBar from "@/components/layout/sideBar"
import { redirect } from "next/navigation"



const layout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/auth")
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
            <SideBar />
            <main className="flex-1 p-4 lg:p-6 bg-white dark:bg-gray-900 min-w-0 overflow-auto ml-0 lg:ml-0 transition-colors duration-200 rounded-l-2xl lg:rounded-l-none shadow-inner">
                {children}
            </main>
        </div>
    )
}

export default layout