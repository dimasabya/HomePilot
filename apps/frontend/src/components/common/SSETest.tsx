"use client";

import { useSSE } from "@/hooks/useSSE";
import { useHomePilotNotification } from "@/services/notification/notificationService";
import { useDeviceStore } from "@/store/deviceStore";

export default function SSETest() {
  const notification = useHomePilotNotification();

  const updateDevice = useDeviceStore((state) => state.updateDevice);

  useSSE((data: any) => {
    switch (data.type) {
      case "device.updated":
        updateDevice(data.payload.id, data.payload);

        notification.sendNotification(
          "HomePilot",
          `${data.deviceName} ${data.relay ? "turned on" : "turned off"}`,
        );
        break;
    }
  });

  return null;
}
