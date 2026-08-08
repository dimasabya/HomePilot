import prisma from "../prisma/client";

export class DeviceService {
  static async updateOfflineDevice() {
    const timeout = new Date(Date.now() - 30 * 1000);

    await prisma.device.updateMany({
      where: {
        online: true,
        OR: [
          {
            lastSeen: {
              lt: timeout,
            },
          },
          {
            lastSeen: null,
          },
        ],
      },

      data: {
        online: false,
      },
    });
  }

  static async getAll() {
    await this.updateOfflineDevice();

    return prisma.device.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  static async getById(id: number) {
    await this.updateOfflineDevice();

    return prisma.device.findUnique({
      where: {
        id,
      },
    });
  }

  static async updateRelay(id: number, relay: boolean) {
    return prisma.device.update({
      where: {
        id,
      },

      data: {
        relay,
      },
    });
  }

  static async deleteDevice(id: number) {
    return prisma.device.delete({
      where: {
        id,
      },
    });
  }
}
