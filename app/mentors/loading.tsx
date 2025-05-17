import { Skeleton } from "@/components/ui/skeleton"
import { Navbar } from "@/components/navbar"

export default function MentorsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Hero section skeleton */}
          <section className="text-center space-y-4">
            <Skeleton className="h-10 w-[300px] mx-auto" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          </section>

          {/* Tabs skeleton */}
          <div className="space-y-8">
            <Skeleton className="h-10 w-full" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="border rounded-lg p-6 space-y-4">
                    <div className="flex justify-center">
                      <Skeleton className="h-32 w-32 rounded-full" />
                    </div>
                    <Skeleton className="h-6 w-[200px] mx-auto" />
                    <Skeleton className="h-4 w-[150px] mx-auto" />
                    <Skeleton className="h-20 w-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
            </div>
          </div>

          {/* Subscription plans skeleton */}
          <section className="py-12 space-y-6">
            <div className="text-center space-y-4">
              <Skeleton className="h-8 w-[250px] mx-auto" />
              <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="border rounded-lg p-6 space-y-4">
                    <Skeleton className="h-7 w-[100px]" />
                    <Skeleton className="h-10 w-[120px]" />
                    <Skeleton className="h-4 w-full" />
                    <div className="space-y-2">
                      {Array(5)
                        .fill(0)
                        .map((_, j) => (
                          <Skeleton key={j} className="h-4 w-full" />
                        ))}
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
