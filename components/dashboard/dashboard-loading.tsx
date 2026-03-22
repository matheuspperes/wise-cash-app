import { Skeleton } from "@/components/ui/skeleton";

export function DashboardLoading() {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-80 w-full" />
    </div>
  );
}
