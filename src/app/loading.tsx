export default function Loading() {
  return (
    <div className="bg-gray-950 min-h-screen">
      {/* Navbar skeleton */}
      <div className="h-16 border-b border-gray-800 flex items-center px-6">
        <div className="h-4 w-24 bg-gray-800 rounded animate-pulse" />
      </div>

      {/* Hero skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-32 space-y-6">
        <div className="h-3 w-32 bg-gray-800 rounded animate-pulse" />
        <div className="h-14 w-96 bg-gray-800 rounded animate-pulse" />
        <div className="h-10 w-80 bg-gray-700 rounded animate-pulse" />
        <div className="space-y-2 pt-2">
          <div className="h-4 w-[500px] max-w-full bg-gray-800 rounded animate-pulse" />
          <div className="h-4 w-[420px] max-w-full bg-gray-800 rounded animate-pulse" />
        </div>
        <div className="flex gap-4 pt-4">
          <div className="h-12 w-36 bg-indigo-900/50 rounded-lg animate-pulse" />
          <div className="h-12 w-36 bg-gray-800 rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}
