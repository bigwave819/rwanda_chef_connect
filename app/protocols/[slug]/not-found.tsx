import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Protocol Not Found</h2>
        <p className="text-gray-600 mb-6">
          The protocol you're looking for doesn't exist or may have been removed.
        </p>
        <Button asChild>
          <Link href="/protocols">
            Browse All Protocols
          </Link>
        </Button>
      </div>
    </div>
  )
}