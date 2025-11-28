import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getSingleProtocol } from "@/app/actions/admin-action"
import { Metadata } from "next"
import { notFound } from "next/navigation"

// SEO metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const protocol = await getSingleProtocol(slug)

  if (!protocol) {
    return {
      title: "Protocol Not Found",
      description: "The requested protocol could not be found.",
    }
  }

  return {
    title: `${protocol.name} - Protocol Details`,
    description: `Discover details about ${protocol.name} protocol in Rwanda. Protocol number: ${protocol.number}`,
  }
}

// Page Component
const ProtocolDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const protocol = await getSingleProtocol(slug)

  if (!protocol) {
    notFound()
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-pink-50 via-white to-pink-50 flex flex-col items-center py-12 px-4">
      {/* Main Container */}
      <div className="max-w-4xl w-full bg-white/70 backdrop-blur-md rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-8 transition-all hover:shadow-2xl">
        
        {/* Protocol Image */}
        <div className="relative w-full md:w-1/2 h-80 md:h-[400px] rounded-2xl overflow-hidden shadow-md hover:scale-105 transition-transform">
          <Image
            src={protocol.imageUrl || "/placeholder.png"}
            alt={protocol.name}
            fill
            className="object-cover rounded-2xl"
            priority
          />
        </div>

        {/* Protocol Info */}
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">{protocol.name}</h1>
            <p className="mt-4 text-lg text-gray-700 font-medium">Protocol Number: {protocol.number}</p>
          </div>

          {/* Interactive Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button
              className="bg-pink-600 hover:bg-pink-700 text-white w-full sm:w-auto py-3 px-6 rounded-xl shadow-lg transition-all"
              // onClick={() => alert(`Contacting owner of ${protocol.name}...`)}
            >
              Contact Owner
            </Button>
            <Button
              className="bg-white/50 hover:bg-white/70 text-gray-800 w-full sm:w-auto py-3 px-6 rounded-xl shadow-md backdrop-blur-md transition-all"
              // onClick={() => navigator.share ? navigator.share({ title: protocol.name, text: `Check out protocol ${protocol.name}`, url: window.location.href }) : alert('Share not supported')}
            >
              Share Protocol
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProtocolDetails