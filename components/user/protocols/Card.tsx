import { Button } from '@/components/ui/button'
import { ChefHat, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProtocolProps {
  id: string
  name: string
  imageUrl: string
}

interface CardComponentProps {
  protocols: ProtocolProps[]
}

const CardComponent = ({ protocols }: CardComponentProps) => {
  if (!protocols || protocols.length === 0) return null
  

  return (
    <>
      {protocols.map((protocol) => (
        <div
          key={protocol.id}
          className="rounded-2xl overflow-hidden shadow-md bg-white transition hover:shadow-2xl border border-gray-200"
        >
          <div className="relative h-60 w-full">
            <Image
              src={protocol.imageUrl || "/placeholder.png"}
              alt={`Protocol - ${protocol.name}`}
              fill
              className="object-cover transition duration-500"
            />

            <div className="absolute top-3 left-3 bg-white/80 px-3 py-1 rounded-lg flex items-center gap-1 text-xs font-medium shadow">
              <ChefHat className="w-4 h-4 text-orange-600" /> Protocol
            </div>
          </div>

          <div className="p-4 space-y-2">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {protocol.name}
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </h2>


            <Link href={`/protocols/${protocol.id}`}><Button className='btn w-full'>View More</Button></Link>
          </div>
        </div>
      ))}
    </>
  )
}

export default CardComponent
