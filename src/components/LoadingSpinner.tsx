import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Train } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="border-b bg-card p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Train className="h-6 w-6 text-primary animate-pulse" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-10 w-[180px]" />
        </div>
      </header>

      <main className="flex-1 p-4 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row gap-4">
          <Card className="lg:w-1/3 h-64 lg:h-full">
            <CardHeader className="border-b bg-muted/50">
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="p-4 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="lg:w-2/3 flex-1 min-h-[400px]">
            <CardContent className="p-0 h-full">
              <Skeleton className="h-full w-full rounded-lg" />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
