export default function DashboardLoading() {
  return (
    <div className="max-w-4xl animate-pulse">
      <div className="h-8 w-40 bg-gray-800 rounded mb-2" />
      <div className="h-4 w-56 bg-gray-800 rounded mb-8" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-5 bg-gray-900 rounded-2xl border border-gray-800">
            <div className="w-10 h-10 bg-gray-800 rounded-xl mb-4" />
            <div className="h-8 w-12 bg-gray-800 rounded mb-1" />
            <div className="h-3 w-20 bg-gray-800 rounded" />
          </div>
        ))}
      </div>

      <div className="p-6 bg-gray-900 rounded-2xl border border-gray-800">
        <div className="h-4 w-32 bg-gray-800 rounded mb-4" />
        <div className="h-2 bg-gray-800 rounded-full" />
      </div>
    </div>
  );
}
