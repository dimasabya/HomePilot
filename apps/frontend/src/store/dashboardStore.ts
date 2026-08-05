import { create } from "zustand";

interface DashboardState {
  totalDevices: number;

  onlineDevices: number;

  offlineDevices: number;

  relayOn: number;

  relayOff: number;

  setSummary: (summary: {
    totalDevices: number;
    onlineDevices: number;
    offlineDevices: number;
    relayOn: number;
    relayOff: number;
  }) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  totalDevices: 0,

  onlineDevices: 0,

  offlineDevices: 0,

  relayOn: 0,

  relayOff: 0,

  setSummary: (summary) => set(summary),
}));
