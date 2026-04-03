export default function Loading() {
  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 animate-pulse">
        <div className="h-4 w-32 bg-gray-800 rounded mb-10" />
        <div className="h-4 w-24 bg-gray-800 rounded mb-4" />
        <div className="h-10 w-96 max-w-full bg-gray-800 rounded mb-3" />
        <div className="h-5 w-full bg-gray-800 rounded mb-8" />
        <div className="h-64 bg-gray-900 rounded-2xl border border-gray-800 mb-8" />
        <div className="flex gap-4 mb-8">
          <div className="h-10 w-28 bg-indigo-900/50 rounded-lg" />
          <div className="h-10 w-28 bg-gray-800 rounded-lg" />
        </div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-800 rounded" style={{ width: `${85 - i * 8}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
