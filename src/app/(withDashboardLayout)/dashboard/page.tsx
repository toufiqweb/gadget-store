"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import AdminOverview from "@/components/dashboard/AdminOverview";
import UserOverview from "@/components/dashboard/UserOverview";

function LoadingSpinner() {
  return (
    <div className="flex h-64 items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-[var(--ternary)]" />
    </div>
  );
}

export default function DashboardOverviewPage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <LoadingSpinner />;
  }

  const isAdmin = session?.user?.role === "admin";

  return (
    <Suspense fallback={<LoadingSpinner />}>
      {isAdmin ? (
        <AdminOverview />
      ) : (
        <UserOverview userName={session?.user?.name} />
      )}
    </Suspense>
  );
}
