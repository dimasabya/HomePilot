"use client";

import AppShell from "@/components/layout/AppShell";
import OfflineListener from "@/components/layout/offlineListener";
import { useAuth } from "@/context/auth-context";
import { useLoadDevices } from "@/features/device/hooks/useLoadEvice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  useLoadDevices();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Checking session...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <AppShell>
      <OfflineListener />
      {children}
    </AppShell>
  );
}
