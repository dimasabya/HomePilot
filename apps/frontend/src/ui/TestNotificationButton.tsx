"use client";

import useLocalNotification from "../hooks/useLocalNotification";

export default function TestNotificationButton() {
  const { sendNotification } = useLocalNotification();

  return (
    <button
      onClick={() =>
        sendNotification("HomePilot", "Push Notification Berhasil")
      }
      className="rounded-lg bg-green-600 px-3 py-2 text-white hover:bg-green-700 transition"
    >
      Test Notification
    </button>
  );
}
