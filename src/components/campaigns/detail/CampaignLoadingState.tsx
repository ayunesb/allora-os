
export function CampaignDetailLoadingState() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-muted rounded w-64"></div>
        <div className="h-4 bg-muted rounded w-32"></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="h-36 bg-muted rounded"></div>
          <div className="h-36 bg-muted rounded"></div>
          <div className="h-36 bg-muted rounded"></div>
        </div>
        <div className="h-64 bg-muted rounded"></div>
      </div>
    </div>
  );
}
