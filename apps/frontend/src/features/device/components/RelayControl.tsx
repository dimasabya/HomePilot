"use client";

import { useState } from "react";

import { DeviceService } from "../services/device.service";

import { Device } from "../types/device.types";

export default function RelayControl({ device }: { device: Device }) {
  const [relay, setRelay] = useState(device.relay);

  async function toggle() {
    const value = !relay;

    setRelay(value);

    await DeviceService.updateRelay(device.id, value);
  }

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
