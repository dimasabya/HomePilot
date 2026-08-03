import prisma from "../prisma/client";

export class DeviceService {
  static async getAll() {
    return prisma.device.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  static async getById(id: number) {
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
}
