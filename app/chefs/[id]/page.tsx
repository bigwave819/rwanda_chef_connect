import ChefsDetails from "@/components/ChefDetails"
import { Suspense } from "react"

export default async function ChefsDetailsPage({ params }: { params: Promise<{id: string}>}) {
  const { id } = await params

  return (
    <Suspense fallback={<div className="text-center p-20">Loading...</div>}>
      <ChefsDetails id={id} />
    </Suspense>
  )
}
