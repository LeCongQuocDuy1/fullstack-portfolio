export default function Loading() {
  return (
    <div className="max-w-2xl animate-pulse space-y-4">
      <div className="h-8 w-36 bg-gray-800 rounded mb-6" />
      {[...Array(5)].map((_, i) => (
        <div key={i}>
          <div className="h-3 w-24 bg-gray-800 rounded mb-1" />
          <div className="h-10 bg-gray-900 rounded-lg border border-gray-800" />
        </div>
      ))}
      <div className="h-10 w-32 bg-indigo-900/50 rounded-lg" />
    </div>
  );
}
