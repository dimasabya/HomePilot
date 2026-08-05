import prisma from "../prisma/client";

export class DashboardService {
  static async getSummary() {
    const devices = await prisma.device.findMany({});

    const totalDevices = devices.length;

    const onlineDevices = devices.filter((device) => device.online).length;

    const offlineDevices = totalDevices - onlineDevices;

    const relayOn = devices.filter((device) => device.relay).length;

    const relayOff = totalDevices - relayOn;

    return {
      totalDevices,
      onlineDevices,
      offlineDevices,
      relayOn,
      relayOff,
    };
  }
}
