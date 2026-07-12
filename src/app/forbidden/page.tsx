import Link from "next/link";
import { Lock } from "lucide-react";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex justify-center">
          <div className="p-4 bg-orange-100 rounded-full">
            <Lock className="w-16 h-16 text-orange-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Access Forbidden
          </h1>
          <p className="text-gray-500">
            You don&apos;t have the necessary administrative privileges to view this page. If you believe this is an error, please contact support.
          </p>
        </div>

        <div className="pt-6 flex justify-center">
          <Link 
            href="/dashboard" 
            className="px-6 py-2.5 bg-[var(--primary-color)] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
