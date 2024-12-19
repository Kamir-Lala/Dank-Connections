import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <Skeleton className="w-[400px] h-[400px] mx-auto mb-8" />
        <Skeleton className="w-[300px] h-[40px] mx-auto mb-8" />
        <Skeleton className="w-[200px] h-[60px] mx-auto" />
      </div>
    </div>
  )
}

