
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardLoadingState() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 container mx-auto px-4 py-8 sm:py-12 lg:py-24">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-8 sm:h-12 w-[200px] sm:w-[250px]" />
          <Skeleton className="h-8 sm:h-10 w-24 sm:w-32" />
        </div>
        <Skeleton className="h-4 w-full max-w-md mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-[160px] sm:h-[200px] rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardLoadingState;
