'use client'

import Image from "next/image"
import { useViewSpecificProfiles } from "@/hooks/useProfile"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface ChefsDetailsProps {
    id: string;
}

function ChefsDetails({ id }: ChefsDetailsProps) {

    const { data: profile, isLoading, isError } = useViewSpecificProfiles(id)

    if (isLoading) {
        return <div className="text-center py-20 text-xl font-semibold">Loading chef profile...</div>
    }

    // Fixed the logic here: only show error if there IS an error OR no profile was returned
    if (isError || !profile) {
        return <div className="text-center py-20 text-red-500 font-semibold">Profile not found</div>
    }
    return (
        <div className="w-full min-h-screen bg-gray-50 px-5 py-10">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">

                {/* LEFT — Image Carousel */}
                <div className="w-full bg-gray-100 flex items-center justify-center p-4">
                    <Carousel className="w-full max-w-md">
                        <CarouselContent>
                            {profile.image.map((img: string, index: number) => (
                                <CarouselItem key={index}>
                                    <div className="relative aspect-square rounded-xl overflow-hidden shadow-sm">
                                        <Image
                                            src={img}
                                            alt={`${profile.username}'s dish`}
                                            fill
                                            className="object-cover"
                                            priority={index === 0}
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        {/* Arrows are only visible if there's more than one image */}
                        {profile.image.length > 1 && (
                            <>
                                <CarouselPrevious className="left-2" />
                                <CarouselNext className="right-2" />
                            </>
                        )}
                    </Carousel>
                </div>

                {/* RIGHT — Chef Details */}
                <div className="flex flex-col p-8 md:p-12">
                    <div className="mb-6">
                        <span className="text-pink-500 font-bold tracking-widest uppercase text-xs">Professional Chef</span>
                        <h1 className="text-4xl font-extrabold text-gray-900 mt-2 capitalize">
                            {profile.username}
                        </h1>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">About</h3>
                            <p className="text-gray-700 leading-relaxed italic">
                                "{profile.bio}"
                            </p>
                        </div>

                        <div className="space-y-3 border-t border-gray-100 pt-6">
                            <div className="flex items-center gap-4 text-gray-700">
                                <div className="bg-pink-50 p-2 rounded-full text-pink-500">
                                    <span className="text-lg">📞</span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-semibold uppercase">Phone</p>
                                    <p className="font-medium">{profile.phone}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-700">
                                <div className="bg-pink-50 p-2 rounded-full text-pink-500">
                                    <span className="text-lg">📧</span>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-semibold uppercase">Email</p>
                                    <p className="font-medium">{profile.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button className="mt-10 w-full bg-pink-500 hover:bg-pink-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-pink-200 active:scale-95">
                        Hire {profile.username}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ChefsDetails;