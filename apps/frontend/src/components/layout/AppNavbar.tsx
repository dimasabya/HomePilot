"use client";

import NotificationButton from "@/ui/NotificationButton";
import { Bell } from "lucide-react";
import InstallButton from "../installButton";
import IOSInstallBanner from "../IOSInstallBanner";
import UserNav from "./UserNav";
import { useOfflineQueueStore } from "@/store/offlineQueueStore";

export default function AppNavbar() {
  const pending = useOfflineQueueStore((s) => s.pending);

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div>
        <h1 className="text-lg font-semibold">Dashboard</h1>

        <p className="text-sm text-muted-foreground">Monitor your smart home</p>
      </div>

      <div className="flex items-center gap-3">
        <InstallButton />
        <IOSInstallBanner />

        <NotificationButton />
        <button className="rounded-lg p-2 hover:bg-accent transition">
          <Bell size={20} />
        </button>
        {pending > 0 && (
          <div
            className="
            rounded-full
            bg-orange-500
            px-2
            py-1
            text-xs
            text-white
        "
          >
            {pending} Pending
          </div>
        )}

        <UserNav />
      </div>
    </header>
  );
}
