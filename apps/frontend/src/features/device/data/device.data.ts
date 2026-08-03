import type { Device } from "../types/device.types";

export const devices: Device[] = [
  {
    id: 1,
    name: "Living Room Fan",
    code: "ESP32-001",

    room: "Living Room",

    online: true,

    relay: false,

    temperature: 29,

    humidity: 72,

    ip: "192.168.1.104",

    firmware: "v1.0.0",

    lastSeen: "21:35",
  },
  {
    id: 2,
    name: "Badrooom Room Fan",
    code: "ESP32-001",

    room: "Badroom Room",

    online: true,

    relay: false,

    temperature: 29,

    humidity: 72,

    ip: "192.168.1.104",

    firmware: "v1.0.0",

    lastSeen: "21:35",
  },
];
