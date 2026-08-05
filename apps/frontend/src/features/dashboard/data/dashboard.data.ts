import {
  DashboardActivity,
  DashboardDevice,
  DashboardStats,
} from "../types/dashboard.types";

export const dashboardStats: DashboardStats = {
  devices: 1,
  online: 1,
  temperature: 29,
  relay: false,
};

export const dashboardDevices: DashboardDevice[] = [
  {
    id: 1,
    name: "Living Room Fan",
    room: "Living Room",
    online: true,
    temperature: 29,
    humidity: 72,
    relay: false,
  },
];

export const dashboardActivities: DashboardActivity[] = [
  {
    id: 1,
    title: "Fan turned ON",
    time: "19:20",
    type: "power",
  },
  {
    id: 2,
    title: "Temperature 29°C",
    time: "19:22",
    type: "temperature",
  },
  {
    id: 3,
    title: "Humidity 72%",
    time: "19:24",
    type: "humidity",
  },
];

import api from "@/lib/api";
