import { LoginForm } from "@/components/admin/login-form";

export const metadata = { title: "Admin Login" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "#05050f" }}>
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-cyan-600/8 rounded-full blur-[80px] pointer-events-none" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(124,58,237,1) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Card */}
      <div className="relative w-full max-w-md mx-6">
        <div className="glass rounded-3xl p-10 shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 bg-gradient-to-br from-violet-600 to-cyan-600 glow-violet">
              <span className="text-white font-black text-xl">P</span>
            </div>
            <h1 className="text-2xl font-black text-white">Welcome back</h1>
            <p className="text-slate-500 text-sm mt-1">Sign in to your CMS dashboard</p>
          </div>

          <LoginForm />
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          Portfolio CMS · Protected Area
        </p>
      </div>
    </div>
  );
}
