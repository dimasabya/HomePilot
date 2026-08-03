"use client";

import { useEffect, useState } from "react";
import DeviceCard from "./DeviceCard";
import { DeviceService } from "../services/device.service";

export default function DeviceList({
  initialDevices,
}: {
  initialDevices: any[];
}) {
  const [devices, setDevices] = useState(initialDevices);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await DeviceService.getAll();

        setDevices(data);
      } catch (error) {
        console.log(error);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {devices.map((device) => (
        <DeviceCard key={device.id} {...device} />
      ))}
    </div>
  );
}
