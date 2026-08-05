"use client";

import AppShell from "@/components/layout/AppShell";
import OfflineListener from "@/components/layout/offlineListener";
import { useLoadDevices } from "@/features/device/hooks/useLoadEvice";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useLoadDevices();

  return (
    <AppShell>
      <OfflineListener />
      {children}
    </AppShell>
  );
}
