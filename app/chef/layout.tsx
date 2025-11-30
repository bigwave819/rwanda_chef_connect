import SideBar from "@/components/layout/sideBar"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"



const layout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/auth")
    }

    // Get user metadata safely
    const userRole = session.user?.role;

    // Redirect if not chef
    if (userRole !== "CHEF") {
        redirect("/");
    }

    return (
        <div className="flex min-h-screen bg-gray-50 transition-colors duration-200">
            <SideBar />
            <main className="flex-1 p-4 lg:p-6 bg-white min-w-0 overflow-auto ml-0 lg:ml-0 transition-colors duration-200 rounded-l-2xl lg:rounded-l-none shadow-inner">
                {children}
            </main>
        </div>
    )
}

export default layout