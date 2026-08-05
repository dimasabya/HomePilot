"use client";

import { useEffect } from "react";

import type { Device } from "../types/device.types";
import DeviceInfo from "./DeviceInfo";
import RelayControl from "./RelayControl";

import { useDeviceStore } from "@/store/deviceStore";
import { DeviceRepository } from "../repositories/device.repository";

interface Props {
  id: number;
}

export default function DeviceDetailClient({ id }: Props) {
  const devices = useDeviceStore((state) => state.devices);
  const setDevice = useDeviceStore((state) => state.setDevices);

  const device = devices?.find((d) => d.id === id);

  useEffect(() => {
    async function load() {
      try {
        if (devices) return;

        const data = await DeviceRepository.getAll();

        setDevice(data);
      } catch (err) {
        console.error(err);
      }
    }

    load;
  }, [devices, setDevice]);

  if (!device) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <DeviceInfo device={device} />
      <RelayControl device={device} />
    </div>
  );
}
