export default function Loading() {
  return (
    <main className="min-h-screen bg-background relative">
      <div className="bg-glow" />
      <div className="bg-dots" />
      <div className="bg-noise" />
      <div className="w-full max-w-4xl mx-auto pt-6 xl:pt-10 pb-12 px-4 xl:px-0 animate-pulse">
        <div className="relative bg-surface border border-border rounded-2xl xl:rounded-3xl overflow-hidden shadow-sm">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full xl:w-2/3 h-24 bg-primary/10 blur-[60px] -z-10 rounded-full pointer-events-none" />
          <div className="grid grid-cols-3 divide-x divide-border">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 py-4">
                <div className="w-10 h-5 rounded bg-surface-2" />
                <div className="w-14 h-3 rounded bg-surface-2" />
              </div>
            ))}
          </div>
          <div className="h-1 bg-primary/30" />
          <div className="h-px bg-border mx-6" />
          <div className="flex justify-center mt-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-surface-2 ring-2 ring-primary/20" />
          </div>
          <div className="flex flex-col items-center gap-2 mt-3 px-6">
            <div className="w-36 h-4 rounded bg-surface-2" />
            <div className="w-24 h-3 rounded bg-surface-2" />
            <div className="w-48 h-3 rounded bg-surface-2" />
            <div className="w-40 h-3 rounded bg-surface-2" />
          </div>
          <div className="flex justify-center mt-4 pb-6">
            <div className="w-32 h-9 rounded-full bg-surface-2" />
          </div>
        </div>
        <div className="mt-4 bg-surface border border-border rounded-2xl xl:rounded-3xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <div className="w-24 h-4 rounded bg-surface-2" />
          </div>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-4 sm:p-6 border-b border-border flex gap-3"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface-2 shrink-0" />
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex gap-2">
                  <div className="w-24 h-3 rounded bg-surface-2" />
                  <div className="w-16 h-3 rounded bg-surface-2" />
                </div>
                <div className="w-full h-3 rounded bg-surface-2" />
                <div className="w-3/4 h-3 rounded bg-surface-2" />
                <div className="flex gap-6 mt-1">
                  <div className="w-8 h-3 rounded bg-surface-2" />
                  <div className="w-8 h-3 rounded bg-surface-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
