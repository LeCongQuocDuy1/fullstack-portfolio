import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-gray-950 min-h-screen flex items-center justify-center text-white">
      <div className="text-center px-6">
        <p className="text-indigo-400 font-mono text-sm mb-4">404</p>
        <h1 className="text-5xl font-bold mb-4">Page not found</h1>
        <p className="text-gray-400 mb-8 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors">
          ← Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
