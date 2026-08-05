export async function registerBackgroundSync() {
  if (!("serviceWorker" in navigator)) {
    return;
  }

  const registration = await navigator.serviceWorker.ready;

  // Browser lama tidak mendukung Background Sync
  if (!("sync" in registration)) {
    console.log("Background Sync tidak didukung browser.");

    return;
  }

  try {
    await (
      registration as ServiceWorkerRegistration & {
        sync: { register(tag: string): Promise<void> };
      }
    ).sync.register("sync-homepilot");

    console.log("Background Sync registered");
  } catch (err) {
    console.error("Register Background Sync gagal:", err);
  }
}
