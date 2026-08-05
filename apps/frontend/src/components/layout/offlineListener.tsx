"use client";

import { useEffect } from "react";
import { processOfflineQueue } from "@/services/background/queueProcessor";
import { refreshPendingCount } from "@/services/background/refreshPendingCount";

export default function OfflineListener() {
  useEffect(() => {
    // Jalankan queue processor saat mounted
    refreshPendingCount();
    processOfflineQueue();

    const handleOnline = () => {
      processOfflineQueue();
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return null; // Komponen ini hanya menangani efek side-effect client
}
