"use client";

console.log("useLocalNotification loaded");
export default function useLocalNotification() {
  console.log("hook executed");
  const sendNotification = async (title: string, body: string) => {
    // 🛑 Guard clause untuk SSR / Server Side
    if (typeof window === "undefined" || !("Notification" in window)) {
      return;
    }

    if (Notification.permission !== "granted") {
      return;
    }

    const registration = await navigator.serviceWorker.ready;

    registration.active?.postMessage({
      type: "SHOW_NOTIFICATION",
      title,
      body,
      url: "/dashboard",
    });
  };
  return { sendNotification };
}
