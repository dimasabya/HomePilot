"use client";

import { useState } from "react";

import { DeviceService } from "../services/device.service";

import { Device } from "../types/device.types";
import { useHomePilotNotification } from "@/services/notification/notificationService";
import { enqueueRelayCommand } from "@/services/offline/offlineQueue";
import { registerBackgroundSync } from "@/services/background/registerBackgroundSync";
import { useDeviceStore } from "@/store/deviceStore";

export default function RelayControl({ device }: { device: Device }) {
  const notification = useHomePilotNotification();

  const currentDevice = useDeviceStore((state) =>
    state.devices.find((d) => d.id === device.id),
  );

  const relay = currentDevice?.relay ?? device.relay;

  console.log(currentDevice);

  const updateDevice = useDeviceStore((state) => state.updateDevice);

  async function toggle() {
    const value = !relay;

    console.log(value);

    if (!navigator.onLine) {
      await enqueueRelayCommand(device.id, value, device.name);

      await registerBackgroundSync();

      updateDevice(device.id, { relay: value });

      notification.sendNotification(
        "Offline",
        `Perintah relay ${value ? "ON" : "OFF"} untuk ${device.name} telah dimasukkan ke antrean`,
      );

      return;
    }

    updateDevice(device.id, {
      relay: value,
    });
    if (value) {
      notification.relayOn(device.name);
    } else {
      notification.relayOff(device.name);
    }

    await DeviceService.updateRelay(device.id, value);
  }
  const devices = useDeviceStore((state) => state.devices);

  console.log("STORE", devices);
  console.log("CURRENT RELAY", currentDevice?.relay);

  return (
    <div className="rounded-xl border p-6">
      <h2 className="font-semibold">Relay Control</h2>

      <div className="mt-5 flex items-center gap-4">
        <button
          onClick={toggle}
          className="
              rounded-lg
              bg-primary
              px-5
              py-2
              text-primary-foreground
              "
        >
          {relay ? "Turn OFF" : "Turn ON"}
        </button>

        <p>{relay ? "Relay ON" : "Relay OFF"}</p>
      </div>
    </div>
  );
}
