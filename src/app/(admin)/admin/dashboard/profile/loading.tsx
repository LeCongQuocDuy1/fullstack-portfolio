export default function Loading() {
  return (
    <div className="max-w-2xl animate-pulse space-y-4">
      <div className="h-8 w-24 bg-gray-800 rounded mb-6" />
      {[...Array(6)].map((_, i) => (
        <div key={i}>
          <div className="h-3 w-20 bg-gray-800 rounded mb-1" />
          <div className="h-10 bg-gray-900 rounded-lg border border-gray-800" />
        </div>
      ))}
    </div>
  );
}
