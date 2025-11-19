import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"



const layout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect("/")
    }

    return (
        <main>{children}</main>
    )
}

export default layout