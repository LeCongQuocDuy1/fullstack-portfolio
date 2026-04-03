import { LoginForm } from "@/components/admin/login-form";

export const metadata = { title: "Admin Login" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-sm p-8 bg-gray-900 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold text-white mb-6">Admin Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
