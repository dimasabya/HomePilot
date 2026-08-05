"use client";

import { useEffect, useState } from "react";

export default function useNotificationPermission() {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  useEffect(() => {
    if (!("Notification" in window)) return;

    setPermission(Notification.permission);
  }, []);

  const requestPermission = async () => {
    if (!("Notification" in window)) return false;

    const result = await Notification.requestPermission();

    setPermission(result);

    return result === "granted";
  };

  return {
    permission,
    requestPermission,
  };
}
