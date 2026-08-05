"use client";

import useNotificationPermission from "@/hooks/useNotificationPermission";
import { Bell } from "lucide-react";

export default function NotificationButton() {
  const { permission, requestPermission } = useNotificationPermission();

  if (permission === "granted") {
    return null;
  }

  return (
    <button
      className="rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 transition"
      onClick={requestPermission}
    >
      <Bell size={18} />
    </button>
  );
}
