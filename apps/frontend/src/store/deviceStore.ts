import { Device } from "@/features/device/types/device.types";
import { create } from "zustand";

interface DeviceStore {
  // devices: Record<number, boolean>;
  devices: Device[];
  loading: boolean;

  setLoading: (loading: boolean) => void;
  setDevices: (devices: Device[]) => void;
  updateDevice: (id: number, partial: Partial<Device>) => void;
  addDevice: (device: Device) => void;
  removeDevice: (id: number) => void;
}

export const useDeviceStore = create<DeviceStore>((set) => ({
  devices: [],

  loading: false,

  setLoading: (loading) => set({ loading }),

  setDevices: (devices) =>
    set({
      devices,
    }),

  updateDevice: (id, partial) =>
    set((state) => {
      const devices = state.devices.map((device) =>
        device.id === id
          ? {
              ...device,
              ...partial,
            }
          : device,
      );

      console.log("STORE UPDATED", devices);

      return {
        devices,
      };
    }),

  addDevice: (device) =>
    set((state) => ({
      devices: [...state.devices, device],
    })),

  removeDevice: (id) =>
    set((state) => ({
      devices: state.devices.filter((device) => device.id !== id),
    })),
}));
