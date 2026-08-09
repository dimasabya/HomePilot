"use client";

import { useEffect } from "react";

import { DeviceRepository } from "../repositories/device.repository";

import { useDeviceStore } from "@/store/deviceStore";

export function useLoadDevices() {
  const setDevices = useDeviceStore((state) => state.setDevices);
  const setLoading = useDeviceStore((state) => state.setLoading);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const devices = await DeviceRepository.getAll();

        console.log("DEVICES FROM API:", devices);

        setDevices(devices);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [setDevices, setLoading]);
}
