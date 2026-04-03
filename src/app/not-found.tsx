import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-white relative overflow-hidden" style={{ background: "#05050f" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-transparent to-cyan-950/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-[120px]" />

      <div className="relative text-center px-6">
        <p className="text-8xl font-black gradient-text mb-4">404</p>
        <h1 className="text-3xl font-bold text-white mb-4">Page not found</h1>
        <p className="text-slate-500 mb-10 max-w-sm mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white glow-violet hover:scale-105 transition-all duration-300"
          style={{ background: "linear-gradient(135deg, #7c3aed, #5b21b6)" }}
        >
          ← Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
