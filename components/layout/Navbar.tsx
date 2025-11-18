import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn } from 'lucide-react'



export default function Home() {

    const navbarData = [
        {
            id: 1,
            label: 'Home',
            link: '/'
        },
        {
            id: 2,
            label: 'explore',
            link: '/explore'
        },
        {
            id: 3,
            label: 'about',
            link: '/about'
        },
    ]
    return (
        <div className="w-full p-5">
            {/** the desktop navigation */}
            <div className="flex justify-between">
                {/** logo */}
                <div className="pt-2">
                    <h1 className="text-2xl font-bold">RwandaChef</h1>
                </div>

                {/** links  */}
                <div className="flex space-x-3 p-4 rounded-3xl backdrop-blur-md backdrop-grayscale">
                    {
                        navbarData.map((item) => {
                            return (
                                <ul key={item.id}>
                                    <li><Link href={`${item.link}`}>{item.label}</Link></li>
                                </ul>
                            )
                        })
                    }
                </div>

                {/** login button */}
                <div className="pt-4">
                    <Link href='/auth'>
                        <Button className="btn">Login Here <LogIn /></Button>
                    </Link>
                </div>

            </div>
            {/** the mobile navigations */}
        </div>
    );
}
