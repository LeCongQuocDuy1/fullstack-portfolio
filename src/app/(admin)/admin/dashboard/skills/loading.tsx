export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-8 w-32 bg-gray-800 rounded" />
        <div className="h-9 w-28 bg-gray-800 rounded-lg" />
      </div>
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-900 rounded-xl border border-gray-800">
            <div className="space-y-2">
              <div className="h-4 w-48 bg-gray-800 rounded" />
              <div className="h-3 w-32 bg-gray-800 rounded" />
            </div>
            <div className="flex gap-2">
              <div className="h-8 w-16 bg-gray-800 rounded-lg" />
              <div className="h-8 w-16 bg-gray-800 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
