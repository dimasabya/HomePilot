"use client";

import { Droplets, Thermometer } from "lucide-react";
import { useState } from "react";
import type { Device } from "../types/device.types";
import RelayControl from "./RelayControl";

import DeviceInfo from "./DeviceInfo";
import SensorCard from "./SensorCard";

interface Props {
  device: Device;
}

export default function DeviceDetailClient({ device }: Props) {
  const [relay, setRelay] = useState(device.relay);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{device.name}</h1>

        <p className="text-muted-foreground">{device.code}</p>
      </div>

      <RelayControl relay={relay} onToggle={setRelay} />

      <div className="grid gap-4 md:grid-cols-2">
        <SensorCard
          title="Temperature"
          value={`${device.temperature}°C`}
          icon={<Thermometer size={24} />}
        />

        <SensorCard
          title="Humidity"
          value={`${device.humidity}%`}
          icon={<Droplets size={24} />}
        />
      </div>

      <DeviceInfo
        room={device.room}
        ip={device.ip}
        firmware={device.firmware}
        lastSeen={device.lastSeen}
      />
    </div>
  );
}
